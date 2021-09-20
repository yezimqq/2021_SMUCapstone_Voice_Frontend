import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import DiaryInputModal from './DiaryInputModal';

/* ----- onPress diary => show detail, can edit/delete ----- */
const ShowDiary = ({ item, onPress }) => {
    const { title, content } = item;
    return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text>이모지 추가해야함</Text>  
        <Text style={styles.title} >
            {title}
        </Text>
        <Text> {content} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#bebebe',
        marginTop: 5
    },
   
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#ed847a',
    },
});

export default ShowDiary;
