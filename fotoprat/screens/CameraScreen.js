import React from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  Permissions,
  ScreenOrientation,
  ImagePicker,
  Icon
} from 'expo';

import { RectangularButton } from '../components/Buttons';
import Colors from '../constants/Colors';
import style from '../constants/Style';

export default class CameraScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL);
  };

  componentWillUnmount = () => {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
  }

  state = {
    image: null,
    hasCameraPermission: null,
    hasCameraRollPermission: null
  };

  askCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  askCameraRollPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraRollPermission: status === 'granted' });
  };

  openLibrary = async () => {
    await this.askCameraRollPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: .7,
    });
    this.setState({ image: result.uri });
    {
      this.state.image &&
        await this.props.navigation.navigate('Record', { photo: result.uri })
    }
  };

  openCamera = async () => {
    await this.askCameraPermission();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: .7,
    });
    this.setState({ image: result.uri });
    {
      this.state.image &&
        await this.props.navigation.navigate('Record', { photo: result.uri })
    }
  };

  render() {
    let { image } = this.state;
    return (
      <ImageBackground
        source={require('../assets/images/splashbg.png')}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
        }}>
        <View style={style.modalContainer}>
          <TouchableOpacity
            onPress={this.openLibrary}
          ><Icon.Ionicons
              name={
                Platform.OS === 'ios'
                  ? 'ios-images'
                  : 'md-images'
              }
              size={60}
              color={Colors.orangeColor}
              style={{ alignSelf: 'center', paddingTop: 15 }}
            />
            <Text style={[
              style.buttonText,
              {
                color: Colors.orangeColor,
                paddingTop: '3%'
              }
            ]}
            >
              GALLERI
              </Text>
          </TouchableOpacity>
          <View style={style.verticalDivider} />
          <TouchableOpacity
            onPress={this.openCamera}
          >
            <Icon.Ionicons
              name={
                Platform.OS === 'ios'
                  ? 'ios-camera'
                  : 'md-camera'
              }
              size={75}
              color={Colors.orangeColor}
              style={{ alignSelf: 'center', paddingTop: 15 }}
            />
            <Text
              style={[
                style.buttonText,
                {
                  color: Colors.orangeColor,
                  paddingTop: 0
                }
              ]}
            >
              KAMERA
              </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    width: '100%',
    height: '70%',
    alignSelf: 'center',
  },
  paragraph: {
    fontSize: 18,
    color: '#34495e',
  },
});
