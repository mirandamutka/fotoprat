import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { RectangularButton, RoundButton } from './Buttons';

import style from '../constants/Style';

class Posts extends Component {

  state = {
  };

  render() {
    return (
      <View style={{ marginBottom: 10 }}>

        <View style={{
          width: '100%',
          height: 300,
          borderWidth: 1,
          borderColor: '#E0E0E0',
          alignSelf: 'center'
        }} />
        <View style={style.roundButtonContainer}>
          <RoundButton />
        </View>
        <View style={style.rectButtonContainer}>
          <RectangularButton
            buttonText={'DELA'}
          />
          <RectangularButton
            buttonText={'SPARA'}
          />
        </View>
      </View>
    );
  }
}

export default Posts;
