import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import DiaryInputModal from './DiaryInputModal';

/* ----- onPress diary => show detail, can edit/delete ----- */
const ShowDiary = ({ item, onPress }) => {
    const { emoji, title, content } = item;
    return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style = {styles.rowContainer}>
                <Image source = {emoji}  style = {styles.emoji}/>
            <View style = {styles.columnContainer}>
                <Text style={styles.title} > {title} </Text>
                <Text> {content} </Text>
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
        marginTop: 5
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
        marginHorizontal: 20
    },
   
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#ed847a',
        marginBottom: 10
    },
});

export default ShowDiary;
