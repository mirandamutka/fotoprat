import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';

import style from '../constants/Style';

export default class CameraScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      photo.uri
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
            style={{ flex: 1 }} type={this.state.type}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
              <View style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '100%',
                paddingBottom: 20
              }}>
              <TouchableOpacity
              style={style.roundButton}
              onPress={this.snap}
              >
              <View style={{
                backgroundColor: 'white',
                width: 45,
                height: 45,
                borderRadius: 50,
                position: 'relative',
                bottom: 4,
                right: 2
              }} />
              </TouchableOpacity>
              </View>
            </View>
          </Camera>
      );
    }
  }
}