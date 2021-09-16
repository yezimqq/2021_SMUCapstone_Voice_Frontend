import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import { theme } from './theme';
import Navigation from './navigations';
import { UserProvider } from './contexts';

const App = () => {
  return (
    <ThemeProvider theme = {theme}>
      <UserProvider>
        <StatusBar backgroundColor = {theme.statusbar} barStyle = "light-content"/>
        <Navigation />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
