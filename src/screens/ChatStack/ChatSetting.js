import React from 'react';
import { StyleSheet, Text, View} from 'react-native'; 

const ChatSetting = () => {
    return (
        <View style = {styles.container}>
            <Text>채팅방 설정</Text>
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
});

export default ChatSetting;