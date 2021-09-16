import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { images } from '../../images';
import { Audio } from "expo-av";
import { getInfoAsync as fsGetInfoAsync, documentDirectory, makeDirectoryAsync, copyAsync } from "expo-file-system";

/*----- can change recording option(sample rate) ----*/
const RecordingOptions = {
    android: {
      ...Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY.android,
      extension: '.wav',
      outputFormat: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
      sampleRate: 22050, // 기본설정: 44100
      numberOfChannels: 1,
    },
    ios: {
      ...Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY.ios,
      extension: '.wav',
      outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
      sampleRate: 22050, // 기본설정: 44100
      numberOfChannels: 1,
      bitRateStrategy:
        Audio.RECORDING_OPTION_IOS_BIT_RATE_STRATEGY_CONSTANT,
    },
  };

const AudioRecording = ({ navigation }) => {
    const currentRecording = useRef(null);
    const currentSound = useRef(null);

    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPlaybackAllowed, setIsPlaybackAllowed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const [playbackDuration, setPlaybackDuration] = useState(0);

    /* ----- Recording Permission ----- */
    const [isRecordingPermitted, setRecordingPermissions] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        askForPermissions()
        .then(() => setIsLoading(false))
        .catch(() => setIsError(true));
    }, []);

    const askForPermissions = async () => {
        let response = {};
        
        try {
            response = await Audio.requestPermissionsAsync();
            console.log("got permissions", response);
        } catch (err) {
            console.error(err);
        }
        
        setRecordingPermissions(response.status === "granted");
    };

    /* ----- onPress() => start/stop Recording ----- */
    const onRecordPressed = () => {
        setIsLoading(true);
        if (isRecording) {
            stopRecording();
        } 
        else {
            startRecording();
        }
    };

    /* ----- start Recording ----- */
    const startRecording = async () => {
        if (currentSound.current !== null) {
            await currentSound.current.unloadAsync();
            currentSound.current.setOnPlaybackStatusUpdate(null);
            currentSound.current = null;
        }
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false,
            staysActiveInBackground: true,
        });

        if (currentRecording.current !== null) {
            currentRecording.current.setOnRecordingStatusUpdate(null);
            currentRecording.current = null;
        }

        const recording = new Audio.Recording();

        try {
            await recording.prepareToRecordAsync(RecordingOptions);  // sample rate: 22050

            currentRecording.current = recording;
            recording.setOnRecordingStatusUpdate(updateScreenForRecordingStatus);

            await recording.startAsync();
            setIsLoading(false);
            setIsRecording(true);
             // now recording!
        } catch (error) {
             // An error occurred!
          console.error(error);
        }   
    };

    /* ----- stop Recording  ----- */
    const stopRecording = async () => {
        setIsLoading(true);
        setIsRecording(false);
        try {
            await currentRecording.current.stopAndUnloadAsync();
        } catch (error) {
          // Do nothing -- already unloaded.
        }

        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            playsInSilentLockedModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false,
            staysActiveInBackground: true,
        });
        const {
            sound,
            status,
        } = await currentRecording.current.createNewLoadedSoundAsync(
            {},
            updateScreenForSoundStatus
        );
        currentSound.current = sound;
        setIsLoading(false);
        setIsPlaybackAllowed(true);
    };

    /* ----- save Recording to Disk ----- */
    const saveRecordingToDisk = async () => {
        const fileInfo = await fsGetInfoAsync(currentRecording.current.getURI());

        try {
            await makeDirectoryAsync(documentDirectory + "my-recordings", {
                intermediates: true,
            });
            // save in persistent storage
            await copyAsync({
                from: fileInfo.uri,
                to: `${documentDirectory}/my-recordings/recording-${Date.now()}.wav`,
            });
        } catch (err) {
            console.error(err);
        }
    };

    /* ----- Recording time ----- */
    const updateScreenForSoundStatus = (status) => {
        if (status.isPlaying) {
            setIsPlaying(true);
            setPlaybackDuration(status.positionMillis);
        } 
        else {
            setIsPlaying(false);
            
            if (status.didJustFinish) {
            // seek back to 0
            currentSound.current.setPositionAsync(0);
            }
        }
    };

    const updateScreenForRecordingStatus = (status) => {
        if (status.canRecord) {
            setIsRecording(status.isRecording);
            setRecordingDuration(status.durationMillis);
        } 
        else if (status.isDoneRecording) {
            setIsRecording(false);
            setRecordingDuration(status.durationMillis);
            if (!isLoading) {
                stopRecording();
            }
        }
    };

    /* -----  Press Listening Button => play/pause Recording -----*/
    const onPlayPausePressed = () => {
        if (currentSound.current != null) {
            if (isPlaying) {
                currentSound.current.pauseAsync();
            } 
            else {
                currentSound.current.playAsync();
            }
        }
    };

    const padWithZero = (number) => {
        const string = number.toString();
        if (number < 10) {
            return "0" + string;
        }
        return string;
    };

    const getFormattedTimeFromMillis = (millis) => {
        const totalSeconds = millis / 1000;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);

        return padWithZero(minutes) + ":" + padWithZero(seconds);
    };

    return (
        <View style={{ ...styles.container, opacity: isLoading ? 0.2 : 1.0 }}>
            <View style = {styles.helpBox}>
                <Text style = {styles.helpText}>
                    {isRecording? (
                        '아래 문장 읽기가 끝나면 녹음 중지 버튼을 눌러주세요.'
                    ) : (
                        '녹음 시작 버튼을 누르고 아래의 문장을 소리내어 읽어주세요.'
                    )}       
                </Text>
            </View>

            <View style = {styles.containerTop}> 
            {isRecording? (
                    <Image
                        source = {images.wave}
                        style = {styles.waveImage}
                    />
                ) : (
                    <Image
                        source = {images.ear}
                        style = {styles.earImage}
                    />
                )}
                
               {isRecording? (
                 null
               ) : (
                <TouchableOpacity 
                    style = {styles.listenBtn}
                    onPress = {onPlayPausePressed}> 
                    {!isPlaybackAllowed  && (
                    <Icon
                        style = {{ marginRight: 15 }}
                        name = {'play-circle-outline'}
                        size = {30}
                        color = 'black'
                    /> )  }
                    {isPlaybackAllowed && !isLoading && currentSound.current && (
                    <Icon
                        style = {{ marginRight: 15 }}
                        name = {isPlaying ? 'pause-circle-outline' : 'play-circle-outline'}
                        size = {30}
                        color = 'black'
                        accessibilityLabel = "Playback recorded audio button"
                    /> 
                    )}
                    <Text style = {styles.btnText}>듣기</Text>
                </TouchableOpacity>
              )} 
            </View>


            <Text>{getFormattedTimeFromMillis(recordingDuration)}</Text>

            <View style ={styles.textBox} />


            <View style = {styles.containerBottom}>
                <View style = {styles.align}>
                    <TouchableOpacity>
                        <Icon
                            name = 'chevron-back-circle-outline'
                            size = {35}
                            /* ----- View prev text ----- */
                        />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style ={styles.recordingBtn}
                        onPress = {onRecordPressed}
                    >
                        {isRecording && (
                          <>
                            <Icon
                                name = {'stop-circle-outline'}
                                size = {32}
                                color = 'black'
                                accessibilityLabel = "Stop record audio button"
                            />   
                            <Text style = {styles.btnText}>녹음 중지</Text>
                          </>
                        )}

                        {!isRecording && (
                          <>
                            <Image 
                                source = {images.recording}
                                style = {styles.imageIcon} 
                            />
                            <Text style = {styles.btnText}>녹음 시작</Text>
                          </>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon
                            name = 'chevron-forward-circle-outline'
                            size = {35}
                            /* ----- View next text ----- */
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style = {styles.finBtn}
                    onPress = {saveRecordingToDisk}
                >
                    <Text style = {styles.btnText}>녹음 저장하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },

    helpBox: {
        flex: 1,
        width: '100%',
        height: 45,
        position: 'absolute',
        top: 0,
        borderWidth: 1,
        borderColor: '#bebebe',
        alignItems: 'center',
        justifyContent: 'center',
    },

    containerTop: {
        flex: 2,
        marginTop: 60,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    containerBottom: {
        flex: 2.5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    
    helpText: {
        fontSize: 14,
        textAlign: 'center',
    },

    earImage: {
        width: 140,
        height: 100,    
        flexDirection: 'row',
    },

    listenBtn: {
        width:120,
        margin: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor:'black',
        borderRadius: 4,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 2,
        shadowOffset: {width:2, height:2},
        flexDirection: 'row',
    },

    waveImage: {
        width: '90%',
        height: '70%',

    },

    // 녹음 텍스트박스
    textBox: {
        flex: 4,
        width: '90%',
        height: '100%',
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center'

    },

    align: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 90,
    },

    recordingBtn: {
        width:150,
        margin: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor:'black',
        borderRadius: 4,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 2,
        shadowOffset: {width:2, height:2},
        flexDirection: 'row',

    },

    imageIcon: {
        width: 30,
        height: 30,
        marginRight: 5,
    },

    finBtn: {
        position: 'absolute',
        bottom: '3%',
        width: "80%",
        backgroundColor: "#ed847a",
        borderWidth: 1,
        borderColor:'black',
        borderRadius: 4,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 2,
        shadowOffset: {width:2, height:2}
    },

    btnText: {
        fontSize: 18,
        color: 'black',
    },
});

export default AudioRecording; 