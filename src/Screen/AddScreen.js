import React, {useState, useContext} from 'react';
import {StyleSheet, View, Alert, ImageBackground} from 'react-native';

import {Form, Label, Input, Item, Button, Text} from 'native-base';
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';

import shortid from 'shortid';

import {context} from '../context/context';
import {ADD_CARDIO} from '../context/actions.types';

const AddScreen = ({navigation}) => {
  const {dispatch} = useContext(context);

  const [cardioList, setCardioList] = useState([]);
  const [cardioName, setCardioName] = useState('');
  const [exerciseName, setExerciseName] = useState('');
  const [exerTime, setExerTime] = useState('');
  const [restTime, setRestTime] = useState('');
  const cardioListHandler = () => {
    if (!cardioName || !exerciseName || !exerTime || !restTime) {
      return alert('Please Fill all The Feilds');
    }
    const cardioObject = {
      id: shortid.generate(),
      ExerciseName: exerciseName,
      Sets: exerTime,
      Reps: restTime,
    };
    setCardioList([...cardioList, cardioObject]);
    setExerciseName('');
  };
  const renderData = ({item, index}) => {
    return (
      <TouchableWithoutFeedback
        onLongPress={() => {
          Alert.alert(
            'Warning',
            `Are you sure want to delete "${item.ExerciseName}" exercise from list`,
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  deleteHandler(index);
                },
              },
            ],
            {cancelable: false},
          );
        }}>
        <View
          style={{
            borderBottomWidth: 0.7,
            borderColor: '#000',
            margin: 5,
          }}>
          <Text
            style={{fontSize: 14, paddingHorizontal: 5, fontWeight: 'bold'}}>
            {index + 1}.
          </Text>
          <Text
            style={{fontSize: 20, paddingHorizontal: 20, fontWeight: 'bold'}}>
            {item.ExerciseName}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              paddingVertical: 4,
            }}>
            <Text note style={styles.inputLabel}>
              EXERCISE TIME : {item.Sets} Sec
            </Text>
            <Text note style={styles.inputLabel}>
              REST TIME : {item.Reps} Sec
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const timeCalculator = (List) => {
    var duration = 0;
    List.map((item) => {
      duration = duration + parseInt(item.Sets) + parseInt(item.Reps);
    });
    var time = Math.trunc(duration / 60) + ' Min ' + (duration % 60) + ' Sec';
    return duration;
  };
  let seconds = timeCalculator(cardioList);

  const savelAllHandler = () => {
    if (!cardioName || cardioList.length == 0) {
      return alert('Please Fill all The Feilds');
    }
    const cardioData = {
      id: shortid.generate(),
      Name: cardioName,
      List: cardioList,
      Number: cardioList.length,
      Duration: timeCalculator(cardioList),
    };
    dispatch({
      type: ADD_CARDIO,
      payload: cardioData,
    });
    navigation.navigate('HomeScreen');
  };

  const deleteHandler = (index) => {
    var array = cardioList;
    array.splice(index, 1);
    setCardioList(array);
  };

  return (
    <ImageBackground
      source={require('../Assets/Images/AppBackground.jpg')}
      style={styles.image}>
      <View style={styles.container}>
        <Form style={styles.form}>
          <View style={styles.cardioBlock}>
            <Item stackedLabel style={{width: '95%', borderColor: '#000'}}>
              <Label style={styles.inputLabel}>Cardio Name</Label>
              <Input
                value={cardioName}
                onChangeText={(inputValue) => setCardioName(inputValue)}
              />
            </Item>
          </View>

          <View style={styles.exerciseBlock}>
            <Item stackedLabel style={{width: '95%', borderColor: '#000'}}>
              <Label style={styles.inputLabel}> Exercise Name</Label>
              <Input
                value={exerciseName}
                onChangeText={(inputValue) => setExerciseName(inputValue)}
              />
            </Item>
            <View style={{flexDirection: 'row'}}>
              <Item stackedLabel style={styles.inputRow}>
                <Label style={styles.inputLabel}>Exercise Time(Seconds)</Label>
                <Input
                  keyboardType="number-pad"
                  value={exerTime}
                  onChangeText={(inputValue) => setExerTime(inputValue)}
                />
              </Item>
              <Item stackedLabel style={styles.inputRow}>
                <Label style={styles.inputLabel}>Rest Time(Seconds)</Label>
                <Input
                  keyboardType="number-pad"
                  value={restTime}
                  onChangeText={(inputValue) => setRestTime(inputValue)}
                />
              </Item>
            </View>
          </View>
          <View>
            <Button block style={styles.button} onPress={cardioListHandler}>
              <Text style={styles.btnText}>ADD TO LIST</Text>
            </Button>
            <Button block style={styles.button} onPress={savelAllHandler}>
              <Text style={styles.btnText}>SAVE ALL</Text>
            </Button>
          </View>
        </Form>
        <View style={{flex: 1}}>
          <View
            style={{
              justifyContent: 'space-evenly',
              borderBottomWidth: 0.5,
              margin: 5,
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              Cardio Name :
              {cardioName ? cardioName.toUpperCase() : '[ CARDIO NAME ]'}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                textAlign: 'center',
                paddingBottom: 5,
              }}>
              Duration :
              {Math.trunc(seconds / 60) + ' Min ' + (seconds % 60) + ' Sec'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 5,
              paddingBottom: 5,
              paddingHorizontal: 5,
            }}>
            <Text style={{fontWeight: 'bold'}}>EXERCISE LIST</Text>
            <Text style={{fontWeight: 'bold', fontSize: 12}}>
              (Long press to delete any exercise)
            </Text>
          </View>
          <View style={styles.listView}>
            {!cardioList.length ? (
              <Text
                style={{
                  textAlign: 'center',
                  paddingVertical: 50,
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#616C6F',
                }}>
                LIST IS EMPTY
              </Text>
            ) : (
              <View></View>
            )}

            <FlatList
              data={cardioList}
              renderItem={renderData}
              keyExtractor={(item, index) => item.id}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(236, 240, 241, 0.5)',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  inputLabel: {
    color: '#000',
    fontWeight: 'bold',
  },
  form: {},
  listView: {
    // backgroundColor: 'rgba(236, 240, 241, 0.4)',
    marginBottom: 100,
    marginHorizontal: 5,
    //  borderWidth: 0.7,
  },
  inputRow: {
    width: '45%',
    borderColor: '#000',
  },
  cardioBlock: {
    //   borderBottomWidth: 1,
    margin: 5,
    paddingBottom: 10,
  },
  exerciseBlock: {
    // borderBottomWidth: 0.7,
    marginHorizontal: 5,
    paddingBottom: 10,
  },
  checkBox: {
    flexDirection: 'row',
    width: '45%',
  },
  checkboxBlock: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  button: {
    margin: 5,
    height: 35,
    backgroundColor: 'rgba(28, 40, 51, 0.7)',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
