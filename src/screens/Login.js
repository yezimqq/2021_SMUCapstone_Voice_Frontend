import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../contexts';
import { images } from '../images';


const Login = ({ navigation }) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const { dispatch } = useContext(UserContext);

    const _handleLoginButton = async () => {
        if(!id) {
            Alert.alert('','아이디를 입력해주세요.');
            return;
        }
        if(!password) {
            Alert.alert('','비밀번호를 입력해주세요.');
            return;
        }

        const response = await fetch("http://13.124.78.167:8080/login", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                loginId: id,
                password: password,
            }),
        })
        const json = await response.json()
        const headers = await response.headers    
        
        if (json.success !== null) {
            AsyncStorage.setItem('Authorization', headers.get("Authorization"));
            dispatch({ LoginId: id, password: password });
        }
        else {
            Alert.alert('', '아이디와 비밀번호를 확인해주세요');
        }
    }

    return (
        <View style = {styles.container}>
            <Image source = {images.logo} style = {styles.logo} />
            <View style = {styles.inputView} >
                <TextInput
                    style = {styles.inputText}
                    placeholder = '아이디'
                    placeholderTextColor = '#bebebe'
                    autoCapitalize = 'none'
                    returnKeyType = 'next'
                    onChangeText={text => setId(text)} />
            </View>
            <View style = {styles.inputView} >
                <TextInput
                    secureTextEntry
                    style = {styles.inputText}
                    placeholder = '비밀번호'
                    placeholderTextColor = '#bebebe'
                    autoCapitalize = 'none'
                    returnKeyType = 'done'
                    onChangeText = {text => setPassword(text)} />
            </View>
        
            <TouchableOpacity 
                style = {styles.loginBtn}
                onPress = {_handleLoginButton}>
            <Text style = {styles.loginText}>로그인</Text>
            </TouchableOpacity>
            <View style = {styles.line} />
            <TouchableOpacity 
                style = {styles.signupContainer}
                onPress = {() => navigation.navigate('Signup')}>
            <Text style = {styles.verticalBar}>|     </Text>
            <Text style ={styles.signupText}>회원가입</Text>
            <Text style = {styles.verticalBar}>     |</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        width: 350,
        height: 100,
        marginBottom: 40
    },

    inputView: {
        width: "80%",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor:'#cccccc',
        borderRadius: 4,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },
  
    inputText: {
        height: 50,
        color: "black",
       
    },
  
    loginBtn: {
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
  
    loginText: {
        fontSize: 20,
        color: 'black'
    },
  
    line: { 
        borderBottomColor: '#bebebe',
        borderBottomWidth: 0.5,
        width: '80%',
        color: '#bebebe'
    },

    signupContainer: {
      flexDirection: 'row'
    },

    verticalBar: {
      fontSize: 16,
      color: '#bebebe',
      marginTop: 8,
    },

    signupText: {
        fontSize: 16,
        color: "#3498db",
        marginTop: 11
    }
});

export default Login;
