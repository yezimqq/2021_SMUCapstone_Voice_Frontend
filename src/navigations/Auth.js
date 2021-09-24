import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Signup } from '../screens';
import { theme } from '../theme';

const Stack =  createStackNavigator();

const Auth = () => {
    
    return (
        <Stack.Navigator
            screenOptions = {{
                headerStyle: {
                    backgroundColor: theme.headerBackground,
                },
            }}
        >
            <Stack.Screen 
                name = "Login" 
                component = {Login} 
                options = {{ headerShown: false }} 
            />
            <Stack.Screen 
                name = "Signup" 
                component = {Signup} 
                options = {{
                    headerTitle: "",
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: 'white',
                }}
            />
        </Stack.Navigator>
    );
};

export default Auth;