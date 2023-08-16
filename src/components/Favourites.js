import React, {useState, useEffect} from 'react';
import { StyleSheet, View, SafeAreaView, Text, FlatList } from 'react-native';
import { useFavouritesContext } from './context/favouritesContext';


const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 5,
        backgroundColor: '#FFFFFF',
    },
    noFavouritesView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
    
});

const Favourites = () => {

    const {favourites} = useFavouritesContext();

    alert(favourites.length);
    return (
      <SafeAreaView style={styles.root}>
        {favourites.length > 0 ? (
        <FlatList/> 
        ) : (
      <View style={styles.noFavouritesView}>
        <Text>Favourite are empty! Please add new favourites.</Text>
      </View> 
       )}
      </SafeAreaView>
    );
  };

export default Favourites;