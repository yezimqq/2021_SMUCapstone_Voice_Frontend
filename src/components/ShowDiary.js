import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import React from 'react';

/* ----- onPress diary => show detail, can edit/delete ----- */
const ShowDiary = ({ item, onPress }) => {
    const { emoji, emojiName, content , color} = item;
    return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style = {styles.rowContainer}>
                <Image source = {emoji}  style = {styles.emoji}/>
            <View style = {styles.columnContainer}>
                <Text style={[styles.emojiName, {color}]} > {emojiName} </Text>
                <Text style = {styles.content} numberOfLines = {1}> {content} </Text>
            </View>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#bebebe',
        marginTop: 5,
    },

    rowContainer: {
        flexDirection: 'row',
        alignContent: 'space-between',
        marginVertical: 5,
    },

    columnContainer: {
        flexDirection: 'column',
        alignContent: 'space-between',
        marginVertical: 10,
        marginHorizontal:10
    },

    emoji: {
        width: 80,
        height: 80,
        marginHorizontal: 20,   
    },
   
    emojiName: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#ed847a',
        marginBottom: 10
    },

    content:{
        marginRight: 125
    }
});

export default ShowDiary;
