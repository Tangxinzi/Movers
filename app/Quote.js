'use strict';

import React, { Component } from 'react';
import icons from './icons/Icons';
import Bottom from './components/Bottom';
import Header from './components/Header';
import Footer from './components/Footer';
import DatePicker from 'react-native-datepicker';
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
      bearer: null,
      questions: null
    }

    this.bearer()
  }

  componentDidMount() {
  }

  bearer () {
    AsyncStorage.getItem('bearer')
    .then((response) => {
      this.setState({
        bearer: JSON.parse(response)
      })

      fetch(`https://relo-api.moovaz.com/api/v1/Customer/get-quote-form?PartnerId=44dbd90f-1ed3-11ec-8adc-06412451f802&RelocateId=733d93d6-0e52-4013-8f6a-ad46a8a28734&serviceId=7`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ this.state.bearer.jwToken }`,
        }
      })
      .then(response => response.json())
      .then(responseData => {
        console.log('questions: ', responseData.data.questions);
        this.setState({ questions: responseData.data.questions })
      })
      .catch((error) => {
        console.log('err: ', error)
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  fetchData () {

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
              {
                this.state.questions && this.state.questions.map((items, index) => {
                  return (
                    <View>
                      <Text style={styles.formText}>{items.question}</Text>
                      {
                        items.typeName == "Dropdown" && items.options ? (
                          <>
                            <View style={styles.textInput}></View>
                            <ActionSheet ref={o => this.ActionSheet = o} title={'Select ...'} options={['Recently Added', 'A - Z', 'Z - A', '$ - $$$', '$$$ - $', 'Cancel']} cancelButtonIndex={5} onPress={(index) => this.ActionSheet.show()} />
                          </>
                        ) : (<></>)
                      }
                      {
                        items.options && items.options.map((item, key) => {
                          if (items.typeName == "Date Picker(Specific date)") {
                            return (
                              <TextInput allowFontScaling={false} style={styles.textInput} multiline={false} placeholder="" clearButtonMode="while-editing" defaultValue={item.answer} placeholderTextColor="#CCC" onChangeText={(title) => {}} />
                            )
                          }

                          if (items.typeName == "Date Picker(Specific date)") {
                            return (
                              <DatePicker
                                style={[styles.textInput, {padding: 5, flexDirection: 'column'}]}
                                customStyles={{
                                  dateInput: {
                                    borderWidth: 0,
                                    justifyContent: 'center',
                                    alignItems: 'flex-start'
                                  }
                                }}
                                date={item.answer}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate=""
                                maxDate=""
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                              />
                            )
                          }

                          if (items.typeName == 'Paragraph') {
                            return (
                              <TextInput
                                allowFontScaling={false}
                                style={styles.paragraphInput}
                                placeholder=""
                                clearButtonMode="while-editing"
                                defaultValue={item.answer}
                                placeholderTextColor="#CCC"
                                multiline={true}
                              />
                            )
                          }
                        })
                      }
                    </View>
                  )
                })
              }
            </View>
            <View style={styles.buttons}>
              <TouchableHighlight underlayColor="none" activeOpacity={0.85} style={styles.button} onPress={() => {

              }}>
                <Text allowFontScaling={false} style={{...styles.buttonText, color: '#e89cae', backgroundColor: '#FFF'}}>CANCEL</Text>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="none" activeOpacity={0.85} style={styles.button} onPress={() => {

              }}>
                <Text allowFontScaling={false} style={styles.buttonText}>SUBMIT</Text>
              </TouchableHighlight>
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
  buttons: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    marginLeft: 20,
    marginTop: 10,
  },
  buttonText: {
    width: 145,
    height: 46,
    borderRadius: 20,
    overflow: 'hidden',
    lineHeight: 46,
    borderWidth: 1,
    backgroundColor: '#e89cae',
    borderColor: '#e89cae',
    textAlign: 'center',
    fontSize: 18,
    color: '#FFF',
    fontWeight: '600'
  },
  paragraphInput: {
    width: '100%',
    borderColor: '#d3d6d9',
    borderWidth: 1,
    borderRadius: 4,
    padding: 15,
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: '700',
    borderRadius: 0,
    textAlign: 'left',
    height: 120,
    color: '#111',
    textAlign: 'left',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
