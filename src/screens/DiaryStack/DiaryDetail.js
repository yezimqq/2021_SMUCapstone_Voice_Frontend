import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DiaryIconBtn from '../../components/DiaryIconBtn';
import DiaryInputModal from '../../components/DiaryInputModal';
import { useDiaryList } from '../../contexts/DiaryProvider';

/* -----  create/update diary date -----*/
const formatDate = ms => {
    const date = new Date(ms);
    console.log(date)
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
    const { deleteDiary, updateDiary, diaryList } = useDiaryList();
    const diary = diaryList.find(v => v.id === props.route.params.diary.id);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const handleDeleteDiary = async () => {
        deleteDiary(diary.id)
        props.navigation.goBack();
    };

    const displayDeleteAlert = () => {
        Alert.alert(
            '삭제',
            '삭제 버튼을 누르면 해당 감정일기가 영구적으로 삭제됩니다!',
            [
                { text: '삭제', onPress: handleDeleteDiary },
                { text: '취소', onPress: () => console.log('canceled')},
            ], 
            { 
                cancelable: true,
            }
        )
    };

    const handleUpdate = async (newDiary) => {
        updateDiary({
            id:diary.id,
            isUpdated:true,
            updatedTime: Date.now(),
            ...newDiary
        })
    };
  
    const handleOnClose = () => setShowModal(false);

    const openEditModal = () => {
        setIsEdit(true);
        setShowModal(true);
    };

    if(!diary) return null

    return (
    
    <>
        <View style = {[styles.container]}>
            <Text style = {styles.time}>
                {diary.isUpdated? 
                    `Updated At ${formatDate(diary.updatedTime)}`   // 다이어리 수정 시간
                :   `Created At ${formatDate(diary.time)}`   // 다이어리 최초 작성 시간
                }   
            </Text>

            <View style = {{alignItems: 'center'}}>
                 <Image source = {diary.emoji} style = {styles.emoji} /> 
                 <Text style = {[styles.emojiName, {color:diary.color}]}>{diary.emojiName}</Text>
            </View>
            <Text style = {styles.content}>{diary.content}</Text>
        </View>
       
        <View style = {styles.btnContainer}>
            <DiaryIconBtn
                antIconName = 'delete'
                style = {{ backgroundColor: '#ea847a', marginBottom: 15 }}
                onPress = {displayDeleteAlert}
            />
            <DiaryIconBtn 
                antIconName = 'edit' 
                onPress = {openEditModal}
            />
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
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },
  
    time: {
        textAlign: 'right',
        marginTop: 10,
        marginBottom: 50,
        fontSize: 12,
        opacity: 0.5,
    },

    emoji: {
        width: 100,
        height: 100, 
        marginBottom: 5
    },

    emojiName: {
        fontSize: 30,
        color: '#ea847a',
        fontWeight: 'bold',
        margin: 30
    }, 
  
    content: {
        fontSize: 20,
        opacity: 0.6,
        marginLeft: 30
    },
  
    btnContainer: {
        position: 'absolute',
        right: 15,
        bottom: 50,
    },
});

export default DiaryDetail;
