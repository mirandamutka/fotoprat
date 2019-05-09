import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Modal
} from 'react-native';
import { Audio, Permissions, Icon, FileSystem } from 'expo';
import * as firebase from 'firebase';

import { RecordButton } from '../components/Buttons';
import Colors from '../constants/Colors';
import style from '../constants/Style';

class RecordScreen extends Component {

  static navigationOptions = {
    title: 'Spela in berättelse'
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
      buttonPressed: false,
      isVisible: false,
      imgURL: '',
      recURL: ''
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
    await this.recording.startAsync();
    this.setState({
      isLoading: false,
    });
  };

  uploadPostAsync = async (photoURI, soundURI, uid) => {
    const blobPHOTO = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', photoURI, true);
      xhr.send(null);
    });
    let date = () => {
      today = new Date();
      let yyyy = today.getFullYear();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let hh = today.getHours();
      let mn = today.getMinutes();
      let ss = today.getSeconds();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      if (hh < 10) hh = '0' + hh;
      if (mn < 10) mn = '0' + mn;
      if (ss < 10) ss = '0' + ss;
      return (yyyy + mm + dd + hh + mn + ss);
    };
    let imgName = date() + '-media.jpg'
    const imgRef = firebase.storage().ref(uid).child('images/' + imgName);
    const uploadTaskImg = await imgRef.put(blobPHOTO);

    blobPHOTO.close();

    const blobSOUND = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', soundURI, true);
      xhr.send(null);
    });

    let recName = date() + '-media.mp3'
    const recRef = firebase.storage().ref(uid).child('recordings/' + recName);
    const uploadTaskRec = await recRef.put(blobSOUND);

    blobSOUND.close();

    let imgDLURL = await imgRef.getDownloadURL();
    let imgURL = imgDLURL.toString();

    let recDLURL = await recRef.getDownloadURL();
    let recURL = recDLURL.toString();
    

    const ready = await firebase.database().ref(uid).child('posts/').push({
        imgURL: imgURL,
        recURL: recURL

      })

    if (ready) {
      this.props.navigation.navigate('Home')
      this.setState({ isVisible: false })
    } else {
      console.warn(ready)
    }

  }

  stopRecordingAndEnablePlayback = async () => {
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
    console.warn(`FILE INFO: ${JSON.stringify(soundInfo)}`);
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
    

    firebase.auth().onAuthStateChanged((user) => {
      let photoURI = photo.uri
      let soundURI = soundInfo.uri
      let uid = user.uid
      if (uid) {
        this.uploadPostAsync(photoURI, soundURI, uid);
      } else {
        // User not logged in or has just logged out.
      }
    });
  };

  onRecordPressed = () => {
    if (this.state.isRecording) {
      this.setState({ buttonPressed: false, isVisible: true })
      this.stopRecordingAndEnablePlayback();
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
        <View style={{ height: '100%', justifyContent: 'space-evenly' }}>
          <View>
            {this.state.isVisible &&
              <Modal
                animationType='fade'
                transparent={true}
                visible={this.state.isVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}
              >
                <View style={style.transparentModalContainer}>
                  <ActivityIndicator size='large' color={Colors.orangeColor} />
                </View>
              </Modal>
            }
          </View>
          <Image
            source={photo}
            style={{
              width: '100%',
              height: '75%',
              alignSelf: 'center'
            }}
            resizeMode={'center'}
          />
          <View style={{ alignItems: 'center' }}>
            {this.state.buttonPressed ?
              <TouchableOpacity
                style={[style.roundButton]}
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
