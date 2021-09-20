import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import DiaryIconBtn from '../../components/DiaryIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDiaryList } from '../../contexts/DiaryProvider';
import DiaryInputModal from '../../components/DiaryInputModal';


/* -----  create/update diary date -----*/
const formatDate = ms => {
    const date = new Date(ms);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 <10
        ? '0' + (date.getMonth() + 1)
        : '' + (date.getMonth() + 1);
    const day = date.getDate() < 10
        ? '0' + date.getDate()
        : '' + date.getDate();
    const hrs = date.getHours() < 10
        ? '0' + date.getHours()
        : '' + date.getHours();
    const min = date.getMinutes()< 10
    ? '0' + date.getMinutes()
    : '' + date.getMinutes();
    const sec = date.getSeconds()< 10
    ? '0' + date.getSeconds()
    : '' + date.getSeconds();

    return `${year}/${month}/${day} - ${hrs}:${min}:${sec}`;
};


const DiaryDetail = (props) => {
    const [diary, setDiary] = useState(props.route.params.diary);
    const { setDiaryList } = useDiaryList();
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const deleteDiary = async () => {
        const result = await AsyncStorage.getItem('diaryList');
        let diaryList = [];
        if (result !== null) diaryList = JSON.parse(result);

        const newDiaryList = diaryList.filter(n => n.id !== diary.id);
        setDiaryList(newDiaryList);
        await AsyncStorage.setItem('diaryList', JSON.stringify(newDiaryList));
        props.navigation.goBack();
    };

    const displayDeleteAlert = () => {
        Alert.alert(
            '삭제',
            '삭제 버튼을 누르면 해당 감정일기가 영구적으로 삭제됩니다!',
            [
                {
                    text: '삭제',
                    onPress: deleteDiary,
                },
                {
                    text: '취소',
                    onPress: () => console.log('canceled'),
                },
            ], 
            { 
                cancelable: true,
            }
        )
    };

    const handleUpdate = async (title, content, time) => {
        const result = await AsyncStorage.getItem('diaryList');
        let diaryList = [];
        if (result !== null) diaryList = JSON.parse(result);

        const newDiaryList = diaryList.filter(n => {
            if (n.id === diary.id) {
                n.title = title;
                n.content = content;
                n.isUpdated = true;
                n.time = time;

          setDiary(n);
         }
        return n;
      });

      setDiaryList(newDiaryList);
      await AsyncStorage.setItem('diaryList', JSON.stringify(newDiaryList));
  };
  
  const handleOnClose = () => setShowModal(false);

  const openEditModal = () => {
      setIsEdit(true);
      setShowModal(true);
  };

  return (
      <>
      <View style = {[styles.container]}>
          <Text style = {styles.time}>
              {diary.isUpdated? 
                  `Updated At ${formatDate(diary.time)}`   // 다이어리 수정 시간
                : `Created At ${formatDate(diary.time)}`    // 다이어리 작성 시간
              }   
          </Text>

        <Text>이모지 추가해야함</Text>  

          <Text style = {styles.title}>{diary.title}</Text>
          <Text style = {styles.content}>{diary.content}</Text>
      </View>
      
      <View style = {styles.btnContainer}>
          <DiaryIconBtn
              antIconName = 'delete'
              style = {{ backgroundColor: '#ea847a', marginBottom: 15 }}
              onPress = {displayDeleteAlert}
          />
          <DiaryIconBtn antIconName='edit' onPress = {openEditModal} />
      </View>
      <DiaryInputModal
          isEdit = {isEdit}
          diary = {diary}
          onClose = {handleOnClose}
          onSubmit = {handleUpdate}
          visible = {showModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingHorizontal: 15,
  },
  
  time: {
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 50,
    fontSize: 12,
    opacity: 0.5,
},

  title: {
      fontSize: 30,
      color: '#ea847a',
      fontWeight: 'bold',
      marginTop: 30,
      marginBottom: 30,
  }, 
  
  content: {
      fontSize: 20,
      opacity: 0.6,
  },
  
  btnContainer: {
      position: 'absolute',
      right: 15,
      bottom: 50,
  },
});

export default DiaryDetail;
