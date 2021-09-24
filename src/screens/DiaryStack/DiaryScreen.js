import { FlatList, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import DiaryInputModal from '../../components/DiaryInputModal';
import Icon from 'react-native-vector-icons/FontAwesome';
import NotFound from '../../components/NotFound';
import SearchBar from '../../components/SearchBar';
import ShowDiary from '../../components/ShowDiary';
import { useDiaryList } from '../../contexts/DiaryProvider';



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

    const { diaryList, addDiary } = useDiaryList();

    const filteredDiaryList = diaryList.filter(diary => {
        if (diary.emojiName.toLowerCase().includes(searchQuery.toLowerCase())
           || diary.content.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
        return diary;
        }
    });


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
    };
    

    const handleOnClear = async () => {
        setSearchQuery('');
    };

    return (

    <>
     
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
            
            
            {diaryList.length && !filteredDiaryList.length ? (
                <NotFound />
            ) : (
                <FlatList
                    data = {filteredDiaryList}
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