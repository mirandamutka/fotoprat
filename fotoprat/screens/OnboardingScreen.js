import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import * as firebase from 'firebase';

import Colors from '../constants/Colors';
import style from '../constants/Style';
import { RectangularButton } from '../components/Buttons';

class OnboardingScreen extends Component {

  state = {
    email: '',
    password: '',
    text: '',
    modalVisible: true
  }

  regUser = (email, password) => {
    try {
      if (this.state.password > 6) {
        console.warn('Lösenordet behöver vara minst 6 tecken')
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
      this.setState({ modalVisible: false })
      this.props.navigation.navigate('Feed')
    }
    catch (error) {
      console.log(error.toString())
        (<View style={{ flex: 1 }}>
          <Text>{error}</Text>
        </View>)
      this.props.navigation.navigate('Onboarding')
    }
  };

  logInUser = async (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
        console.log(user)
      })
      this.setState({ modalVisible: false })
      await this.props.navigation.navigate('Feed')
    }
    catch (error) {
      (
        <View style={{ flex: 1 }}>
          <Text>{error}</Text>
        </View>
      )
    }
  };

  render() {

    return (
      <View>
        {this.state.modalVisible &&
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={style.onboardingContainer}>
              <Text style={style.registerText}>VÄLKOMMEN!</Text>
              <TextInput
                placeholderTextColor={Colors.darkerOrangeColor}
                placeholder='Epost'
                style={style.onboardInput}
                onChangeText={(email) => this.setState({ email })}
              />
              <TextInput
                placeholderTextColor={Colors.darkerOrangeColor}
                placeholder='Lösenord'
                style={style.onboardInput}
                secureTextEntry={true}
                onChangeText={(password) => this.setState({ password })}
              />
              <View style={{ flex: 1 }}>
                <RectangularButton
                  pressed={() => this.regUser(this.state.email, this.state.password)}
                  color={Colors.darkOrangeColor}
                  buttonText={'REGISTRERA'}
                />
                <RectangularButton
                  pressed={() => this.logInUser(this.state.email, this.state.password)}
                  color={Colors.darkOrangeColor}
                  buttonText={'LOGGA IN'}
                />
                <KeyboardAvoidingView
                  behavior="position" keyboardVerticalOffset={-550}
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end'
                  }}>
                  <Image
                    source={require('../assets/images/logo_big.png')}
                    style={{
                      height: 120,
                      width: 100,
                      resizeMode: 'contain',
                      alignSelf: 'center'
                    }}
                  />
                </KeyboardAvoidingView>
              </View>
            </View>
          </Modal>
        }
      </View>
    );
  }
}

export default OnboardingScreen;
