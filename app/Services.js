'use strict';

import React, { Component } from 'react';
import icons from './icons/Icons';
import Header from './components/Header';
import Footer from './components/Footer';
import Bottom from './components/Bottom';
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
  Modal,
  Text,
  View,
  Alert,
  Appearance,
  DeviceEventEmitter
} from 'react-native';

export default class Services extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bearer: null,
      reloDetail: null,
      modalVisible: false,
      vendor: [],
      bodyContent: {
        "RelocateId": "",
        "pageNumber": 1,
        "pageSize": 20,
        "filterServices": [],
        "serviceType": "origin",
        "sortBy": "recently_added",
        "sortByType": "desc"
      },
      list: {
        index: 0,
        active: 'Recently Added',
        type: [
          {
            text: 'Recently Added',
            sortBy: 'recently_added',
            sortByType: 'desc'
          },
          {
            text: 'A - Z',
            sortBy: 'name',
            sortByType: 'asc'
          },
          {
            text: 'Z - A',
            sortBy: 'name',
            sortByType: 'desc'
          },
          {
            text: '$ - $$$',
            sortBy: 'price_tier',
            sortByType: 'asc'
          },
          {
            text: '$$$ - $',
            sortBy: 'price_tier',
            sortByType: 'desc'
          },
        ]
      },
      filter: [
        {
          index: 0,
          title: 'Housing & Home',
          check: false,
          services: [
            {
              serviceId: 1,
              serviceText: 'Air-cooler Services',
              serviceCheck: false,
            },
            {
              serviceId: 3,
              serviceText: 'Curtain Cleaning',
              serviceCheck: false,
            },
            {
              serviceId: 4,
              serviceText: 'Furniture Disposal',
              serviceCheck: false,
            },
            {
              serviceId: 31,
              serviceText: 'Handyman',
              serviceCheck: false,
            },
            {
              serviceId: 2,
              serviceText: 'House Cleaning',
              serviceCheck: false,
            },
            {
              serviceId: 21,
              serviceText: 'Short-term Property Rental',
              serviceCheck: false,
            },
          ]
        },
        {
          index: 1,
          title: 'Family',
          check: false,
          services: [
            {
              serviceId: 13,
              serviceText: 'Housemaid Assistance',
              serviceCheck: false,
            },
          ]
        },
        {
          index: 2,
          title: 'Pets',
          check: false,
          services: [
            {
              serviceId: 17,
              serviceText: 'Pet Relocation',
              serviceCheck: false,
            },
          ]
        },
        {
          index: 3,
          title: 'Money & Finance',
          check: false,
          services: [
            {
              serviceId: 14,
              serviceText: 'Money Transfer / Remittance',
              serviceCheck: false,
            },
          ]
        },
        {
          index: 4,
          title: 'Settling in',
          check: false,
          services: [
            {
              serviceId: 18,
              serviceText: 'Private Transport Hiring',
              serviceCheck: false,
            },
            {
              serviceId: 23,
              serviceText: 'Vehicle Renting',
              serviceCheck: false,
            },
          ]
        },
        {
          index: 5,
          title: 'Moving Services',
          check: false,
          services: [
            {
              serviceId: 32,
              serviceText: 'Baggage & Box Shipping',
              serviceCheck: false,
            },
          ]
        },
        {
          index: 6,
          title: 'Lifestyle & Leisure',
          check: false,
          services: [
            {
              serviceId: 30,
              serviceText: 'Vehicle Selling',
              serviceCheck: false,
            },
          ]
        },
        {
          index: 7,
          title: 'Concierge',
          check: false,
          services: [
            {
              serviceId: 28,
              serviceText: 'Relocation Concierge',
              serviceCheck: false,
            },
          ]
        },
      ]
    }

    this.bearer()
  }

  componentDidMount() {
    this.listener = DeviceEventEmitter.addListener('Change', () => {
      this.bearer()
    })
  }

  bearer () {
    AsyncStorage.getItem('bearer')
    .then((response) => {
      if (response == null) {
        this.props.navigation.navigate('Login')
      } else {
        this.setState({
          bearer: JSON.parse(response)
        })
        AsyncStorage.getItem('reloDetail')
        .then((response) => {
          response = JSON.parse(response)
          var bodyContent = this.state.bodyContent
          bodyContent.relocateId = response.relocateId
          this.setState({
            bodyContent,
            reloDetail: response
          })
          this.fetchData()
        })
        .catch((error) => {
          console.log(error);
        })
        .done()
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .done()
  }

  fetchData () {
    this.setState({vendor: []})
    fetch(`https://api-staging-c.moovaz.com/api/v1/Customer/get-vendor`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ this.state.bearer.jwToken }`,
      },
      body: JSON.stringify(this.state.bodyContent)
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

  service (id, check) {
    var filter = this.state.filter, bodyContent = this.state.bodyContent
    for (var i = 0; i < filter.length; i++) {
      for (var j = 0; j < filter[i].services.length; j++) {
        if (filter[i].services[j].serviceId == id) {
          filter[i].services[j].serviceCheck = !check
        }
      }
    }

    for (var i = 0; i < filter.length; i++) {
      for (var j = 0; j < filter[i].services.length; j++) {
        if (filter[i].services[j].serviceCheck) {
          bodyContent.filterServices.push({
            serviceId: filter[i].services[j].serviceId
          })
        }
      }
    }

    this.setState({ filter, bodyContent })
    this.fetchData()
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView stickyHeaderIndices={[0]}>
          <Header {...this.props} />
          <View style={styles.container}>
            <Text allowFontScaling={false} style={styles.title}>Find the services you need in</Text>
            <View style={styles.countrySelection}>
              <TouchableHighlight underlayColor="none" activeOpacity={0.85} onPress={() => {
                var bodyContent = this.state.bodyContent
                bodyContent.serviceType = 'origin'
                this.setState({ bodyContent })
                this.fetchData()
              }}>
                <Text allowFontScaling={false} style={[styles.country, this.state.bodyContent.serviceType == 'origin' ? styles.activeCountry : '']}>{this.state.reloDetail && this.state.reloDetail.originCountryName}</Text>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="none" activeOpacity={0.85} onPress={() => {
                var bodyContent = this.state.bodyContent
                bodyContent.serviceType = 'destination'
                this.setState({ bodyContent })
                this.fetchData()
              }}>
                <Text allowFontScaling={false} style={[styles.country, this.state.bodyContent.serviceType == 'destination' ? styles.activeCountry : '']}>{this.state.reloDetail && this.state.reloDetail.destCityName}</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.tasksRow}>
              <TouchableHighlight style={styles.tasks} underlayColor="rgba(255, 255, 255, 0.75)" activeOpacity={0.8} onPress={() => this.setState({modalVisible: true})}>
                <>
                  <Text allowFontScaling={false} style={{color: '#909194'}}>Filters</Text>
                  <Image resizeMode='cover' style={{width: 14, height: 14}} source={{uri: icons.addEmpty}} />
                </>
              </TouchableHighlight>
              <TouchableHighlight style={styles.tasks} underlayColor="rgba(255, 255, 255, 0.75)" activeOpacity={0.8} onPress={() => this.ActionSheet.show()}>
                <>
                  <Text allowFontScaling={false} style={{color: '#909194'}}>{this.state.list.type[this.state.list.index].text}</Text>
                  <Image resizeMode='cover' style={styles.tasksIconArrowDown} source={{uri: icons.arrowDown}} />
                  <ActionSheet ref={o => this.ActionSheet = o} title={'Select ...'} options={['Recently Added', 'A - Z', 'Z - A', '$ - $$$', '$$$ - $', 'Cancel']} cancelButtonIndex={5} onPress={(index) => {
                    if (index == 5) {
                      return
                    } else {
                      this.state.list.index = index
                      this.state.list.active = this.state.list.type[index].text
                      this.state.bodyContent.sortBy = this.state.list.type[index].sortBy
                      this.state.bodyContent.sortByType = this.state.list.type[index].sortByType

                      this.setState({list: this.state.list, bodyContent: this.state.bodyContent})
                      this.fetchData()
                    }
                  }} />
                </>
              </TouchableHighlight>
            </View>

            <View style={[styles.vendoies, {display: this.state.vendor.length ? 'flex' : 'none'}]}>
            {
              this.state.vendor.map((item, key) => {
                return (
                  <View style={styles.vendor} key={key}>
                    <View style={styles.vendorRow}>
                      <Image resizeMode='cover' style={styles.vendorImage} source={{uri: 'https://staging-customerportal.moovaz.com/logo192.png'}} />
                      <View style={styles.vendorContent}>
                        <Text allowFontScaling={false} style={styles.servicesName}>{item.services[0] && item.services[0]['name'].toUpperCase()}</Text>
                        <Text allowFontScaling={false} style={styles.companyName}>{item.companyName}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image resizeMode='cover' style={{width: 21, height: 21, marginRight: 5}} source={{uri: icons.money}} />
                          <Text allowFontScaling={false} style={styles.companyName}>{item.priceTierName}</Text>
                        </View>
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
            {
              !this.state.vendor.length ? (
                <View style={{ height: 450, justifyContent: 'center', alignItems: 'center' }}>
                  <Image resizeMode='cover' style={{width: 88, height: 88}} source={{uri: 'https://staging-customerportal.moovaz.com/static/media/loading.b5201de1.gif'}} />
                </View>
              ): <></>
            }
          </View>
          <Footer />
        </ScrollView>

        <Modal animationType="fade" visible={this.state.modalVisible} transparent={true}>
          <ScrollView style={{flex: 1, backgroundColor: '#FFF'}}>
            <View style={styles.modal}>
              {
                this.state.filter.map((item, key) => {
                  return (
                    <View key={key} style={styles.filter}>
                      <TouchableHighlight underlayColor="none" activeOpacity={0.85} onPress={() => {
                        this.state.filter[key].check = !this.state.filter[key].check
                        this.setState({ filter: this.state.filter })
                      }}>
                        <View key={key} style={{...styles.serviceItem, justifyContent: 'space-between'}}>
                          <Text allowFontScaling={false} style={styles.filterText}>{item.title}</Text>
                          <Image resizeMode='cover' style={{width: 16, height: this.state.filter[key].check ? 2 : 16, marginBottom: 5}} source={{uri: this.state.filter[key].check ? icons.minus : icons.addEmpty}} />
                        </View>
                      </TouchableHighlight>
                      <View style={{display: item.check ? 'flex' : 'none'}}>
                      {
                        item.services.map((item, key) => {
                          return (
                            <TouchableHighlight underlayColor="none" activeOpacity={0.85} onPress={() => this.service(item.serviceId, item.serviceCheck)}>
                              <View key={key} style={styles.serviceItem}>
                                <Image resizeMode='cover' style={styles.serviceItemIcon} source={{uri: item.serviceCheck ? icons.checkedBlack : icons.checkedEmpty}} />
                                <Text allowFontScaling={false} style={styles.serviceText}>{item.serviceText}</Text>
                              </View>
                            </TouchableHighlight>
                          )
                        })
                      }
                      </View>
                    </View>
                  )
                })
              }
              <TouchableHighlight underlayColor="none" activeOpacity={0.5} style={styles.touch} onPress={() => this.setState({modalVisible: false})}>
                <Text allowFontScaling={false} style={{textAlign: 'center'}}>Close Modal</Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </Modal>
        <Bottom {...this.props} type="services" />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  // filter
  filter: {
    borderColor: '#d3d6d9',
    borderBottomWidth: 1,
    paddingBottom: 16,
    margin: 20,
    marginTop: 0
  },
  filterText: {
    fontWeight: '700',
    fontSize: 18,
    justifyContent: 'space-between',
    marginBottom: 8
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  serviceItemIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  serviceText: {
    color: '#101820',
    fontSize: 18,
    paddingLeft: 0,
    paddingTop: 8,
    paddingBottom: 8
  },

  // modal
  modal: {
    padding: 15,
    marginTop: 80
  },
  modalTitle: {
    fontWeight: '800',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10
  },
  touch: { backgroundColor: '#FFF', borderWidth: 1, borderColor: 'rgba(204, 204, 204, 0.5)', padding: 15, borderRadius: 5 },

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
    width: 180,
    borderRadius: 25,
    overflow: 'hidden',
    padding: 15,
  },
  activeCountry: {
    color: '#FFF',
    backgroundColor: '#000'
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
  },

  // Recently Added
  tasksRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 15,
  },
  tasks: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginLeft: 8,
    marginRight: 8,
    padding: 13,
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
    width: 18,
    height: 18
  },
});
