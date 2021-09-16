import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserContext } from '../contexts';
import Auth from './Auth';
import Main from './Main';

// 인증화면(Login, Signup)은 Auth 연결
const Navigation = () => {
    const { user } = useContext(UserContext);

    return (
        <NavigationContainer>
            {user?.LoginId && user?.password ? <Main /> : <Auth />}
            {/*<Auth />*/}
            {/*<Main />*/} 
        </NavigationContainer>
    );
};

export default Navigation;
