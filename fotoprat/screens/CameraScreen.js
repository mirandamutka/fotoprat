import React from 'react';
import { Text, View, Platform } from 'react-native';
import { Camera, Permissions } from 'expo';

import { RecordButton } from '../components/Buttons';
import style from '../constants/Style';

const DESIRED_RATIO = "1:1";

export default class CameraScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    processing: false
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  snap = async () => {
    this.setState({ processing: !this.state.processing })
    if (this.camera) {
      // console.log('')

      const photo = await this.camera.takePictureAsync()

      this.setState({ photo })
    }
    await this.props.navigation.navigate('PhotoPreview', { photo: this.state.photo })
    this.setState({ processing: !this.state.processing })
  };

  prepareRatio = async () => {
    if (Platform.OS === 'android' && this.camera) {
      const ratios = await this.camera.getSupportedRatiosAsync();

      // See if the current device has your desired ratio, otherwise get the maximum supported one
      // Usually the last element of "ratios" is the maximum supported ratio
      const ratio = ratios.find((ratio) => ratio === DESIRED_RATIO) || ratios[ratios.length - 1];

      this.setState({ ratio });
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <Camera
          ref={ref => { this.camera = ref; }}
          style={{ flex: 2 }} type={this.state.type}
          onCameraReady={this.prepareRatio} // You can only get the supported ratios when the camera is mounted
          ratio={'1:1'}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
            <View style={style.captureButtonContainer}>
              {this.state.processing &&
                <Text style={style.whiteText}>Taking picture...</Text>
              }
              <RecordButton
                function={this.snap}
              />
            </View>
          </View>
        </Camera>
      );
    }
  }
}