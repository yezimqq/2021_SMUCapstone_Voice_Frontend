import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens';
import { ChatList, Chat, ChatSetting, AudioRecording, AudioStorage } from '../screens';
import { DiaryScreen, DiaryDetail } from '../screens'; 
import { DailyChart, MonthlyChart } from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';


const Stack =  createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName = 'Home'
        >
            <Stack.Screen
                name = "Home" 
                component = {Home} 
                options = {{
                    headerTitle: "",
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#ed847a',
                    },
                }}
            />

            <Stack.Screen
                name = "DiaryScreen" 
                component = {DiaryScreen}
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
                name = "DailyChart" 
                component = {DailyChart}
                options = {{
                    headerTitle: "일별감정통계",
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
                    headerTitle: "대화하기",
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#ed847a',
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
            initialRouteName = 'DiaryScreen'
        >
           {/*} <Stack.Screen
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
            />     */}


            <Stack.Screen
                name = "DiaryScreen" 
                component = {DiaryScreen}
                options = {{
                    headerTitle: "감정일기",
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#ed847a',
                    },
                    headerBackTitleVisible: false,
                }}
            />  

            <Stack.Screen
                name = "DiaryDetail" 
                component = {DiaryDetail}
                options = {{
                    headerTitle: "감정일기",
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
                    headerLeft: () => {
                        return null;
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
                name = "대화하기" 
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

export default Main;
