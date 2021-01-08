import React, {useContext} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  FlatList,
} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';

import {context} from '../context/context';
import {REMOVE_CARDIO} from '../context/actions.types';

import {Fab, Icon, Card, CardItem, Body, Text, Header} from 'native-base';

const HomeScreen = ({navigation, route}) => {
  const {cardio, dispatch} = useContext(context);
  return (
    <ImageBackground
      source={require('../Assets/Images/AppBackground.jpg')}
      style={styles.image}>
      <View
        style={[
          styles.card,
          {justifyContent: 'center', alignItems: 'center', padding: 3},
        ]}>
        <Text style={{fontWeight: 'bold'}}>CARDIO LIBRARY</Text>
        <Text style={{fontSize: 13}}>
          (long press any cardio to delete from library)
        </Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={cardio}
          keyExtractor={(items) => items.id}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('CardioScreen', {
                  Name: item.Name,
                  data: cardio[index],
                  mode: true,
                });
              }}
              onLongPress={() => {
                Alert.alert(
                  'Warning',
                  `Are you want to Delete "${item.Name}" from cardio List`,
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'DELETE',
                      onPress: () => {
                        dispatch({
                          type: REMOVE_CARDIO,
                          payload: item.id,
                        });
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }}>
              <View style={styles.card}>
                <Text style={styles.mainText}>{item.Name}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Text style={styles.subText}>
                    Number of Exercise : {item.Number}
                  </Text>
                  <Text style={styles.subText}>
                    Duration :
                    {Math.trunc(item.Duration / 60) +
                      ' Min ' +
                      (item.Duration % 60) +
                      ' Sec'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        <Fab
          style={{backgroundColor: '#EA7773', elevation: 10}}
          position="bottomRight"
          onPress={() => navigation.navigate('AddScreen')}>
          <Icon name="add" />
        </Fab>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  card: {
    backgroundColor: 'rgba(254, 254, 254, 0.6)',
    marginVertical: 5,
    padding: 10,
    elevation: 20,
    borderRadius: 0,
  },
  mainText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E8290B',
    paddingBottom: 10,
  },
  subText: {
    fontWeight: 'bold',
  },
});
