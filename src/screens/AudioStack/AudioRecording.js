import React from 'react';
import { StyleSheet, Text, View} from 'react-native'; 

const AudioRecording = () => {
    return (
        <View style = {styles.container}>
            <Text>음성 녹음</Text>
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

export default AudioRecording;