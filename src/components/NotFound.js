import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const NotFound = () => {
    return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
        <AntDesign 
            name='frowno' 
            size={90} 
            color='#bebebe' 
        />
        <Text style = {styles.NotFoundMessage}>
            Result Not Found
        </Text>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center',
    },

    NotFoundMessage: {
        marginTop: 20, 
        fontSize: 20, 
        color: '#bebebe'
   }
});

export default NotFound;