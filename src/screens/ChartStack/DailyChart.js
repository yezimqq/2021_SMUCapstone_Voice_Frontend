import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'; 
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';


LocaleConfig.locales['ko'] = {
  monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  dayNames: ['일요일','월요일', '화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일', '월','화','수','목','금','토'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'ko';


const DailyChart = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress = {() => {{navigation.navigate('MonthlyChart')}}}
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
            <View style = {styles.calendarContainer}>
                <Calendar />
            </View>
            <View style = {styles.count}>
                <Text>이모지 갯수 통계</Text>
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

    calendarContainer: {
        flex: 1,
        marginTop: 50,
        width: '100%',
    },

    count: {
        flex: 0.3,
    },
});

export default DailyChart;