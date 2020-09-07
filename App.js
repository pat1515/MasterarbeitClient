import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import GraphQLScreen from './Screens/GraphQLScreen.js';
import RESTScreen from './Screens/RESTScreen.js'


const Tab = createBottomTabNavigator();


export default function App() {
  

  return (

    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="GraphQL" component={GraphQLScreen} 
        
          options={{
            tabBarLabel: 'GraphQL',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="graphql" color={color} size={size} />
            ),
          }}
        
        />


        <Tab.Screen name="REST" component={RESTScreen} 
        
          options={{
            tabBarLabel: 'REST',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="server-network" color={color} size={size} />
            ),
          }}
        
        />
      </Tab.Navigator>
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
