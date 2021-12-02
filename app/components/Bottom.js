'use strict';

import React, { Component } from 'react';
import iconsBottom from '../icons/iconsBottom';
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

export default class Bottom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      params: props.navigation.state.params
    }
    console.log(this.props.type);
  }

  render() {
    return (
      <View style={styles.iconsBottomContainer}>
        <TouchableHighlight style={styles.iconsBottom} underlayColor="none" activeOpacity={0.85}>
          <>
            <Image resizeMode='cover' style={styles.iconBottom} source={{uri: this.props.type == 'index' ? iconsBottom.indexActive : iconsBottom.index}} />
            <Text style={styles.textBottom} allowFontScaling={false}>Index</Text>
          </>
        </TouchableHighlight>
        <TouchableHighlight style={styles.iconsBottom} underlayColor="none" activeOpacity={0.85}>
          <>
            <Image resizeMode='cover' style={styles.iconBottom} source={{uri: this.props.type == 'folder' ? iconsBottom.folderActive : iconsBottom.folder}} />
            <Text style={styles.textBottom} allowFontScaling={false}>Floder</Text>
          </>
        </TouchableHighlight>
        <TouchableHighlight style={styles.iconsBottom, styles.iconsBottomHome} underlayColor="none" activeOpacity={0.85} onPress={() => this.props.navigation.navigate('HomeScreen')}>
          <>
            <Image resizeMode='cover' style={[styles.iconBottom, {width: 30, height: 30}]} source={{uri:this.props.type == 'home' ? iconsBottom.homeActive :  iconsBottom.home}} />
            <Text style={styles.textBottom} allowFontScaling={false}>Home</Text>
          </>
        </TouchableHighlight>
        <TouchableHighlight style={styles.iconsBottom} underlayColor="none" activeOpacity={0.85} onPress={() => this.props.navigation.navigate('ServiceScreen')}>
          <>
            <Image resizeMode='cover' style={styles.iconBottom} source={{uri: this.props.type == 'services' ? iconsBottom.servicesActive : iconsBottom.services}} />
            <Text style={styles.textBottom} allowFontScaling={false}>Services</Text>
          </>
        </TouchableHighlight>
        <TouchableHighlight style={styles.iconsBottom} underlayColor="none" activeOpacity={0.85}>
          <>
            <Image resizeMode='cover' style={styles.iconBottom} source={{uri: this.props.type == 'resources' ? iconsBottom.resourcesActive : iconsBottom.resources}} />
            <Text style={styles.textBottom} allowFontScaling={false}>Resources</Text>
          </>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // iconsBottomContainer
  iconsBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: 40,
    padding: 10,
    backgroundColor: '#FFF'
  },
  iconsBottomHome: {
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {h: 10, w: 10},
    shadowRadius: 8,
    shadowOpacity: 0.3,
    elevation: 5,

    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 10px rgb(167, 167, 167)',
    borderRadius: 70,
    bottom: 35,
    margin: 10
  },
  iconsBottom: {
    flex: 1,
    alignItems: 'center'
  },
  iconBottom: {
    width: 20,
    height: 20,
    marginBottom: 5
  },
  textBottom: {
    fontSize: 12,
    fontWeight: '700'
  }
});
