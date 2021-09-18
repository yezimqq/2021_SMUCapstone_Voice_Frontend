import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { VictoryBar, VictoryChart, VictoryLegend, VictoryLine, VictoryPie, VictoryStack } from 'victory-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { PieChart } from 'react-native-chart-kit';
import dateFormat from 'dateformat';
import { ButtonGroup } from 'react-native-elements';

/* ----- calendar korean 설정 ----- */
LocaleConfig.locales['ko'] = {
    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    dayNames: ['일요일','월요일', '화요일','수요일','목요일','금요일','토요일'],
    dayNamesShort: ['일','월','화','수','목','금','토'],
    today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'ko';

/* ----- emoji color  ----- */
const VERYGOOD_COLOR = '#54b492';
const GOOD_COLOR = '#8dbe41';
const NORMAL_COLOR = '#64a1d0';
const BAD_COLOR = '#e8913c';
const VERYBAD_COLOR = '#dc3439';


const chartDataColor = [VERYGOOD_COLOR, GOOD_COLOR, NORMAL_COLOR, BAD_COLOR, VERYBAD_COLOR];
const defaultChartData = [{ y: 0 }, { y: 0 }, { y: 0 }, { y: 0 }, { y: 0 }, { y: 100 }];

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

Date.prototype.addDays = function(days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const DailyChart = ({ navigation }) => {

    /* ----- hearder icon ----- */
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

    const [currentMoodData, setCurrentMoodData] = useState(defaultChartData);
    const [currentDate, setCurrentDate] = useState(dateFormat(new Date(), 'isoDate'));
    const [selectedMoodIndex, setSelectedMoodIndex] = useState(0);  
    const [moodGraphData, setMoodGraphData] = useState([]);

    const dateMoodData = useRef({
        [currentDate]: { // today pie chart data
            verygood: 1, 
			good: 1,
			normal: 2,
            bad: 3,
			verybad: 4
            
		}
    });

    function dateChart(dateData) {
        return Object.keys(dateData).map(mood => {
            const color = (mood === 'verygood' ? VERYGOOD_COLOR : 
                           mood === 'good' ? GOOD_COLOR : 
                           mood === 'normal' ? NORMAL_COLOR : 
                           mood === 'bad' ? BAD_COLOR : VERYBAD_COLOR)
            return {
                name: '',
                value: dateData[mood],
                color: color
            };
        });
    }

    useEffect(() => {
        const moodData = Object.keys(dateMoodData.current[currentDate]).map(mood => {
            return {
                y: dateMoodData.current[currentDate][mood],
            };
        });
        setCurrentMoodData(moodData);
         // display
        }, [currentDate]);
        
    useEffect(() => {
        const startingMonth = new Date(currentDate).getMonth();  // 오늘 날짜로 시작
        const newMoodGraphData = [];
        const mood = ['verygood', 'good', 'normal', 'bad', 'verybad'][selectedMoodIndex];
        let curDate = new Date(currentDate);
        curDate.setDate(1);
        while (curDate.getMonth() === startingMonth) {
            newMoodGraphData.push({
                x: curDate.getDate(),
                y: dateMoodData.current[dateFormat(curDate, "isoDate")][mood]
            });
            curDate = curDate.addDays(1);
        }
        setMoodGraphData(newMoodGraphData);
    }, [selectedMoodIndex, currentDate]);
        
    function updateIndex(selectedIndex) {
        setSelectedMoodIndex(selectedIndex);
    }    
        
    return (
         <ScrollView style = {styles.container}> 
            {/* ----- calendar pie chart ----- */}
			<Calendar    
                style = {styles.calendarContaioner} 
                theme = {{
                    arrowColor: 'black',
                    monthTextColor: 'black',
                    textMonthFontWeight: 'bold',
                }}
                onDayPress = {(day) => {
					setCurrentDate(day.dateString);
				}}
				onDayLongPress = {(day) => {
					setCurrentDate(day.dateString);
				}}
				onMonthChange = {(date) => {
					setCurrentDate(date.dateString);
				}}
				hideExtraDays = {true}
				firstDay = {0} // 일요일 시작
				hideDayNames = {false} 
				
				onPressArrowLeft = {substractMonth => substractMonth()}
				onPressArrowRight = {addMonth => addMonth()}
				dayComponent = {({ date, state }) => {
					if (!dateMoodData.current[date.dateString]) {
						dateMoodData.current[date.dateString] = {  /*Math.floor(Math.random()*100): 랜덤데이터*/
							verygood: null,
			                good: null,
			                normal: null,
                            bad: null,
			                verybad: null
						};
					}
					return (
						<TouchableOpacity onPress = {() => {setCurrentDate(date.dateString)}}>
							<View style = {styles.dateChart}>
								<View style = {StyleSheet.absoluteFill}>
									<PieChart
										data = {dateChart(dateMoodData.current[date.dateString])}
										width = {50}
										height = {50}
										paddingLeft = {12}
										chartConfig = {chartConfig}
										hasLegend = {false}
										accessor = 'value'
										backgroundColor = 'transparent'  // 투명하게 설정
									/>
								</View>
								<View style = {{
									flex: -1,
									alignItems: 'center',
									justifyContent: 'center',
									borderRadius: 15,
									backgroundColor: 'white',
									width: 30,
									height: 30
								}}>
									<Text> {date.day} </Text>  
								</View>
							</View>
						</TouchableOpacity>
					)
				}}
			/>
            
            {/* ----- 캘린더 Date 선택 -> pie chart ----- */}
            <View style = {styles.line} /> 
            <Text style = {styles.title}> {currentDate} </Text>
                <View style={styles.chartContainer}>
                    <VictoryPie
                        animate = {{ easing: 'exp' }}
                        data = {currentMoodData}
                        width = {250}
                        height = {250}
                        colorScale = {chartDataColor}
                        innerRadius = {50}
				        labels = {() => null}
                    />
                    <VictoryLegend
                        width = {200}
                        x = {0}
					    y = {50}
				        height = {200}
				        orientation = 'vertical'
				        gutter = {20}
					    colorScale = {chartDataColor}
				        data = {[
                            { name: '매우 좋음' }, 
                            { name: '좋음' }, 
                            { name: '보통' }, 
                            { name: '나쁨' }, 
                            { name: '매우 나쁨' }
				        ]}
				    />
			    </View>
            
            {/* ----- 감정변화 line chart  ----- */}
            <View style = {styles.line} />
			<ButtonGroup
				buttons = {['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨']}
				selectedIndex = {selectedMoodIndex}
				onPress = {updateIndex}
				containerStyle = {{ marginTop: 20 }}
                selectedButtonStyle ={{ backgroundColor: '#ed847a'}}
			/>
			<VictoryChart>
                <VictoryLine
                    style = {{
                        data: { stroke: "#c43a31" },
                        parent: { border: "#cccccc"}
                    }}
                    animate = {{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    data = {moodGraphData}
                />
            </VictoryChart>
            <VictoryChart>
                <VictoryBar
                    style={{ data: { fill: '#bebebe' } }}
                    animate = {{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    data = {moodGraphData}
                />
            </VictoryChart>
    </ScrollView>
  );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
	},
    
    calendarContaioner: {
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
    },

    dateChart: {
        height: 50,
		width: 50,
		position: 'relative',
		alignItems: 'center',
		justifyContent: 'center'						
    },

    line: { 
        borderBottomColor: '#bebebe',
        borderBottomWidth: 1,
        width: '95%',
        color: '#bebebe',
        position: 'relative',
        alignSelf: 'center'
    },

    title: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
	
	chartContainer: {
        flexDirection: 'row',
		justifyContent: 'flex-start',
	}
});

export default DailyChart;
