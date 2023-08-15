import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './Home'
import Categories from './Categories';
import Favourites from './Favourites';

const Tab = createMaterialBottomTabNavigator();



const MyTabs = () => {
    return (
      <Tab.Navigator
        initialRouteName="Products"
        activeColor="black"
        barStyle={{ backgroundColor: 'tomato' }}
      >
        <Tab.Screen
          name="Products"
          component={Home}
          options={{
            tabBarLabel: 'Products',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="basketball" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Categories"
          component={Categories}
          options={{
            tabBarLabel: 'Categories',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="apps" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Favourites"
          component={Favourites}
          options={{
            tabBarLabel: 'Favourites',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="heart" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
        };
      

      export default MyTabs;