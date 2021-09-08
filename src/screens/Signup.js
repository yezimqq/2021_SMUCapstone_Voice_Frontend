import React, { useState }from 'react';
//import styled from 'styled-components/native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';

const Signup = ({ navigation }) => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");

    return (
    <View style={styles.container}>
        <Text style={styles.logo}>회원가입</Text>
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
        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="비밀번호 재확인"
            placeholderTextColor="#bebebe"
            onChangeText={text => setConfirmpassword(text)} />
        </View>
      
        <TouchableOpacity 
            style={styles.signupBtn}
            onPress = {() => navigation.navigate('Login')}>
          <Text style={styles.signupText}>가입하기</Text>
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
        fontWeight: "bold",
        fontSize: 45,
        color: "black",
        textAlign: 'center',
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
    
    signupBtn: {
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

    signupText: {
        fontSize: 20,
        color: "black"
    }
});
  export default Signup;