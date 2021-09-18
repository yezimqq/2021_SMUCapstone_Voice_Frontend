import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';

/* ----- onPress diary => show detail, can edit/delete ----- */
const HandleOnPress = ({ item, onPress }) => {
    const { title, content } = item;
    return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text style={styles.title} >
            {title}
        </Text>
        <Text>{content}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ed847a',
        width: '48%',
        padding: 20,
        borderRadius: 10,
    },
   
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
    },
});

export default HandleOnPress;
