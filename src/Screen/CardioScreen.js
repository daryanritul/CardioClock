import React, {useState, useContext} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';

import {Button, Picker, Icon} from 'native-base';

import {context} from '../context/context';
import {ADD_CARDIO} from '../context/actions.types';

const CardioScreen = ({route, navigation}) => {
  const {dispatch, cardio} = useContext(context);
  const {data} = route.params;
  const {mode} = route.params;
  const [repetition, setRepetition] = useState(1);
  const cardioData = data;

  const validateData = (id) => {
    const check = cardio.filter((item) => item.id === id);
    if (check.length) return true;
    else return false;
  };

  const newMode = validateData(cardioData.id);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../Assets/Images/AppBackground.jpg')}
        style={styles.image}>
        <View style={styles.display}>
          {mode && (
            <View style={styles.cardioTab}>
              <Text style={styles.tabText}>
                Select Number of Cardio Repetition :
              </Text>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{height: 22, width: 120}}
                selectedValue={repetition}
                onValueChange={(item, index) => {
                  setRepetition(item);
                }}>
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="10" value="10" />
              </Picker>
            </View>
          )}

          <View style={styles.cardioTab}>
            <Text style={styles.tabText}>
              Total Exercise : {cardioData.Number * Math.trunc(repetition)}
            </Text>
            <Text style={styles.tabText}>
              Cardio Duration :
              {Math.trunc((cardioData.Duration * repetition) / 60) +
                ' Min ' +
                ((cardioData.Duration * repetition) % 60) +
                ' Sec'}
            </Text>
          </View>
          <ScrollView style={styles.exerciseBlock}>
            <View>
              {cardioData.List.map((item, index) => (
                <View key={item.id}>
                  <View style={styles.exerciseTab}>
                    <View style={{flexDirection: 'row', padding: 10}}>
                      <Text style={styles.mainText}>{index + 1}</Text>
                      <Text style={styles.mainText}>{item.ExerciseName}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        paddingBottom: 10,
                      }}>
                      <Text style={styles.noteText}>
                        Exercise Time : {item.Sets} Sec
                      </Text>
                      <Text style={styles.noteText}>
                        Rest Time : {item.Reps} Sec
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
          <Button
            disabled={!mode ? newMode : false}
            bordered
            block
            style={[
              styles.button,
              !mode && {
                backgroundColor: newMode
                  ? 'rgba(30, 132, 73, 0.6)'
                  : 'rgba(0, 0,0, 0.6)',
              },
            ]}
            onPress={() => {
              if (mode) {
                navigation.navigate('ClockScreen', {
                  Name: cardioData.Name,
                  payload: cardioData,
                  repetition: repetition,
                });
              } else {
                if (!newMode) {
                  const dispatchData = {
                    id: cardioData.id,
                    Name: cardioData.Name,
                    List: cardioData.List,
                    Number: cardioData.Number,
                    Duration: cardioData.Duration,
                  };
                  dispatch({
                    type: ADD_CARDIO,
                    payload: dispatchData,
                  });
                }
              }
            }}>
            <Text style={styles.buttonText}>
              {mode ? 'START' : `${newMode ? 'ADDED' : 'ADD'}`}
            </Text>
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CardioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  cardioTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 5,
    borderBottomWidth: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  exerciseBlock: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 20,
    paddingVertical: 10,
  },
  exerciseTab: {
    marginHorizontal: 10,
    marginBottom: 5,
    borderBottomWidth: 0.7,
    borderColor: '#515A5A',
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 17,
    paddingHorizontal: 10,
  },
  noteText: {
    //  fontWeight: 'bold',
    fontSize: 15,
  },
  display: {
    backgroundColor: 'rgba(254, 254, 254, 0.6)',
    flex: 1,
  },
  button: {
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0,0, 0.6)',
    borderColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
  },
});
