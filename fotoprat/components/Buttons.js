import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import style from '../constants/Style';

export class RectangularButton extends Component {

  render() {
    return (
      <TouchableOpacity
      onPress={this.props.pressed}
      style={[style.rectangularButton, {backgroundColor: this.props.color}]}>
        <Text style={style.buttonText}>
          {this.props.buttonText}
        </Text>
      </TouchableOpacity>
    );
  }
}
