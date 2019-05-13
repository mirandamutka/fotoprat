import React, { Component } from 'react';
import { 
  View,
  Image, 
  TouchableOpacity,
  Platform
} from 'react-native';
import { Audio, Icon } from 'expo';

import { RectangularButton } from './Buttons';

import style from '../constants/Style';
import Colors from '../constants/Colors';

class Posts extends Component {

  state = {
    isPlaying: false
  };

  componentDidMount = () => {
    this.loadAudio();
  };

  componentWillUnmount = () => {
    this.soundObject.stopAsync();
  };

  loadAudio = async () => {
    this.soundObject = new Audio.Sound();
    try {
      await this.soundObject.loadAsync({ uri: this.props.sound });
    } catch (e) {
      console.warn('ERROR Loading Audio', e);
    }
  };

  toggleAudioPlayback = () => {
    this.setState({
      isPlaying: !this.state.isPlaying,
    }, () => (this.state.isPlaying
      ? this.soundObject.playAsync()
      : this.soundObject.stopAsync()));
  };

  render() {
    return (
      <View style={{ marginBottom: 10 }}>

        <Image
          source={{ uri: this.props.photo }}
          style={{
            width: '100%',
            height: 400,
            alignSelf: 'center'
          }}
        />
        <View style={style.roundButtonContainer}>
        <TouchableOpacity
        style={
          this.state.isPlaying
            ? style.roundPause
            : style.roundButton

        }
        onPress={this.toggleAudioPlayback}
      >
      {this.state.isPlaying === false ?
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
              ? 'ios-square'
              : 'md-square'
          }
          size={35}
          color={Colors.whiteColor}
        />
        }
      </TouchableOpacity>
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
