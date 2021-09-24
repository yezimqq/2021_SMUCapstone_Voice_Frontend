import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { FontAwesome } from '@expo/vector-icons'; 

const DateChanger = ({ date, mode="datetime", onDateChange = function(date) {}, style }) => { 
    const [currentDate, setCurrentDate] = useState(date);
    const [showPicker, setShowPicker] = useState(false);

    const formatDate = (date) => {
        const d = new Date(date);
        if(mode == "date")
        {
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
        }
        else {
            var options = { year: 'numeric', month: '2-digit', day: 'numeric', hour: "2-digit", minute: "2-digit" };
        }
        return d.toLocaleDateString("ko-KO", options);
        }

    const onDateConfirm = (value) => {
        setCurrentDate(value);
        setShowPicker(false)
        onDateChange(value)
    }

    return (
    <View style={style}>
        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.container}>
            <View style={styles.main}>
                <FontAwesome name="calendar" size={18} color="black" />
                <Text style={styles.dateText}>{formatDate(currentDate)}</Text>
            </View>
        </TouchableOpacity>
        <DateTimePickerModal
            isVisible={showPicker}
            date={currentDate}
            mode={mode}
            onConfirm={(value) => onDateConfirm(value)}
            onCancel={() => setShowPicker(false)}
            cancelTextIOS="취소"
            confirmTextIOS="날짜 변경"
            headerTextIOS="새 날짜 선택"
            isDarkModeEnabled={false}
            locale="ko_KO"
        />
    </View>
  );
}

const styles = StyleSheet.create({
    dateText: {
        borderRightColor: 'black',
        borderRightWidth: 2,
        marginLeft: 5,
        textAlign: "center"
    },
  
    main: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "space-between",
        padding: 10,
    }
});

export default DateChanger;