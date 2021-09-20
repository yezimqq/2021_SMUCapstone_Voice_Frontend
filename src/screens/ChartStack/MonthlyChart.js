import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native'; 
import Icon from 'react-native-vector-icons/Ionicons';
import ArrowIcon from 'react-native-vector-icons/Feather';
//import { images } from '../images';
import { VictoryBar, VictoryChart, VictoryStack, VictoryLegend, VictoryAxis } from 'victory-native';

/* ----- emoji color  ----- */
const VERYGOOD_COLOR = '#54b492';
const GOOD_COLOR = '#8dbe41';
const NORMAL_COLOR = '#64a1d0';
const BAD_COLOR = '#e8913c';
const VERYBAD_COLOR = '#dc3439';


const chartDataColor = [VERYGOOD_COLOR, GOOD_COLOR, NORMAL_COLOR, BAD_COLOR, VERYBAD_COLOR];


const MonthlyChart = ({ navigation }) => {

    /* ----- hearder icon ----- */
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

    
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // 1월 => 0이므로, 현재 월은 +1로 
    
    return (
        <ScrollView style = {styles.container}> 
            {/* ----- 연도 이동 ----- */}
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

            {/* ----- display chart ----- */}
            <VictoryChart
                height = {550}
                domainPadding ={1}
            >
                <VictoryAxis />  
                <VictoryLegend
				        orientation = 'horizontal'
                        x = {5} y = {15}
				        gutter = {32}
					    colorScale = {chartDataColor}
				        data = {[
                            { name: '매우 좋음' }, 
                            { name: '좋음' }, 
                            { name: '보통' }, 
                            { name: '나쁨' }, 
                            { name: '매우 나쁨' }
				        ]}
				/>
                
                <VictoryStack
                    colorScale={chartDataColor}
                    style={{ data: { width: 15 } }}
                    //horizontal ={true}
                >   
                    
                    <VictoryBar   // 매우 좋음
                        data={[
                            { x: '1', y: Math.floor(Math.random()*100) },
                            { x: '2', y: Math.floor(Math.random()*100) },
                            { x: '3', y: Math.floor(Math.random()*100) },
                            { x: '4', y: Math.floor(Math.random()*100) },
                            { x: '5', y: Math.floor(Math.random()*100) },
                            { x: '6', y: Math.floor(Math.random()*100) },
                            { x: '7', y: Math.floor(Math.random()*100) },
                            { x: '8', y: Math.floor(Math.random()*100) },
                            { x: '9', y: Math.floor(Math.random()*100) },
                            { x: '10', y: Math.floor(Math.random()*100) },
                            { x: '11', y: Math.floor(Math.random()*100) },
                            { x: '12', y: Math.floor(Math.random()*100) },
                        ]}
                    />

                   
                    <VictoryBar    // 좋음
                        data={[
                            { x: '1', y: Math.floor(Math.random()*100) },
                            { x: '2', y: Math.floor(Math.random()*100) },
                            { x: '3', y: Math.floor(Math.random()*100) },
                            { x: '4', y: Math.floor(Math.random()*100) },
                            { x: '5', y: Math.floor(Math.random()*100) },
                            { x: '6', y: Math.floor(Math.random()*100) },
                            { x: '7', y: Math.floor(Math.random()*100) },
                            { x: '8', y: Math.floor(Math.random()*100) },
                            { x: '9', y: Math.floor(Math.random()*100) },
                            { x: '10', y: Math.floor(Math.random()*100) },
                            { x: '11', y: Math.floor(Math.random()*100) },
                            { x: '12', y: Math.floor(Math.random()*100) },
                        ]}
                    />

                   
                    <VictoryBar    // 보통
                        data={[ 
                            { x: '1', y: Math.floor(Math.random()*100) },
                            { x: '2', y: Math.floor(Math.random()*100) },
                            { x: '3', y: Math.floor(Math.random()*100) },
                            { x: '4', y: Math.floor(Math.random()*100) },
                            { x: '5', y: Math.floor(Math.random()*100) },
                            { x: '6', y: Math.floor(Math.random()*100) },
                            { x: '7', y: Math.floor(Math.random()*100) },
                            { x: '8', y: Math.floor(Math.random()*100) },
                            { x: '9', y: Math.floor(Math.random()*100) },
                            { x: '10', y: Math.floor(Math.random()*100) },
                            { x: '11', y: Math.floor(Math.random()*100) },
                            { x: '12', y: Math.floor(Math.random()*100) },
                        ]}
                    />

                    
                    <VictoryBar    // 나쁨
                        data={[
                            { x: '1', y: Math.floor(Math.random()*100) },
                            { x: '2', y: Math.floor(Math.random()*100) },
                            { x: '3', y: Math.floor(Math.random()*100) },
                            { x: '4', y: Math.floor(Math.random()*100) },
                            { x: '5', y: Math.floor(Math.random()*100) },
                            { x: '6', y: Math.floor(Math.random()*100) },
                            { x: '7', y: Math.floor(Math.random()*100) },
                            { x: '8', y: Math.floor(Math.random()*100) },
                            { x: '9', y: Math.floor(Math.random()*100) },
                            { x: '10', y: Math.floor(Math.random()*100) },
                            { x: '11', y: Math.floor(Math.random()*100) },
                            { x: '12', y: Math.floor(Math.random()*100) },
                        ]}
                    />

                    
                    <VictoryBar    // 매우 나쁨
                        data={[
                            { x: '1', y: Math.floor(Math.random()*100) },
                            { x: '2', y: Math.floor(Math.random()*100) },
                            { x: '3', y: Math.floor(Math.random()*100) },
                            { x: '4', y: Math.floor(Math.random()*100) },
                            { x: '5', y: Math.floor(Math.random()*100) },
                            { x: '6', y: Math.floor(Math.random()*100) },
                            { x: '7', y: Math.floor(Math.random()*100) },
                            { x: '8', y: Math.floor(Math.random()*100) },
                            { x: '9', y: Math.floor(Math.random()*100) },
                            { x: '10', y: Math.floor(Math.random()*100) },
                            { x: '11', y: Math.floor(Math.random()*100) },
                            { x: '12', y: Math.floor(Math.random()*100) },
                        ]} 
                    />
                </VictoryStack>
            </VictoryChart>
        

            <View style = {styles.line} />
            {/*<Text style = {styles.title}> {currentMonth} 월 </Text> */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    year: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
    },

    line: { 
        borderBottomColor: '#bebebe',
        borderBottomWidth: 1,
        width: '95%',
        color: '#bebebe',
        alignSelf: 'center',
    },

    title: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MonthlyChart;