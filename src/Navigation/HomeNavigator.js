import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import HomeScreen from '../Screen/HomeScreen';
import ClockScreen from '../Screen/ClockScreen';
import AddScreen from '../Screen/AddScreen';
import CardioScreen from '../Screen/CardioScreen';
import DefaultScreen from '../Screen/DefaultScreen';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        activeTintColor: '#fff',
        style: {
          backgroundColor: '#2C3335',
        },
        labelStyle: {
          fontWeight: 'bold',
          fontSize: 19,
        },
        indicatorStyle: {
          backgroundColor: '#fff',
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Library',
        }}
      />
      <Tab.Screen
        name="DefaultScreen"
        component={DefaultScreen}
        options={{
          title: 'Store',
        }}
      />
    </Tab.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2C3335',
        },
        headerTitleStyle: {
          color: '#DAE0E2',
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="HomeTabNavigator"
        component={HomeTabNavigator}
        options={{
          title: 'CARDIO CLOCK',
          headerStyle: {
            elevation: 0,
            backgroundColor: '#2C3335',
          },
        }}
      />
      <Stack.Screen
        name="AddScreen"
        component={AddScreen}
        options={{title: 'Add New Cardio'}}
      />
      <Stack.Screen
        name="ClockScreen"
        component={ClockScreen}
        options={({route}) => ({
          title: route.params.Name.toUpperCase(),
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="CardioScreen"
        component={CardioScreen}
        options={({route}) => ({
          title: route.params.Name.toUpperCase(),
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
