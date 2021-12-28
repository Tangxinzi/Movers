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

export default class Inbox extends React.Component {
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
    const jwToken = this.state.bearer.jwToken
    fetch(`https://api-staging-c.moovaz.com/api/v1/Customer/get-channels?RelocateId=${ this.state.reloDetail.relocateId }&PageSize=100`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ jwToken }`,
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

  getCompanyInfo (accountId, key) {
    const channels = this.state.channels
    const jwToken = this.state.bearer.jwToken

    if (channels[key]['companyOpen']) {
      channels[key]['companyOpen'] = false
      this.setState({ channels })
      return
    } else {
      channels[key]['companyOpen'] = true
    }

    fetch(`https://api-staging-c.moovaz.com/api/v1/Customer/get-company-info?PartnerId=${ accountId }`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ jwToken }`,
      }
    })
    .then(response => response.json())
    .then(responseData => {
      channels[key]['company'] = responseData.data
      channels[key]['companyOpen'] = true
      this.setState({ channels })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done()
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView stickyHeaderIndices={[0]}>
          <Header />
          <View style={styles.container}>
            <Text allowFontScaling={false} style={styles.title}>Who you chatting with</Text>
            <View style={styles.vendoies}>
            {
              !this.state.channels.length ? (
                <View style={{ height: 350, justifyContent: 'center', alignItems: 'center' }}>
                  <Image resizeMode='cover' style={{width: 88, height: 88}} source={{uri: 'https://staging-customerportal.moovaz.com/static/media/loading.b5201de1.gif'}} />
                </View>
              ): <></>
            }
            {
              this.state.channels.map((item, key) => {
                if (item.statusValue) {
                  return (
                    <View style={styles.channelsRow} key={key}>
                      <TouchableHighlight style={styles.channels} key={key} underlayColor="none" activeOpacity={0.85} onPress={() => this.getCompanyInfo(item.accountId, key)}>
                        <View style={styles.channelsContent}>
                          <Text allowFontScaling={false} style={styles.companyName}>{item.serviceName}</Text>
                          <Image resizeMode='cover' style={{width: 14, height: !item.companyOpen ? 16 : 2}} source={{uri: !item.companyOpen ? icons.addEmpty : icons.minus}} />
                        </View>
                      </TouchableHighlight>
                      {
                        item.companyOpen ? (
                          <View style={styles.channelsFoot}>
                            <View style={styles.channelsFootRow}>
                              <Image resizeMode='cover' style={styles.companyImage} source={{
                                uri: item.company.profile.logo,
                                method: 'GET',
                                headers: {
                                  'Content-Type': 'image/png',
                                  'Authorization': `Bearer ${ this.state.bearer.jwToken }`,
                                }
                              }} />
                              <View style={{flexDirection: 'column'}}>
                                <Text allowFontScaling={false} style={[styles.companyText, {fontWeight: '700', marginBottom: 2}]}>{item.company.profile.firstName}</Text>
                                <Text allowFontScaling={false} style={{fontSize: 13}}>{item.company.profile.name}</Text>
                                <Text allowFontScaling={false} style={[styles.companyText, {fontSize: 13, color: 'gray'}]}>{item.messageLastModified}</Text>
                              </View>
                            </View>
                          </View>
                        ) : <></>
                      }
                    </View>
                  )
                }
              })
            }
            </View>
          </View>
          <Footer />
        </ScrollView>
        <Bottom {...this.props} type="inbox" />
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
    minHeight: 400,
    overflow: 'hidden',
    borderRadius: 5
  },
  channels: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  channelsRow: {
    borderBottomWidth: 1,
    borderColor: '#000',
    // flexDirection: 'row'
  },
  channelsImage: {
    width: 70,
    height: 70,
    marginRight: 10
  },
  channelsContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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

  channelsFoot: {
    paddingBottom: 15,
  },
  channelsFootRow: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  companyImage: {
    height: 40,
    width: 40,
    borderRadius: 40,
    marginRight: 10
  }
});
