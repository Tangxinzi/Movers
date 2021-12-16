import React, { Component } from 'react';
import icons from '../icons/Icons';
import Axios from 'react-native-axios';
import DatePicker from 'react-native-datepicker';
import ActionSheet from 'react-native-actionsheet';
import {
  Text,
  View,
  Image,
  Alert,
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

class Create extends React.Component {
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
          }}>Add A Task</Text>
        </>
      </TouchableHighlight>
    ),
    headerRight: (
      <TouchableHighlight
        style={{padding: 10}}
        activeOpacity={0.85}
        underlayColor="none"
      >
        <Text allowFontScaling={false} numberOfLines={1}></Text>
      </TouchableHighlight>
    ),
    tabBarVisible: false,
    headerStyle: {
      elevation: 0,
    },
  });

  constructor(props) {
    super(props);
    var params = props.navigation.state.params
    this.state = {
      params,
      reloDetail: {},
      radio: true,
      title: '',
      description: '',
      notes: '',
      startdate: '',
      dueDate: '',
      service: {
        index: '',
        action: false,
        text: ['Air-cooler Services', 'Baggage & Box Shipping', 'Housemaid Assistance', 'Private Transport Hiring', 'Relocation Concierge', 'Short-term Property Rental', 'Vehicle Renting', 'Vehicle Selling', 'Cancel']
      },
      budget: {
        index: '',
        action: false,
        budgetId: [129, 149, ],
        text: ['SGD', 'AUD', 'Cancel'],
      },
      bodyContent: {
        TaskData: {
          taskType: "origin",
          countryCityName: params.taskIndex == 0 ? 'Singapore' : params.taskIndex == 1 ? 'Sydney' : params.taskIndex == 2 ? 'My Memos' : ''
        },
        taskType: "origin",
        chooseCategory: "1",
        description: '',
        note: ''
      }
    };


    // this.setState({
    //   bodyContent: {
    //     "title": this.state.title || '',
    //     "description": this.state.description || '',
    //     "note": this.state.note || '',
    //     "startDate": this.state.startDate || '',
    //     "isImportant": false,
    //     "dueDate": this.state.dueDate || '',
    //     "budgetType": this.state.budgetType,
    //     "budgetAmount": this.state.budgetAmount || 0,
    //     "serviceId": 13,
    //     "relocateId": this.state.reloDetail.relocateId
    //   }
    // })

    AsyncStorage.getItem('bearer')
    .then((response) => {
      this.setState({
        bearer: JSON.parse(response)
      })
    })
    .catch((error) => {
      console.log(error);
    })
    .done()

    AsyncStorage.getItem('reloDetail')
    .then((response) => {
      this.setState({
        reloDetail: JSON.parse(response)
      })
    })
    .catch((error) => {
      console.log(error);
    })
    .done()
  }

  componentWillUnmount() {

  }

  fetchCreateTask() {
    fetch(`https://api-staging-c.moovaz.com/api/v1/Customer/create-task`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ this.state.bearer.jwToken }`
      },
      body: JSON.stringify(this.state.bodyContent)
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
      <ScrollView>
        <View style={styles.container}>
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
          <KeyboardAvoidingView
            style={{width: '100%', height: '100%'}}
            keyboardVerticalOffset={10}
          >
            <View style={styles.header}>
              <Text allowFontScaling={false} style={styles.headerTitle}>Add A Task</Text>
              <View style={styles.headerStar}>
                <TouchableHighlight underlayColor='transparent' activeOpacity={0.8} onPress={() => {
                  this.state.bodyContent.isImportant = !this.state.bodyContent.isImportant
                  this.setState({
                    bodyContent: this.state.bodyContent
                  })
                }}>
                  <Image resizeMode='cover' style={styles.columnHeadIcon} source={{uri: this.state.bodyContent.isImportant ? icons.starred : icons.star}} />
                </TouchableHighlight>
                <Text allowFontScaling={false} style={styles.headerText}>Mark Task as Important</Text>
              </View>
            </View>
            <Text allowFontScaling={false} style={styles.title}>For</Text>
            <View style={styles.for}>
              <View style={styles.forHeader}>
                <View style={[styles.forHeaderRow, {backgroundColor: this.state.params.taskIndex == 0 ? 'none' : '#f4f4f4', borderColor: this.state.params.taskIndex == 0 ? '#000' : '#f4f4f4'}]}>
                  <Text allowFontScaling={false} style={[styles.forHeaderRowText, {color: this.state.params.taskIndex == 0 ? '#000' : '#d3d6d9'}]}>Singapore</Text>
                </View>
                <View style={[styles.forHeaderRow, {backgroundColor: this.state.params.taskIndex == 1 ? 'none' : '#f4f4f4', borderColor: this.state.params.taskIndex == 1 ? '#000' : '#f4f4f4'}]}>
                  <Text allowFontScaling={false} style={[styles.forHeaderRowText, {color: this.state.params.taskIndex == 1 ? '#000' : '#d3d6d9'}]}>Sydney</Text>
                </View>
                <View style={[styles.forHeaderRow, {backgroundColor: this.state.params.taskIndex == 2 ? 'none' : '#f4f4f4', borderColor: this.state.params.taskIndex == 2 ? '#000' : '#f4f4f4'}]}>
                  <Text allowFontScaling={false} style={[styles.forHeaderRowText, {color: this.state.params.taskIndex == 2 ? '#000' : '#d3d6d9'}]}>My Memos</Text>
                </View>
              </View>
              <View style={styles.forLabel}>
                <View style={styles.forLabelTextRowRadio}>
                  <View style={[styles.forLabelTextRowRadioInner, {backgroundColor: this.state.radio ? '#000' : '#FFF'}]}></View>
                </View>
                <View style={[styles.forLabelTextRowRadio, {top: 46}]}>
                  <View style={[styles.forLabelTextRowRadioInner, {backgroundColor: !this.state.radio ? '#000' : '#FFF'}]}></View>
                </View>
                <TouchableHighlight style={styles.forLabelTextRow} underlayColor='transparent' activeOpacity={0.8} onPress={() => {
                  this.state.service.action = false
                  this.setState({
                    service: this.state.service,
                    radio: true
                  })
                }}>
                  <Text allowFontScaling={false} style={styles.forLabelText}>Just a note</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.forLabelText} underlayColor='transparent' activeOpacity={0.8} onPress={() => this.setState({radio: false})}>
                  <Text allowFontScaling={false} style={styles.forLabelText}>Explore Relocation-related Services</Text>
                </TouchableHighlight>
                <ActionSheet ref={o => this.ActionSheetLabel = o} title={'Select ...'} options={this.state.service.text} cancelButtonIndex={8} onPress={(index) => {
                  if (index < 2) {
                    this.state.service.action = true
                    this.state.service.index = index
                    this.setState({service: this.state.service})
                  }
                }} />
                <TouchableHighlight style={[styles.textInput, {backgroundColor: !this.state.radio ? '#ffffff' : '#f2f2f2', alignItems: 'center'}]} underlayColor="#f2f2f2" activeOpacity={0.8} onPress={() => !this.state.radio ? this.ActionSheetLabel.show() : null}>
                  <>
                    <Text allowFontScaling={false} style={{color: this.state.service.action ? '#000' : '#d3d3d3', fontStyle: this.state.service.action ? 'normal' : 'italic'}}>{this.state.service.action ? this.state.service.text[this.state.service.index] : 'Select ...'}</Text>
                    <Image resizeMode='cover' style={styles.tasksIconArrowDown} source={{uri: icons.arrowDown}} />
                  </>
                </TouchableHighlight>
              </View>
            </View>
            <Text allowFontScaling={false} style={styles.title}>About</Text>
            <View style={styles.textInputContainer}>
              <Text allowFontScaling={false}>Title*</Text>
              <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                multiline={false}
                placeholder=""
                clearButtonMode="while-editing"
                defaultValue={this.state.bodyContent.title}
                placeholderTextColor="#CCC"
                onChangeText={(title) => {
                  this.state.bodyContent.title = title
                  this.setState({ bodyContent: this.state.bodyContent })
                }}
              />
            </View>
            <View style={styles.textInputContainer}>
              <Text allowFontScaling={false}>Description</Text>
              <TextInput
                multiline={true}
                allowFontScaling={false}
                style={[styles.textInput, {height: 140, paddingTop: 15}]}
                placeholder=""
                clearButtonMode="while-editing"
                defaultValue={this.state.bodyContent.description}
                placeholderTextColor="#CCC"
                onChangeText={(description) => {
                  if (this.state.bodyContent.description.length <= 500) {
                    this.state.bodyContent.description = description
                    this.setState({ bodyContent: this.state.bodyContent })
                  }
                }}
              />
              <Text allowFontScaling={false} style={{textAlign: 'right', color: 'grey', marginTop: 10}}>{this.state.bodyContent.description.length || 0} / 500</Text>
            </View>
            <View style={styles.textInputContainer}>
              <Text allowFontScaling={false}>Additional Notes</Text>
              <TextInput
                multiline={true}
                allowFontScaling={false}
                style={[styles.textInput, {height: 140, paddingTop: 15}]}
                placeholder=""
                clearButtonMode="while-editing"
                defaultValue={this.state.bodyContent.note}
                placeholderTextColor="#CCC"
                onChangeText={(note) => {
                  if (this.state.bodyContent.note.length <= 500) {
                    this.state.bodyContent.note = note
                    this.setState({ bodyContent: this.state.bodyContent })
                  }
                }}
              />
              <Text allowFontScaling={false} style={{textAlign: 'right', color: 'grey', marginTop: 10}}>{this.state.bodyContent.note.length || 0} / 500</Text>
            </View>
            <View style={styles.textInputContainer}>
              <Text allowFontScaling={false}>Start Date</Text>
              <DatePicker
                style={[styles.textInput, {padding: 5, flexDirection: 'column'}]}
                customStyles={{
                  dateInput: {
                    borderWidth: 0,
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                  }
                }}
                date={this.state.bodyContent.startDate}
                mode="date"
                placeholder="select date"
                format="DD/MM/YYYY"
                minDate=""
                maxDate=""
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                onDateChange={(startDate) => {
                  this.state.bodyContent.startDate = startDate
                  this.setState({bodyContent: this.state.bodyContent})
                }}
              />
              <Image resizeMode='cover' style={styles.calendar} source={{uri: icons.calendar}} />
            </View>
            <View style={styles.textInputContainer}>
              <Text allowFontScaling={false}>Due Date</Text>
              <DatePicker
                style={[styles.textInput, {padding: 5, flexDirection: 'column'}]}
                customStyles={{
                  dateInput: {
                    borderWidth: 0,
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                  }
                }}
                date={this.state.bodyContent.dueDate}
                mode="date"
                placeholder="select date"
                format="DD/MM/YYYY"
                minDate=""
                maxDate=""
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                onDateChange={(dueDate) => {
                  this.state.bodyContent.dueDate = dueDate
                  this.setState({bodyContent: this.state.bodyContent})
                }}
              />
              <Image resizeMode='cover' style={styles.calendar} source={{uri: icons.calendar}} />
            </View>
            <View style={styles.textInputContainer}>
              <Text allowFontScaling={false}>Budget</Text>
              <ActionSheet ref={o => this.ActionSheet = o} title={'Select ...'} options={this.state.budget.text} cancelButtonIndex={2} onPress={(index) => {
                if (index < 2) {
                  this.state.bodyContent.budgetType = this.state.budget.budgetId[index]
                  this.state.budget.action = true
                  this.state.budget.index = index
                  this.setState({
                    budgetType: this.state.budget.budgetId[index],
                    budget: this.state.budget,
                    bodyContent: this.state.bodyContent
                  })
                }
              }} />
              <View style={{flexDirection: 'row'}}>
                <TouchableHighlight style={[styles.textInput, {width: 120, alignItems: 'center'}]} underlayColor="rgba(255, 255, 255, 0.75)" activeOpacity={0.8} onPress={() => this.ActionSheet.show()}>
                  <>
                    <Text allowFontScaling={false} style={{color: this.state.budget.action ? '#000' : '#d3d3d3', fontStyle: this.state.budget.action ? 'normal' : 'italic'}}>{this.state.budget.action ? this.state.budget.text[this.state.budget.index] : 'Select ...'}</Text>
                    <Image resizeMode='cover' style={styles.tasksIconArrowDown} source={{uri: icons.arrowDown}} />
                  </>
                </TouchableHighlight>
                <TextInput
                  allowFontScaling={false}
                  style={[styles.textInput, {flex: 1, width: 'auto', marginLeft: 10}]}
                  placeholder=""
                  keyboardType="numeric"
                  clearButtonMode="while-editing"
                  defaultValue={this.state.bodyContent.budgetAmount}
                  placeholderTextColor="#CCC"
                  onChangeText={(budgetAmount) => {
                    this.state.bodyContent.budgetAmount = budgetAmount
                    this.setState({bodyContent: this.state.bodyContent})
                  }}
                />
              </View>
            </View>
            <View style={styles.textSubmitFoot}>
              <TouchableHighlight
                underlayColor='transparent'
                style={{backgroundColor: '#E89CAE', padding: 15, borderRadius: 20}}
                onPress={() => this.fetchCreateTask()}
              >
                <>
                  <Text allowFontScaling={false} numberOfLines={1} style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: 'rgba(255, 255, 255, 0.9)',
                    textAlign: 'center',
                    marginHorizontal: 16
                  }}>CREATE</Text>
                </>
              </TouchableHighlight>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    // flex: 1,
    // justifyContent: 'space-around',
    // alignItems: 'center',
    padding: 20,
    width: '100%',
    backgroundColor: '#FFF'
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 20
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 160
  },
  headerTitle: {
    width: '30%',
    height: 80,
    fontFamily: 'Baskerville',
    fontSize: 32,
    marginTop: 40,
    marginRight: 50,
    marginBottom: 32
  },
  headerStar: {
    marginLeft: 10,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  headerText: {
    marginTop: 3,
    marginLeft: 5,
    fontSize: 18,
    width: '70%'
  },
  textInput: {
    width: '100%',
    borderColor: '#D3D6D9',
    color: '#111',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 15,
    paddingRight: 15,
    // lineHeight: 20,
    minHeight: 50,
    marginTop: 6,
    // fontWeight: '700',
    color: '#111',
    textAlign: 'left',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textSubmitFoot: {
    height: 100,
    // paddingRight: 20,
    marginBottom: 40,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  textInputContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: 20
  },
  containerLogo: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginBottom: 10
  },
  logoDec: {
    fontSize: 14
  },
  columnHeadIcon: {
    width: 28,
    height: 28,
  },
  for: {
    marginBottom: 30,
    borderBottomWidth: 1,
    borderColor: '#d3d6d9'
  },
  forHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forHeaderRow: {
    width: '31%',
    height: 80,
    padding: 14,
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    borderRadius: 6,
    borderColor: '#f4f4f4',
    borderWidth: 1
  },
  forHeaderRowText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#d3d6d9'
  },
  forLabel: {
    marginLeft: 30,
    marginTop: 20,
    paddingBottom: 20,
  },
  forLabelTextRow: {
    marginTop: 10,
    marginBottom: 10,
  },
  forLabelText: {
    fontSize: 16,
    // marginTop: 5,
    marginBottom: 5,
  },
  tasksIconArrowDown: {
    width: 16,
    height: 16
  },
  calendar: {
    width: 16,
    height: 16,
    position: 'absolute',
    right: 20,
    bottom: 20
  },
  forLabelTextRowRadio: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#000',
    padding: 4,
    position: 'absolute',
    left: -30,
    top: 11
  },
  forLabelTextRowRadioInner: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: '#000'
  }
}

module.exports = Create;
