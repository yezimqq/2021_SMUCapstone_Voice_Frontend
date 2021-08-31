import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'; 
import Icon_1 from 'react-native-vector-icons/Ionicons';
import Icon_2 from 'react-native-vector-icons/FontAwesome';
import { images } from '../../images';

const date = new Date();

const ChatRoom = ({ profile, name, preview }) => {
    return (
        <TouchableOpacity style={styles.chatRoom} onPress={() => alert(date)}>
            <View style={styles.rowContainer}>
                <Image source={profile} style={styles.image} />
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.chatroomText}>{name}</Text>
                    <Text numberOfLines={1} style={styles.chatroomText}>{preview}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const ChatList = ({ navigation }) => {
    const [profile, setProfile] = useState();
    const [name, setName] = useState();
    const [preview, setPreview] = useState();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.rowContainer}>
                    <TouchableOpacity
                        onPress = {() => {{navigation.navigate('ChatSetting')}}}>
                        <Icon_1
                            name = {Platform.OS === 'ios' ? 'ios-chatbubbles-outline' : 'chatbubbles-outline'}
                            size = {30}
                            color = 'white'
                            style={styles.headerIcon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress = {() => {{navigation.navigate('AudioStorage')}}}>
                        <Icon_2
                            name = 'file-audio-o'
                            size = {30}
                            color = 'white'
                            style={styles.headerIcon}
                        />
                    </TouchableOpacity>

                </View>
            ),
            /* 도움말
            headerLeft: () => {
                <TouchableOpacity
                    onPress = {() => {{navigation.navigate('AudioStorage')}}}
                >
                <Icon_1
                    name = {Platform.OS === 'ios' ? 'ios-help-circle-outline' : 'help-circle-outline'}
                    size = {30}
                    color = 'white'
                />
                </TouchableOpacity>
            },
            */
        });
    });

    return (
        <ScrollView source={styles.container}>
            <ChatRoom profile={images.normal} name="할머니" preview="마음이 너무 아프구나 ..." />
            <ChatRoom profile={images.blue} name="최준" preview="준이의 가장 찬란했던 순간을 함께 해줘서 고마워요" />
            {/*<ChatRoom profile={profile} name={name} preview={preview} />*/}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    rowContainer: {
        flexDirection: 'row',
    },

    headerIcon: {
        margin: 5,
    },

    chatRoom: {
        justifyContent: 'center',
        width: '100%',
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