import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'; 
import { images } from '../../images';

const Emoji = ({ source, text }) => {
    return (
        <TouchableOpacity onPress={() => {}}>
            <Image source={source} style={styles.emoji} />
            <Text style={styles.emojiText}>{text}</Text>
        </TouchableOpacity>
    );
};

const DiarySetting = () => {
    return (
        <View style = {styles.container}>
            <Text style={styles.title}>감정을 선택하세요.</Text>
            <Text style={styles.subtitle}>이모지를 탭하면 선택됩니다.</Text>
            <View style={styles.rowContainer}>
                <Emoji source={images.verygood} text="매우 좋음" />
                <Emoji source={images.good} text="좋음" />
                <Emoji source={images.normal} text="보통" />
                <Emoji source={images.bad} text="나쁨" />
                <Emoji source={images.verybad} text="매우 나쁨" />
            </View>
            <View style={styles.rowContainer}>
                <Emoji source={images.happy} text="행복해요" />
                <Emoji source={images.pound} text="설레요" />
                <Emoji source={images.boring} text="심심해요" />
                <Emoji source={images.frown} text="언짢아요" />
                <Emoji source={images.terrible} text="끔찍해요" />
            </View>
            <View style={styles.rowContainer}>
                <Emoji source={images.pleased} text="기뻐요" />
                <Emoji source={images.comfortable} text="편안해요" />
                <Emoji source={images.awkward} text="당황스러워요" />
                <Emoji source={images.uncomfortable} text="불편해요" />
                <Emoji source={images.gross} text="역겨워요" />
            </View>
            <View style={styles.rowContainer}>
                <Emoji source={images.fantastic} text="환상적이에요" />
                <Emoji source={images.fun} text="즐거워요" />
                <Emoji source={images.dontknow} text="모르겠어요" />
                <Emoji source={images.blue} text="우울해요" />
                <Emoji source={images.sad} text="슬퍼요" />
            </View>
            <View style={styles.rowContainer}>
                <Emoji source={images.great} text="최고예요" />
                <Emoji source={images.excited} text="신나요" />
                <Emoji source={images.umm} text="묘해요" />
                <Emoji source={images.annoyed} text="짜증나요" />
                <Emoji source={images.angry} text="화나요" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },

    rowContainer: {
        flexDirection: 'row',
        alignContent: 'space-between',
        marginVertical: 5,
    },

    emoji: {
        width: 75,
        height: 75,
        marginHorizontal: 1,
    },

    emojiText: {
        fontSize: 12,
        //color: SetColor(),
        textAlign: 'center',
    },

    title: {
        fontSize: 22,
        marginBottom: 3,
    },

    subtitle: {
        fontSize: 14,
        color: '#999999',
        marginBottom: 3,
    }


    
});

export default DiarySetting;