import React, { useState, useEffect, useCallback, useLayoutEffect} from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Bubble, GiftedChat, Send, Actions, Composer, InputToolbar } from 'react-native-gifted-chat';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Chat = ({ navigation }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.rowContainer}>
                    <TouchableOpacity
                        onPress = {() => {{navigation.navigate('AudioStorage')}}}>
                        <Feather
                            name = 'plus'
                            size = {30}
                            color = 'white'
                            style={styles.headerIcon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress = {() => {}}>
                        <FontAwesome
                            name = 'gear'
                            size = {30}
                            color = 'white'
                            style={styles.headerIcon}
                        />
                    </TouchableOpacity>

                </View>
            ),
        }),

        setMessages([
            {
                _id: 1,
                text: '',
                audio: 'voice.mp3',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: null,
                createdAt: null,
                audio: 'voice.mp3',
                user: {
                    _id: 1,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
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
                        backgroundColor: '#ffe97d',
                    }
                }}
            />
        );
    };

    /* 보류
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
                <TouchableOpacity onPress={alert('안녕')}>
                    <FontAwesome 
                        name="microphone"
                        style={styles.textInputIcon} 
                        size={32}
                    />  
                </TouchableOpacity>
            </View>
        );
    };

    const renderActions = (props) => {
        <View>
            <Actions
                {...props}
                icon={() =>
                    <FontAwesome 
                        name="microphone"
                        style={styles.textInputIcon} 
                        size={32}
                    />}
            />
        </View>
    }
    */

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
            //renderComposer={renderComposer}
            //renderActions={renderActions}
            //renderMessage={renderMessage}
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
