import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'; 
import Icon from 'react-native-vector-icons/Ionicons';
//import { images } from '../images';
//import { VictoryBar, VictoryChart, VictoryLabel } from 'victory-native';


const MonthlyChart = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress = {() => {{navigation.navigate('DailyChart')}}}
                >
                <Icon
                    name = {Platform.OS === 'ios' ? 'ios-swap-horizontal' : 'md-swap-horizontal'}
                    size = {30}
                    color = 'white'
                />
                </TouchableOpacity>
            ),
        });
    });
    return (
        <View style = {styles.container}>
            <View style = {styles.count}>
                <Text>차트 + 이모지 갯수</Text>
            </View>
            
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

    count: {
        flex: 0.3,
    },
});

export default MonthlyChart;