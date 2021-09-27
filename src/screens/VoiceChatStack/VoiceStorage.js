import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { images } from '../../images';

const Data = [
    { id: 1, title: '민호' },
    { id: 2, title: '아는 후배' },
    { id: 3, title: '희진' },
];

const VoiceStorage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <FlatList 
                data={Data} 
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                <TouchableOpacity 
                    onPress={() => navigation.navigate('ChatSetting')} 
                    style={styles.list}>
                    <View style = {{flexDirection: 'row'}} >
                        <Image 
                            source = {images.voicewave}
                            style = {styles.voicewave}    
                        />
                        <Text style={styles.title}>{item.title}</Text>    
                    </View>
                </TouchableOpacity>
            )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    
    list: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 4,
        marginTop: 3,
        height: 85,
        justifyContent: 'center',
    },

    voicewave: {
        width: 50,
        height: 50,
        marginLeft: 20
    },
    
    title: {
      marginLeft: 50,
      fontSize: 18,
      marginVertical: 15
    },
});

export default VoiceStorage;