import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Bubble, GiftedChat, Send, Composer } from 'react-native-gifted-chat';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Audio } from 'expo-av';

const Chat = ({ navigation, route: { params } }) => {
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
        });
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: params.name || '채팅방'});
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

    //GET - chatBot Id로 대화 내용 조회 API 연결
    const _handleGetMsgByChatBotId  = (chatbotId) => {
        async function getMsgByChatBotId() {
            const response = await fetch("http://13.124.78.167:8080/chat", {
                method: "GET",
                headers: { 
                    "Authorization" : await AsyncStorage.getItem('Authorization'),
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    chatBotId: chatbotId,
                })
            });

            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }
            
            const res = await response.json();
            return res;
        };

        getMsgByChatBotId().then(async res => {
            console.log("res: ", res);
        });
    };

    //PUT - 메시지 생성 API 연결
    const _handlePutMessages = (chatbotId) => {
        async function putMessages() {
            const response = await fetch("http://13.124.78.167:8080/chat", {
                method: "PUT",
                headers: { 
                    "Authorization" : await AsyncStorage.getItem('Authorization'),
                    "Content-Type" : "application/json",

                },
                body: JSON.stringify({
                    botId: chatbotId,
                    createDate: new Date(),
                    id: 2,
                    isBot: 1,
                    text: messages,
                }),
            });

            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }
            
            const res = await response.json();
            return res;
        };

        putMessages().then(async res => {
            console.log("res: ", res);
        });
    };

    //GET - 유저의 챗봇 조회 API 연결
    const _handleGetChatBot = () => {
        async function getChatBot() {
            const response = await fetch("http://13.124.78.167:8080/chat/chatBot", {
                method: "GET",
                headers: { 
                    "Authorization" : await AsyncStorage.getItem('Authorization'),
                    "Content-Type" : "application/json",
                },
                body: null,
            });

            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }
            
            const res = await response.json();
            return res;
        };

        getChatBot().then(async res => {
            console.log("res: ", res);
        });
    };

    //GET - 어체 조회 API 연결
    const _handleGetMode = () => {
        async function getMode() {
            const response = await fetch("http://13.124.78.167:8080/chat/mode", {
                method: "GET",
                headers: { 
                    "Authorization" : await AsyncStorage.getItem('Authorization'),
                    "Content-Type" : "application/json",
                },
                body: null,
            });

            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }
            
            const res = await response.json();
            return res;
        };

        getMode().then(async res => {
            console.log("res: ", res);
        });
    };

    //GET - 음성 조회 API 연결
    const _handleGetVoice = () => {
        async function getVoice() {
            const response = await fetch("http://13.124.78.167:8080/chat/voice", {
                method: "GET",
                headers: { 
                    "Authorization" : await AsyncStorage.getItem('Authorization'),
                    "Content-Type" : "application/json",
                },
                body: null,
            });

            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }
            
            const res = await response.json();
            return res;
        };

        getVoice().then(async res => {
            console.log("res: ", res);
        });
    };

    //DELETE - 음성 삭제 API
    const _handleDeleteChatBot = (voiceId) => {
        async function deleteChatBot() {
            const response = await fetch(`http://13.124.78.167:8080/chat/voice/${voiceId}`, {
                method: "DELETE",
                headers: { 
                    "Authorization" : await AsyncStorage.getItem('Authorization'),
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    voiceId: voiceId
                }),
            });

            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }
            
            const res = await response.json();
            return res;
        };

        deleteChatBot().then(async res => {
            console.log("res: ", res);
        });
    };

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
