import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, FlatList, Image } from 'react-native';

import axios from 'axios';


const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 5,
        backgroundColor: '#FFFFFF',
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    wrapper: {
        alignContent: 'center',
        alignItems: 'center',
    },

    categoryChip: {
        padding: 5,
        backgroundColor: 'tomato',
        color: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginVertical: 20,
        borderRadius: 20,
        width: '50%',
    },
    categoryChipText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

const Categories = () => {


    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        axios
        .get("https://fakestoreapi.com/products/categories")
        .then(res => {
            setCategories(res.data);
        })
        .catch(e => console.log(e))
        .finally(() => setLoading(false));
    }, []);

    const renderItem = ({item})=> (
        <View style={styles.wrapper}>
           <View style={styles.categoryChip}>
            <Text style={styles.categoryChipText}>{item}</Text>
           </View>
        </View>
    )
    
    return (
      <SafeAreaView style={styles.root}>
      { loading ? (
      <View style={styles.loadingContainer}> 
       <ActivityIndicator size={'large'} color={'black'} /> 
        </View>
    ) : (
    <FlatList data={categories} 
    keyExtractor={element => element} 
    renderItem={renderItem}
    />    
    )}
    
      </SafeAreaView>
    );
  };

export default Categories;