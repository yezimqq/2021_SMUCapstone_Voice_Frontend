import React, {useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native'; 
import Icon from 'react-native-vector-icons/FontAwesome';

const Chat = ({ navigation, name }) => {
    const [headerName, setHeaderName] = useState(name);
    const [message, setMessage] = useState();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.rowContainer}>
                    <TouchableOpacity
                        onPress = {() => {{navigation.navigate('AudioStorage')}}}>
                        <Icon
                            name = 'file-audio-o'
                            size = {30}
                            color = 'white'
                            style={styles.headerIcon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress = {() => {{navigation.navigate('ChatSetting')}}}>
                        <Icon
                            name = 'gear'
                            size = {30}
                            color = 'white'
                            style={styles.headerIcon}
                        />
                    </TouchableOpacity>

                </View>
            ),
            headerTitle: () => (
                <Text style={styles.headerText}>{/*headerName*/}대화 상대 이름</Text>
            ),
        });
    });

    

    return (
        <View style={styles.container}>
            <ScrollView stlye={styles.container}>

            </ScrollView>
            
            <View style={styles.rowContainer}>
                <View style={styles.inputView} >
                    <TextInput
                        multiline
                        scrollEnabled
                        style={styles.inputText}
                        placeholder="메시지 입력"
                        placeholderTextColor="#bebebe"
                        onChangeText={message => setMessage(message)} />
                </View>
                <TouchableOpacity onPress={() => alert('clicked!')}>
                    <Icon
                        name = 'microphone'
                        size = {40}
                        color = 'black'
                        style={styles.micIcon}
                    />
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

    rowContainer: {
        flexDirection: 'row',
    },

    headerIcon: {
        margin: 5,
    },
    
    headerText: {
        color: 'white',
    },
    
    inputView: {
        width: "80%",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor:'#cccccc',
        borderRadius: 4,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },

    inputText: {
        height: 50,
        color: "black"
    },

    micIcon: {
        marginVertical: 5,
        marginLeft: 10,
    }
});

export default Chat;