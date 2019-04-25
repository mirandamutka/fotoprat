import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Audio, Permissions, Icon, FileSystem } from 'expo';
import * as firebase from 'firebase';

import { RecordButton } from '../components/Buttons';
import Colors from '../constants/Colors';
import style from '../constants/Style';

class RecordScreen extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.recording = null;
    this.sound = null;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.state = {
      hasRecordPermission: false,
      isLoading: false,
      isPlaybackAllowed: false,
      soundPosition: null,
      soundDuration: null,
      recordingDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isRecording: false,
      buttonPressed: false
    };
    this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY));

  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({ hasRecordPermission: status === 'granted' });
  };

  soundStatus = status => {
    if (status.isLoaded) {
      this.setState({
        soundDuration: status.durationMillis,
        soundPosition: status.positionMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isPlaybackAllowed: true,
      });
    } else {
      this.setState({
        soundDuration: null,
        soundPosition: null,
        isPlaybackAllowed: false,
      });
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  recordingStatus = status => {
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
      if (!this.state.isLoading) {
        this.stopRecordingAndEnablePlayback();
      }
    }
  };

  async stopPlaybackAndStartRecording() {
    this.setState({
      isLoading: true,
    });
    if (this.sound !== null) {
      await this.sound.unloadAsync();
      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true
    });
    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this.recordingStatus);

    this.recording = recording;
    await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
    this.setState({
      isLoading: false,
    });
  };

  async stopRecordingAndEnablePlayback() {
    this.setState({
      isLoading: true,
    });
    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
    const photo = this.props.navigation.getParam('photo')
    const soundInfo = await FileSystem.getInfoAsync(this.recording.getURI());
    console.log(`FILE INFO: ${JSON.stringify(soundInfo)}`);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true
    });
    const { sound, status } = await this.recording.createNewLoadedSoundAsync(
      {
        isLooping: true
      },
      this.recordingStatus
    );
    this.sound = sound;
    this.setState({
      isLoading: false,
    });
      var key = firebase.database().ref('/posts').push().key
      firebase.database().ref('/posts').child(key).set({ photo: photo, sound: soundInfo })
  };

  onRecordPressed = () => {
    if (this.state.isRecording) {
      this.setState({ buttonPressed: false })
      this.stopRecordingAndEnablePlayback();
      this.props.navigation.navigate('Home', {
        photo: this.props.navigation.getParam('photo')
      })
    } else {
      this.setState({ buttonPressed: true })
      this.stopPlaybackAndStartRecording();
    }
  };

  onPlayPausePressed = () => {
    if (this.sound != null) {
      if (this.state.isPlaying) {
        this.sound.pauseAsync();
      } else {
        this.sound.playAsync();
      }
    }
  };

  onStopPressed = () => {
    if (this.sound != null) {
      this.sound.stopAsync();
    }
  };

  getDuration(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  };

  getRecordingTimestamp() {
    if (this.state.recordingDuration != null) {
      return `${this.getDuration(this.state.recordingDuration)}`;
    }
    return `${this.getDuration(0)}`;
  };

  render() {
    const photo = this.props.navigation.getParam('photo')
    const { hasRecordPermission } = this.state;
    if (hasRecordPermission === null) {
      return <View />;
    } else if (hasRecordPermission === false) {
      return <Text>No access to microphone</Text>;
    } else {
      return (
        <View style={{ height: '100%' }}>
          <Image
            source={photo}
            style={{
              width: '100%',
              height: '80%',
              alignSelf: 'center'
            }}
            resizeMode={'contain'}
          />
          <View style={{ paddingTop: 15, alignItems: 'center' }}>
            {this.state.buttonPressed ?
              <TouchableOpacity
                style={style.roundButton}
                onPress={this.onRecordPressed}
              >
                <Icon.Ionicons
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-square'
                      : 'md-square'
                  }
                  size={35}
                  color={Colors.whiteColor}
                  style={{ paddingRight: 5, paddingTop: 1 }}
                />
              </TouchableOpacity>
              :
              <TouchableOpacity
                style={style.roundButton}
                onPress={() => this.onRecordPressed(photo)}
              >
                <Icon.Ionicons
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-microphone'
                      : 'md-microphone'
                  }
                  size={35}
                  color={Colors.whiteColor}
                  style={{ paddingRight: 5 }}
                />
              </TouchableOpacity>
            }
            {this.state.isRecording ?
              <Text style={style.recordText}>{this.getRecordingTimestamp()}</Text>
              :
              <View />
            }
          </View>
        </View>
      );
    }
  }
}

export default RecordScreen;
