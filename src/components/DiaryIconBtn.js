import React from 'react';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const DiaryIconBtn = ({ antIconName, size, color, style, onPress }) => {
    return (
    <AntDesign
        name={antIconName}
        size={size || 18}
        color={color || 'white'}
        style={[styles.icon, { ...style }]}
        onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
    icon: {
        backgroundColor: '#ea847a',
        padding: 15,
        borderRadius: 50,
        elevation: 5,
    },
});

export default DiaryIconBtn;