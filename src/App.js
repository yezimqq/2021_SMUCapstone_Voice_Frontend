import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import { theme } from './theme';
import Navigation from './navigations';
import { UserProvider } from './contexts';
import DiaryProvider from './contexts/DiaryProvider';

const App = () => {
  return (
    <ThemeProvider theme = {theme}>
      <UserProvider>
        <DiaryProvider>
        <StatusBar backgroundColor = {theme.statusbar} barStyle = "light-content"/>
        <Navigation />
       </DiaryProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
