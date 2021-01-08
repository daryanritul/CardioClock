import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Alert,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {Fab, Icon} from 'native-base';

import CountDown from 'react-native-countdown-component';

import Timer from '../Components/Timer';

import Sound from 'react-native-sound';

const ClockScreen = ({navigation, route}) => {
  const sound = require('../Assets/Sounds/beep_beep.mp3');
  const {payload, repetition} = route.params;
  const [next, setNext] = useState(0);
  const [rept, setRept] = useState(1);
  const [playButton, setPlayButton] = useState(false);
  const [start, setStart] = useState(true);
  const [viewList, setViewList] = useState(false);
  const [volume, setVolume] = useState(true);
  const [lock, setLock] = useState(false);
  const [startModal, setStartModal] = useState(true);

  const playSound = () => {
    const soundVar = new Sound(sound, Sound.MAIN_BUNDLE, (err) => {
      if (err) {
        console.log(err);
      }
    });
    setTimeout(() => {
      soundVar.play();
    }, 100);
    soundVar.release();
  };

  useEffect(() => {
    if (volume) playSound();
    else return;
  }, [start]);

  const updateInterval = () => {
    if (next < payload.List.length - 0.5) {
      setNext(next + 0.5);
      console.log('this  is Updation');
      setStart(!start);
    } else {
      if (rept < repetition) {
        setNext(0);
        setStart(!start);
        setRept(rept + 1);
      } else {
        playSound();
        Alert.alert(
          'WELL DONE',
          'Cardio Finished',
          [{text: 'EXIT', onPress: () => navigation.goBack()}],
          {cancelable: false},
        );
      }
    }
  };

  return (
    <ImageBackground
      source={require('../Assets/Images/AppBackground.jpg')}
      style={styles.image}>
      <View
        style={[
          styles.container,
          {backgroundColor: start ? 'rgba(44, 51, 53 , 1)' : '#145A32'},
        ]}>
        <Modal
          transparent={true}
          visible={startModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(52, 73, 94 , 0.7)',
            }}>
            <View
              style={{
                height: '34%',
                width: '70%',
                backgroundColor: '#fff',
                borderRadius: 5,
                elevation: 10,
                padding: 20,
              }}>
              <Text
                style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>
                {payload.Name.toUpperCase()}
              </Text>
              <View
                style={{
                  marginVertical: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.modalText}>Cardio Duration </Text>
                  <Text style={styles.modalText}>
                    {Math.trunc((payload.Duration * repetition) / 60) +
                      ' Min ' +
                      ((payload.Duration * repetition) % 60) +
                      ' Sec'}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.modalText}>Sets</Text>
                  <Text style={styles.modalText}>{repetition}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.modalText}>Exercises</Text>
                  <Text style={styles.modalText}>{payload.Number}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 40,
                }}>
                <TouchableOpacity
                  style={{
                    borderRadius: 5,
                    height: 40,
                    width: 120,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FF362E',
                  }}
                  onPress={() => {
                    setStartModal(false);
                    navigation.goBack();
                  }}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: 'bold',
                      padding: 0,
                      color: '#fff',
                    }}>
                    EXIT
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderRadius: 5,
                    height: 40,
                    width: 120,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#218F76',
                  }}
                  onPress={() => {
                    setStartModal(false);
                    setPlayButton(true);
                    playSound();
                  }}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: 'bold',
                      color: '#fff',
                    }}>
                    START
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.upperContainer}>
          <View style={styles.bar}>
            <View style={styles.statusBar}>
              <Text style={styles.statusText}>REP</Text>
              <Text style={styles.statusText}> REMAINING</Text>
              <Text style={styles.statusText}>SET</Text>
            </View>
            <View
              style={[
                styles.statusBar,
                {
                  paddingTop: 0,
                },
              ]}>
              <Text style={styles.statusText}>
                {Math.trunc(next) + 1}/{payload.Number}
              </Text>
              <Timer
                seconds={payload.Duration * repetition}
                status={playButton}
              />
              <Text style={styles.statusText}>
                {rept}/{repetition}
              </Text>
            </View>
          </View>

          <View style={styles.mainTimer}>
            <CountDown
              size={90}
              until={
                parseInt(
                  next < 0.5
                    ? payload.List[Math.trunc(next)].Sets
                    : !start
                    ? payload.List[Math.trunc(next)].Sets
                    : payload.List[Math.trunc(next)].Reps,
                ) + (next > 0 ? 1 : 0)
              }
              onFinish={() => updateInterval()}
              digitStyle={{height: 100, width: 150}}
              digitTxtStyle={{
                color: '#fff',
                fontSize: 150,
                fontWeight: 'normal',
              }}
              separatorStyle={{
                color: '#fff',
              }}
              timeToShow={['M', 'S']}
              timeLabels={{m: null, s: null}}
              showSeparator
              running={playButton}
            />
          </View>
        </View>

        <View style={styles.middleContainer}>
          <View style={styles.middleBar}>
            {next >= 0 ? (
              <Text
                style={[
                  styles.middleText,
                  {
                    fontSize: 25,
                    color: 'rgba(234, 240, 241 , 0.7)',
                    padding: 5,
                    fontWeight: 'normal',
                    borderTopWidth: 0,
                  },
                ]}>
                {start
                  ? 'REST'
                  : payload.List[
                      Math.trunc(next - 0.5)
                    ].ExerciseName.toUpperCase()}
              </Text>
            ) : (
              <Text></Text>
            )}

            <Text style={styles.middleText}>
              {!start
                ? 'REST'
                : payload.List[Math.trunc(next)].ExerciseName.toUpperCase()}
            </Text>
            {next < payload.List.length - 0.5 ? (
              <Text
                style={[
                  styles.middleText,
                  {
                    fontSize: 25,
                    color: 'rgba(234, 240, 241 , 0.7)',
                    padding: 5,
                    fontWeight: 'normal',
                    borderBottomWidth: 0,
                  },
                ]}>
                {start
                  ? 'REST'
                  : payload.List[
                      Math.trunc(next + 0.5)
                    ].ExerciseName.toUpperCase()}
              </Text>
            ) : (
              <Text
                style={[
                  styles.middleText,
                  {
                    fontSize: 25,
                    color: 'rgba(234, 240, 241 , 0.7)',
                    padding: 5,
                    fontWeight: 'normal',
                    borderBottomWidth: 0,
                  },
                ]}>
                THE END
              </Text>
            )}
          </View>
        </View>
        {lock && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                setLock(!lock);
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 70,
                width: 70,
                borderWidth: 3,
                borderColor: '#fff',
                borderRadius: 35,
              }}>
              <Icon
                name={lock ? 'lock-closed' : 'lock-open'}
                style={{
                  fontSize: 35,
                  color: '#fff',
                }}
                activeOpacity={0.9}
              />
            </TouchableOpacity>
          </View>
        )}
        {!lock && (
          <View style={styles.lowerContainer}>
            <TouchableOpacity
              onPress={() => {
                setVolume(!volume);
              }}>
              <Icon
                name={volume ? 'volume-high' : 'volume-mute'}
                style={{
                  fontSize: 35,
                  color: '#fff',
                }}
                activeOpacity={0.9}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setPlayButton(!playButton);
              }}>
              <View style={styles.startButton}>
                <Text style={styles.startText}>
                  {playButton ? 'PAUSE' : 'RESUME'}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setLock(!lock);
              }}>
              <Icon
                name={lock ? 'lock-closed' : 'lock-open'}
                style={{
                  fontSize: 35,
                  color: '#fff',
                }}
                activeOpacity={0.9}
              />
            </TouchableOpacity>
          </View>
        )}
        {!lock && (
          <View style={styles.bottomContainer}>
            <View style={styles.bottom}>
              <TouchableOpacity
                onPress={() => {
                  setPlayButton(false);
                  Alert.alert(
                    'Warning',
                    'Are you sure want to Exit',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => {
                          console.log('cancled');
                        },
                        style: 'cancel',
                      },
                      {text: 'exit', onPress: () => navigation.goBack()},
                    ],
                    {cancelable: false},
                  );
                }}>
                <Icon
                  name="arrow-back"
                  style={{fontSize: 35, color: '#2C3335'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPlayButton(false);
                  setViewList(!viewList);
                }}>
                <Icon name="list" style={{fontSize: 35, color: '#2C3335'}} />
              </TouchableOpacity>
            </View>
            <View style={styles.list}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={viewList}
                onRequestClose={() => {
                  setViewList(!viewList);
                }}>
                <View style={styles.centeredView}>
                  <TouchableOpacity
                    style={{
                      alignItems: 'flex-end',
                    }}
                    onPress={() => {
                      setViewList(!viewList);
                    }}>
                    <Icon
                      name="close"
                      style={{
                        fontSize: 35,
                        color: '#2C3335',
                      }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 20,
                      padding: 5,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    CARDIO LIST
                  </Text>
                  <ScrollView>
                    {payload.List.map((item) => (
                      <View key={item.id} style={styles.listView}>
                        <View style={styles.listItems}>
                          <Text style={styles.listText}>
                            {item.ExerciseName}
                          </Text>
                          <Text style={styles.listText}>{item.Sets}s</Text>
                        </View>
                        <View style={styles.listItems}>
                          <Text style={styles.listText}>REST</Text>
                          <Text style={styles.listText}>{item.Reps}s</Text>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </Modal>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default ClockScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(44, 51, 53 , 1)',
  },
  upperContainer: {
    flex: 7,
  },
  middleContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleBar: {
    width: '100%',
    alignItems: 'center',
  },
  lowerContainer: {
    flex: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'rgba(39, 44, 46, 1)',
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    elevation: 8,
  },
  middleText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(234, 240, 241 , 0.7)',
    width: '80%',
    textAlign: 'center',
  },
  mainTimer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // skip: {
  //   width: '0%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  statusBar: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusText: {
    fontSize: 18,
    color: '#fff',
  },
  startButton: {
    backgroundColor: '#fff',
    height: 200,
    width: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startText: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  bar: {
    marginTop: 5,
    marginHorizontal: 10,
  },
  remainingTime: {
    fontSize: 70,
  },
  centeredView: {
    flex: 1,
    marginTop: 100,
    backgroundColor: '#fff',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    elevation: 8,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#000',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  listView: {
    //    marginVertical: 5,
    marginHorizontal: 10,
  },
  listItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0,
    marginBottom: 5,
    marginTop: 2.5,
    backgroundColor: 'rgba(39, 44, 46, 0.99)',
    borderRadius: 10,
  },
  listText: {
    fontSize: 25,
    padding: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 18,
    padding: 3,
    fontWeight: 'bold',
  },
});
