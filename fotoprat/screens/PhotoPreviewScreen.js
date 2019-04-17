import React, { Component } from 'react';
import { View, ScrollView, Text, Image } from 'react-native';

import { RecordButton } from '../components/Buttons';

class PhotoPreviewScreen extends Component {

  static navigationOptions = {
    title: 'Spela in berättelse'
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const photo = this.props.navigation.getParam('photo')
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
          <RecordButton />
        </View>
      </View>
    );
  }
}

export default PhotoPreviewScreen;
