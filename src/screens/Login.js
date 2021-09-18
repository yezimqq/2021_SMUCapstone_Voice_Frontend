import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../contexts';

const Login = ({ navigation }) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const { dispatch } = useContext(UserContext);

    const _handleLoginButton = async () => {
        if(!id) {
            alert('아이디를 입력해주세요.');
            return;
        }
        if(!password) {
            alert('비밀번호를 입력해주세요.');
            return;
        }
        
        fetch("http://13.124.78.167:8080/login", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                loginId: id,
                password: password,
            }),
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
          
            if (res.success === id) {
                AsyncStorage.setItem('access_token', res.access_token);
                Alert.alert("안내", "로그인 성공");
                dispatch({ LoginId: id, password: password });
            }
            else {
                Alert.alert("안내", "아이디와 비밀번호를 확인해주세요");
            }
        })

        /* 로그인한 사람 관련 데이터 불러오기 (지금은 안 쓰니 일단 제외) 
            fetch("http://13.124.78.167:8080/login", {
                method: "POST",
                headers: { 
                    Authorization: AsyncStorage.getItem("access_token")
                },
            })
            .then(response => response.json())
            .then(response => {
                console.log(response);
            })
        */
    }


    return (
        <View style = {styles.container}>
            <Text style = {styles.logo}>Psycology{'\n'}Consult</Text>
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
        fontWeight: '800',
        fontSize: 50,
        color: "black",
        marginBottom: 40,
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
        padding: 20
    },
  
    inputText: {
        height: 50,
        color: "black"
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
