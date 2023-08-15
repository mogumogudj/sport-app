import React, {useState, useEffect} from 'react';
import { StyleSheet, View, SafeAreaView, Text  } from 'react-native';


const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 5,
        backgroundColor: '#FFFFFF',
    },
    
});

const Favourites = () => {
    return (
      <SafeAreaView style={styles.root}>
      <View>
        <Text>Favourites</Text>
        </View>
      </SafeAreaView>
    );
  };

export default Favourites;