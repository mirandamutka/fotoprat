import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import { RectangularButton, RoundButton } from './Buttons';

import style from '../constants/Style';
import Colors from '../constants/Colors';

class Posts extends Component {

  state = {
  };

  render() {
    return (
      <View style={{ marginBottom: 10 }}>

        <Image
          source={{uri: this.props.photo}}
          style={{
            width: '100%',
            height: 300,
            alignSelf: 'center'
          }}
          />
        <View style={style.roundButtonContainer}>
          <RoundButton />
        </View>
        <View style={style.rectButtonContainer}>
          <RectangularButton
            color={Colors.orangeColor}
            buttonText={'DELA'}
          />
          <RectangularButton
            color={Colors.orangeColor}
            buttonText={'SPARA'}
          />
        </View>
      </View>
    );
  }
}

export default Posts;
