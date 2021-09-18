import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const DiaryContext = createContext();
const DiaryProvider = ({ children }) => {
  const [diaryList, setDiaryList] = useState([]);

  const findDiaryList = async () => {
    const result = await AsyncStorage.getItem('diaryList');
    if (result !== null) setDiaryList(JSON.parse(result));
  };

  useEffect(() => {
    findDiaryList();
  }, []);

  return (
    <DiaryContext.Provider value={{ diaryList, setDiaryList, findDiaryList }}>
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiaryList = () => useContext(DiaryContext);

export default DiaryProvider;
