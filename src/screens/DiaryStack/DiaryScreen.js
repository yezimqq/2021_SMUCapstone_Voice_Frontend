import { FlatList, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DiaryInputModal from '../../components/DiaryInputModal';
import Icon from 'react-native-vector-icons/FontAwesome';
import NotFound from '../../components/NotFound';
import SearchBar from '../../components/SearchBar';
import ShowDiary from '../../components/ShowDiary';
import { useDiaryList } from '../../contexts/DiaryProvider';

// const reverseData = data => {
//     return data.sort((a, b) => {
//         const aInt = parseInt(a.time);
//         const bInt = parseInt(b.time);
//         if (aInt < bInt) return 1;
//         if (aInt == bInt) return 0;
//         if (aInt > bInt) return -1;
//     });
// };

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

    const { diaryList, setDiaryList, addDiary } = useDiaryList();


    const handleOnSubmit = async (data) => {
        const diary = { 
            id: Date.now(), 
            time: Date.now(),
            ...data
         };
        addDiary(diary)
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
                    data = {diaryList}
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
        paddingHorizontal: 10,
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