import React, { Component } from 'react';
import Footer from './components/Footer';
import iconsLogin from './icons/iconsLogin';
import iconsBoarding from './icons/iconsBoarding';
import DatePicker from 'react-native-datepicker';
import ActionSheet from 'react-native-actionsheet';
import ModalDropdown from "./components/react-native-modal-dropdown";
import {
  Text,
  View,
  Image,
  Alert,
  Linking,
  StatusBar,
  ScrollView,
  Dimensions,
  FlatList,
  SectionList,
  Platform,
  TextInput,
  AsyncStorage,
  RefreshControl,
  KeyboardAvoidingView,
  ActivityIndicator,
  DeviceEventEmitter,
  TouchableHighlight,
} from 'react-native';

class Boarding extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: (
      <TouchableHighlight
        underlayColor='transparent'
      >
        <>
          <Text allowFontScaling={false} numberOfLines={1} style={{
            fontSize: 17,
            fontWeight: '600',
            color: 'rgba(0, 0, 0, .9)',
            textAlign: 'center',
            marginHorizontal: 0
          }}>Boarding</Text>
        </>
      </TouchableHighlight>
    ),
    headerRight: (
      <TouchableHighlight
        underlayColor='transparent'
        style={{paddingLeft: 10, paddingRight: 10}}
        onPress={() => {

        }}
      >
        <Text allowFontScaling={false} style={{fontSize: 15}}></Text>
      </TouchableHighlight>
    ),
    tabBarVisible: false,
    headerStyle: {
      elevation: 0,
    },
  });

  constructor(props) {
    super(props);

    this.state = {
      bearer: null,
      cities_1_name: [],
      cities_2_name: [],
      cities_3_name: [],
      bodyContent: {
        departingOn: '',
        arrivingOn: '',
      },
      master: {
        travelingFor: []
      },
      who: [
        {
          title: 'Adults',
          num: 0
        },
        {
          title: 'Children',
          num: 0
        },
        {
          title: 'Pets',
          num: 0
        },
      ],
      move: [
        {
          title: 'Job Assignment',
          radio: true,
          icon: iconsBoarding.move.jobAssignment
        },
        {
          title: 'Study',
          radio: false,
          icon: iconsBoarding.move.study
        },
        {
          title: 'Job Seeking',
          radio: false,
          icon: iconsBoarding.move.jobSeeking
        },
        {
          title: 'Immigration',
          radio: false,
          icon: iconsBoarding.move.immigration
        },
        {
          title: 'Family',
          radio: false,
          icon: iconsBoarding.move.family
        },
        {
          title: 'Retirement',
          radio: false,
          icon: iconsBoarding.move.retirement
        },
        {
          title: 'Returning Home',
          radio: false,
          icon: iconsBoarding.move.returningHome
        },
        {
          title: 'Pleasure',
          radio: false,
          icon: iconsBoarding.move.pleasure
        },
        {
          title: 'Others',
          radio: false,
          icon: iconsBoarding.move.other,
        },
      ]
    };

    AsyncStorage.getItem('bearer')
    .then((response) => {
      this.setState({
        bearer: JSON.parse(response)
      })
      this.fetchDataCountry1()
      this.fetchDataCountry2()
      this.fetchDataCountry3()
    })
    .catch((error) => {
      console.log(error);
    })
  }

  fetchDataCountry1 () {
    const jwToken = this.state.bearer.jwToken
    fetch(`https://relo-api.moovaz.com/api/Account/get-cities?CountryId=1`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ jwToken }`,
      }
    })
    .then(response => response.json())
    .then(responseData => {
      var cities_1_name = []
      for (var i = 0; i < responseData.data.length; i++) {
        cities_1_name.push(responseData.data[i].name)
      }
      this.setState({ cities_1_name, cities_1: responseData.data })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
  }

  fetchDataCountry2 () {
    const jwToken = this.state.bearer.jwToken
    fetch(`https://relo-api.moovaz.com/api/Account/get-cities?CountryId=2`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ jwToken }`,
      }
    })
    .then(response => response.json())
    .then(responseData => {
      var cities_2_name = []
      for (var i = 0; i < responseData.data.length; i++) {
        cities_2_name.push(responseData.data[i].name)
      }
      this.setState({ cities_2_name, cities_2: responseData.data })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
  }

  fetchDataCountry3 () {
    const jwToken = this.state.bearer.jwToken
    fetch(`https://relo-api.moovaz.com/api/Account/get-master-data?`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ jwToken }`,
      }
    })
    .then(response => response.json())
    .then(responseData => {
      var cities_3_name = []
      for (var i = 0; i < responseData.data.country.length; i++) {
        cities_3_name.push(responseData.data.country[i].name)
      }
      console.log('cities_3_name', cities_3_name);
      this.setState({ cities_3_name, master: responseData.data })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
  }

  travelingFor (name) {
    var master = this.state.master
    for (var i = 0; i < master.travelingFor.length; i++) {
      if (master.travelingFor[i].name == name) {
        master.travelingFor[i].radio = true
      } else {
        master.travelingFor[i].radio = false
      }
    }
    this.setState({ master })
  }

  onScrollView () {
    this.fetchData()
  }

  render() {
    if (this.state.bearer) {
      return (
        <ScrollView onScroll = {(event) => {{
            console.log(event.nativeEvent.contentOffset.y);//垂直滚动距离
          }}}
          scrollEventThrottle = {200}
        >
          <View style={styles.container}>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
            <View style={styles.header}>
              <Image resizeMode='cover' style={styles.headerLogo} source={{
                uri: 'https://relo-api.moovaz.com/api/v1/Component/get-file?Id=8fafpMxCpfWc10n892Hqmg%3D%3D&code=jvUICPwSsXo%2B8cX1t1a90w%3D%3D&tick=637780094165784581&type=USERS',
                method: 'GET',
                headers: {
                  'Content-Type': 'image/png',
                  'Authorization': `Bearer ${ this.state.bearer.jwToken }`,
                }
              }} />
              <Text allowFontScaling={false} style={styles.headerTitle}>Hi!</Text>
              <Text allowFontScaling={false} style={styles.headerTitle}>I’m your Relocation Buddy.</Text>
              <Text allowFontScaling={false} style={styles.headerText}>Tell me more about your relocation so that I can make it as painless and stress-free as it can be!</Text>
            </View>
            <View style={styles.form}>
              <Text allowFontScaling={false} style={styles.titleInputContainer}>1. Move Details</Text>
              <View style={styles.textInputContainer}>
                <Text allowFontScaling={false} style={{color: 'rgb(51, 51, 51)'}}>You’re moving from*</Text>
                <View style={styles.textInput}>
                  <ModalDropdown textStyle={{fontSize: 14, width: Dimensions.get('window').width - 102}} dropdownStyle={{width: Dimensions.get('window').width - 102}} defaultValue={this.state.cities_3_name[0] || 'Please Select ...'} options={this.state.cities_3_name} />
                </View>
              </View>
              <View style={styles.textInputContainer}>
                <View style={styles.textInput}>
                  <ModalDropdown textStyle={{fontSize: 14, width: Dimensions.get('window').width - 102}} dropdownStyle={{width: Dimensions.get('window').width - 102}} defaultValue={this.state.cities_2_name[0] || 'Please Select ...'} options={this.state.cities_2_name} />
                </View>
              </View>
              <View style={styles.textInputContainer}>
                <Text allowFontScaling={false} style={{color: 'rgb(51, 51, 51)'}}>To*</Text>
                <View style={styles.textInput}>
                  <ModalDropdown textStyle={{fontSize: 14, width: Dimensions.get('window').width - 102}} dropdownStyle={{width: Dimensions.get('window').width - 102}} defaultValue={this.state.cities_3_name[0] || 'Please Select ...'} options={this.state.cities_3_name} />
                </View>
              </View>
              <View style={styles.textInputContainer}>
                <View style={styles.textInput}>
                  <ModalDropdown textStyle={{fontSize: 14, width: Dimensions.get('window').width - 102}} dropdownStyle={{width: Dimensions.get('window').width - 102}} defaultValue={this.state.cities_2_name[0] || 'Please Select ...'} options={this.state.cities_2_name} />
                </View>
              </View>
              <View style={styles.textInputContainer}>
                <Text allowFontScaling={false} style={{color: 'rgb(51, 51, 51)'}}>Departing On*</Text>
                <DatePicker
                  style={[styles.textInput, {padding: 5, paddingLeft: 15, flexDirection: 'column'}]}
                  customStyles={{
                    dateInput: {
                      borderWidth: 0,
                      justifyContent: 'center',
                      alignItems: 'flex-start'
                    }
                  }}
                  date={this.state.bodyContent.departingOn}
                  mode="date"
                  placeholder="Select Date ..."
                  format="YYYY-MM-DD"
                  minDate=""
                  maxDate=""
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  onDateChange={(departingOn) => {
                    this.state.bodyContent.departingOn = departingOn
                    this.setState({bodyContent: this.state.bodyContent})
                  }}
                />
              </View>
              <View style={styles.textInputContainer}>
                <Text allowFontScaling={false} style={{color: 'rgb(51, 51, 51)'}}>Arriving On</Text>
                <DatePicker
                  style={[styles.textInput, {padding: 5, paddingLeft: 15, flexDirection: 'column'}]}
                  customStyles={{
                    dateInput: {
                      borderWidth: 0,
                      justifyContent: 'center',
                      alignItems: 'flex-start'
                    }
                  }}
                  date={this.state.bodyContent.arrivingOn}
                  mode="date"
                  placeholder="Select Date ..."
                  format="YYYY-MM-DD"
                  minDate=""
                  maxDate=""
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  onDateChange={(arrivingOn) => {
                    this.state.bodyContent.arrivingOn = arrivingOn
                    this.setState({bodyContent: this.state.bodyContent})
                  }}
                />
              </View>
            </View>
            <View style={styles.textSubmitFoot}>
              <TouchableHighlight underlayColor='transparent' style={styles.touch} onPress={() => {}}>
                <Text allowFontScaling={false} numberOfLines={1} style={styles.touchText}>NEXT</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.form}>
              <Text allowFontScaling={false} style={styles.titleInputContainer}>2. What has inspired your move?</Text>
              {
                this.state.master.travelingFor.map((item, key) => {
                  return (
                    <TouchableHighlight key={key} activeOpacity={0.9} underlayColor="none" style={styles.item} onPress={() => {
                      this.travelingFor(item.name)
                    }}>
                      <>
                        <Image resizeMode='cover' style={styles.radio} source={{uri: item.radio ? iconsBoarding.radio : iconsBoarding.rectangle}} />
                        <Text style={styles.moveText} allowFontScaling={false}>{item.name}</Text>
                        <Image resizeMode='cover' style={styles.moveImage} source={{
                          uri: item.icon,
                          method: 'GET',
                          headers: {
                            'Content-Type': 'image/png',
                            'Authorization': `Bearer ${ this.state.bearer.jwToken }`,
                          }
                        }} />
                      </>
                    </TouchableHighlight>
                  )
                })
              }
            </View>
            <View style={styles.textSubmitFoot}>
              <TouchableHighlight underlayColor='transparent' style={styles.touch} onPress={() => {}}>
                <Text allowFontScaling={false} numberOfLines={1} style={styles.touchText}>NEXT</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.form}>
              <Text allowFontScaling={false} style={styles.titleInputContainer}>3. Who’s moving with you?</Text>
              {
                this.state.who.map((item, key) => {
                  return (
                    <View key={key} activeOpacity={0.9} underlayColor="none" style={styles.whoItem}>
                      <>
                        <Text style={styles.whoText} allowFontScaling={false}>{item.title}</Text>
                        <View style={styles.active}>
                          <TouchableHighlight key={key} activeOpacity={0.9} underlayColor="none" onPress={() => {
                            var who = this.state.who
                            if (item.title == 'Adults' && who[0].num > 0) {
                              who[0].num -= 1
                            }

                            if (item.title == 'Children' && who[1].num > 0) {
                              who[1].num -= 1
                            }

                            if (item.title == 'Pets' && who[2].num > 0) {
                              who[2].num -= 1
                            }

                            this.setState({ who })
                          }}>
                            <Image resizeMode='cover' style={styles.activeImage} source={{uri: item.num == 0 ? iconsBoarding.minusDisable : iconsBoarding.minus}} />
                          </TouchableHighlight>
                          <View style={styles.activeContent}>
                            <Text style={styles.activeText} allowFontScaling={false}>{item.num}</Text>
                          </View>
                          <TouchableHighlight key={key} activeOpacity={0.9} underlayColor="none" onPress={() => {
                            var who = this.state.who
                            if (item.title == 'Adults') {
                              who[0].num += 1
                            }

                            if (item.title == 'Children') {
                              who[1].num += 1
                            }

                            if (item.title == 'Pets') {
                              who[2].num += 1
                            }

                            this.setState({ who })
                          }}>
                            <Image resizeMode='cover' style={styles.activeImage} source={{uri: iconsBoarding.plus}} />
                          </TouchableHighlight>
                        </View>
                      </>
                    </View>
                  )
                })
              }
            </View>
            <View style={styles.textSubmitFoot}>
              <TouchableHighlight underlayColor='transparent' style={styles.touch} onPress={() => {}}>
                <Text allowFontScaling={false} numberOfLines={1} style={styles.touchText}>NEXT</Text>
              </TouchableHighlight>
            </View>
          </View>
          <Footer />
        </ScrollView>
      )
    } else {
      return <></>
    }
  }
}

const styles = {
  container: {
    position: 'relative',
    padding: 30,
    width: '100%'
  },

  // who
  whoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  active: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  whoText: {
    fontSize: 16,
    flex: 1
  },
  activeImage: {
    width: 32,
    height: 32,
  },
  activeContent: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#D3D6D9',
    borderRadius: 5,
    width: 40,
    height: 40,
    marginLeft: 15,
    marginRight: 15
  },
  activeText: {
    fontSize: 16,
  },

  // item
  item: {
    backgroundColor: '#F4F4F4',
    padding: 20,
    height: 80,
    borderRadius: 8,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative'
  },
  moveText: {
    fontSize: 17
  },
  moveImage: {
    width: 82,
    height: 60,
    position: 'absolute',
    bottom: 0,
    right: 0
  },

  // header
  header: {
    alignItems: 'center',
  },
  headerLogo: {
    marginTop: 40,
    marginBottom: 40,
    width: 134,
    height: 76,
  },
  headerTitle: {
    fontFamily: 'Baskerville',
    textAlign: 'center',
    fontSize: 32,
  },
  headerText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 30
  },
  form: {
    position: 'relative',
    padding: 20,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10
  },
  textInput: {
    width: '100%',
    borderColor: '#d3d6d9',
    borderWidth: 1,
    borderRadius: 4,
    padding: 15,
    // height: 43,
    marginTop: 10,
    fontWeight: '700',
    borderRadius: 0,
    color: '#111',
    textAlign: 'left'
  },
  textInputView: {
    width: '100%',
    borderColor: '#d3d6d9',
    borderWidth: 1,
    borderRadius: 4,
    padding: 15,
    height: 50,
    marginTop: 10,
    fontWeight: '700',
    borderRadius: 0,
    color: '#111',
    textAlign: 'left'
  },
  titleInputContainer: {
    opacity: .8,
    fontWeight: '700',
    fontSize: 20,
    color: '#000',
    marginBottom: 30
  },
  textSubmitFoot: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'flex-end',
  },
  textInputContainer: {
    width: '100%',
    marginBottom: 30
  },
  radio: { width: 22, height: 22, marginRight: 11, },
  touch: { backgroundColor: '#FFF', borderWidth: 0.5, borderColor: '#E89CAE', width: 145, height: 46, justifyContent: 'center', borderRadius: 23 },
  touchText: { fontSize: 16, fontWeight: '600', color: '#e89cae', textAlign: 'center', marginHorizontal: 16 }
}

module.exports = Boarding;
