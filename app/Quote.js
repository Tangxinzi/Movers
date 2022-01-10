'use strict';

import React, { Component } from 'react';
import icons from './icons/Icons';
import Bottom from './components/Bottom';
import Header from './components/Header';
import Footer from './components/Footer';
import ActionSheet from 'react-native-actionsheet';
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
  TextInput,
  View,
  Alert,
  Appearance,
  DeviceEventEmitter
} from 'react-native';

export default class Quote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bearer: null
    }
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
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView stickyHeaderIndices={[0]}>
          <Header {...this.props} />
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Get a Quote</Text>
              <Text style={styles.headerText}>Please complete the form below for a more accurate quote for</Text>
              <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginRight: 15, flexWrap: 'wrap'}}>
                <Text style={styles.headerText}>
                  <Text style={styles.headerText, styles.headerTextDecoration}>Short-term Property Rental </Text>
                  <Text style={styles.headerText}>from</Text>
                  <Text style={styles.headerText, styles.headerTextDecoration}> Le Grove Apartment</Text>
                </Text>
              </View>
            </View>
            <View style={styles.form}>
              <Text style={styles.formText}>* Mandatory fields</Text>
              <Text style={styles.formText}>Estimated Check-in Date *</Text>
              <TextInput allowFontScaling={false} style={styles.textInput} multiline={false} placeholder="" clearButtonMode="while-editing" defaultValue={{}} placeholderTextColor="#CCC" onChangeText={(title) => {}} />
              <Text style={styles.formText}>Estimated Check-out Date *</Text>
              <TextInput allowFontScaling={false} style={styles.textInput} multiline={false} placeholder="" clearButtonMode="while-editing" defaultValue={{}} placeholderTextColor="#CCC" onChangeText={(title) => {}} />
              <Text style={styles.formText}>No. of Adults *</Text>
              <TextInput allowFontScaling={false} style={styles.textInput} multiline={false} placeholder="" clearButtonMode="while-editing" defaultValue={{}} placeholderTextColor="#CCC" onChangeText={(title) => {}} />
              <Text style={styles.formText}>No. of Children *</Text>
              <TextInput allowFontScaling={false} style={styles.textInput} multiline={false} placeholder="" clearButtonMode="while-editing" defaultValue={{}} placeholderTextColor="#CCC" onChangeText={(title) => {}} />
              <Text style={styles.formText}>Budget (per week) </Text>
              <TextInput allowFontScaling={false} style={styles.textInput} multiline={false} placeholder="" clearButtonMode="while-editing" defaultValue={{}} placeholderTextColor="#CCC" onChangeText={(title) => {}} />
            </View>
          </View>
          <Footer />
        </ScrollView>
        <Bottom {...this.props} type="folder" />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'rgb(255, 191, 206)'
  },
  header: {
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    fontSize: 30,
    marginBottom: 20,
    fontFamily: 'Baskerville',
  },
  headerText: {
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 16,
    color: '#212529'
  },
  headerTextDecoration: {
    fontWeight: '600',
    fontSize: 16,
    textDecoration: 'underline',
    textTransform: 'uppercase'
  },
  form: {
    padding: 36,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginTop: 20
  },
  formText: {
    fontSize: 18,
    color: '#75787b',
    marginTop: 25,
    marginBottom: 15,
  },
  textInput: {
    width: '100%',
    borderColor: '#9b9b9b',
    color: '#111',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 15,
    paddingRight: 15,
    minHeight: 50,
    marginTop: 0,
    color: '#111',
    textAlign: 'left',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});
