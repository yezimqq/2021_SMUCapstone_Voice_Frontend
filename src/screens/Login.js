import React, { useState } from 'react';
//import styled from 'styled-components/native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const Login = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Psycology Consult</Text>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="아이디"
          placeholderTextColor="#bebebe"
          onChangeText={text => setId(text)} />
      </View>
      <View style={styles.inputView} >
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="비밀번호"
          placeholderTextColor="#bebebe"
          onChangeText={text => setPassword(text)} />
      </View>
    
      <TouchableOpacity 
        style={styles.loginBtn}
        onPress = {() => navigation.navigate('Home')}>
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>
     <View style={styles.line} />
      <TouchableOpacity onPress = {() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>회원가입</Text>
      </TouchableOpacity>

    </View>
  );
}

login = () => {
    fetch('https')
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        fontWeight: "bold",
        fontSize: 45,
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
        color: "black"
    },
  
    line: { 
        borderBottomColor: "black",
        borderBottomWidth: 0.5,
        width: "80%",
        color: "black"
    },

    signupText: {
        fontSize: 16,
        color: "#3498db",
        marginTop: 10
    }
});
export default Login;