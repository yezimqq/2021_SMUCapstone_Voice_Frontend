import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Login, Signup } from '../screens';
import { Home } from '../screens';
import { ChatList, Chat, ChatSetting, AudioRecording, AudioStorage } from '../screens';
import { Diary, DiarySetting, DiaryWrite } from '../screens'; 
import { DailyChart, MonthlyChart } from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack =  createStackNavigator();
const Tab = createBottomTabNavigator();


const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName = 'Home'
            screenOptions = {{
                headerLeft: () => {
                    return null;
                },
            }}
        >
            <Stack.Screen
                name = "Home" 
                component = {Home} 
                options = {{
                    headerTitle: "Psycology Consult",
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#ed847a',
                    },
                }}
            />

            <Stack.Screen
                name = "Diary" 
                component = {Diary}
                options = {{
                    headerTitle: "감정일기",
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#ed847a',
                    },

                }}
            /> 

            <Stack.Screen
                name = "DailyChart" 
                component = {DailyChart}
                options = {{
                    headerTitle: "일별감정통계",
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#ed847a',
                    },
                }}
            /> 

        </Stack.Navigator>
    );
}

const VoiceChatStack  = () => {
    return (
        <Stack.Navigator
            initialRouteName = 'ChatList'
        >
            <Stack.Screen
                name = "ChatList" 
                component = {ChatList}
                options = {{
                    headerTitle: "심리상담채팅",
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#ed847a',
                    },
                    headerLeft: () => {
                        return null;
                    },
                }}
            />

            <Stack.Screen
                name = "Chat" 
                component = {Chat}
                options = {{
                    headerTitle: "채팅방",
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: '#ed847a',
                    },
                    headerBackTitleVisible: false,
                }}
            />    

            <Stack.Screen
                name = "ChatSetting" 
                component = {ChatSetting}
                options = {{
                    headerTitle: "채팅방 설정",
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#ed847a',
                    },
                    headerBackTitleVisible: false,
                }}
            /> 

            <Stack.Screen
                name = "AudioStorage" 
                component = {AudioStorage}
                options = {{
                    headerTitle: "음성 저장소",
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#ed847a',
                    },
                    headerBackTitleVisible: false,
                }}
            />   
            <Stack.Screen
                name = "AudioRecording" 
                component = {AudioRecording}
                options = {{
                    headerTitle: "음성 녹음하기",
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#ed847a',
                    },
                    headerBackTitleVisible: false,
                }}
            />     
        </Stack.Navigator>
    );
}

const DiaryStack  = () => {
    return (
        <Stack.Navigator
            initialRouteName = 'Diary'     
        >
            <Stack.Screen
                name = "Diary" 
                component = {Diary}
                options = {{
                    headerTitle: "감정일기",
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#ed847a',
                    },
                    headerLeft: () => {
                        return null;
                    },
                }}
            /> 

            <Stack.Screen
                name = "DiarySetting" 
                component = {DiarySetting}
                options = {{
                    headerTitle: "감정일기설정",
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#ed847a',
                    },
                    headerBackTitleVisible: false,
                }}
            />    

            <Stack.Screen
                name = "DiaryWrite" 
                component = {DiaryWrite}
                options = {{
                    headerTitle: "감정일기작성",
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#ed847a',
                    },
                    headerBackTitleVisible: false,
                }}
            />       
        </Stack.Navigator>
    );
}

const ChartStack = () => {
    return (
        <Stack.Navigator
            initialRouteName = 'DailyChart'
            screenOptions = {{
                headerLeft: () => {
                    return null;
                },
            }}
        >
            <Stack.Screen
                name = "DailyChart" 
                component = {DailyChart}
                options = {{
                    headerTitle: "일별감정통계",
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#ed847a',
                    },
                }}
            /> 
            <Stack.Screen
                name = "MonthlyChart" 
                component = {MonthlyChart}
                options = {{
                    headerTitle: "월별감정통계",
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#ed847a',
                    },
                }}
            />     
        </Stack.Navigator>
    );
}

const Main = () => {
    const getTabBarVisibility = (route) => {
        const routeName = route.state
             ? route.state.routes[route.state.index].name
             : '';

        if (routeName === 'Chat') {
            return false;
        }
        return true;
    }
    <Stack.Navigator
            initialRouteName = 'Login'
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
                    headerTitle: "Psycology Consult",
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: '#ed847a',
                    },
                }}
            />
        </Stack.Navigator>

    return (
        <Tab.Navigator
            initialRouteName = "Home"
            screenOptions={{
                tabBarActiveTintColor: '#ed847a',
            }}
        >
            <Tab.Screen 
                name = "홈 화면" 
                component = {HomeStack}
                options = {{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            name = 'home'
                            color = {color}
                            size = {size}
                        />
                    ),
                }}
                
            />
            <Tab.Screen 
                name = "심리상담" 
                component = {VoiceChatStack}
                options = {({route}) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            name = 'chatbox'
                            color = {color}
                            size = {size}
                        />
                    ),
                    
                })}
             />
            <Tab.Screen 
                name = "감정일기" 
                component = {DiaryStack}
                options = {{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            name = 'reader-outline'
                            color = {color}
                            size = {size}
                        />
                    )
                }}
                
            />
            <Tab.Screen 
                name = "감정통계" 
                component = {ChartStack} 
                options = {{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            name = 'bar-chart-outline'
                            color = {color}
                            size = {size}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

const Auth = () => {
    return (
        <Stack.Navigator
            initialRouteName = 'Login'
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
                    headerTitle: "Psycology Consult",
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: '#ed847a',
                    },
                }}
            />
        </Stack.Navigator>
    );
}

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name = 'Auth'
                    component = {Auth}
                    options = {{headerShown: false}}
                />
                <Stack.Screen
                    name = 'Main'
                    component = {Main}
                    options = {{headerShown: false}}
                />
            </Stack.Navigator>
            
        </NavigationContainer>
    );
};

export default Navigation;