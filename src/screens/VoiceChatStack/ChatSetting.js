import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, Alert, Image, TouchableOpacity, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createChannel } from '../../../utils/firebase';

const ChatSetting = ({ navigation }) => {
    //const [id, setId] = useState();
    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [mode, setMode] = useState('unformal');
    const [voice, setVoice] = useState();

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('먼저 카메라 접근을 허용해주세요');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    
    const _handleSaveButton = () => {
        
        if (!image) {
            Alert.alert('','이미지를 선택해주세요.');
            return;
        }
        if (!name) {
            Alert.alert('','이름을 입력해주세요.');
            return;
        }
        
        //await 관련 검색해서 나온 내용 보고 참고한거
        async function fetchSettingStatus() {
            const response = await fetch("http://13.124.78.167:8080/chat/chatBot", {
                method: "POST",
                headers: { 
                    "Authorization" : await AsyncStorage.getItem('Authorization'),
                    "Content-Type" : "application/json",

                },

                //서버에서 id받아와서 지정 해야함 (imageFieldId: 1, modeId: 1 or 2, name: 중복 불가)
                body: JSON.stringify({
                    imageFiledId: 1,
                    modeId: 2,
                    name: name,
                    voiceId: 3,
                }),
            });

            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }
            
            const res = await response.json();
            return res;
        }

        fetchSettingStatus().then(async res => {
            console.log("res: ", res);
            const id = await createChannel({ image, name });
            navigation.replace('Chat', { id, name });
        })       
    }
    

    return (
        <View style = {styles.container}>   
            
            <TouchableOpacity onPress={pickImage} style={[styles.profileContainer, styles.profile]}>
                {image && <Image source={{ uri: image }} style={styles.profile} />}
            </TouchableOpacity>

            <View style={styles.inputContainer} >
                <TextInput
                    style={styles.inputText}
                    placeholder="이름"
                    placeholderTextColor="#bebebe"
                    onChangeText={text => setName(text)}
                />
            </View>
            
            <View style={styles.radioContainer}>
                <RadioButton
                    value='unformal'
                    status={mode === 'unformal' ? 'checked' : 'unchecked'}
                    onPress={() => setMode('unformal')}
                />
                <Text style={styles.radioText}>반말</Text>
                <RadioButton
                    value='formal'
                    status={mode === 'formal' ? 'checked' : 'unchecked'}
                    onPress={() => setMode('formal')}
                />
                <Text style={styles.radioText}>존댓말</Text>
            </View>

            <TouchableOpacity 
                style={styles.audioBtn}
                onPress = {() => navigation.navigate('AudioStorage')}>
                <Text style={styles.btnText}>음성 불러오기</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.audioBtn, styles.saveBtn]}
                onPress={_handleSaveButton}>
                <Text style={styles.btnText}>저장</Text>
            </TouchableOpacity>
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

    profileContainer: {
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        marginBottom: 10,
    },

    profile: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },

    profileText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#666666',
        textAlign: 'center', 
    },

    inputContainer: {
        width: "80%",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor:'#cccccc',
        borderRadius: 4,
        height: 50,
        margin: 20,
        justifyContent: "center",
        padding: 20,
    },

    inputText: {
        height: 50,
        color: "black"
    },

    radioContainer: {
        width: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 100,
    },

    radioText: {
        fontSize: 16,
    },

    audioBtn: {
        width: "80%",
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor:'black',
        borderRadius: 4,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 2,
        shadowOffset: {width:2, height:2}
    },

    saveBtn: {
        backgroundColor: "#ed847a",
    },

    btnText: {
        fontSize: 20,
    },
});

export default ChatSetting;
