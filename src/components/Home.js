import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { useFavouritesContext } from './context/favouritesContext';
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
});

const Home = () => {


    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const {favourites, addFavouritesHandler, removeFromFavouritesHandler} = useFavouritesContext();

    const checker = item => {
        const boolen = favourites.some((element)=> element.id === item.id);
        return boolen;
    };

    useEffect(() => {
        setLoading(true);

        axios
        .get("https://fakestoreapi.com/products")
        .then(res => {
            setProducts(res.data);
        })
        .catch(e => console.log(e))
        .finally(() => setLoading(false));
    }, []);

    const renderItem = ({item})=> (
        <View style={styles.wrapper}>
            <View style={styles.imageAndButtonWrapper}>
            <View style={styles.imageWrapper}>
                <Image source={{uri: item.image}}
                style={styles.image}
                resizeMode='contain'
                />
                </View>
                <View>
                    
                    <TouchableOpacity style={styles.addButton}>
                        <Text 
                        style={styles.addButtonText} 
                        onPress={() => checker(item) 
                        ? removeFromFavouritesHandler(item) 
                        : addFavouritesHandler(item)
                        }> {checker(item) ? 'Remove item' : 'Add to Favourites'}</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={styles.textWrapper}>
                 <Text style={styles.text}> {item.title} </Text>
                 <Text style={styles.text}> {item.description} </Text>
                 <Text style={styles.text}> {item.price} </Text>
            </View>
        </View>
    );
    
    return (
      <SafeAreaView style={styles.root}>
      { loading ? (
      <View style={styles.loadingContainer}> 
       <ActivityIndicator size={'large'} color={'black'} /> 
        </View>
    ) : (
    <FlatList data={products} 
    keyExtractor={element => element.id} 
    renderItem={renderItem}
    />    
    )}
    
      </SafeAreaView>
    );
  };

export default Home;