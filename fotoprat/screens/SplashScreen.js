import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

class SplashScreen extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Image
          source={require('../assets/images/splashbg.png')}
          style={{
            width: '100%',
            height: '100%'
          }}
          resizeMode={'cover'}
        />
      </View>
    );
  }
}

export default SplashScreen;
