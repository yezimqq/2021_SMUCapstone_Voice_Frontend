import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { VictoryLabel, VictoryPie } from 'victory-native';

import { images } from '../images';
import { useDiaryList } from '../contexts/DiaryProvider';

const Home = ({ navigation }) => {
    const { diaryList } = useDiaryList(); 
    const nowDiary = diaryList.length > 0 ? diaryList[0] : null
    

    const monthlyData = diaryList.filter(v => v.time > Date.now() - 2629800000 /* 1개월 밀리초로 */)

    const data = [
        {x: '매우 좋음', y: monthlyData.filter(v => v.category === '매우 좋음').length },
        {x: '좋음', y: monthlyData.filter(v => v.category === '좋음').length},
        {x: '보통', y: monthlyData.filter(v => v.category === '보통').length},
        {x: '나쁨', y: monthlyData.filter(v => v.category === '나쁨').length},
        {x: '매우 나쁨', y: monthlyData.filter(v => v.category === '매우 나쁨').length},
    ]
    

    const DefaultEmoji = ({source, text}) => {
        return (
            <View style={styles.container}>
                <Image source={source} style={styles.defaultEmoji} />
                <Text style={styles.defaultEmojiText}>{text}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style ={styles.box_01}
                onPress = {() => navigation.navigate('DiaryScreen')}
            >
                <Text style={styles.text}>현재 나의 감정</Text>
                <Text style={[styles.text, {color: nowDiary?.color || '#64a1d0'}]}>{nowDiary?.emojiName || '없음'}</Text>
                <Image source={nowDiary?.emoji || images.normal} style={styles.emoji}/>
            </TouchableOpacity>
            
            {/* 위치 절대값으로 맞춘거라 기기에 따라 맞춤 설정 해야함 */}
            <TouchableOpacity 
                style ={styles.box_02}
                onPress = {() => navigation.navigate('DailyChart')}
            >    
                <Text style={[styles.text, styles.textPosition]}>나의 감정기록</Text>
                <View style={styles.chartPosition}>
                    <VictoryPie 
                        data={data}
                        startAngle={-90}
                        endAngle={90}
                        innerRadius={100}
                        colorScale={['#54b492', '#8dbe41', '#64a1d0', '#e8913c', '#dc3439']}
                        labels={({ datum }) => datum.y || ''}
                        labelComponent={<VictoryLabel dy={15} style={{fontWeight: 'bold'}} />}
                    />
                </View>
                <View style={styles.line} />
                <View style={styles.rowEmojiContainer}>
                    <DefaultEmoji source={images.verygood} text="매우 좋음" />
                    <DefaultEmoji source={images.good} text="좋음" />
                    <DefaultEmoji source={images.normal} text="보통" />
                    <DefaultEmoji source={images.bad} text="나쁨" />
                    <DefaultEmoji source={images.verybad} text="매우 나쁨" />
                </View>
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
        shadowOffset: {width:5, height:5},
        elevation: 3,

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
        shadowOffset: {width:5, height:5},
        elevation: 3,
    },

    text: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 5,
    },

    emoji: {
        width: 100,
        height: 100,
        margin: 5,
    },

    textPosition: {
        position: 'absolute', 
        bottom: Dimensions.get('screen').height*0.38,
    },
    // chart 위치 기기별로 차이 
    chartPosition: {
        position: 'absolute', 
        top: Dimensions.get('screen').height*0.04,
    },

    line: { 
        borderBottomColor: "black",
        borderBottomWidth: 0.5,
        width: "95%",
        color: "black",
        position: 'relative',
        top: Dimensions.get('screen').height*0.08,
    },

    rowEmojiContainer: {
        flexDirection: 'row',
        alignContent: 'space-between',
        position: 'absolute', 
        top: Dimensions.get('screen').height*0.31,
    },

    defaultEmojiNum: {
        backgroundColor: 'black',
        color: 'white',
        
    },

    defaultEmoji: {
        width: 50,
        height: 50,
    },

    defaultEmojiText: {
        marginTop: 5,
    }
});

export default Home;
