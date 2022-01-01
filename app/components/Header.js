'use strict';

import React, { Component } from 'react';
import iconsHeader from '../icons/iconsHeader';
import DashLine from './DashLine';
import Moment from 'moment';
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

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bearer: {
        jwToken: ''
      },
      reloDetail: {
        partnerLogo: ''
      },
      profile: {
        userImg: ''
      }
    }

    AsyncStorage.getItem('bearer')
    .then((response) => {
      this.setState({
        bearer: JSON.parse(response)
      })
    })
    .catch((error) => {
      console.log('error', error)
    })


    AsyncStorage.getItem('profile')
    .then((response) => {
      const profile = JSON.parse(response)
      console.log('HeaderProfile', profile.userImg)
      this.setState({ profile })
    })
    .catch((error) => {
      console.log(error);
    })


    AsyncStorage.getItem('reloDetail')
    .then((response) => {
      this.setState({
        reloDetail: JSON.parse(response)
      })
    })
    .catch((error) => {
      console.log(error);
    })

  }

  render() {
    return (
      <>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <View style={{backgroundColor: 'rgb(255, 185, 0)', height: 8}}></View>
        <View style={styles.header}>
          <Text style={styles.headerIcon} onPress={() => this.props.navigation.navigate('Boarding')}>Board</Text>
          <View style={styles.headerImageContent}>
            <Image resizeMode='cover' style={styles.headerImage} source={{
              uri: this.state.reloDetail && this.state.reloDetail.partnerLogo,
              method: 'GET',
              headers: {
                'Content-Type': 'image/png',
                'Authorization': `Bearer ${ this.state.bearer && this.state.bearer.jwToken }`,
              }
            }} />
          </View>
          <Image resizeMode='cover' style={styles.headerIcon} source={{
            uri: this.state.profile.userImg,
            method: 'GET',
            headers: {
              'Content-Type': 'image/png',
              'Authorization': `Bearer ${ this.state.bearer && this.state.bearer.jwToken }`,
            }
          }} />
        </View>
        <View style={styles.bar}>
          {
            this.state.reloDetail ? <View style={styles.barDetailText}>
              <Text style={styles.barDetail}>{this.state.reloDetail.originCountryName}</Text>
              <Text style={styles.barText}> to </Text>
              <Text style={styles.barDetail}>{this.state.reloDetail.destCityName}</Text>
              <Text style={styles.barText}> on </Text>
              <Text style={styles.barDetail}>{Moment(this.state.reloDetail.moveDate).format("DD MMM YYYY")}</Text>
            </View> : <View></View>
          }
          <View>
            <Text style={styles.barEdit}>EDIT</Text>
            <DashLine style={styles.dotLine} color={'#ffc0cb'} lineWidth={1.2} />
          </View>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    // display: 'none',
    // position: 'absolute',
    // top: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    zIndex: 9999
  },
  headerImageContent: {
    flex: 1,
    alignItems: 'center'
  },
  headerImage: {
    width: 76,
    height: 58
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 32
  },

  // bar
  bar: {
    backgroundColor: '#000',
    flexDirection: 'row',
    padding: 20,
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'space-between'
  },
  barDetailText: {
    flexDirection: 'row',
  },
  barDetail: {
    fontWeight: '800',
    color: '#FFF'
  },
  barText: {
    color: '#FFF'
  },
  barEdit: {
    color: 'pink',
    fontWeight: '800'
  },
  dotLine: {

  }
});
