import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import Auth from './Auth';
import Main from './Main';

// 인증화면(Login, Signup)은 Auth 연결
const Navigation = () => {
    return (
        <NavigationContainer>
            <Main /> 
        </NavigationContainer>
    );
};

export default Navigation;