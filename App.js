import React from 'react';
import { StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import RESTScreen from './RESTScreen.js';
import GraphQLScreen from './GraphQLScreen.js';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>        
        <Tab.Screen name="REST"  component={RESTScreen}
          options={{
            tabBarLabel: 'REST',
            tabBarIcon: ({color}) => (
              <Ionicons name="ios-snow" color={color} size={25} />
            )
          }}
        /> 
        <Tab.Screen name="GraphQL" component={GraphQLScreen}
          options={{
            tabBarLabel: 'GraphQL',
            tabBarIcon: ({color}) => (
              <Ionicons name="ios-sunny" color={color} size={25} />
            )
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