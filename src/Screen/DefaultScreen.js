import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';

import {Fab, Icon, Text} from 'native-base';

import {defaultData} from '../data/Data';

const DefaultScreen = ({navigation, route}) => {
  return (
    <ImageBackground
      source={require('../Assets/Images/AppBackground.jpg')}
      style={styles.image}>
      <View
        style={[
          styles.card,
          {justifyContent: 'center', alignItems: 'center', padding: 3},
        ]}>
        <Text style={{fontWeight: 'bold'}}>CARDIO STORE</Text>
        <Text style={{fontSize: 13}}>
          (view and add cardio to your library)
        </Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={defaultData}
          keyExtractor={(items) => items.id}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('CardioScreen', {
                  Name: item.Name,
                  data: defaultData[index],
                  mode: false,
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
      </View>
    </ImageBackground>
  );
};

export default DefaultScreen;

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
