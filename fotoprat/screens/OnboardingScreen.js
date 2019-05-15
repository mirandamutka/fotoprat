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
    modalVisible: true,
    completedRegister: false,
    error: ''
  };

  regUser = (email, password) => {
    if (this.state.password > 6) {
      console.warn('Lösenordet behöver vara minst 6 tecken')
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(this.regFeedBack)
      .catch((error) => {
        let errorCode = error.code
        let errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          this.onLoginFailure('Weak password!')
        } else {
          this.onLoginFailure(errorMessage)
        }
      })
  };

  logInUser = async (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess)
      .catch((error) => {
        let errorMessage = error.message;
        this.onLoginFailure(errorMessage)
      })
  };

  regFeedBack = () => {
    this.setState({ completedRegister: true })
    setTimeout(() => this.moveToFeed(), 2000)
  };

  onLoginSuccess = async () => {
    this.setState({ modalVisible: false })
    await this.props.navigation.navigate('Feed')
  };

  onLoginFailure = async (errorMessage) => {
    this.setState({ error: errorMessage })
    await this.props.navigation.navigate('Ongoing')
  }

  moveToFeed = async () => {
    this.setState({ modalVisible: false })
    await this.props.navigation.navigate('Feed')
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
            }}
          >
            {!this.state.completedRegister ?
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
                <Text style={style.registerText}>{this.state.error}</Text>
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
              :
              <View style={style.onboardingContainer}>
                <Text style={style.registerText}>Konto har registrerats! Du kommer nu vidare till appen.</Text>
              </View>
            }
          </Modal>
        }
      </View>
    );
  }
};

export default OnboardingScreen;
