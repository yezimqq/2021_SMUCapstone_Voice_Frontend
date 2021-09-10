import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'; 
import Icon from 'react-native-vector-icons/Ionicons';
import ArrowIcon from 'react-native-vector-icons/Feather';
//import { images } from '../images';
//import { VictoryBar, VictoryChart, VictoryLabel } from 'victory-native';

import { StackedBarChart } from 'react-native-chart-kit';


// 이모지 컬러
const VERYGOOD_COLOR = '#54b492';
const GOOD_COLOR = '#8dbe41';
const NORMAL_COLOR = '#64a1d0';
const BAD_COLOR = '#e8913c';
const VERYBAD_COLOR = '#dc3439';


const chartDataColor = [VERYGOOD_COLOR, GOOD_COLOR, NORMAL_COLOR, BAD_COLOR, VERYBAD_COLOR];
//const defaultChartData = [{ y: 0 }, { y: 0 }, { y: 0 }, { y: 0 }, { y: 0 }, { y: 100 }];

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

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

    //const [currentMoodData, setCurrentMoodData] = useState(defaultChartData);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    


    return (
        <View style = {styles.container}>
            <View style = {styles.year}>
                <TouchableOpacity onPress = {() => setCurrentYear(currentYear-1)}>
                    <ArrowIcon
                        name = 'chevron-left'
                        size = {25}
                        style={{marginLeft: 13}}     
                    />
                </TouchableOpacity>
                <Text style = {{fontSize: 18, fontWeight: 'bold'}}> {currentYear} </Text>
                <TouchableOpacity onPress = {() => setCurrentYear(currentYear+1)}>
                    <ArrowIcon
                        name = 'chevron-right'
                        size = {25}
                        style={{marginRight: 13}}
                    />
                </TouchableOpacity>
            </View>

            

            {/*<StackedBarChart
                style={ { height: 300, } }
                animate={true}
                keys={ this.moodSumEachDay.keys }
                colors={ this.moodSumEachDay.colors }
                data={ stackedBarChartData }
                showGrid={ true }
                contentInset={ { top: 30, bottom: 30 } }
                valueAccessor={ ({ item, key }) => item[ key ].value }
            />      */}                     
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
    },

    year: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 10,
        padding: 5,
    }
});

export default MonthlyChart;