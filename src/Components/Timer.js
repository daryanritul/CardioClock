import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import CountDown from 'react-native-countdown-component';

const Timer = ({seconds, status}) => {
  return (
    <CountDown
      until={seconds}
      digitStyle={{width: 20, height: 35}}
      digitTxtStyle={{color: '#fff', fontWeight: 'normal', fontSize: 18}}
      separatorStyle={{
        color: '#fff',
        fontSize: 18,
      }}
      timeToShow={['H', 'M', 'S']}
      timeLabels={{h: null, m: null, s: null}}
      showSeparator
      running={status}
    />
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: 'rgba(236, 240, 241, 0.5)',
    height: 100,
    width: '95%',
    borderRadius: 5,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleNumber: {
    fontSize: 75,
    fontWeight: 'bold',
  },
  circleText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#616C6F',
  },
});

export default Timer;
