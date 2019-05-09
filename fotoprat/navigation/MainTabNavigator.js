import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import Colors from '../constants/Colors';

import TabBarIcon from '../components/TabBarIcon';
import FeedScreen from '../screens/FeedScreen';
import CameraScreen from '../screens/CameraScreen';
import RecordScreen from '../screens/RecordScreen';

const FeedStack = createStackNavigator({
  Home: FeedScreen
});

FeedStack.navigationOptions = {
  tabBarLabel: 'Flöde',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-photos'
          : 'md-photos'
      }
    />
  ),
};

const CameraStack = createStackNavigator(
  {
    Camera: CameraScreen,
    Record: RecordScreen
  },
  {
    headerLayoutPreset: 'center',
  }
);

CameraStack.navigationOptions = {
  tabBarLabel: 'Kamera',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-camera'
          : 'md-camera'
      }
    />
  ),
};

export default createMaterialTopTabNavigator({
  FeedStack,
  CameraStack,
},

  {
    tabBarOptions: {
      activeTintColor: Colors.darkOrangeColor,
      inactiveTintColor: Colors.greyColor,
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0.2,
        borderTopColor: Colors.greyColor
      },
      indicatorStyle: {
        height: 0
      },
      showLabel: false,
      showIcon: true
    },
    swipeEnabled: true,
    tabBarPosition: 'bottom'
  },
);
