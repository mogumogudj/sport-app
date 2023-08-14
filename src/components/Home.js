import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import axios from 'axios';


const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});

const Home = () => {


    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        axios.get("https://fakestoreapi.com/products").then(res => {
            alert(JSON.stringify(res.data));
        });
    }, []);
    
    return (
      <SafeAreaView style={styles.root}>
      <View>
        <Text>Home</Text>
      </View>
      </SafeAreaView>
    );
  };

export default Home;