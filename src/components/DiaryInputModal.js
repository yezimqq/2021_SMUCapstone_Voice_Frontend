import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Modal, TextInput, TouchableWithoutFeedback, Keyboard, Text, Image, TouchableOpacity } from 'react-native';
import DiaryIconBtn from './DiaryIconBtn';
import { images } from '../images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const DiaryInputModal = ({ visible, onClose, onSubmit, diary, isEdit }) => {
    const [emoji, setEmoji] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    
    
    const handleModalClose = () => {
        Keyboard.dismiss();
    };

    useEffect(() => {
        if (isEdit) {
            setEmoji(diary.emoji);
            setTitle(diary.title);
            setContent(diary.content);
        }
    }, [isEdit]);


    const handleSubmit = () => {
        if (!title.trim() && !content.trim())  // 아무것도 입력 안했을 시 체크버튼 = modal 닫기
            return onClose();

        if (isEdit) {
            onSubmit(emoji, title, content, Date.now());
        } 
        else {
            onSubmit(emoji, title, content);
            setEmoji('');
            setTitle('');
            setContent('');
        }
        onClose();
    };

    const closeModal = () => {
        if (!isEdit) {
            setEmoji('');
            setTitle('');
            setContent('');
        }
        onClose();
    };

    return (
    <>  
    <Modal visible={visible} animationType='fade'>
    <KeyboardAwareScrollView> 
        <View style={styles.container}>
            <Text style = {styles.headerText}> 지금 나의 기분은 </Text>
         
            <View style = {styles.rowContainer}>
           
                <View style = {styles.columnContainer}>
                    {category_1.map((emojiOption, i) => (
                        <TouchableOpacity  onPress = {() => {setEmoji(emojiOption)}}>
                            <Image
                                key = {i}
                                source = {emojiOption}
                                style = {styles.emoji}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                <View style = {styles.columnContainer}>
                    {category_2.map((emojiOption, i) => (
                        <TouchableOpacity  onPress = {() => {setEmoji(emojiOption)}}>
                            <Image
                                key = {i}
                                source = {emojiOption}
                                style = {styles.emoji}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                <View style = {styles.columnContainer}>
                    {category_3.map((emojiOption, i) => (
                        <TouchableOpacity  onPress = {() => {setEmoji(emojiOption)}}>
                            <Image
                                key = {i}
                                source = {emojiOption}
                                style = {styles.emoji}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                <View style = {styles.columnContainer}>
                    {category_4.map((emojiOption, i) => (
                        <TouchableOpacity  onPress = {() => {setEmoji(emojiOption)}}>
                            <Image
                                key = {i}
                                source = {emojiOption}
                                style = {styles.emoji}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                <View style = {styles.columnContainer}>
                    {category_5.map((emojiOption, i) => (
                        <TouchableOpacity  onPress = {() => {setEmoji(emojiOption)}}>
                            <Image
                                key = {i}
                                source = {emojiOption}
                                style = {styles.emoji}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
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

        </KeyboardAwareScrollView>
    </Modal>
    </>
  );
};

/* ----- 매우 좋음(1), 좋음(2), 보통(3), 나쁨(4), 매우 나쁨(5) 카테고리 ----- */ 
const category_1 = [ images.verygood, images.happy, images.pleased, images.fantastic, images.great ]; 
const category_2 = [ images.good, images.pound, images.comfortable, images.fun, images.excited ];
const category_3 = [ images.normal, images.boring, images.awkward, images.dontknow, images.umm ];
const category_4 = [ images.bad, images.frown, images.uncomfortable, images.blue, images.annoyed ];
const category_5 = [ images.verybad, images.terrible, images.gross, images.sad, images.angry ];


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
        marginTop: 100,
        marginBottom: 10,
    },

    rowContainer: {
        flexDirection: 'row',
        alignContent: 'space-between',
        marginVertical: 5,
    },

    columnContainer: {
        flexDirection: 'column',
        alignContent: 'space-between',
        marginVertical: 5,
    },

    emoji: {
        width: 50,
        height: 50,
        marginHorizontal: 5,
        marginTop: 10,
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