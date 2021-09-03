import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { images } from '../images';
import { VictoryPie } from 'victory-native';

const dataEx = [
    {x: 'very good', y: 2},
    {x: 'good', y: 4},
    {x: 'normal', y: 6},
    {x: 'bad', y: 6},
    {x: 'very bad', y: 4},
]

const Home = ({ navigation }) => {
    const [data, setData] = useState(dataEx);
    const [emoji, setEmoji] = useState();

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style ={styles.box_01}
                onPress = {() => navigation.navigate('Diary')}>
                <Text style={styles.text}>현재 나의 감정</Text>
                <Text style={[styles.text, {color: '#64a1d0'}]}>보통</Text>
                <Image source={images.normal} style={styles.emoji}/>
            </TouchableOpacity>
            
            {/* 구성 어찌해야할지 얘기 해봐야할듯 */}
            <TouchableOpacity 
                style ={styles.box_02}
                onPress = {() => navigation.navigate('DailyChart')}>
                <Text style={styles.text}>이번 달 나의 감정기록</Text>
                <VictoryPie 
                    data={data}
                    labels={({ datum }) => datum.y} 
                    startAngle={-90}
                    endAngle={90}
                    innerRadius={100}
                    colorScale={['#54b492', '#8dbe41', '#64a1d0', '#e8913c', '#dc3439']} />
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

});

export default Home;