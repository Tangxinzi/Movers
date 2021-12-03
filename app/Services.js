'use strict';

import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Bottom from './components/Bottom';
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

export default class Services extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bearer: null,
      reloDetail: null,
      vendor: []
    }

    AsyncStorage.getItem('bearer')
    .then((response) => {
      this.setState({
        bearer: JSON.parse(response)
      })
      AsyncStorage.getItem('reloDetail')
      .then((response) => {
        console.log(JSON.parse(response));
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
    fetch(`https://api-staging-c.moovaz.com/api/v1/Customer/get-vendor`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ this.state.bearer.jwToken }`,
      },
      body: JSON.stringify({
        "RelocateId": this.state.reloDetail.relocateId,
        "pageNumber": 1,
        "pageSize": 20,
        "filterServices": [],
        "serviceType": "origin",
        "sortBy": "recently_added",
        "sortByType": "desc"
      })
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ vendor: responseData.data.items })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done()
  }

  fetchImage (Id) {
    fetch(`https://api-staging-c.moovaz.com/api/v1/Component/get-file?Id=${ Id }&code=gUIBXx9vpSgY%2F5d0Hunrzw%3D%3D&tick=637740781865806378&type=USERS`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ this.state.bearer.jwToken }`,
      }
    })
    .then(response => response.json())
    .then(responseData => {
      console.log(responseData)
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
            <Text allowFontScaling={false} style={styles.title}>Find the services you need in</Text>
            <View style={styles.countrySelection}>
              <Text allowFontScaling={false} style={[styles.country, {color: '#FFF', backgroundColor: '#000'}]}>Singapore</Text>
              <Text allowFontScaling={false} style={styles.country}>Boston</Text>
            </View>
            <View style={styles.vendoies}>
            {
              this.state.vendor.map((item, key) => {
                return (
                  <View style={styles.vendor} key={key}>
                    <View style={styles.vendorRow}>
                      <Image resizeMode='cover' style={styles.vendorImage} source={{uri: 'https://staging-customerportal.moovaz.com/logo192.png'}} />
                      <View style={styles.vendorContent}>
                        <Text allowFontScaling={false} style={styles.servicesName}>{item.services[0]['name'].toUpperCase()}</Text>
                        <Text allowFontScaling={false} style={styles.companyName}>{item.companyName}</Text>
                        <Text allowFontScaling={false} style={styles.companyName}>{item.priceTierName}</Text>
                      </View>
                    </View>
                    <Text allowFontScaling={false} style={styles.shortDescription}>{item.shortDescription}</Text>
                    <TouchableHighlight style={styles.touchButton} underlayColor="none" activeOpacity={0.85} onPress={() => {

                    }}>
                      <Text allowFontScaling={false} style={styles.statusText}>{item.statusText.toUpperCase()}</Text>
                    </TouchableHighlight>
                  </View>
                )
              })
            }
            </View>
          </View>
          <Footer />
        </ScrollView>
        <Bottom {...this.props} type="services" />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Baskerville',
  },
  countrySelection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 50,
    backgroundColor: '#FFF',
    margin: 20,
    marginTop: 10
  },
  country: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    alignItems: 'center',
    width: 160,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 10,
  },
  vendoies: {
    marginTop: 20,
    backgroundColor: '#FFF',
    minHeight: 800,
    overflow: 'hidden',
    borderRadius: 5
  },
  vendor: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#d3d6d9',
  },
  vendorRow: {
    flexDirection: 'row'
  },
  vendorImage: {
    width: 70,
    height: 70,
    marginRight: 10
  },
  vendorContent: {
    flex: 1
  },
  touchButton: {
    marginTop: 18,
    borderRadius: 23,
    overflow: 'hidden'
  },
  servicesName: {
    color: '#75787b',
    fontsize: 12
  },
  shortDescription: {
    marginTop: 10
  },
  companyName: {
    fontWeight: '700',
    fontSize: 16,
    marginTop: 3,
    marginBottom: 3,
  },
  statusText: {
    color: '#fff',
    backgroundColor: '#e89cae',
    padding: 14,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  }
});
