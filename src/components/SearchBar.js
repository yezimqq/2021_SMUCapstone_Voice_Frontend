import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const SearchBar = ({ containerStyle, value, onChangeText }) => {
    return (
    <View style={[styles.container, { ...containerStyle }]}>
        <TextInput
            value={value}
            onChangeText={onChangeText}
            style={styles.searchBar}
            placeholder='다이어리 제목으로 검색하세요.'
        />
    </View>
  );
};

const styles = StyleSheet.create({
    searchBar: {
        borderWidth: 1,
        borderColor: '#ed847a',
        height: 40,
        borderRadius: 40,
        paddingLeft: 15,
        fontSize: 16,
    },
    
    container: {
        justifyContent: 'center',
    },
  
});

export default SearchBar;