import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CalendarStrip from 'react-native-calendar-strip';
import 'moment';
import 'moment/locale/ko';
import { images } from '../../images';

const locale = {
    name: 'ko',
    config: {
        months: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
        monthsShort: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
        weekdays: '월요일_화요일_수요일_목요일_금요일_토요일_일요일'.split('_'),
        weekdaysShort: '월_화_수_목_금_토_일'.split('_'),
        weekdaysMin: '월_화_수_목_금_토_일'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY/MM/DD',
            LL: 'YYYY MMMM D',
            LLL: 'YYYY MMMM D LT',
            LLLL: 'YYYY MMMM D dddd LT'
        },    
    }
};

//이모지 종류, 색상, 날짜, 일기 내용 전달 받음
const Box = ({ emoji, color, date, text }) => {
    return (
        <View>
            <View style={styles.status}>
                <Image source={emoji} style={styles.emoji}/>
                <Text style={styles.emoji_text}>슬퍼요</Text>
                <Text style={styles.time_text}>{date.getHours()}시 {date.getMinutes()}분</Text>
            </View>
            <View stlye={styles.content}>
                <Text style={styles.content_text}>{text}</Text>
            </View>
        </View>
    );
};

const Diary = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress = {() => {{navigation.navigate('DiaryWrite')}}}
                >
                <Icon
                    name = 'edit'
                    size = {28}
                    color = 'white'
                    style={styles.header_icon}
                />
                </TouchableOpacity>
            ),
            
        });
    });

    
    const date = new Date();
    const [emoji, setEmoji] = useState(images.normal);
    const [textcolor, setTextcolor] = useState('red');
    const [content, setContent] = useState("형돈이가 랩을 한다 홍홍홍");

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <CalendarStrip
                scrollable
                selectedDate={date}
                style={{height:100, paddingTop: 10, paddingBottom: 5, marginTop: 10 }}
                calendarColor={'white'}
                calendarHeaderStyle={{color: 'black', fontSize: 15, marginBottom: 10 }}
                dateNumberStyle={{color: 'black', fontSize: 20}}
                dateNameStyle={{color: 'black', fontSize: 15}}
                iconContainer={{flex: 0.1}}
                highlightDateNumberStyle={{color: 'black', fontSize: 20}}
                highlightDateNameStyle={{color: 'black', fontSize: 15}}
                daySelectionAnimation={{ type: 'background', highlightColor: '#e0e0e0' }}
            />

            <ScrollView source={styles.container}>
                
                {/* Box 컴포넌트 예시 */}
                <View style={styles.status}>
                    <Image source={images.blue} style={styles.emoji}/>
                    <Text style={styles.emoji_text}>슬퍼요</Text>
                    <Text style={styles.time_text}>{date.getHours()}시 {date.getMinutes()}분</Text>
                </View>
                <View>
                    <Text style={styles.content_text}>이건 일기 내용이다 어쩌구 저쩌구 나랏말싸미 듕귁에 달아 문자와 서로 사맛디 아니홀씨 어린 백성을 니르고져 홀빼이셔도</Text>
                </View>
                
            </ScrollView>
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

    header_icon: {
        margin: 5,
    },

    status: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    emoji: {
        height: 80,
        width: 80,
        margin: 20,
    },

    emoji_text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#e8913c',
    },

    time_text: {
        marginLeft: 10,
    },

    content_text: {
        marginLeft: 20,
        marginRight: 20,
        fontSize: 18,
        paddingBottom: 10,
        borderColor: '#dedede',
        borderBottomWidth: 2,
    }
    
});

export default Diary;