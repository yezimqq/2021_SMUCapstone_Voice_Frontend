import React from 'react';
import { StyleSheet, Text, View} from 'react-native'; 

const AudioStorage = () => {
    return (
        <View style = {styles.container}>
            <Text>음성 저장소</Text>
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

export default AudioStorage;