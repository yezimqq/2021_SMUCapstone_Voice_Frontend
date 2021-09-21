import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { DB } from '../../../utils/firebase';

const ChatList = ({ navigation, route }) => {
    const [channels, setChannels] = useState([]);

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

        const unsubscribe = DB.collection('channels')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                const list = [];
                snapshot.forEach(doc => {
                    list.push(doc.data());
                });
                setChannels(list);
            });
        
        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={channels}
                keyExtractor={item=>item.id}
                renderItem={({item}) => (
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Chat', {name: item.name})} 
                        style={styles.chatRoom}>
                        <View style={styles.rowContainer}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                                <View style={styles.colContainer}>
                                    <Text style={styles.nameText}>{item.name}</Text>
                                    <Text style={styles.messageText}>{item.message}</Text>   
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
        opacity: .50,
    }

});

export default ChatList;
