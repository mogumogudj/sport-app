import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { useFavouritesContext } from './context/favouritesContext';
import axios from 'axios';
import Categories from './Categories';



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
    const [selectedCategory, setSelectedCategory] = useState(null);
  
    const { favourites, addFavouritesHandler, removeFromFavouritesHandler } = useFavouritesContext();
  
    const checker = item => {
      const boolen = favourites.some((element) => element.id === item.id);
      return boolen;
    };
  
    useEffect(() => {
      setLoading(true);
  
      axios
        .get("https://www.pearlvintagestore.com/wp-json/wp/v2/product")
        .then(async res => {
          const productsData = await Promise.all(
            res.data.map(async product => {
                const imageId = product.custom_fields.image;
                const imageUrl = await fetchImageURL(imageId); // Implement fetchImageURL function
                return { ...product, imageUrl };
            })
          );
          setProducts(productsData);
        })
        .catch(e => console.log(e))
        .finally(() => setLoading(false));
    }, []);
  

    const fetchImageURL = async (imageId) => {
  try {
    const response = await axios.get(`https://www.pearlvintagestore.com/wp-json/wp/v2/media/${imageId}`);
    return response.data.source_url; // Assuming the image URL is available in the "source_url" field
  } catch (error) {
    console.error("Error fetching image URL:", error);
    return null;
  }
};

        
    const renderItem = ({ item }) => (
      <View style={styles.wrapper}>
        <View style={styles.imageAndButtonWrapper}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: item.imageUrl }}
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
                }> {checker(item) ? 'Remove item' : 'Add to Favourites'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.textWrapper}>
            <View style={styles.text}>
          <Text style={styles.title} > {item.title.rendered} </Text>
          <Text style={styles.description}>{item.custom_fields.description} </Text>
          <Text style={styles.price}> €{item.custom_fields.price} </Text>
          {/* <Text style={styles.category}>{item.custom_fields.category} </Text> */}
          </View>
        </View>
      </View>
    );

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
      };

      const filteredProducts = selectedCategory
    ? products.filter(product => product.custom_fields.category === selectedCategory)
    : products;
  
    return (
      <SafeAreaView style={styles.root}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} color={'black'} />
          </View>
        ) : (
            <View>
                <Categories onSelectCategory={handleCategorySelect} />
          <FlatList
            data={filteredProducts}
            keyExtractor={element => element.id}
            renderItem={renderItem}
          />
          </View>
        )}
      </SafeAreaView>
    );
  };
  
  export default Home;