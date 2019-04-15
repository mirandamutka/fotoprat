import React from 'react';
import {
  Image,
  ScrollView,
  View,
  FlatList
} from 'react-native';

import Posts from '../components/Posts';
import style from '../constants/Style';

export default class FeedScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ScrollView>
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
            data={[{key: 'a'}, {key: 'b'}]}
            renderItem={({ item }) => <Posts />}
          />
        </View>
      </ScrollView>
    );
  }
};
