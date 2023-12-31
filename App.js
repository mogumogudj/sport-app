import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import MyTabs from './src/components/TabNavigation';
import FavouritesContextProvider from './src/components/context/favouritesContext';

const App = () => {
  return (
    <NavigationContainer>
      <FavouritesContextProvider>
      <MyTabs />
      </FavouritesContextProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;