import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import { theme } from './theme';
import Navigation from './navigations';
<<<<<<< HEAD

=======
import { UserProvider } from './contexts';
>>>>>>> master

const App = () => {
  return (
    <ThemeProvider theme = {theme}>
<<<<<<< HEAD
      <StatusBar backgroundColor = {theme.statusbar} barStyle = "light-content"/>
      <Navigation />
=======
      <UserProvider>
        <StatusBar backgroundColor = {theme.statusbar} barStyle = "light-content"/>
        <Navigation />
      </UserProvider>
>>>>>>> master
    </ThemeProvider>
  );
}

export default App;
