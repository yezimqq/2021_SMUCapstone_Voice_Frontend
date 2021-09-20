import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableWithoutFeedback, Keyboard, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


import DiaryInputModal from '../../components/DiaryInputModal';
import NotFound from '../../components/NotFound';
import SearchBar from '../../components/SearchBar';
import { useDiaryList } from '../../contexts/DiaryProvider';


import CalendarStrip from 'react-native-calendar-strip';
import 'moment';
import 'moment/locale/ko';
import ShowDiary from '../../components/ShowDiary';


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



const reverseData = data => {
    return data.sort((a, b) => {
        const aInt = parseInt(a.time);
        const bInt = parseInt(b.time);
        if (aInt < bInt) return 1;
        if (aInt == bInt) return 0;
        if (aInt > bInt) return -1;
    });
};

const DiaryScreen = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                >
                   <Icon
                        name = 'edit'
                        size = {28}
                        color = 'white'
                        style={{ margin: 5 }}
                   />
               </TouchableOpacity>
            ),
        });
    }); 
  
  
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [resultNotFound, setResultNotFound] = useState(false);

    const { diaryList, setDiaryList, findDiaryList } = useDiaryList();

    const reverseDiaryList = reverseData(diaryList);

    const handleOnSubmit = async (title, content) => {
        const diary = { id: Date.now(), title, content, time: Date.now() };
        const updatedDiaryList = [...diaryList, diary];
        setDiaryList(updatedDiaryList);
        await AsyncStorage.setItem('diaryList', JSON.stringify(updatedDiaryList));
    };

    const openDiary = (diary) => {
        navigation.navigate('DiaryDetail', { diary });
    };

    const handleOnSearchInput = async text => {
        setSearchQuery(text);
        if (!text.trim()) {
            setSearchQuery('');
            setResultNotFound(false);
            return await findDiaryList();
        }
        const filteredDiaryList = diaryList.filter(diary => {
            if (diary.title.toLowerCase().includes(text.toLowerCase())
                || diary.content.toLowerCase().includes(text.toLowerCase())
            ) {
            return diary;
            }
        });

        if (filteredDiaryList.length) {
            setDiaryList([...filteredDiaryList]);
        } 
        else {
            setResultNotFound(true);
        }
    };

    const handleOnClear = async () => {
        setSearchQuery('');
        setResultNotFound(false);
        await findDiaryList();
    };

    return (

    <>
    {/*<CalendarStrip
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
        daySelectionAnimation={{ type: 'background', highlightColor: '#dedede' }}
    />*/}
     
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            {diaryList.length ? (
                <SearchBar
                    value = {searchQuery}
                    onChangeText = {handleOnSearchInput}
                    containerStyle={{ marginVertical: 15 }}
                    onClear={handleOnClear}
                />
            ) : null}
            
            
            {resultNotFound ? (
                <NotFound />
            ) : (
                <FlatList
                    data = {reverseDiaryList}
                    numColumns = {1}
                    keyExtractor = {item => item.id.toString()}
                    renderItem = {({ item }) => (
                        <ShowDiary 
                            onPress = {() => openDiary(item)} 
                            item = {item} 
                        />
                    )}
               />
               )
            }
        
          {!diaryList.length ? (
              <View
                  style = {[
                      StyleSheet.absoluteFillObject,
                      styles.emptyMessageContainer,
                  ]}
              >
                  <Text style = {styles.emptyMessage}>Please Add your Diary</Text>
              </View>
          ) : null}
        </View>
        
    </TouchableWithoutFeedback>
    
    <DiaryInputModal    // 다이어리 작성 modal
        visible = {modalVisible}
        onClose = {() => setModalVisible(false)}
        onSubmit = {handleOnSubmit}
    />
    
    </>
);
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: 'white',
    },

    emptyMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    emptyMessage: {
        fontSize: 20,
        fontWeight: 'bold',
        opacity: 0.2,
    },
 
});

export default DiaryScreen;