import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Bubble, GiftedChat, Send, Composer } from 'react-native-gifted-chat';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Audio } from 'expo-av';



const Chat = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [recording, setRecording] = useState();
    

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.rowContainer}>
                    <TouchableOpacity
                        onPress={() => { { navigation.navigate('AudioStorage') } }}>
                        <Feather
                            name='plus'
                            size={30}
                            color='white'
                            style={styles.headerIcon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => { }}>
                        <FontAwesome
                            name='gear'
                            size={30}
                            color='white'
                            style={styles.headerIcon}
                        />
                    </TouchableOpacity>
                </View>
            ),
        }),

    
       
            
            

            setMessages([
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 2,
                    text: 'Hello world',
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ]);
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, []);

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: 'white',
                    },
                    right: {
                        backgroundColor: '#2e64e5',
                    }
                }}
                textStyle={{
                    right: {
                        color: '#fff',
                    }
                }}
            />
        );
    };

    const renderComposer = (props) => {
        return (
            <View style={styles.rowContainer}>
                <Composer {...props} />
                <Send {...props}>
                    <MaterialCommunityIcons
                        name="send-circle"
                        style={styles.textInputIcon}
                        size={32}
                        color="#2e64e5"
                    />
                </Send>
                {recording ?
                    <TouchableOpacity onPress={stopRecording}>
                        <FontAwesome
                            name="stop-circle-o"
                            style={styles.textInputIcon}
                            size={32}
                        />
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={startRecording}>
                        <FontAwesome
                            name="microphone"
                            style={styles.textInputIcon}
                            size={32}
                        />
                    </TouchableOpacity>
                }
            </View>
        );
    };

    async function startRecording() {
        try {
            console.log('접근 권한 허가 중 ..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playInSilentModeIOS: true,
            });
            console.log('녹음 시작');
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
            console.log('녹음 완료');
        } catch (err) {
            console.error('녹음 시작 실패', err);
        }
    }

    async function stopRecording(props) {
        console.log('녹음 중지');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        onSend([{
            //꼼수로 오류 해결
            _id: Math.random(),
            audio: 'text',
            user: {
                _id: 1,
            }
        }]);
        console.log('Recording stopped and stored at', uri);
    }

    return (
        <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
                _id: 1,
            }}
            renderBubble={renderBubble}
            alwaysShowSend
            scrollToBottom
            renderComposer={renderComposer}
        />
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    headerIcon: {
        margin: 5,
    },

    textInputIcon: {
        margin: 5,
    }

});

export default Chat;
