import React from 'react';
import { StyleSheet, Text, View} from 'react-native'; 

const DiarySetting = () => {
    return (
        <View style = {styles.container}>
            <Text>감정 선택</Text>
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