'use strict';

import React, { Component } from 'react';
import icons from './icons/Icons';
import Header from './components/Header';
import Bottom from './components/Bottom';
import Footer from './components/Footer';
import ActionSheet from 'react-native-actionsheet';
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

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bearer: null,
      reloDetail: null,
      channels: []
    }

    AsyncStorage.getItem('bearer')
    .then((response) => {
      this.setState({
        bearer: JSON.parse(response)
      })
      AsyncStorage.getItem('reloDetail')
      .then((response) => {
        this.setState({
          reloDetail: JSON.parse(response)
        })
        this.fetchData()
      })
      .catch((error) => {
        console.log(error);
      })
      .done()
    })
    .catch((error) => {
      console.log(error);
    })
    .done()
  }

  fetchData () {
    fetch(`https://api-staging-c.moovaz.com/api/v1/Customer/get-channels?RelocateId=${ this.state.reloDetail.relocateId }&PageSize=100`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ this.state.bearer.jwToken }`,
      }
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ channels: responseData.data })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done()
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <Header />
          <View style={styles.container}>
            <Text allowFontScaling={false} style={styles.title}>Who you chatting with</Text>
            <View style={styles.vendoies}>
            {
              this.state.channels.map((item, key) => {
                return (
                  <TouchableHighlight style={styles.channels} key={key} underlayColor="none" activeOpacity={0.85} onPress={() => {

                  }}>
                    <View style={styles.channelsRow}>
                      <View style={styles.channelsContent}>
                        <Text allowFontScaling={false} style={styles.companyName}>{item.groupName}</Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                )
              })
            }
            </View>
          </View>
          <Footer />
        </ScrollView>
        <Bottom {...this.props} type="index" />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 20,
  },
  vendoies: {
    marginTop: 20,
    minHeight: 800,
    overflow: 'hidden',
    borderRadius: 5
  },
  channels: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#d3d6d9',
  },
  channelsRow: {
    flexDirection: 'row'
  },
  channelsImage: {
    width: 70,
    height: 70,
    marginRight: 10
  },
  channelsContent: {
    flex: 1
  },
  touchButton: {
    marginTop: 18,
    borderRadius: 23,
    overflow: 'hidden'
  },
  FolderName: {
    color: '#75787b',
    fontsize: 12
  },
  shortDescription: {
    marginTop: 10
  },
  companyName: {
    color: '#212529',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 3,
    marginBottom: 3,
  },
  uploadedText: {
    color: '#75787b',
    fontSize: 12,
    marginTop: 10.5,
    marginBottom: 3,
  },

  // All Tasks
  tasks: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  taskView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 13,
    borderColor: '#f4f4f4',
    borderRightWidth: 1,
  },
  taskTimeline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 13,
    borderColor: '#f4f4f4',
    borderRightWidth: 1
  },
  tasksIcon: {
    width: 16,
    height: 16,
    marginLeft: 10,
    marginRight: 10
  },
  tasksIconArrowDown: {
    width: 20,
    height: 20
  },
});
