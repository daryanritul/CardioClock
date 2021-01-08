import React, {useReducer, useContext, useEffect} from 'react';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import {context} from './src/context/context';
import reducer from './src/context/reducer';
import {SET_CARDIO} from './src/context/actions.types';

import HomeNavigator from './src/Navigation/HomeNavigator';
import {StatusBar} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  const [cardio, dispatch] = useReducer(reducer, []);

  const loadData = async () => {
    const storedList = await AsyncStorage.getItem('@Cardio : Data');
    const data = await JSON.parse(storedList);
    if (data) {
      dispatch({
        type: SET_CARDIO,
        payload: data,
      });
    }
  };

  useEffect(() => {
    if (cardio.length) return;
    loadData();
  }, []);

  useEffect(() => {
    if (!cardio.length) return;
    AsyncStorage.setItem('@Cardio : Data', JSON.stringify(cardio));
  }, [cardio]);
  return (
    <NavigationContainer>
      <context.Provider value={{cardio, dispatch}}>
        <HomeNavigator />
      </context.Provider>
      <StatusBar backgroundColor="#2C3335" />
    </NavigationContainer>
  );
};

export default App;
