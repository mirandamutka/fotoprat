import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';

import { RoundButton, RectangularButton } from './components/Buttons';
import AppNavigator from './navigation/AppNavigator';
import * as firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyBjFEsO3tHzIO9qd1ZuBII7geWgSKG4bPk',
    authDomain: 'fotoprat-7256a.firebaseapp.com',
    databaseURL: 'https://fotoprat-7256a.firebaseio.com',
    projectId: 'fotoprat-7256a',
    storageBucket: 'fotoprat-7256a.appspot.com',
    messagingSenderId: '730940702005'
};

firebase.initializeApp(config);

export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
    };

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <View style={styles.container}>
                    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                    <AppNavigator />
                </View>
            );
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
            ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Icon.Ionicons.font,
                // We include SpaceMono because we use it in HomeScreen.js. Feel free
                // to remove this if you are not using it in your app
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
            }),
        ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        ...Platform.select({
            ios: {
                paddingBottom: 20
            }
        })
    },
});
