import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, TextInput } from 'react-native'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { images } from '../../images';
import { NavigationHelpersContext } from '@react-navigation/native';

const DiaryWrite = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [emoji, setEmoji] = useState();
    const [diary, setDiary] = useState();

    const onChange = (event, selectedValue) => {
        setShow(Platform.OS === 'ios');
        if (mode == 'date') {
            const currentDate = selectedValue || new Date();
            setDate(currentDate);
            setMode('time');
            setShow(Platform.OS !== 'ios');
        } else {
            const selectedTime = selectedValue || new Date();
            setTime(selectedTime);
            setShow(Platform.OS === 'ios');
            setMode('date');
        }
    };
        
    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };
    
    const showDatepicker = () => {
        showMode('date');
    };

    const formatDate = (date, time) => {
        if (Platform.OS === 'ios')
            return `${date.getMonth()+1}월 ${date.getDate()}일 ${time.getHours()}:${time.getMinutes()}`;
        else {
            if (time.getHours() < 12)
                return `${date.getMonth()+1}월 ${date.getDate()}일  오전 ${time.getHours()}:${time.getMinutes()}`;
            else
                return `${date.getMonth()+1}월 ${date.getDate()}일  오후 ${time.getHours()-12}:${time.getMinutes()}`;
        }    
    };

    return (
        <View style = {styles.container}>
            <Text style = {styles.text}>지금 나의 기분은</Text>
                   
            <TouchableOpacity onPress={showDatepicker} style={styles.rowContainer}>
                <Icon
                    name = 'calendar-o'
                    size = {25}
                    color = '#49af8b'
                />
                <Text style={styles.dateText}>{formatDate(date, time)}</Text>
            </TouchableOpacity>
            {show && ( //locale) ios only
                <DateTimePicker 
                    testID='dateTimePicker'
                    is24Hour={true} //24시간 형식) android only -> ios에서 제대로 나타나는지 확인
                    value={date}
                    mode={mode}
                    display='spinner'
                    onChange={onChange}
                />
            )}

            <TouchableOpacity 
                style={styles.emojiContainer}
                onPress={() => navigation.navigate('DiarySetting')}>
                <Text style={styles.emojiText}>감정 이모지{'\n'}선택</Text>
            </TouchableOpacity>

            <View style={styles.inputContainer} >
                <TextInput
                    multiline
                    scrollEnabled
                    style={styles.inputText}
                    placeholder="내용을 입력해주세요"
                    placeholderTextColor="#bebebe"
                    onChangeText={text => setDiary(text)}/>
            </View>

            <TouchableOpacity 
                style={styles.saveBtn}
                onPress = {() => navigation.navigate('Diary')}>
                <Text style={styles.saveText}>저장</Text>
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

    rowContainer: {
        flexDirection: 'row',
    },

    text: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    dateText: {
        color: '#49af8b',
        fontSize: 20,
        marginLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#49af8b',
    },

    emojiContainer: {
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        marginTop: 15,
        width: 100,
        height: 100,
        borderRadius: 100,
    },

    emojiText: {
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
        height: 200,
        margin: 20,
        paddingLeft: 20,
    },

    inputText: {
        height: 200,
        color: "black"
    },

    saveBtn: {
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
  
    saveText: {
        fontSize: 20,
        color: "black"
    },

});

export default DiaryWrite;