import firebase from 'firebase';
import 'firebase/firestore';
import config from '../firebase.json';

const app = firebase.initializeApp(config);

export const DB = firebase.firestore();

export const createChannel = async ({ image, name }) => {
    const newChannelRef = DB.collection('channels').doc();
    const id = newChannelRef.id;
    const newChannel = {
        id,
        image,
        name,
        message: "챗봇 생성이 완료 되었습니다.",
        createdAt: Date.now(),
    };
    await newChannelRef.set(newChannel);
    return id;
}

/*
export const createMessage = async ({ channelId, text }) => {
    return await DB.collection('channels')
    .doc(channelID)
    .collection('messages')
    .add({
        text,
        createdAt: Date.now(),
    });
};
*/