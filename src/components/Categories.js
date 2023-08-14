import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});

const Categories = () => {
    return (
      <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text>Categories</Text>
      </View>
      </SafeAreaView>
    );
  };

export default Categories;