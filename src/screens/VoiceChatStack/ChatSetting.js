import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, Alert, Image, TouchableOpacity, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatSetting = ({ navigation }) => {
    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [mode, setMode] = useState('formal');
    
    const [modeId, setModeId] = useState(1); 
    const [imageFileId, setImageFileId] = useState();

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('먼저 카메라 접근을 허용해주세요');
                }
            }
        })();

        
    }, [imageFileId]);

    //Image Picker
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
        console.log("이미지 피커 결과\n", result);
        
        //API에 업로드하기 위한 body 형태로 변경
        const fileURL = result.uri;
        const fileName = fileURL.replace("file:///data/user/0/host.exp.exponent/cache/ExperienceData/UNVERIFIED-192.168.219.118-psycology_consult/ImagePicker/","");
        const fileType = "image/jpg";
        const file = {
            uri: fileURL,
            name: fileName,
            type: fileType,
        }
        const body = new FormData();
        body.append('file', file)

        _fileUpload(body)
    };

    //전달 받은 body(파일)를 API에 업로드
    const _fileUpload = (body) => {
        async function PostUploadFile() {
            const response = await fetch("http://13.124.78.167:8080/upload", {
                method: "POST",
                headers: { 
                    "Authorization" : await AsyncStorage.getItem('Authorization'),
                    'Content-Type': 'multipart/form-data'
                },
                body: body,
            });

            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }
            
            const res = await response.json();
            return res;
        }

        PostUploadFile().then(async res => {
            console.log("\n업로드 res\n", res);
            console.log("res.result[id]: ", res.result["id"]);
            setImageFileId(res.result["id"]);
        });    
    }

    //확인 버튼 눌렀을 때 작동하는 함수
    const _handleSaveButton = () => {

        if (!image) {
            Alert.alert('','이미지를 선택해주세요.');
            return;
        }
        if (!name) {
            Alert.alert('','이름을 입력해주세요.');
            return;
        }

        //POST - 챗봇 생성 API 연결
        async function fetchSettingStatus() {
            console.log("ImageFile Id: ", imageFileId);
            console.log("modeId", modeId);

            const response = await fetch("http://13.124.78.167:8080/chat/chatBot", {
                method: "POST",
                headers: { 
                    "Authorization" : await AsyncStorage.getItem('Authorization'),
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    imageFileId: imageFileId,
                    modeId: modeId,
                    name: name,
                    voiceId: 3, //음성 목록 임의 설정
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
            navigation.replace('Chat', { name: name, image: image, mode: modeId });
        });
    }

    const _setFormal = () => {
        setMode('formal');
        setModeId(1);
    }

    const _setInformal = () => {
        setMode('informal');
        setModeId(2);
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
                    value='formal'
                    status={mode === 'formal' ? 'checked' : 'unchecked'}
                    onPress={_setFormal}
                />
                <Text style={styles.radioText}>존댓말</Text>
                <RadioButton
                    value='informal'
                    status={mode === 'informal' ? 'checked' : 'unchecked'}
                    onPress={_setInformal}
                />
                <Text style={styles.radioText}>반말</Text>
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

//GET - 어체 조회 API 연결
const _handleGetMode = () => {
    async function getMode() {
        const response = await fetch("http://13.124.78.167:8080/chat/mode", {
            method: "GET",
            headers: { 
                "Authorization" : await AsyncStorage.getItem('Authorization'),
                "Content-Type" : "application/json",
            },
            body: null,
        });

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        
        const res = await response.json();
        return res;
    };

    getMode().then(async res => {
        console.log("res: ", res);
    });
};

//GET - 음성 조회 API 연결
const _handleGetVoice = () => {
    async function getVoice() {
        const response = await fetch("http://13.124.78.167:8080/chat/voice", {
            method: "GET",
            headers: { 
                "Authorization" : await AsyncStorage.getItem('Authorization'),
                "Content-Type" : "application/json",
            },
            body: null,
        });

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        
        const res = await response.json();
        return res;
    };

    getVoice().then(async res => {
        console.log("res: ", res);
    });
};

//모두 조회 후 설정
const _handlegetMode = () => {
    async function getMode() {
        const response = await fetch("http://13.124.78.167:8080/chat/mode", {
            method: "GET",
            headers: { 
                "Authorization" : await AsyncStorage.getItem('Authorization'),
                "Content-Type" : "application/json",
            },
            body: null,
        });

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
                
        const res = await response.json();
        return res;
    };
        
    getMode().then(async res => {ㄴ
        console.log("getMode의 res\n ", res);
        res.forEach(doc => {
            if (doc.name === mode)
                setModeId(doc.id)
        });
    });
}
