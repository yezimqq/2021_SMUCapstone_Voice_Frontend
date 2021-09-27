import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

const ChatList = ({ navigation }) => {
    const [channels, setChannels] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.rowContainer}>
                    <TouchableOpacity
                        onPress = {() => {{navigation.navigate('ChatSetting')}}}>
                        <Ionicons
                            name = {Platform.OS === 'ios' ? 'ios-chatbubbles-outline' : 'chatbubbles-outline'}
                            size = {30}
                            color = 'white'
                            style={styles.headerIcon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress = {() => {{navigation.navigate('AudioStorage')}}}>
                        <FontAwesome
                            name = 'file-audio-o'
                            size = {30}
                            color = 'white'
                            style={styles.headerIcon}
                        />
                    </TouchableOpacity>
                </View>
            ),
        });

        console.log('----- ChatList 시작 -----');
        if (isFocused) {
            _showList();
        }

    }, [isFocused]);

    const _showList = () => {
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

            
            const list = [];
            res.forEach(doc => {
                console.log("doc: ", doc.imageFile["url"])
                const imageName = doc.imageFile["url"].toString().substring(29)
                const imageUrl = ("file:///data/user/0/host.exp.exponent/cache/ExperienceData/UNVERIFIED-192.168.219.118-psycology_consult/ImagePicker/"+imageName);
                console.log("imageUrl: ", imageUrl)
                

                list.push({
                    id: doc.id.toString(),
                    image: imageUrl,
                    name: doc.name.toString(),
                    message: doc.lastChat.toString(),
                    mode: doc.chatMode["id"],
                    createdAt: new Date(),
                });
            });
            setChannels(list);
        });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={channels}
                keyExtractor={item=>item.id}
                renderItem={({item}) => (
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Chat', {id: item.id, name: item.name, image: item.image, mode: item.mode })} 
                        style={styles.chatRoom}>
                        <View style={styles.rowContainer}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                                <View style={styles.colContainer}>
                                    <Text style={styles.nameText}>{item.name}</Text>
                                    <Text style={styles.messageText} numberOfLines={1}>{item.message}</Text>   
                                </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
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

    rowContainer: {
        flexDirection: 'row',
    },

    colContainer: {
        flexDirection: 'column',
    },

    headerIcon: {
        margin: 5,
    },

    chatRoom: {
        justifyContent: 'center',
        width: Dimensions.get('screen').width,
        height: 85,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 4,
        marginTop: 3,
    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 100,
        marginLeft: 10,
    },

    nameText: {
        fontSize: 16,
        marginLeft: 20,
        paddingTop: 10,
        width: 250,
    },

    messageText: {
        fontSize: 14,
        marginLeft: 30,
        paddingTop: 10,
        width: 250,
    }

});

export default ChatList;

    //DELETE - 챗봇 삭제 API 연결
    const _handleDeleteChatBot = ( chatbotId ) => {
        async function deleteChatBot() {
            const response = await fetch(`http://13.124.78.167:8080/chat/chatBot/${chatbotId}`, {
                method: "DELETE",
                headers: { 
                    "Authorization" : await AsyncStorage.getItem('Authorization'),
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    chatBotId: chatbotId,
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
