import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'; 
import Icon from 'react-native-vector-icons/AntDesign';
import TabIcon from 'react-native-vector-icons/Foundation'
import * as MediaLibrary from 'expo-media-library';

const AudioStorage = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress = {() => alert('폴더 생성')}
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
    });

    const [audioFiles, setAudioFiles] = useState([]);
    const getPermission = async () => {
        const permission = await MediaLibrary.getPermissionsAsync();
        console.log(permission);
    
        if (permission.granted) {
          // we want to get all the audio files
          getAudioFiles();
        }
    
        if (!permission.canAskAgain && !permission.granted) {
          console.log("user denied and we can't ask again");
        }
    
        if (!permission.granted && permission.canAskAgain) {
          const {
            status,
            canAskAgain,
          } = await MediaLibrary.requestPermissionsAsync();
    
          if (status === 'denied' && canAskAgain) {
            //   we are going to display alert that user must allow this permission to work this app
            // permissionAllert();
          }
    
          if (status === 'granted') {
            //    we want to get all the audio files
            getAudioFiles();
          }
    
          if (status === 'denied' && !canAskAgain) {
            //   we want to display some error to the user
          }
        }
      };
    
      const getAudioFiles = async () => {
        let media = await MediaLibrary.getAssetsAsync({
          mediaType: 'audio',
        });
        console.log(media);
    
        media = await MediaLibrary.getAssetsAsync({
          mediaType: 'audio',
          first: media.totalCount,
        });
    
        setAudioFiles(media.assets);
      };
    
      useEffect(() => {
        getPermission();
      }, []);

    return (
        <View style = {styles.container}>
            <FlatList
                data = {audioFiles}
                keyExtractor = {item => item.id}
                renderItem = {({ item }) => (
                    <Text style={styles.audioTitle}>{item.filename}</Text>
                )}
            />
            <TouchableOpacity style={styles.trainBtn}>
                <Text 
                    style={styles.btnText}
                    onPress = {() => alert('음성 학습하기')}>음성 학습하기</Text>
            </TouchableOpacity>
            <View style = {styles.tab}>
                <TouchableOpacity 
                    style={styles.tabContainer} 
                    onPress={() => alert('음성파일 업로드')}>
                    <TabIcon
                        name = 'upload'
                        size = {30}
                        color = 'black'
                    />
                    <Text style={styles.tabText}>음성파일 업로드</Text>
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerIcon: {
        marginRight: 10,
    },

    audioTitle: {
        textAlign: 'center',
        paddingVertical: 20,
    },

    trainBtn: {
        position: 'absolute',
        bottom: '10%',
        width: "80%",
        backgroundColor: "#ed847a",
        borderWidth: 1,
        borderColor:'black',
        borderRadius: 4,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 15,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 2,
        shadowOffset: {width:2, height:2}
    },

    btnText: {
        fontSize: 18,
        color: "black",
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