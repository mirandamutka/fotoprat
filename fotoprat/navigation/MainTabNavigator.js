import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import FeedScreen from '../screens/FeedScreen';
import CameraScreen from '../screens/CameraScreen';
import RecordScreen from '../screens/RecordScreen';

const FeedStack = createStackNavigator({
  Home: FeedScreen
});

FeedStack.navigationOptions = {
  tabBarLabel: 'Feed',
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

const CameraStack = createStackNavigator({
  Camera: CameraScreen,
  Record: RecordScreen
});

CameraStack.navigationOptions = {
  tabBarLabel: 'Camera',
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
      activeTintColor: '#DC8231',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0.2,
        borderTopColor: 'grey'
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
