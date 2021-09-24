import { Image, Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { images } from '../images';
import DiaryIconBtn from './DiaryIconBtn';
import DateChanger from './DateChanger';

const resetTimestampHours = (timestamp) => {
    var newDate = new Date(+timestamp)
    return newDate.setHours(0,0,0,0);
}

const DiaryInputModal = ({ visible, onClose, onSubmit, diary, isEdit }) => {
    const [currentDate, setCurrentDate] = useState(new Date(resetTimestampHours(Date.now())));
    const [emoji, setEmoji] = useState('');
    const [emojiName, setEmojiName] = useState('')
    const [category, setCategory] = useState('')
    const [color, setColor] = useState('')
    const [content, setContent] = useState('');

    const display = emoji == ''? true: false;

    useEffect(() => {}, [display]); 
 
    const handleModalClose = () => {
        Keyboard.dismiss();
    };

    useEffect(() => {
        if (isEdit) {
            setEmoji(diary.emoji);
            setContent(diary.content);
            setEmojiName(diary.emojiName);
            setCategory(diary.category);
            setColor(diary.color);
        }
    }, [isEdit]);


    const handleSubmit = () => {
        if (!content.trim())  // 아무것도 입력 안했을 시 체크버튼 = modal 닫기
            return onClose();

        if (isEdit) {
            onSubmit({emoji, content, emojiName, category, color});
        } 
        else {
            onSubmit({emoji, content, emojiName, category, color});
            setEmoji('');
            setContent('');
        }
        onClose();
    };

    const closeModal = () => {
        if (!isEdit) {
            setEmoji('');
            setContent('');
            setEmojiName('');
            setCategory('');
            setColor('');
        }
        onClose();
    };

    const handleEmojiChange = (emoji, emojiName, category, color) => {
        setEmoji(emoji);
        setEmojiName(emojiName);
        setCategory(category);
        setColor(color);
    };


    return (
    <>  
    <Modal visible={visible} animationType='fade'>
       <KeyboardAwareScrollView> 
            <View style={styles.container}>
                <Text style = {styles.headerText}> 지금 나의 기분은 </Text>
                <DateChanger
                    date = {currentDate}
                    mode = {"date"}
                    onDateChange = {(d) => {setCurrentDate(d);}}
                />
                {/* ----- border 지정 때문에 하나하나 설정  ----- */}
                <View style = {styles.rowContainer}>
                    <View style = {styles.columnContainer}>
                        <TouchableOpacity  // 매우 좋음 
                            onPress = {async() => {handleEmojiChange(images.verygood, '매우 좋음', '매우 좋음', '#54b492')}}
                            style = {[styles.emojiBorder, emoji == images.verygood && {borderColor: '#54b492'}]}
                        >
                            <Image source = {images.verygood} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 매우 좋음 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {handleEmojiChange(images.happy, '행복해요', '매우 좋음', '#54b492')}}
                            style = {[styles.emojiBorder, emoji == images.happy && {borderColor: '#54b492'}]}
                        >
                            <Image source = {images.happy} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 행복해요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {handleEmojiChange(images.pleased, '기뻐요', '매우 좋음', '#54b492')}}
                            style = {[styles.emojiBorder, emoji == images.pleased && {borderColor: '#54b492'}]}
                        >
                            <Image source = {images.pleased} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 기뻐요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {handleEmojiChange(images.fantastic, '끝내줘요', '매우 좋음', '#54b492')}}
                            style = {[styles.emojiBorder, emoji == images.fantastic && {borderColor: '#54b492'}]}
                        >
                            <Image source = {images.fantastic} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 끝내줘요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {handleEmojiChange(images.great, '최고에요', '매우 좋음', '#54b492')}}
                            style = {[styles.emojiBorder, emoji == images.great && {borderColor: '#54b492'}]}
                        >
                            <Image source = {images.great} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 최고예요 </Text>
                        </TouchableOpacity>                   
                    </View>


                    <View style = {styles.columnContainer}>
                        <TouchableOpacity  // 좋음 
                            onPress = {async() => {handleEmojiChange(images.good, '좋음', '좋음', '#8dbe41')}}
                            style = {[styles.emojiBorder, emoji == images.good && {borderColor: '#8dbe41'}]}
                        >
                            <Image source = {images.good} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 좋음 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {handleEmojiChange(images.pound, '설레요', '좋음', '#8dbe41')}}
                            style = {[styles.emojiBorder, emoji == images.pound && {borderColor: '#8dbe41'}]}
                        >
                            <Image source = {images.pound} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 설레요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {handleEmojiChange(images.comfortable, '편안해요', '좋음', '#8dbe41')}}
                            style = {[styles.emojiBorder, emoji == images.comfortable && {borderColor: '#8dbe41'}]}
                        >
                            <Image source = {images.comfortable} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 편안해요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {handleEmojiChange(images.fun, '즐거워요', '좋음', '#8dbe41')}}
                            style = {[styles.emojiBorder, emoji == images.fun && {borderColor: '#8dbe41'}]}
                        >
                            <Image source = {images.fun} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 즐거워요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {handleEmojiChange(images.excited, '신나요', '좋음', '#8dbe41')}}
                            style = {[styles.emojiBorder, emoji == images.excited && {borderColor: '#8dbe41'}]}
                        >
                            <Image source = {images.excited} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 신나요 </Text>
                        </TouchableOpacity>  
                    </View>


                    <View style = {styles.columnContainer}>
                        <TouchableOpacity  // 보통
                            onPress = {async() => {handleEmojiChange(images.normal, '보통', '보통', '#64a1d0')}}
                            style = {[styles.emojiBorder, emoji == images.normal && {borderColor: '#64a1d0'}]}
                        >
                            <Image source = {images.normal} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 보통 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {handleEmojiChange(images.boring, '심심해요', '보통', '#64a1d0')}}
                            style = {[styles.emojiBorder, emoji == images.boring && {borderColor: '#64a1d0'}]}
                        >
                            <Image source = {images.boring} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 심심해요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {handleEmojiChange(images.awkward, '당황스러워요', '보통', '#64a1d0')}}
                            style = {[styles.emojiBorder, emoji == images.awkward && {borderColor: '#64a1d0'}]}
                        >
                            <Image source = {images.awkward} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 당황스러워요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {handleEmojiChange(images.dontknow, '모르겠어요', '보통', '#64a1d0')}}
                            style = {[styles.emojiBorder, emoji == images.dontknow && {borderColor: '#64a1d0'}]}
                        >
                            <Image source = {images.dontknow} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 모르겠어요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {handleEmojiChange(images.umm, '묘해요', '보통', '#64a1d0')}}
                            style = {[styles.emojiBorder, emoji == images.umm && {borderColor: '#64a1d0'}]}
                        >
                            <Image source = {images.umm} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 묘해요 </Text>
                        </TouchableOpacity>  
                    </View>


                    <View style = {styles.columnContainer}>
                        <TouchableOpacity  // 나쁨
                            onPress = {async() => {handleEmojiChange(images.bad, '나쁨', '나쁨', '#e8913c')}}
                            style = {[styles.emojiBorder, emoji == images.bad && {borderColor: '#e8913c'}]}
                        >
                            <Image source = {images.bad} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 나쁨 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {handleEmojiChange(images.frown, '언짢아요', '나쁨', '#e8913c')}}
                            style = {[styles.emojiBorder, emoji == images.frown && {borderColor: '#e8913c'}]}
                        >
                            <Image source = {images.frown} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 언짢아요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {handleEmojiChange(images.uncomfortable, '불편해요', '나쁨', '#e8913c')}}
                            style = {[styles.emojiBorder, emoji == images.uncomfortable && {borderColor: '#e8913c'}]}
                        >
                            <Image source = {images.uncomfortable} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 블편해요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {handleEmojiChange(images.blue, '우울해요', '나쁨', '#e8913c')}}
                            style = {[styles.emojiBorder, emoji == images.blue && {borderColor: '#e8913c'}]}
                        >
                            <Image source = {images.blue} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 우울해요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {handleEmojiChange(images.annoyed, '짜증나요', '나쁨', '#e8913c')}}
                            style = {[styles.emojiBorder, emoji == images.annoyed && {borderColor: '#e8913c'}]}
                        >
                            <Image source = {images.annoyed} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 짜증나요 </Text>
                        </TouchableOpacity>  
                    </View>



                    <View style = {styles.columnContainer}>
                       <TouchableOpacity  // 매우 나쁨
                            onPress = {async() => {handleEmojiChange(images.verybad, '매우 나쁨', '매우 나쁨', '#dc3439')}}
                            style = {[styles.emojiBorder, emoji == images.verybad && {borderColor: '#dc3439'}]}
                        >
                            <Image source = {images.verybad} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 매우 나쁨 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {handleEmojiChange(images.terrible, '끔찍해요', '매우 나쁨', '#dc3439')}}
                            style = {[styles.emojiBorder, emoji == images.terrible && {borderColor: '#dc3439'}]}
                        >
                            <Image source = {images.terrible} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 끔찍해요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {handleEmojiChange(images.gross, '역겨워요', '매우 나쁨', '#dc3439')}}
                            style = {[styles.emojiBorder, emoji == images.gross && {borderColor: '#dc3439'}]}
                        >
                            <Image source = {images.gross} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 역겨워요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {handleEmojiChange(images.sad, '슬퍼요', '매우 나쁨', '#dc3439')}}
                            style = {[styles.emojiBorder, emoji == images.sad && {borderColor: '#dc3439'}]}
                        >
                            <Image source = {images.sad} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 슬퍼요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {handleEmojiChange(images.angry, '화나요', '매우 나쁨', '#dc3439')}}
                            style = {[styles.emojiBorder, emoji == images.angry && {borderColor: '#dc3439'}]}
                        >
                            <Image source = {images.angry} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 화나요 </Text>
                        </TouchableOpacity>  
                    </View>
                </View>
            

                <View style={[styles.inputContent]}>
                    <TextInput
                        value={content}
                        placeholder='내용을 입력해주세요.'
                        placeholderTextColor = '#bebebe'
                        textAlignVertical ='top' 
                        returnKeyType = 'done'
                        //multiline={true} // 일기 내용작성 시 return button 줄바꿈 가능 
                        style={styles.contentText}
                        onChangeText={text => setContent(text)}
                    />
                </View>

                <View style={styles.btnContainer}>
                    <DiaryIconBtn
                        size = {15}
                        antIconName = 'check'
                        onPress = {handleSubmit}
                    />

                {content.trim() ? (
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

const category_2 = [ images.good, images.pound, images.comfortable, images.fun, images.excited ];
const category_3 = [ images.normal, images.boring, images.awkward, images.dontknow, images.umm ];
const category_4 = [ images.bad, images.frown, images.uncomfortable, images.blue, images.annoyed ];
const category_5 = [ images.verybad, images.terrible, images.gross, images.sad, images.angry ];

const emojiName_1 = ['매우 좋음', '행복해요', '기뻐요', '끝내줘요', '최고예요'];
const emojiName_2 = ['좋음', '설레요', '편안해요', '즐거워요', '신나요'];
const emojiName_3 = ['보통', '심심해요', '당황스러원요', '모르곘어요', '묘해요'];
const emojiName_4 = ['나쁨', '언짢아요', '불편해요', '우울해요', '짜증나요'];
const emojiName_5 = ['매우 나쁨', '끔찍해요', '역겨워요', '슬퍼요', '화나요'];

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

    emojiBorder: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'transparent',
        alignItems: 'center'
    },

    emoji: {
        width: 50,
        height: 50,
        marginHorizontal: 5,
        marginTop: 5
    },

    emojiText: {
        fontSize: 11,
        //color: SetColor(),
        textAlign: 'center',
    },

    inputContent: {
        width: '90%',
        height: 150,
        borderWidth: 1,
        borderColor:'#cccccc',
        borderRadius: 4,
        fontSize: 16,  
    },

    contentText: {
        marginLeft: 20, 
        marginTop: 20,
        fontSize: 16

    },
  
    modalBG: {
        flex: 1,
        zIndex: -1,
    },

    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
        marginBottom: 100
    },
});

export default DiaryInputModal;