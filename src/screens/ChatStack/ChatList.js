import React from 'react';
import { StyleSheet, Text, View } from 'react-native'; 

const ChatList = () => {
    return (
        <View style = {styles.container}>
            <Text>심리상담</Text>
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

export default ChatList;