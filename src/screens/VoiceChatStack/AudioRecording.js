import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native'; 
import Icon from 'react-native-vector-icons/Ionicons';
import { images } from '../../images';

import { Audio } from 'expo-av';

// 기능 추가는 아직 안하고, 모든 버튼 alert로 작동만 확인
const AudioRecording = ({ navigation }) => {
    const [helpText, setHelpText] = useState('녹음 시작 버튼을 누르고 아래의 문장을 소리내어 읽어주세요.');
    const [recordBtn, setRecordBtn] = useState('');
    const [recording, setRecording] = React.useState();

  /*async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('녹음 시작');
      const { recording } = await Audio.Recording.createAsync(
         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('녹음 중');
    } catch (err) {
      console.error('녹음 실패', err);
    }
  }

  async function stopRecording() {
    console.log('녹음 중지');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    console.log('녹음 종료 및 저장', uri);
  } */

    return (
        <View style = {styles.container}>
            <View style = {styles.helpBox}>
                <Text style = {styles.helpText}>{helpText}</Text>
            </View>

            <View style = {styles.containerTop}> 
                <Image
                    source = {images.ear}
                    style = {styles.earImage}
                 />
                 <TouchableOpacity
                     style = {styles.listenBtn}
                     onPress = {() => alert('듣기')}>
                    <Icon
                        name = 'play-circle-outline'
                        size = {30}
                        style = {{marginRight: 10}}
                    />
                    <Text style = {styles.btnText}>듣기</Text>
                </TouchableOpacity>
            </View>

            <View style ={styles.textBox} />

            <View style = {styles.containerBottom}>
                <View style = {styles.align}>
                    <TouchableOpacity>
                        <Icon
                            name = 'chevron-back-circle-outline'
                            size = {35}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style = {styles.recordingBtn}
                        onPress = {() => {
                            setRecordBtn('녹음 중지');}}>
                        <Image 
                            source = {images.recording}
                            style = {styles.imageIcon}
                        />               
                        <Text style = {styles.btnText}>{recording ? '녹음 중지' : '녹음 시작'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon
                            name = 'chevron-forward-circle-outline'
                            size = {35}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.finBtn}>
                    <Text 
                        style={styles.btnText}
                        onPress = {() => navigation.navigate('AudioStorage')}>녹음 종료</Text>
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

    helpBox: {
        flex: 1,
        width: '100%',
        height: 45,
        position: 'absolute',
        top: 0,
        borderWidth: 1,
        borderColor: '#bebebe',
        alignItems: 'center',
        justifyContent: 'center',
    },

    containerTop: {
        flex: 2,
        marginTop: 60,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },


    containerBottom: {
        flex: 2.5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    
    helpText: {
        fontSize: 14,
        textAlign: 'center',
    },

    earImage: {
        width: 140,
        height: 100,    
        flexDirection: 'row',
    },

    listenBtn: {
        width:120,
        margin: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor:'black',
        borderRadius: 4,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 2,
        shadowOffset: {width:2, height:2},
        flexDirection: 'row',
    },

    // 녹음 텍스트박스
    textBox: {
        flex: 4,
        width: '90%',
        height: '100%',
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center'

    },

    align: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 90,
    },

    recordingBtn: {
        width:150,
        margin: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor:'black',
        borderRadius: 4,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 2,
        shadowOffset: {width:2, height:2},
        flexDirection: 'row',

    },

    imageIcon: {
        width: 30,
        height: 30,
        marginRight: 5,
    },

    finBtn: {
        position: 'absolute',
        bottom: '3%',
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
});

export default AudioRecording;