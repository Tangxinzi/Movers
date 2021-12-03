'use strict';

import React, { Component } from 'react';
import iconsHeader from '../icons/iconsHeader';
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
      <View style={styles.header}>
        <Text style={styles.headerIcon}></Text>
        <Image resizeMode='cover' style={styles.headerImage} source={{uri: iconsHeader.logo}} />
        <Image resizeMode='cover' style={styles.headerIcon} source={{uri: iconsHeader.icon}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15
  },
  headerImage: {
    width: 76,
    height: 58
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 32
  }
});
