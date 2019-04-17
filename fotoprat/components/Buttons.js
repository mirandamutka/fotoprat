import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { Icon } from 'expo';

import Colors from '../constants/Colors';
import style from '../constants/Style';

export class RecordButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={style.roundButton}
        onPress={this.props.function}
      >
        <View style={style.smallCircle} />
      </TouchableOpacity>
    )
  }
}

export class RoundButton extends Component {

  state = {
    pressed: false
  };

  render() {
    return (
      <TouchableOpacity
        style={
          this.state.pressed
            ? style.roundPause
            : style.roundButton

        }
        onPress={() => this.setState({ pressed: !this.state.pressed })}
      >{this.state.pressed === false ?
        <Icon.Ionicons
          name={
            Platform.OS === 'ios'
              ? 'ios-play'
              : 'md-play'
          }
          size={35}
          color={Colors.whiteColor}
        />
        :
        <Icon.Ionicons
          name={
            Platform.OS === 'ios'
              ? 'ios-pause'
              : 'md-pause'
          }
          size={35}
          color={Colors.whiteColor}
        />
        }
      </TouchableOpacity>
    );
  }
}

export class RectangularButton extends Component {

  render() {
    return (
      <TouchableOpacity style={style.rectangularButton}>
        <Text style={style.buttonText}>
          {this.props.buttonText}
        </Text>
      </TouchableOpacity>
    );
  }
}
