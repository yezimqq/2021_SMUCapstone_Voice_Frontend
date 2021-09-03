import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'; 
import Icon from 'react-native-vector-icons/AntDesign';
import TabIcon from 'react-native-vector-icons/Foundation'


const AudioStorage = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress = {() => alert('폴더 생성')}
                >
                <Icon
                    name = 'addfolder'
                    size = {30}
                    color = 'white'
                    style = {styles.headerIcon}
                />
                </TouchableOpacity>
            ),
        });
    });
    return (
        <View style = {styles.container}>
            <Text>음성 저장소</Text>
            <TouchableOpacity style={styles.trainBtn}>
                <Text 
                    style={styles.btnText}
                    onPress = {() => alert('음성 학습하기')}>음성 학습하기</Text>
            </TouchableOpacity>
            <View style = {styles.tab}>
                <TouchableOpacity 
                    style={styles.tabContainer} 
                    onPress={() => alert('음성파일 업로드')}>
                    <TabIcon
                        name = 'upload'
                        size = {30}
                        color = 'black'
                    />
                    <Text style={styles.tabText}>음성파일 업로드</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.tabContainer} 
                    onPress={() => navigation.navigate('AudioRecording')}>
                    <TabIcon
                        name = 'microphone'
                        size = {30}
                        color = 'black'
                    />
                    <Text style={styles.tabText}>음성 녹음하기</Text>
                </TouchableOpacity>
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

    headerIcon: {
        marginRight: 10,
    },

    trainBtn: {
        position: 'absolute',
        bottom: '10%',
        width: "80%",
        backgroundColor: "#ed847a",
        borderWidth: 1,
        borderColor:'black',
        borderRadius: 4,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 15,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 2,
        shadowOffset: {width:2, height:2}
    },

    btnText: {
        fontSize: 18,
        color: "black",
    },

    tabContainer: {
        height: 55,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#efefef',
        borderColor: '#bebebe',
        borderWidth: 1,
    },

    tabText: {
        color: '#5e5e5e',
        fontSize: 12,
        textAlign: 'center',
    },

    tab: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
    }
});

export default AudioStorage;