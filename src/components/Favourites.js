import React, {useState, useEffect} from 'react';
import { StyleSheet, View, SafeAreaView, Text, FlatList, Image, TouchableOpacity } from 'react-native';
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
    },

    image: {
      width: 180,
      height: 180,
  },

  wrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#dedede',
      padding: 10,
  },

  imageAndButtonWrapper: {
      justifyContent: 'center',
      alignContent: 'center',
  },

  imageWrapper: {
      flex: 1,
  },

  textWrapper: {
      flex: 1,
  },

  text: {
      marginVertical: 5,
  },

  addButton: {
      marginTop: 10,
      backgroundColor: 'lightgreen',
      padding: 4,
  },
  
  addButtonText: {
      fontSize: 20,
      color: '#FFFFFF',
      textAlign: 'center',
  },

  title: {
    fontSize: 28,
    color: 'tomato',
    fontWeight: "900",
    marginRight: 16,
},

description: {
    fontSize: 14,
    color: 'black',
    fontWeight: "400",
},

price: {
    fontSize: 20,
    color: 'black',
    fontWeight: "800",
    marginTop: 12,
},

category: {
    fontSize: 12,
    color: 'black',
    fontWeight: "800",
    marginTop: 12,
},
    
});

const Favourites = () => {

    const {favourites, removeFromFavouritesHandler} = useFavouritesContext();

    const renderItem = ({item})=> (
      <View style={styles.wrapper}>
          <View style={styles.imageAndButtonWrapper}>
          <View style={styles.imageWrapper}>
              <Image source={{uri: item.acf.image}}
              style={styles.image}
              resizeMode='contain'
              />
              </View>
              <View>
                  <TouchableOpacity style={styles.addButton} onPress={()=>removeFromFavouritesHandler(item)}>
                      <Text 
                      style={styles.addButtonText} >
                      Remove item</Text>
                  </TouchableOpacity>
              </View>
          </View>
          <View style={styles.textWrapper}>
          <Text style={styles.title} > {item.title.rendered} </Text>
          <Text style={styles.description}>{item.custom_fields.description} </Text>
          <Text style={styles.price}> €{item.custom_fields.price} </Text>
          </View>
      </View>
  );




    alert(favourites.length);
    return (
      <SafeAreaView style={styles.root}>
        {favourites.length > 0 ? (
        <FlatList data={favourites} 
        keyExtractor={element => element.id} 
        renderItem={renderItem}
        />    
        ) : (
      <View style={styles.noFavouritesView}>
        <Text>Favourite are empty! Please add new favourites.</Text>
      </View> 
       )}
      </SafeAreaView>
    );
  };

export default Favourites;