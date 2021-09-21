import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Modal, TextInput, TouchableWithoutFeedback, Keyboard, Text, Image, TouchableOpacity } from 'react-native';
import DiaryIconBtn from './DiaryIconBtn';
import { images } from '../images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const DiaryInputModal = ({ visible, onClose, onSubmit, diary, isEdit }) => {
    const [emoji, setEmoji] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const display = emoji == ''? true: false;

    useEffect(() => {}, [display]); 
 
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
                {/* ----- border 지정 때문에 하나하나 설정  ----- */}
                <View style = {styles.rowContainer}>
                    <View style = {styles.columnContainer}>
                        <TouchableOpacity  // 매우 좋음 
                            onPress = {async() => {setEmoji(images.verygood)}}
                            style = {[styles.emojiBorder, emoji == images.verygood && {borderColor: '#54b492'}]}
                        >
                            <Image source = {images.verygood} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 매우 좋음 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {setEmoji(images.happy)}}
                            style = {[styles.emojiBorder, emoji == images.happy && {borderColor: '#54b492'}]}
                        >
                            <Image source = {images.happy} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 행복해요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {setEmoji(images.pleased)}}
                            style = {[styles.emojiBorder, emoji == images.pleased && {borderColor: '#54b492'}]}
                        >
                            <Image source = {images.pleased} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 기뻐요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {setEmoji(images.fantastic)}}
                            style = {[styles.emojiBorder, emoji == images.fantastic && {borderColor: '#54b492'}]}
                        >
                            <Image source = {images.fantastic} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 끝내줘요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {setEmoji(images.great)}}
                            style = {[styles.emojiBorder, emoji == images.great && {borderColor: '#54b492'}]}
                        >
                            <Image source = {images.great} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 최고예요 </Text>
                        </TouchableOpacity>                   
                    </View>


                    <View style = {styles.columnContainer}>
                        <TouchableOpacity  // 좋음 
                            onPress = {async() => {setEmoji(images.good)}}
                            style = {[styles.emojiBorder, emoji == images.good && {borderColor: '#8dbe41'}]}
                        >
                            <Image source = {images.good} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 좋음 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {setEmoji(images.pound)}}
                            style = {[styles.emojiBorder, emoji == images.pound && {borderColor: '#8dbe41'}]}
                        >
                            <Image source = {images.pound} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 설레요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {setEmoji(images.comfortable)}}
                            style = {[styles.emojiBorder, emoji == images.comfortable && {borderColor: '#8dbe41'}]}
                        >
                            <Image source = {images.comfortable} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 편안해요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {setEmoji(images.fun)}}
                            style = {[styles.emojiBorder, emoji == images.fun && {borderColor: '#8dbe41'}]}
                        >
                            <Image source = {images.fun} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 즐거워요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {setEmoji(images.excited)}}
                            style = {[styles.emojiBorder, emoji == images.excited && {borderColor: '#8dbe41'}]}
                        >
                            <Image source = {images.excited} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 신나요 </Text>
                        </TouchableOpacity>  
                    </View>


                    <View style = {styles.columnContainer}>
                        <TouchableOpacity  // 보통
                            onPress = {async() => {setEmoji(images.normal)}}
                            style = {[styles.emojiBorder, emoji == images.normal && {borderColor: '#64a1d0'}]}
                        >
                            <Image source = {images.normal} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 보통 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {setEmoji(images.boring)}}
                            style = {[styles.emojiBorder, emoji == images.boring && {borderColor: '#64a1d0'}]}
                        >
                            <Image source = {images.boring} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 심심해요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {setEmoji(images.awkward)}}
                            style = {[styles.emojiBorder, emoji == images.awkward && {borderColor: '#64a1d0'}]}
                        >
                            <Image source = {images.awkward} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 당황스러워요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {setEmoji(images.dontknow)}}
                            style = {[styles.emojiBorder, emoji == images.dontknow && {borderColor: '#64a1d0'}]}
                        >
                            <Image source = {images.dontknow} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 모르겠어요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {setEmoji(images.umm)}}
                            style = {[styles.emojiBorder, emoji == images.umm && {borderColor: '#64a1d0'}]}
                        >
                            <Image source = {images.umm} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 묘해요 </Text>
                        </TouchableOpacity>  
                    </View>


                    <View style = {styles.columnContainer}>
                        <TouchableOpacity  // 나쁨
                            onPress = {async() => {setEmoji(images.bad)}}
                            style = {[styles.emojiBorder, emoji == images.bad && {borderColor: '#e8913c'}]}
                        >
                            <Image source = {images.bad} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 나쁨 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {setEmoji(images.frown)}}
                            style = {[styles.emojiBorder, emoji == images.frown && {borderColor: '#e8913c'}]}
                        >
                            <Image source = {images.frown} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 언짢아요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {setEmoji(images.uncomfortable)}}
                            style = {[styles.emojiBorder, emoji == images.uncomfortable && {borderColor: '#e8913c'}]}
                        >
                            <Image source = {images.uncomfortable} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 블편해요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {setEmoji(images.blue)}}
                            style = {[styles.emojiBorder, emoji == images.blue && {borderColor: '#e8913c'}]}
                        >
                            <Image source = {images.blue} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 우울해요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {setEmoji(images.annoyed)}}
                            style = {[styles.emojiBorder, emoji == images.annoyed && {borderColor: '#e8913c'}]}
                        >
                            <Image source = {images.annoyed} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 짜증나요 </Text>
                        </TouchableOpacity>  
                    </View>



                    <View style = {styles.columnContainer}>
                       <TouchableOpacity  // 매우 나쁨
                            onPress = {async() => {setEmoji(images.verybad)}}
                            style = {[styles.emojiBorder, emoji == images.verybad && {borderColor: '#dc3439'}]}
                        >
                            <Image source = {images.verybad} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 매우 나쁨 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {setEmoji(images.terrible)}}
                            style = {[styles.emojiBorder, emoji == images.terrible && {borderColor: '#dc3439'}]}
                        >
                            <Image source = {images.terrible} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 끔찍해요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {setEmoji(images.gross)}}
                            style = {[styles.emojiBorder, emoji == images.gross && {borderColor: '#dc3439'}]}
                        >
                            <Image source = {images.gross} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 역겨워요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {setEmoji(images.sad)}}
                            style = {[styles.emojiBorder, emoji == images.sad && {borderColor: '#dc3439'}]}
                        >
                            <Image source = {images.sad} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 슬퍼요 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {async() => {setEmoji(images.angry)}}
                            style = {[styles.emojiBorder, emoji == images.angry && {borderColor: '#dc3439'}]}
                        >
                            <Image source = {images.angry} style = {styles.emoji} />
                            <Text style = {styles.emojiText}> 화나요 </Text>
                        </TouchableOpacity>  
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

/* 매우 좋음(1), 좋음(2), 보통(3), 나쁨(4), 매우 나쁨(5) 카테고리, 이모지이름  
   => map() function 쓴다면 사용! but, border는 사용 불가          
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
*/ 

const category_1 = [ images.verygood, images.happy, images.pleased, images.fantastic, images.great ]; 
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
        marginBottom: 100
    },
});

export default DiaryInputModal;