import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
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

const date = new Date();
const time = new Date();

const formatDate = (time) => {
    if (Platform.OS === 'ios')
        return `${time.getHours()}:${time.getMinutes()}`;
    else {
        if (time.getHours() < 12)
            return `오전 ${time.getHours()}:${time.getMinutes()}`;
        else
            return `오후 ${time.getHours()-12}:${time.getMinutes()}`;
    }    
};

//예시 data
const Diarys = [
    {
        id: '1',
        diaryEmoji: images.blue,
        diaryEmojiName: '우울해요',
        diaryEmojiColor: '#e8913c', 
        diaryDate: formatDate(time),
        diaryText: '오늘은 너무 우울하다. 아침에 늦게 일어나 지각을 했기 때문이다. 선생님께 또 엄청나게 혼났다. 알람을 맞췄는데도 못 듣고 그냥 자버렸다..',
    },
    {
        id: '2',
        diaryEmoji: images.fantastic,
        diaryEmojiName: '환상적이에요',
        diaryEmojiColor: '#54b492',
        diaryDate: formatDate(time),
        diaryText: '저녁이 되니 기분이 째진다. 야호'
    }
]

const Diary = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress = {() => {{navigation.navigate('DiaryWrite')}}}
                >
                <Icon
                    name = 'edit'
                    size = {30}
                    color = 'white'
                    style={styles.header_icon}
                />
                </TouchableOpacity>
            ),
            
        });
    });

    

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <CalendarStrip
                scrollable
                selectedDate={date}
                style={{height:100, paddingTop: 10, paddingBottom: 5 }}
                calendarColor={'white'}
                calendarHeaderStyle={{color: 'black', fontSize: 15}}
                dateNumberStyle={{color: 'black', fontSize: 20}}
                dateNameStyle={{color: 'black', fontSize: 15}}
                iconContainer={{flex: 0.1}}
                highlightDateNumberStyle={{color: 'black', fontSize: 20}}
                highlightDateNameStyle={{color: 'black', fontSize: 15}}
                daySelectionAnimation={{ type: 'background', highlightColor: '#dedede' }}
            />

            <FlatList 
                data={Diarys}
                keyExtractor={item=>item.id}
                renderItem={({item}) => (
                    <View>
                        <View style={styles.status}>
                            <Image source={item.diaryEmoji} style={styles.emoji}/>
                            <Text style={styles.emoji_text}>{item.diaryEmojiName}</Text>
                            <Text style={styles.time_text}>{item.diaryDate}</Text>
                        </View>
                        <View>
                            <Text style={styles.content_text}>{item.diaryText}</Text>
                        </View> 
                    </View>
                )}
                
            />
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
        margin: 15,
    },

    emoji_text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
    },

    time_text: {
        marginLeft: 10,
        color: 'grey'
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