import React from 'react';
import { StyleSheet, Text, View} from 'react-native'; 

const DiarySetting = () => {
    return (
        <View style = {styles.container}>
            <Text>감정일기설정(날짜/시간/이모지)</Text>
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

export default DiarySetting;