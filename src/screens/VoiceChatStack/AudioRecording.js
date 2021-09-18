import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image  } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { images } from '../../images';
import { Wave } from "react-native-animated-spinkit";
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


    /* Recording Text */
    const [textValue, setTextValue] = useState('화살표 아이콘 클릭!'); // we call use state hook with initial value
  
    
    const changeTextValue = () => {
      const len = recordingText.length;
      setTextValue(recordingText[Math.floor(Math.random() * len)].text) // we use setTextValue function that the hook returned for us
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
                    <Wave size = {70}/>
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

            <View style ={styles.textBox}>
                <Text style = {styles.recordingText}> {textValue} </Text> 
            </View>


            <View style = {styles.containerBottom}>
                <View style = {styles.align}>
                    <TouchableOpacity onPress = {changeTextValue}>
                        <Icon
                            name = 'chevron-back-circle-outline'
                            size = {35}
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

                    <TouchableOpacity  onPress = {changeTextValue}>
                        <Icon
                            name = 'chevron-forward-circle-outline'
                            size = {35}
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

    

    // 녹음 텍스트박스
    textBox: {
        flex: 4,
        width: '90%',
        height: '100%',
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center'
    },

    recordingText: {
        fontSize: 20,
        margin: 40,
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

/*----- Ai-hub: 한국어-영어 번역(병렬) 말뭉치 Dataset ----*/
const recordingText = [
    {text: '그럼 저 이 택시 타지 않을테니 이 앞에서 내려주세요.', key: 1},
    {text: '외국 여권을 소지하셨으면 다른 줄로 가셔야 합니다.', key: 2},
    {text: '지금 순서가 있으니까, 제가 도와드리고 싶어도 번호표 뽑으셔야 합니다.', key: 3},
    {text: '네, 그럼 크림파스타 먼저 8,000원 결제하겠습니다.', key: 4},
    {text: '그렇군요, 혹시 저만 못 받았나 해서요.', key: 5}, 
    {text: '좋네요. 그 사항이 적용되면 우리가 발행하는 자료들에 오류가 없을 것 같습니다.', key: 6},
    {text: '16일 월요일 이후에는 받아볼 수 있습니다.', key: 7},
    {text: '멀리 가시네요, 혹시 가방은 다 싸셨나요?', key: 8},
    {text: '그러면 반대 방향으로 걸어가다 보면 콜로세움이 나올까요?', key: 9},
    {text: '100개 구매를 할 것인데, 제품 종류는 다양하게 섞어서 넣어주세요.', key: 10},
    {text: '그럼 제가 돌아왔을 때 보고서 전달을 해주셨어야죠.', key:11},   
    {text: '음, 저희는 파스타 한 개랑 피자 한 개, 음료는 탄산음료로 주세요.', key: 12},
    {text: '원래 욕실에 샴푸와 린스는 포함된 물품 아닌가요?', key: 13},
    {text: '회계 공부의 필요성을 느껴서 회계 학원 다니고 있어.', key: 14},
    {text: '네. 그렇게 다시 전달하겠습니다. 회의 시간은 그대로 진행할게요.', key: 15},
    {text: '제가 살던 곳에서는 제가 매운 것을 잘 먹는 편이었는데요.', key: 16},
    {text: '나는 야구 경기 동네 치킨집에서 보는걸 좋아해.', key: 17},
    {text: '아름다운 강도 있고, 영감이 넘쳐흐를 것 같은 동네야.', key: 18},
    {text: '지금 맡긴 지가 언젠데 아직도 최종본이 안 나온 거야?', key: 19},
    {text: '디지털 파일의 특성상 다운로드를 하시면 저희가 사용 여부를 확인하기 불가능해서 반품이 안 됩니다.', key: 20},
    {text: '의사 선생님도 천천히 걷는 건 괜찮다고 했거든.', key: 21},
    {text: '나 생각에도 이번만은 너의 의견을 따르는 게 맞는 것 같다.', key: 22},
    {text: '오늘은 사람이 별로 없어서 창가 자리에 앉아도 되겠네요.', key: 23},
    {text: '그러네요, 우리 드디어 택시를 탈 수 있게 됐어요.', key: 24},
    {text: '가지고 온 돈이 조금 모자라서 그래요, 조금만 깎아주세요.', key: 25},
    {text: '마침 어제 새로 들어왔어요.', key: 26},
    {text: '제 생각엔 온돌형보다는 침대형인 게 좋겠군요.', key: 27},
    {text: '제가 듣기로는 그분이 고기를 못 드신다고 했어요. 채식주의자라고 알고 있습니다.', key: 28},
    {text: '네, 오늘은 할인하는 즉석식품이 없어요.', key: 29},
    {text: '한 시간 정도 걸릴 것 같은데 오후 3시쯤 가능하실까요?', key: 30},
    {text: '향신료가 들어간 음식으로 추천해 드려도 괜찮을까요?', key: 31},
    {text: '우리가 항공권을 늦게 예약했으니 어쩔 수 없잖아.', key: 32},
    {text: '음료수까지 포함하여 총 59,600원이 나왔습니다.', key: 33},
    {text: '와, 이렇게 작은 감자가 있다니 믿을 수가 없네.', key: 34},
    {text: '전신으로 10회 하시면 무료 2회는 전신이 되고, 얼굴만 10회 이용권을 사용하시면 2회 무료는 얼굴에만 사용하실 수 있어요.', key: 35},
    {text: '그 부분은 정확한 비용 확인을 위해 출장 다녀온 후에 작성해도 무관합니다.', key: 36},
    {text: '겨울연가가 진짜 인기 많긴 했지, 재미있고.', key: 37},
    {text: '제 친구가 택시회사에서 일하니까 한번 물어볼게요.', key: 38},
    {text: '이렇게 직접 전화하고 축하해줘서 정말 고마워.', key: 39},
    {text: '알았습니다, 그럼 모레 같은 시간에 올게요.', key: 40},
    {text: '밝고 화려해서 참석하시는 분들도 좋아하실 것 같은데.', key: 41},
    {text: '죄송하지만 우리 회사는 외부인 출입금지입니다.', key: 42},
    {text: '너무 오래 걸리네요, 제가 조금 있다가 약속이 있어서요.', key: 43},
    {text: '요즘 서로 언어를 교환하면서 배우는 애플리케이션이 많은 것 같아.', key: 44},
    {text: '음료수 자판기도 있고 카운터에서 사셔도 됩니다.', key: 45},
    {text: '저한테 쿠폰의 바코드를 보여주시겠어요?', key: 46},
    {text: '보통 레드와인과 스테이크를 많이 드십니다.', key: 47},
    {text: '살이 정말 많이 빠진 것 같아. 다이어트한 거야?', key: 48},
    {text: '벌써 주문한 지 일주일이나 지났는데 물건이 오지 않아요.', key: 49},
    {text: '새로운 캐릭터 등장시켜서 계속 만들어주면 좋겠다.', key: 50},
    {text: '네, 요리가 전부 맛있고 서비스도 아주 좋았어요.', key: 51},
    {text: '내가 데려다주고 싶지만, 그때는 어렵다. 그냥 택시 타.', key: 52},
    {text: '여기 이 극장은 외부에서 사 온 음식도 반입할 수 있잖아.', key: 53},
    {text: '한국 운전 면허증 시험이 쉬워서 중국인들도 시험을 치러 온대.', key: 54},
    {text: '추가 요금은 얼마인가요, 그럼 수리하고 가져다도 주시나요?', key: 55},
    {text: '어떤 고객을 대상으로 개발한 매트리스입니까?', key: 56},
    {text: '아동용 선크림 제품 4살 아이가 사용해도 될까요?', key: 57},
    {text: '택배 회사 또는 택배 기사님께 전화해보시면 빠를 것 같습니다.', key: 58},
    {text: '그렇다면 어느 역에서 내리셨는지 말씀해주세요.', key: 59},
    {text: '네, 확인해봤는데 저희 지점이 아니라 다른 지점으로 되어있네요.', key: 60},
    {text: '지금이 5시 30분이니까, 버스 탄 지 2시간 딱 지났네.', key: 61},
    {text: '이거 가격표를 확인할 수 있을까요?', key: 62},
    {text: '버스 터미널 찾아가서 탄 버스를 한번 물어보세요.', key: 63},
    {text: '정부 미팅은 날짜가 바뀌는 경우가 많으니 특별히 더 신경 써 주세요.', key: 64},
    {text: '고수는 빼달라고 하시면 빼 드립니다.', key: 65},
    {text: '나도 그렇게 생각했는데, 요즘은 일이 너무 힘들어.', key: 66},
    {text: '네 건지 몰랐지, 버스 이미 가버려서 못 찾을 것 같은데?', key: 67},
    {text: '명령보다 권유하는 상사에게 마음을 주게 된다는 것을 직접 느꼈기 때문입니다.', key: 68},
    {text: '저희는 사실은 큰 감흥은 없는데, 관광객들은 좋아하죠.', key: 69},
    {text: '그렇죠, 공복에 드신 다음에 바로 밥 드시면 돼요.', key: 70},
    {text: '몇 번이나 무게를 잰 후에 드렸는데 넘을 리가 없습니다.', key: 71},
    {text: '그래도 얼굴은 여성스러운데 머리가 완전 남자야.', key: 72},
    {text: '그러시면 메뉴판 보시고 추가 주문해주세요.', key: 73},
    {text: '스위스의 신생기업이라면 재생용지로 가방을 만드는 그 기업 말인가요?', key: 74},
    {text: '지금 2층 강의실은 공사 중이라 1층으로 바로 오시면 됩니다.', key: 75},
    {text: '혹시 포크 어린이가 사용할 거 말씀하시는 건가요?', key: 76},
    {text: '화장실 안에 대일밴드가 있는데, 청소한 거 맞습니까?', key: 77},
    {text: '이제 슬슬 회사 인턴십에 지원해야 할 것 같아.', key: 78},
    {text: '미리 지시하신 대로 팀별 장소를 예약해두었습니다.', key: 79},
    {text: '원재료 가격이 폭등하는 바람에 가격이 좀 올랐어요.', key: 80},
    {text: '단체 예약은 가능하나, 정확한 인원수를 말씀해주셔야 해요.', key: 81},
    {text: '생일파티 초대에 응해주시고 이렇게 선물까지 주시니 제가 더 감사하죠.', key: 82},
    {text: '지금 전화해서 알아봐 드리겠습니다.', key: 83},
    {text: '다음달 해외 바이어 상담회 일정이 잡혔는데요.', key: 84},
    {text: '네, 저도 만나 뵐 수 있어서 정말 기뻤습니다.', key: 85},
    {text: '8만 원이에요, 너무 비싸지도 않아서 대학생에게는 딱 좋아요.', key: 86},
    {text: '저희 가게는 원래 항상 이렇게 손님이 많은데요.', key: 87},
    {text: '센서가 인식해서 알아서 굴러가는 캐리어가 있습니다.', key: 88},
    {text: '어떻게 뽑는지 모르는데 혹시 도와주실 수 있으신가요?', key: 89},
    {text: '회로 자체가 손상된 상태이기 때문에 수리 자체가 불가능합니다.', key: 90},
    {text: '마침 저기 오네요, 저 버스를 타시면 됩니다.', key: 91},
    {text: '알겠습니다, 먼저 베이스부터 바르도록 할게요.', key: 92},
    {text: '제가 생각하기에는 줄다리기가 좋을 것 같습니다.', key: 93},
    {text: '한가람 미술관은 교통이 불편해서 가기 힘든 곳 아냐?', key: 94},
    {text: '나무 하나하나를 세밀히 보되 숲도 놓치지 않는 시야를 갖겠습니다.', key: 95},
    {text: '즐거운 쇼핑 하세요.', key: 96},
    {text: '저희도 사내 카페 설치를 검토해보겠습니다.', key: 97},
    {text: '내비게이션에 뭔가 문제가 생겼는지 도착 시각이 안 보여.', key: 98},
    {text: '입이 열 개라도 할 말이 없을 만큼 죄송하게 되었습니다.', key: 99},
    {text: '우선 치료를 해보시고 유산균도 한 번 드셔보시면 어떨까요?', key: 100},
];

export default AudioRecording; 