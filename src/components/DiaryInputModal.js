import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Modal, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import RoundIconBtn from './DiaryIconBtn';


const DiaryInputModal = ({ visible, onClose, onSubmit, diary, isEdit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const handleModalClose = () => {
        Keyboard.dismiss();
    };

    useEffect(() => {
        if (isEdit) {
            setTitle(diary.title);
            setContent(diary.content);
        }
    }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
      if (valueFor === 'title') setTitle(text);
      if (valueFor === 'content') setContent(text);
  };

  const handleSubmit = () => {
      if (!title.trim() && !content.trim()) return onClose();

      if (isEdit) {
          onSubmit(title, content, Date.now());
      } else {
          onSubmit(title, content);
          setTitle('');
          setContent('');
      }
      onClose();
  };

  const closeModal = () => {
      if (!isEdit) {
          setTitle('');
          setContent('');
      }
      onClose();
  };

  return (
    <>  
      <Modal visible={visible} animationType='fade'>
          <View style={styles.container}>
              <TextInput
                  value={title}
                  onChangeText={text => handleOnChangeText(text, 'title')}
                  placeholder='  제목을 입력해주세요.'
                  style={[styles.inputTitle]}
              />
              <TextInput
                  value={content}
                  multiline
                  placeholder='  내용을 입력해주세요.'
                  style={[styles.inputContent]}
                  onChangeText={text => handleOnChangeText(text, 'content')}
              />
              <View style={styles.btnContainer}>
              <RoundIconBtn
                  size={15}
                  antIconName='check'
                  onPress={handleSubmit}
              />
              {title.trim() || content.trim() ? (
              <RoundIconBtn
                    size={15}
                    style={{ marginLeft: 15 }}
                   antIconName='close'
                   onPress={closeModal}
               />
               ) : null}
            </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
            <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',  
    },

    inputTitle: {
        width: '90%',
        borderWidth: 1,
        borderColor:'#cccccc',
        borderRadius: 4,
        fontSize: 16,
        height: 40,
        marginBottom: 15,
        fontWeight: 'bold',
    },

    inputContent: {
        width: '90%',
        height: 200,
        borderWidth: 1,
        borderColor:'#cccccc',
        borderRadius: 4,
        fontSize: 16,  
    },
  
    modalBG: {
        flex: 1,
        zIndex: -1,
    },

    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
    },
});

export default DiaryInputModal;