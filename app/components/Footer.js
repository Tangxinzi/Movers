'use strict';

import React, { Component } from 'react';
import icons from '../icons/Icons';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
  TouchableHighlight,
  FlatList,
  Dimensions,
  Image,
  Text,
  View,
  Alert,
  Appearance
} from 'react-native';

export default class Footer extends React.Component {
  render() {
    return (
      <View style={styles.footer}>
        <Image resizeMode='cover' style={styles.footerImage} source={{uri: icons.footer}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  footerImage: {
    width: '100%',
    height: 180,
    marginBottom: 40
  }
});
