import React, { useState, useEffect } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { View, Text, StyleSheet, Animated, Dimensions, TouchableHighlight, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import TabIcon from 'react-native-vector-icons/Foundation'
import { Audio } from "expo-av";
import { documentDirectory, readDirectoryAsync as fsReadDirectoryAsync, deleteAsync } from "expo-file-system";
import * as DocumentPicker from 'expo-document-picker';

const AudioStorage = ({ navigation }) => {
    /* make directory in app 
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress = {() => (null)}
                >
                <Icon
                    name = 'addfolder'
                    size = {30}
                    color = 'white'
                    style = {styles.headerIcon}
                />
                </TouchableOpacity>
            ),
        });
    }); */

    const [isLoading, setLoading] = useState(true);
    const [recordingList, setRecordingList] = useState([]);
    const [rowAnimatedValues, setRowAnimatedValues] = useState({});
    const [isAnimationRunning, setIsAnimationRunning] = useState(false);

    const soundObject = new Audio.Sound();

    useEffect(() => {
        initialize();
    }, []);

    const getListOfRecordings = async () => {
        const recordings = await fsReadDirectoryAsync(
            documentDirectory + "my-recordings"
        );

        const recordingMap = recordings.map((recording) => ({
            key: recording,
            text: recording,
            filePath: documentDirectory + "my-recordings/" + recording,
        }));
        
        setRecordingList(recordingMap);
        setRowAnimatedValues(
            recordingMap.reduce((aninmatedValuesMap, current) => {
                aninmatedValuesMap[current.key] = new Animated.Value(1);

                return aninmatedValuesMap;
            }, {})
        );
    };

    const initialize = async () => {
        await getListOfRecordings();
        setLoading(false);
    };

    /* file upload */

    /* ----- Play Recording Files ----- */
    const playRecording = async (recordingFileName) => {
        console.log("play recording pressed", recordingFileName);
        try {
            await soundObject.unloadAsync();
            await soundObject.loadAsync({
                uri: recordingFileName,
            });
            await soundObject.playAsync();
            // Your sound is playing!
        } catch (error) {
                console.error(error);
            // An error occurred!
        }
    };

    /* ----- Swipe Left: Delete Recording Files ----- */
    const onSwipeValueChange = (swipeData) => {
        const { key, value } = swipeData;
        if (value < -Dimensions.get("window").width && !isAnimationRunning) {
            setIsAnimationRunning(true);
            Animated.timing(rowAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {
                const newData = [...recordingList];
                const prevIndex = recordingList.findIndex((item) => item.key === key);
                newData.splice(prevIndex, 1);
                deleteRecording(recordingList[prevIndex]);
                setRecordingList(newData);
                setIsAnimationRunning(false);
            });
        }
    };

    const deleteRecording = async (item) => {
        try {
            await deleteAsync(item.filePath);
            console.log("recording deleted", item.text);
        } catch (err) {
            console.error("Unexpected error deleting recording", item.text, err);
            // put it back in the list since delete wasn't successful
            setRecordingList([...recordingList, item]);
        }
    };

    const openPlaybackControls = (itemData) => {
        console.log(itemData);
        playRecording(itemData.item.filePath);
    };
    
    const renderItem = (data) => {
        return (
            <Animated.View
                style={[
                    styles.rowFrontContainer,
                    {
                        height: rowAnimatedValues[data.item.key].interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 60],
                        }),
                    },
                ]}
            >
                <TouchableHighlight
                    onPress={() => openPlaybackControls(data)}
                    style={styles.rowFront}
                    underlayColor={"#e0e0e0"}
                >
                    <View style = {styles.fileView}>
                        <Icon
                            name = 'playcircleo'
                            size = {45}
                            color = '#5e5e5e'
                            style = {{marginLeft: 15, marginRight: 30}}
                        />
                        <Text>{data.item.text}</Text>
                    </View>
                </TouchableHighlight>
            </Animated.View>
        );
    };

    const renderHiddenItem = () => (
        <View style = {styles.rowBack}>
            <View style = {[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text style={styles.backTextWhite}>Delete</Text>
            </View>
        </View>
    );

    {/* ----- can upload audio file(invisible) ----- */}
    const uploadFile = async() => {
        let result = await DocumentPicker.getDocumentAsync({
            type: "audio/*" // all files => type: "*/*"
          });
          console.log(result); // can see directory path
    };

    //POST - 음성 생성 API 연결
    const _handlePostVoice = ({ id, name }) => {
        async function postVoice() {
            const response = await fetch("http://13.124.78.167:8080/chat/chatBot", {
                method: "POST",
                headers: { 
                    "Authorization" : await AsyncStorage.getItem('Authorization'),
                    "Content-Type" : "application/json",

                },
                body: JSON.stringify({
                    id: id,
                    name: name,
                }),
            });

            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }
            
            const res = await response.json();
            return res;
        }

        postVoice().then(async res => {
            console.log("res: ", res);
            navigation.navigate('AudioStorage');
        })       
    }

    return (
        <View style={styles.container}>
            {isLoading && <Text>Loading......</Text>}
            {!isLoading && (
                <SwipeListView
                    style = {styles.swipeListContainer}
                    disableRightSwipe
                    data = {recordingList}
                    renderItem = {renderItem}
                    renderHiddenItem = {renderHiddenItem}
                    rightOpenValue = {-Dimensions.get("window").width}
                    onSwipeValueChange = {onSwipeValueChange}
                    useNativeDriver = {false}
                />
            )}
            <TouchableOpacity style={styles.trainBtn}>
                <Text 
                    style = {styles.btnText}
                    onPress = {() => alert('음성 학습하기')}>음성 학습하기</Text>
            </TouchableOpacity>
            <View style = {styles.tab}>
                <TouchableOpacity 
                    style = {styles.tabContainer} 
                    onPress = {uploadFile}>
                    <TabIcon
                        name = 'upload'
                        size = {30}
                        color = 'black'
                    />
                    <Text style = {styles.tabText}>음성파일 업로드</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.tabContainer} 
                    onPress={() => navigation.navigate('AudioRecording')}>
                    <TabIcon
                        name = 'microphone'
                        size = {30}
                        color = 'black'
                    />
                    <Text style={styles.tabText}>음성 녹음하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
 }


const styles = StyleSheet.create({
    headerIcon: {
        marginRight: 10,
    },

    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
  
    swipeListContainer: {
        width: '100%',
    },
  
    backTextWhite: {
        color: 'white',
    },

    rowFront: {
        alignItems: 'flex-start',
        backgroundColor: 'white',
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 60,
    },

    fileView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    rowBack: {
        alignItems: 'center',
        backgroundColor: '#bebebe',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
  
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
  
    backRightBtnRight: {
        backgroundColor: "#c43a31",
        right: 0,
    },

    audioTitle: {
        textAlign: 'center',
        paddingVertical: 20,
    },

    trainBtn: {
        position: 'absolute',
        bottom: '10%',
        width: '80%',
        backgroundColor: '#ed847a',
        borderWidth: 1,
        borderColor:'black',
        borderRadius: 4,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 15,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 2,
        shadowOffset: {width:2, height:2}
    },

    btnText: {
        fontSize: 18,
        color: 'black',
    },

    tabContainer: {
        height: 55,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#efefef',
        borderColor: '#bebebe',
        borderWidth: 1,
    },

    tabText: {
        color: '#5e5e5e',
        fontSize: 12,
        textAlign: 'center',
    },

    tab: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
    }
});

export default AudioStorage; 
