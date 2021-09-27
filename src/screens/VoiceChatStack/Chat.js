import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { Bubble, GiftedChat, Send, Composer } from 'react-native-gifted-chat';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];

const Chat = ({ navigation, route: { params } }) => {
    const [messages, setMessages] = useState([]);
    const [sound, setSound] = useState();

    useEffect(() => {
        console.log(`-----------Chat 시작-----------\n`)

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

        //챗봇 아이디 조회 함수 실행
        _findChatBotId();

        return sound ?
            () => {
            console.log('음성 언로딩 중');
            sound.unloadAsync(); 
            } : undefined;

    }, []);

    //헤더 이름 설정
    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: params.name || '채팅방'});
    }, []);

    //챗봇 아이디 조회
    const _findChatBotId = () => {
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

            res.forEach(doc => {
                //아이디 조회 후 함수와 연결
                if (doc.name === params.name) {
                    _handleGetChatBotById(doc.id);
                    _handleGetMsgByChatBotId(doc.id);
                }
            });
        });
    };


    //GET - chatBot Id로 유저의 챗봇 조회 API 연결
    const _handleGetChatBotById = (chatBotId) => {
        async function getChatBotById() {
            const response = await fetch(`http://13.124.78.167:8080/chat/chatBot/${chatBotId}`, {
                method: "GET",
                headers: { 
                    "Authorization" : await AsyncStorage.getItem('Authorization'),
                    "Content-Type" : "application/json",
                },
            });

            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }
                
            const res = await response.json();
            return res;
        };

        //조회한 챗봇의 이름, 프로필 사진, 모드 받아옴
        getChatBotById().then(async res => {
            console.log("아이디로 받아옴 res\n", res);

            //챗봇 및 사용자 id 설정
            const imageName = res.imageFile["url"].toString().substring(29);
            const imageUrl = ("file:///data/user/0/host.exp.exponent/cache/ExperienceData/UNVERIFIED-192.168.219.118-psycology_consult/ImagePicker/"+imageName);
            console.log("\n\n이미지\n\n", imageUrl);
            setMessages([
                {
                    _id: 1,
                    text: res.lastChat,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: res.name,
                        avatar: imageUrl,
                    },
                },
                {
                    _id: 2,
                    user: {
                       _id: 1,
                    },
                },
            ]);
        });
    };

    //GET - chatBot Id로 유저의 메시지 조회 API 연결
    const _handleGetMsgByChatBotId = (chatBotId) => {
        async function getMsgByChatBotId() {
            const response = await fetch(`http://13.124.78.167:8080/chat?chatBotId=${chatBotId}`, {
                method: "GET",
                headers: { 
                    "Authorization" : await AsyncStorage.getItem('Authorization'),
                    "Content-Type" : "application/json",
                },

            });

            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }
                
            const res = await response.json();
            return res;
        };

        getMsgByChatBotId().then(async res => {
            console.log("\n4. 조회한 챗봇 대화 내용\n: ", res);
        });
    };
    
    //전송 함수
    const onSend = useCallback((messages = []) => {
        const dateY = new Date();
        const chatBotId = params.id;
        console.log(`1. 메시지 \n`, messages[0].text);
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

        //사용자가 보낸 메시지만 챗봇에 전송
        if (messages[0].user["_id"] === 1)
            _handleGetAnswer(messages[0].text);
        
        console.log("\n\n\n\n챗봇 아이디\n\n\n ", chatBotId);
        
        //PUT - 메시지 생성 API 연결 (메시지 저장)
        async function putMessages() {
            const response = await fetch("http://13.124.78.167:8080/chat", {
                method: "POST",
                headers: { 
                    "Authorization" : await AsyncStorage.getItem('Authorization'),
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    botId: chatBotId,
                    createDate: new Date(dateY.getFullYear(), dateY.getMonth()+1, dateY.getDate(), dateY.getHours(), dateY.getMinutes(), dateY.getSeconds()),
                    isBot: 0,
                    text: messages[0].text,
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
            console.log("2. 메세지 PUT res\n ", res);
        });
        
    }, []);

    //GET - 챗봇 응답 메시지 - inputText와 모드에 따라 설정
    const _handleGetAnswer = (inputText) => {
        const modeId = params.mode;
        console.log("\n\n\nchatMode\n\n\n", modeId);
        async function getChatbotAnswer() {
            const response = await fetch(`http://13.124.78.167:8080/chat/answer?inputText=${inputText}&modeId=${modeId}`, {
                method: "GET",
                headers: { 
                    "Authorization" : await AsyncStorage.getItem('Authorization'),
                    "Content-Type" : "application/json",
                },
            });
    
            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }
                         
            const res = await response.json();
            return res;
        };
                 
        getChatbotAnswer().then(async res => {
            console.log("\n챗봇 답변\n ", res);
            const answer = res.result["answer"];
            console.log("answer: ", answer);
                
            //전송
            onSend([{
                _id: Math.random(),
                text: answer,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    avatar: params.image,
                }
            }]);
        });
    };

    //말풍선 설정
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
                    left: {
                        fontSize: 15,
                    },
                    right: {
                        color: '#fff',
                        fontSize: 15,
                    }
                }}
            />
        );
    };

    //채팅방 내 textInput 커스텀
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
            </View>
        );
    };

    //음성 재생 함수
    async function playSound() {
        console.log('음성 불러오는 중');
        const soundName = messages[0].text.replace("?","");
        console.log(soundName);
        const soundUrl = "http://13.124.78.167:8080/uploads/" + soundName + ".mp3";
        console.log(soundUrl);
        
        const { sound } = await Audio.Sound.createAsync({
          uri: soundUrl
        });
        setSound(sound);
        
        console.log('음성 재생 중');
        await sound.playAsync();
    }

    return (
        <GiftedChat
            messages={messages}
            onSend={onSend}
            user={{
                _id: 1,
            }}
            renderBubble={renderBubble}
            alwaysShowSend
            scrollToBottom
            showAvatarForEveryMessage={true}
            renderComposer={renderComposer}
            onPress={playSound}
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
