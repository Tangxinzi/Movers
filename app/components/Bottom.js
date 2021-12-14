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
  Linking,
  Appearance
} from 'react-native';

export default class Bottom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      params: props.navigation.state.params
    }
  }

  render() {
    return (
      <View style={styles.iconsBottomContainer}>
        <TouchableHighlight style={styles.iconsBottom} underlayColor="none" activeOpacity={0.85} onPress={() => this.props.navigation.navigate('IndexScreen')}>
          <>
            <View style={styles.iconsContent}>
              <Image resizeMode='cover' style={{...styles.iconBottom, height: this.props.type == 'index' ? 18 : 20 }} source={{uri: this.props.type == 'index' ? iconsBottom.indexActive : iconsBottom.index}} />
            </View>
            <Text style={styles.textBottom} allowFontScaling={false}>Index</Text>
          </>
        </TouchableHighlight>
        <TouchableHighlight style={styles.iconsBottom} underlayColor="none" activeOpacity={0.85} onPress={() => this.props.navigation.navigate('FolderScreen')}>
          <>
            <View style={styles.iconsContent}>
              <Image resizeMode='cover' style={styles.iconBottom} source={{uri: this.props.type == 'folder' ? iconsBottom.folderActive : iconsBottom.folder}} />
            </View>
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
            <View style={styles.iconsContent}>
              <Image resizeMode='cover' style={styles.iconBottom} source={{uri: this.props.type == 'services' ? iconsBottom.servicesActive : iconsBottom.services}} />
            </View>
            <Text style={styles.textBottom} allowFontScaling={false}>Services</Text>
          </>
        </TouchableHighlight>
        <TouchableHighlight style={styles.iconsBottom} underlayColor="none" activeOpacity={0.85} onPress={() => {
          var url = 'https://www.moovaz.com/all-you-need-to-know-about-international-relocation/'
          Linking.canOpenURL(url).then(supported => {
            if (!supported) {
              console.warn('Can\'t handle url: ' + url);
            } else {
              return Linking.openURL(url)
            }
          }).catch(err => console.error('An error occurred', url))
        }}>
          <>
            <View style={styles.iconsContent}>
              <Image resizeMode='cover' style={{...styles.iconBottom, width: 22}} source={{uri: this.props.type == 'resources' ? iconsBottom.resourcesActive : iconsBottom.resources}} />
            </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFF'
  },
  iconsBottomHome: {
    shadowColor: 'rgba(87, 87, 87, 0.8)',
    elevation: 10,
    shadowOffset: {h: 10, w: 10},
    shadowRadius: 8,
    shadowOpacity: 0.3,

    width: 65,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    boxShadow: '4px 4px 20px rgb(74, 74, 74)',
    borderRadius: 65,
    bottom: 15,
    marginLeft: 10,
    marginRight: 10
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
  iconsContent: {
    height: 20,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBottom: {
    fontSize: 12,
    fontWeight: '700'
  }
});
