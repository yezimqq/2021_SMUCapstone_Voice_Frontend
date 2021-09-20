import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';


const SearchBar = ({ containerStyle, value, onChangeText }) => {
    return (
    <View style={[styles.container, { ...containerStyle }]}>
        <TextInput
            value = {value}
            onChangeText = {onChangeText}
            style={styles.searchBar}
            placeholder = '감정일기를 검색하세요.'
        />
    </View>
  );
};

const styles = StyleSheet.create({
    
    container: {
        justifyContent: 'center',
    },
    
    searchBar: {
        borderWidth: 1,
        borderColor: '#ed847a',
        height: 45,
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 15,
    },
  
});

export default SearchBar;