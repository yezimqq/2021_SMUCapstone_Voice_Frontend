import React, { createContext, useContext, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const DiaryContext = createContext();
const DiaryProvider = ({ children }) => {
  const [diaryList, setDiaryList] = useState([]);

  const init = async () => {
    const result = await AsyncStorage.getItem('diaryList');
    if (result) setDiaryList(JSON.parse(result));
  };

  const sync = async () => {
    await AsyncStorage.setItem('diaryList', JSON.stringify(diaryList));
  }

  const addDiary = (diary) => {
    setDiaryList([diary, ...diaryList])
  }

  const deleteDiary = (id) => {
    console.log(id)
    setDiaryList(diaryList.filter(v => v.id !== id))
  }

  const updateDiary = (diary) => {
    const currentIndex = diaryList.findIndex(v => v.id === diary.id);
    let newDiaryList = diaryList.filter(() => true)
    newDiaryList[currentIndex] = { ...newDiaryList[currentIndex], ...diary} // 덮어씌우기
    setDiaryList(newDiaryList)
  }

  useEffect(() => { init(); }, []);
  useEffect(() => { sync(); }, [diaryList])

  return (
    <DiaryContext.Provider value={{ diaryList, setDiaryList, addDiary, deleteDiary, updateDiary }}>
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiaryList = () => useContext(DiaryContext);

export default DiaryProvider;
