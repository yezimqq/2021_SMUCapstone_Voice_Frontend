import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Modal, TextInput, TouchableWithoutFeedback, Keyboard, Text, Image } from 'react-native';
import DiaryIconBtn from './DiaryIconBtn';
import { images } from '../images';


const DiaryInputModal = ({ visible, onClose, onSubmit, diary, isEdit }) => {
    const [emoji, setEmoji] = useState('');
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


    const handleSubmit = () => {
        if (!title.trim() && !content.trim())  // 아무것도 입력 안했을 시 
            return onClose();

        if (isEdit) {
            onSubmit(title, content, Date.now());
        } 
        else {
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
            <Text style = {styles.headerText}> 지금 나의 기분은 </Text>
            <View style = {styles.rowContainer}>
                {emojiIcon.map((emojiOption, i) => (
                    <Image
                       key = {i}
                       source = {emojiOption}
                       style = {styles.emoji}
                       onPress = {() => {
                           setEmoji(emojiOption);
                       }}
                    />
                ))}
            </View>

            <View style={[styles.inputTitle]}>
              <TextInput
                  value={title}
                  onChangeText={text => setTitle(text)}
                  placeholder='제목을 입력해주세요.'
                  placeholderTextColor = '#bebebe'
                  returnKeyType = 'next'
                  style={{marginLeft: 10}}
              />
            </View>
            <View style={[styles.inputContent]}>
              <TextInput
                  value={content}
                  placeholder='내용을 입력해주세요.'
                  placeholderTextColor = '#bebebe'
                  textAlignVertical ='top' 
                  multiline={true} // 일기 내용작성 시 return button 줄바꿈 가능
                  style={{marginLeft: 10}}
                  onChangeText={text => setContent(text)}
              />
            </View>
              <View style={styles.btnContainer}>
              <DiaryIconBtn
                  size = {15}
                  antIconName = 'check'
                  onPress = {handleSubmit}
              />
              {title.trim() || content.trim() ? (
              <DiaryIconBtn
                  size = {15}
                  style = {{ marginLeft: 15 }}
                  antIconName = 'close'
                  onPress = {closeModal}
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

const emojiIcon = [ 
    images.verygood, 
    images.good, 
    images.normal, 
    images.bad, 
    images.verybad, 
];


/*const SetColor = ({ emoji }) => {
    if (emoji == images.verygood || images.happy || images.pleased || images.fantastic || images.great)
        return '#54b492';
    else if (emoji == images.good || images.pound || images.comfortable || images.fun || images.excited)
        return '#8dbe41';
    else if (emoji == images.normal || images.boring || images.awkward || images.dontknow || images.umm)
        return '#64a1d0';
    else if (emoji == images.bad || images.frown || images.uncomfortable || images.blue || images.annoyed)
        return '#e8913c';
    else if (emoji == images.verybad || images.terrible || images.gross || images.sad || images.angry)
        return '#dc3439';
};*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',  
    },

    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    rowContainer: {
        flexDirection: 'row',
        alignContent: 'space-between',
        marginVertical: 5,
    },

    emoji: {
        width: 50,
        height: 50,
        marginHorizontal: 1,
        marginRight: 5,
        marginLeft: 5,
    },

    emojiText: {
        fontSize: 11,
        //color: SetColor(),
        textAlign: 'center',
    },

    inputTitle: {
        width: '90%',
        borderWidth: 1,
        borderColor:'#cccccc',
        borderRadius: 4,
        fontSize: 16,
        height: 40,
        marginTop: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        justifyContent: 'center'
    },

    inputContent: {
        width: '90%',
        height: 150,
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