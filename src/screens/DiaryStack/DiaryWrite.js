import React from 'react';
import { StyleSheet, Text, View} from 'react-native'; 

const DiaryWrite = () => {
    return (
        <View style = {styles.container}>
            <Text>감정일기작성</Text>
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

export default DiaryWrite;