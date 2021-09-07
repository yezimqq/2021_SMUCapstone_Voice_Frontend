import React, { useEffect } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { images } from '../../images';

//예시 data
const Messages = [
    {
        id: '1',
        userName: '할머니',
        userProfile: images.normal,
        messageText: '마음이 너무 아프구나...',
    },
    
    {
        id: '2',
        userName: '최준',
        userProfile: images.blue,
        messageText: '준이의 가장 찬란했던 순간을 함께 해줘서 고마워요.'
    }
]

const ChatList = ({ navigation }) => {
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
    });

    return (
        <View style={styles.container}>
            <FlatList
                data={Messages}
                keyExtractor={item=>item.id}
                renderItem={({item}) => (
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Chat', {userName: item.userName})} 
                        style={styles.chatRoom}>
                        <View style={styles.rowContainer}>
                            <Image source={item.userProfile} style={styles.image} />
                                <View style={styles.colContainer}>
                                    <Text style={styles.chatroomText}>{item.userName}</Text>
                                    <Text numberOfLines={1} style={styles.chatroomText}>{item.messageText}</Text>
                                    
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
        borderWidth: 2,
        borderColor: '#5e5e5e',
        borderRadius: 5,
        marginTop: 5,
    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 100,
        marginLeft: 10,
    },

    chatroomText: {
        fontSize: 16,
        marginLeft: 20,
        paddingTop: 10,
        width: 250,
    }

});

export default ChatList;