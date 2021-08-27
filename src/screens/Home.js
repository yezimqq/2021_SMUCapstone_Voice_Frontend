import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style ={styles.box_01}
                onPress = {() => navigation.navigate('Diary')}>
                <Text>현재 나의 감정</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style ={styles.box_02}
                onPress = {() => navigation.navigate('DailyChart')}>
                <Text>이번 달 나의 감정기록</Text>
            </TouchableOpacity>
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

    box_01: {
        width: "95%",
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor:'#e0e0e0',
        borderRadius: 15,
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        marginBottom: 10,
        shadowColor: '#bebebe',
        shadowOpacity: 5,
        shadowOffset: {width:5, height:5}
    },

    box_02: {
        width: "95%",
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor:'#e0e0e0',
        borderRadius: 15,
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 20,
        shadowColor: '#bebebe',
        shadowOpacity: 5,
        shadowOffset: {width:5, height:5}
    },
});

export default Home;