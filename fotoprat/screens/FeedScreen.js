import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  View,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Icon } from 'expo';

import Posts from '../components/Posts';

import Colors from '../constants/Colors';
import style from '../constants/Style';

export default class FeedScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    modalVisible: true
  };

  moveToCamera = () => {
    this.setState({ modalVisible: !this.state.modalVisible })
    this.props.navigation.navigate('Camera')
  };

  render() {
    return (
      <ScrollView>
        {this.state.modalVisible ?
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <ImageBackground
              source={require('../assets/images/splashbg.png')}
              style={{
                width: '100%',
                height: '100%'
              }}
              resizeMode={'cover'}
            >
              <View style={style.modalContainer}>
                <TouchableOpacity
                  onPress={this.moveToCamera}
                  style={style.cameraButton}
                >
                  <Icon.Ionicons
                    name={
                      Platform.OS === 'ios'
                        ? 'ios-camera'
                        : 'md-camera'
                    }
                    size={75}
                    color={Colors.whiteColor}
                    style={{ alignSelf: 'center', paddingTop: 15 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
                  style={style.rectangularOrangeButton}
                >
                  <Text style={style.buttonText}>SE FLÖDE</Text>
                </TouchableOpacity>
              </View>
              <Image
                source={require('../assets/images/logo.png')}
                style={{
                  height: 120,
                  width: 100,
                  resizeMode: 'contain',
                  alignSelf: 'center'
                }}
              />
            </ImageBackground>
          </Modal>
          :
          <View>
            <View style={style.headerContainer}>
              <Image
                source={require('../assets/images/logo.png')}
                style={{
                  height: 120,
                  width: 100,
                  resizeMode: 'contain',
                  alignSelf: 'center'
                }}
              />
            </View>
            <FlatList
              data={[{ key: 'a' }, { key: 'b' }]}
              renderItem={({ item }) => <Posts />}
            />
          </View>
        }
      </ScrollView>
    );
  }
};
