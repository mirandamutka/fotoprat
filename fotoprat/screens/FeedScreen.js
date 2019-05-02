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
  Platform,
  ActivityIndicator
} from 'react-native';
import { Icon } from 'expo';
import * as firebase from 'firebase';

import Posts from '../components/Posts';

import Colors from '../constants/Colors';
import style from '../constants/Style';

let imgURLs = []

export default class FeedScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    modalVisible: true,
    imgSource: []
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      let uid = user.uid
      if (uid) {
        firebase.database().ref(uid).child('posts').on('value', function (snapshot) {
          snapshot.forEach((childSnapshot) => {
            let childKey = childSnapshot.key;
            let childData = childSnapshot.val();
            let imgURL = childData.imgURL;
            imgURLs.push(imgURL)
          })
        })
      } else {
        // User not logged in or has just logged out.
      }
    });
  }

  componentWillUnmount = () => {
    imgURLs = []
  }

  mapPosts = () => {
    return imgURLs.map((data) => {
      console.log('data:', data)
      return (
        <Posts
          key={data}
          photo={data} />
      )
    })
  }

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
                flex: 1,
                width: '100%',
                height: '100%',
              }}>
              <View style={style.modalContainer}>
                <TouchableOpacity
                  onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
                ><Icon.Ionicons
                    name={
                      Platform.OS === 'ios'
                        ? 'ios-images'
                        : 'md-images'
                    }
                    size={60}
                    color={Colors.orangeColor}
                    style={{ alignSelf: 'center', paddingTop: 20 }}
                  />
                  <Text style={[
                    style.buttonText,
                    {
                      color: Colors.orangeColor,
                      paddingTop: '3%'
                    }
                  ]}>SE FLÖDE</Text>
                </TouchableOpacity>
                <View style={style.verticalDivider} />
                <TouchableOpacity
                  onPress={this.moveToCamera}
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
                  <Text style={[style.buttonText, { color: Colors.orangeColor }]}>TA BILD</Text>
                </TouchableOpacity>
              </View>
              <Image
                source={require('../assets/images/logo_grey.png')}
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
                source={require('../assets/images/logo_grey.png')}
                style={{
                  height: 120,
                  width: 100,
                  resizeMode: 'contain',
                  alignSelf: 'center'
                }}
              />
            </View>
            {this.mapPosts()}
          </View>
        }
      </ScrollView>
    );
  }
};
