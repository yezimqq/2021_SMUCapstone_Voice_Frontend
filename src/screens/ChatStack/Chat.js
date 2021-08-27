import React from 'react';
import { StyleSheet, Text, View} from 'react-native'; 

const Chat = () => {
    return (
        <View style = {styles.container}>
            <Text>채팅방</Text>
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

export default Chat;