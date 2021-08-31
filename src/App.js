import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import { theme } from './theme';
import Navigation from './navigations';


const App = () => {
  return (
    <ThemeProvider theme = {theme}>
      <StatusBar backgroundColor = {theme.statusbar} barStyle = "light-content"/>
      <Navigation />
    </ThemeProvider>
  );
}

export default App;
