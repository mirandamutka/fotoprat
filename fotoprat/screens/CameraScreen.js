import React from 'react';
import { Text, View, Platform, Modal } from 'react-native';
import { Camera, Permissions, ScreenOrientation } from 'expo';

import { RecordButton } from '../components/Buttons';
import Colors from '../constants/Colors';
import style from '../constants/Style';

const DESIRED_RATIO = '16:9';

export default class CameraScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    processing: false,
    modalVisible: true,
    pictureSize: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL);
  };

  componentWillUnmount = () => {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
  }

  snap = async () => {
    if (this.camera) {

      let photo = await new Promise(async resolve => {
        await this.camera.takePictureAsync({ onPictureSaved: resolve });
        this.camera.pausePreview();
      })
      this.camera.resumePreview();

      this.setState({ photo })
    }
    this.setState({ modalVisible: false })
    await this.props.navigation.navigate('Record', { photo: this.state.photo })
  };

  prepareRatio = async () => {
    if (Platform.OS === 'android' && this.camera) {
      const ratios = await this.camera.getSupportedRatiosAsync();

      // See if the current device has your desired ratio, otherwise get the maximum supported one
      // Usually the last element of "ratios" is the maximum supported ratio
      const ratio = ratios.find((ratio) => ratio === DESIRED_RATIO) || ratios[ratios.length - 1];
      const sizes = await this.camera.getAvailablePictureSizesAsync(ratio);
      const desiredSize = sizes[0];

      this.setState({ ratio, pictureSize: desiredSize });
      console.warn('Ratio:', ratios)
      console.warn('Sizes:', sizes[0])
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
            style={{
              width: '100%',
              height: '100%',
              alignSelf: 'center'
            }}
            type={this.state.type}
            onCameraReady={this.prepareRatio} // You can only get the supported ratios when the camera is mounted
            ratio={this.state.ratio}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row'
              }}>
              <View style={style.captureButtonContainer}>
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