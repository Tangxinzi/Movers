/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import icons from './icons/Icons';
import iconsBottom from './icons/iconsBottom';
import Header from './components/Header';
import Bottom from './components/Bottom';
import Footer from './components/Footer';
import Swiper from 'react-native-swiper';
import ActionSheet from 'react-native-actionsheet';
import ModalDropdown from 'react-native-modal-dropdown';
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

const colorScheme = Appearance.getColorScheme();

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numberBox: [
        {
          text: 'Days to your move',
          color: '#000',
          num: 0
        },
        {
          text: 'Tasks in Progress',
          color: '#458de3',
          num: 0
        },
        {
          text: 'Tasks Completed',
          color: '#64ccc9',
          num: 0
        }
      ],
      tasks: {},
      reloDetail: null,
      currency: null,
      modalVisible: false,
      bearer: {},
      list: {
        index: 0,
        active: 'Task View',
        type: [
          {
            text: 'All Tasks',
            status: 'all'
          },
          {
            text: 'Starred',
            status: 'starred'
          },
          {
            text: 'In Progress',
            status: 'in-progress'
          },
          {
            text: 'Completed',
            status: 'completed'
          },
        ]
      },
    }

    this.bearer()
  }

  componentDidMount() {
    this.listener = DeviceEventEmitter.addListener('Change', () => this.bearer())
  }

  bearer () {
    AsyncStorage.getItem('bearer')
    .then((response) => {
      if (response == null) {
        console.log(response);
        this.props.navigation.navigate('Login')
      } else {
        this.setState({
          bearer: JSON.parse(response)
        })

        this.getReloDetail()
        this.reloDetail()
        this.fetchDataListColumn()
      }
    })
    .catch((error) => {
      console.log('error', error)
      // this.props.navigation.navigate('Login')
    })
    
  }

  getReloDetail() {
    fetch(`https://relo-api.moovaz.com/api/v1/Customer/get-relo-detail`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ this.state.bearer.jwToken }`,
      }
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({reloDetail: responseData.data})
      AsyncStorage.setItem('reloDetail', JSON.stringify(responseData.data))
      this.currency()
      this.reloDetail()
      this.fetchDataListColumn()
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    
  }

  // delete task
  deleteTask (taskId) {
    fetch(`https://relo-api.moovaz.com/api/v1/Customer/delete-task`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ this.state.bearer.jwToken }`,
      },
      body: JSON.stringify({
        taskId
      })
    })
    .then(response => response.json())
    .then(responseData => {
      this.currency()
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    
  }

  currency () {
    fetch(`https://relo-api.moovaz.com/api/v1/Customer/get-relo-currency?RelocateID=${ this.state.reloDetail.relocateId }`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ this.state.bearer.jwToken }`,
      },
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ currency: responseData.data })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    
  }

  reloDetail () {
    fetch(`https://relo-api.moovaz.com/api/v1/Customer/get-relo-detail`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ this.state.bearer.jwToken }`,
      }
    })
    .then(response => response.json())
    .then(responseData => {
      var numberBox = this.state.numberBox
      numberBox[0].num = responseData.data.totalDaysToMoveDate
      numberBox[1].num = responseData.data.totalTaskInProgress
      numberBox[2].num = responseData.data.totalTaskCompleted
      this.setState({
        numberBox
      })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    ;
  }

  fetchDataListColumn () {
    fetch(`https://relo-api.moovaz.com/api/v1/Customer/get-task-list-column?relocateId=${ this.state.reloDetail.relocateId }&status=${ this.state.list.type[this.state.list.index].status }`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ this.state.bearer.jwToken }`,
      }
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        tasks: responseData.data
      })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    ;
  }

  renderColumns = (tasks, taskIndex) => {
    if (tasks && tasks.items.length) {
      return (
        tasks.items.map((item, index) => {
          {
            return index == tasks.items.length - 1 ? (
              <View>
                <View style={[styles.column, {backgroundColor: item.statusText == 'Task/Note' ? '#FFF5F8' : '#FFF'}]} key={index}>
                  <View style={styles.columnStatusCon}>
                    <View style={[styles.columnStatusTextCon, {backgroundColor: item.statusText == 'New Task' ? '#ffaf00' : '' || item.statusText == 'Task/Note' ? '#e89cae' : '' || item.statusText == 'In Progress' ? '#448de3' : '' || item.statusText == 'Suggested Task' ? '#d3d6d9' : '' || item.statusText == 'Completed' ? '#00bd9d' : ''}]}>
                      <Text style={styles.columnStatusText} allowFontScaling={false}>{item.statusText}</Text>
                    </View>
                    <View style={styles.columnStatusHeadCon}>
                      <Image resizeMode='cover' style={styles.columnHeadIcon} source={{uri: false ? icons.starred : icons.star}} />
                      <TouchableHighlight underlayColor="none" activeOpacity={0.85} onPress={() => {
                        this.setState({taskId: item.taskId})
                        this.ActionSheetAction.show()
                      }}>
                        <Image resizeMode='cover' style={styles.columnHeadIcon} source={{uri: icons.more}} />
                      </TouchableHighlight>
                    </View>
                  </View>
                  <Image resizeMode='cover' style={[styles.columnHeadIcon, {position: 'absolute', left: 10, top: 55}]} source={{uri: icons.checkedEmpty}} />
                  <TouchableHighlight style={{marginLeft: 30}} underlayColor="none" activeOpacity={0.85} onPress={() => this.props.navigation.navigate('TaskIndex', {taskIndex, taskId: item.taskId})}>
                    <>
                      <Text style={styles.columnTitle} allowFontScaling={false}>{item.title}</Text>
                      <Text style={styles.columnDescription} allowFontScaling={false}>{item.description}</Text>
                    </>
                  </TouchableHighlight>
                </View>
                <View style={[styles.column, {borderTopLeftRadius: 24, backgroundColor: '#ffefcb', borderColor: '#ffaf00', borderWidth: 1}]} key={tasks.items.length}>
                  <View style={[styles.columnStatusCon, {marginTop: 10, marginBottom: 10}]}>
                    <Image resizeMode='contain' style={styles.columnFoot} source={{uri: icons.foot[taskIndex]}} />
                    <Image resizeMode='contain' style={styles.columnFootComment} source={{uri: icons.comment}} />
                  </View>
                  <Text style={styles.columnTitle} allowFontScaling={false}>All you need to know about relocating!</Text>
                  <Text style={styles.columnDescription} allowFontScaling={false}>Here's what you need to think about and know when you're relocating!</Text>
                </View>
              </View>
            ) : (
              <View style={[styles.column, {backgroundColor: item.statusText == 'Task/Note' ? '#FFF5F8' : '#FFF'}]} key={index}>
                <View style={styles.columnStatusCon}>
                  <View style={[styles.columnStatusTextCon, {backgroundColor: item.statusText == 'New Task' ? '#ffaf00' : '' || item.statusText == 'Task/Note' ? '#e89cae' : '' || item.statusText == 'In Progress' ? '#448de3' : '' || item.statusText == 'Suggested Task' ? '#d3d6d9' : '' || item.statusText == 'Completed' ? '#00bd9d' : ''}]}>
                    <Text style={styles.columnStatusText} allowFontScaling={false}>{item.statusText}</Text>
                  </View>
                  <View style={styles.columnStatusHeadCon}>
                    <Image resizeMode='cover' style={styles.columnHeadIcon} source={{uri: false ? icons.starred : icons.star}} />
                    <TouchableHighlight underlayColor="none" activeOpacity={0.85} onPress={() => {
                      this.setState({taskId: item.taskId})
                      this.ActionSheetAction.show()
                    }}>
                      <Image resizeMode='cover' style={styles.columnHeadIcon} source={{uri: icons.more}} />
                    </TouchableHighlight>
                  </View>
                </View>
                <Image resizeMode='cover' style={[styles.columnHeadIcon, {position: 'absolute', left: 10, top: 55}]} source={{uri: icons.checkedEmpty}} />
                <TouchableHighlight style={{marginLeft: 30}} underlayColor="none" activeOpacity={0.85} onPress={() => this.props.navigation.navigate('TaskIndex', {taskIndex, taskId: item.taskId})}>
                  <>
                    <Text style={styles.columnTitle} allowFontScaling={false}>{item.title}</Text>
                    <Text style={styles.columnDescription} allowFontScaling={false}>{item.description}</Text>
                  </>
                </TouchableHighlight>
              </View>
            )
          }
        })
      )
    } else {
      return (
        <View style={{ height: 220, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="small" />
        </View>
      )
    }
  }

  fetchDataListRow() {
    fetch(`https://relo-api.moovaz.com/api/v1/Customer/get-task-list-row?relocateId=${ this.state.reloDetail.relocateId }&status=${ this.state.list.type[this.state.list.index].status }`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ this.state.bearer.jwToken }`,
      }
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        tasks: responseData.data
      })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    ;
  }

  renderRows = (tasks, taskIndex) => {
    if (tasks) {
      return (
        <>
          <View style={styles.rows}>
            <View style={styles.rowHead}>
              <View style={styles.columnHeadCon}>
                <View style={styles.rowHeadDot}></View>
                <Text style={styles.columnHeadTitle} allowFontScaling={false}>{ taskIndex == 0 ? 'Dated Tasks' : taskIndex == 1 ? 'Undated Tasks' : '' }</Text>
              </View>
              <View style={styles.columnHeadCon}>
                <View style={styles.columnHeadCountCon}>
                  <Text style={styles.columnHeadCount} allowFontScaling={false}>{tasks.totalItemCount}</Text>
                </View>
                <TouchableHighlight underlayColor="none" activeOpacity={0.85} onPress={() => {
                  this.props.navigation.navigate('TaskCreate', {taskIndex})
                }}>
                  <Image resizeMode='cover' style={{width: 28, height: 28}} source={{uri: icons.add}} />
                </TouchableHighlight>
              </View>
            </View>
            {
              tasks.items.map((item, key) => {
                return (
                  <TouchableHighlight key={key} activeOpacity={0.9} underlayColor="none">
                    <View style={[styles.column, {backgroundColor: item.statusText == 'Task/Note' ? '#FFF5F8' : '#FFF'}]}>
                      <View style={styles.columnStatusCon}>
                        <View style={[styles.columnStatusTextCon, {backgroundColor: item.statusText == 'New Task' ? '#ffaf00' : '' || item.statusText == 'Task/Note' ? '#e89cae' : '' || item.statusText == 'In Progress' ? '#448de3' : '' || item.statusText == 'Suggested Task' ? '#d3d6d9' : '' || item.statusText == 'Completed' ? '#00bd9d' : ''}]}>
                          <Text style={styles.columnStatusText} allowFontScaling={false}>{item.statusText}</Text>
                        </View>
                        <View style={styles.columnStatusHeadCon}>
                          <Image resizeMode='cover' style={styles.columnHeadIcon} source={{uri: false ? icons.starred : icons.star}} />
                          <TouchableHighlight underlayColor="none" activeOpacity={0.85} onPress={() => {
                            this.setState({taskId: item.taskId})
                            this.ActionSheetAction.show()
                          }}>
                            <Image resizeMode='cover' style={styles.columnHeadIcon} source={{uri: icons.more}} />
                          </TouchableHighlight>
                        </View>
                      </View>
                      <Image resizeMode='cover' style={[styles.columnHeadIcon, {position: 'absolute', left: 10, top: 55}]} source={{uri: icons.checkedEmpty}} />
                      <TouchableHighlight style={{marginLeft: 30}} underlayColor="none" activeOpacity={0.85} onPress={() => this.props.navigation.navigate('TaskIndex', {index, taskId: item.taskId})}>
                        <>
                          <Text style={styles.columnTitle} allowFontScaling={false}>{item.title}</Text>
                          <Text style={styles.columnDescription} allowFontScaling={false}>{item.description}</Text>
                        </>
                      </TouchableHighlight>
                    </View>
                  </TouchableHighlight>
                )
              })
            }
          </View>
        </>
      )
    } else {
      return (
        <View style={{ height: 220, justifyContent: 'center', alignItems: 'center' }}>

        </View>
      )
    }
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" stickyHeaderIndices={[0]} nestedScrollEnabled={true}>
          <Header {...this.props} />
          <View style={styles.container}>
            <View style={styles.backgroundContainer}>
              <Image resizeMode='cover' style={styles.backgroundContainerImage} source={{uri: icons.headbg}} />
              <View style={styles.backgroundContainerText}>
                <View style={styles.backgroundContainerHead}>
                  <View style={styles.backgroundContainerDotLine}></View>
                  <View style={styles.backgroundContainerDot}>
                    <Text allowFontScaling={false} style={styles.countryName}>{this.state.currency && this.state.currency.origination.countryName}</Text>
                  </View>
                  <View style={styles.backgroundContainerIconCon}>
                    <Image resizeMode='contain' style={styles.backgroundContainerIcon} source={{uri: icons.logo}} />
                  </View>
                  <View style={[styles.backgroundContainerDot]}>
                    <Text allowFontScaling={false} style={styles.countryName}>{this.state.currency && this.state.currency.destination.countryName}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.numberBox}>
              {
                this.state.numberBox.map((item, key) => {
                  return (
                    <View key={key} style={styles.numberBoxItem}>
                      <View style={[styles.numberBoxItemBar, {backgroundColor: item.color}]}></View>
                      <Text allowFontScaling={false} style={[styles.numberBoxItemNum, {color: item.color}]}>{item.num}</Text>
                      <Text allowFontScaling={false} numberOfLines={2} style={[styles.numberBoxItemText, {color: item.color}]}>{item.text}</Text>
                    </View>
                  )
                })
              }
            </View>
            <TouchableHighlight style={styles.tasks} underlayColor="rgba(255, 255, 255, 0.75)" activeOpacity={0.8} onPress={() => this.ActionSheet.show()}>
              <>
                <Text allowFontScaling={false} style={{color: '#909194'}}>{this.state.list.type[this.state.list.index].text}</Text>
                <Image resizeMode='cover' style={styles.tasksIconArrowDown} source={{uri: icons.arrowDown}} />
                <ActionSheet ref={o => this.ActionSheet = o} title={'Select ...'} options={['All Tasks', 'Starred', 'In Progress', 'Completed', 'Cancel']} cancelButtonIndex={4} onPress={(index) => {
                  if (index == 4) {
                    return
                  } else {
                    this.state.list.index = index
                    this.setState({list: this.state.list})
                    this.fetchDataListRow()
                    this.fetchDataListColumn()
                  }
                }} />
              </>
            </TouchableHighlight>
            <View style={[styles.tasks, {marginTop: 0, padding: 0}]}>
              <TouchableHighlight style={styles.taskView} underlayColor="rgba(255, 255, 255, 0.75)" activeOpacity={0.8} onPress={() => {
                this.fetchDataListColumn()
                this.state.list.active = 'Task View'
                this.setState({list: this.state.list})
              }}>
                <>
                  <Image resizeMode='cover' style={styles.tasksIcon} source={{uri: this.state.list.active == 'Task View' ? icons.taskActive : icons.task}} />
                  <Text allowFontScaling={false} style={{color: this.state.active == 'Task View' ? '#E89CAE' : '#909194'}}>Task View</Text>
                </>
              </TouchableHighlight>
              <TouchableHighlight style={styles.taskTimeline} underlayColor="rgba(255, 255, 255, 0.75)" activeOpacity={0.8} onPress={() => {
                this.fetchDataListRow()
                this.state.list.active = 'Timeline View'
                this.setState({list: this.state.list})
              }}>
                <>
                  <Image resizeMode='cover' style={styles.tasksIcon} source={{uri: this.state.list.active == 'Timeline View' ? icons.timelineActive : icons.timeline}} />
                  <Text allowFontScaling={false} style={{color: this.state.list.active == 'Timeline View' ? '#E89CAE' : '#909194'}}>Timeline View</Text>
                </>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="none" activeOpacity={0.5} onPress={() => this.setState({modalVisible: true})}>
                <Image resizeMode='cover' style={[styles.tasksIcon, {marginRight: 13, width: 20, height: 20}]} source={{uri: icons.theme}} />
              </TouchableHighlight>
            </View>
            <ActionSheet
              ref={o => this.ActionSheetAction = o}
              title={'Action'}
              options={['Edit', 'Delete', 'Cancel']}
              cancelButtonIndex={2}
              onPress={(index) => {
                switch (index) {
                  case 0:

                    break;
                  case 1:
                    Alert.alert('Delete Task?', 'Are you sure you want to delete this task?',
                      [
                        {
                          text: "CANCEL", onPress: () => {}
                        },
                        {
                          text: "DELETE", onPress: () => this.deleteTask(this.state.taskId)
                        }
                      ]
                    )
                    break;
                  default:

                }
              }}
            />
            <View style={[styles.taskview, {display: this.state.list.active == 'Task View' ? 'flex' : 'none'}]}>
              <Swiper autoplay={false} height={1000} showsButtons={false} showPagination={false} index={0} dot={<></>} activeDot={<></>}>
                <View style={styles.slide}>
                  <View style={styles.columnHead}>
                    <View style={styles.columnHeadCon}>
                      <Image resizeMode='contain' style={[styles.columnHeadIcon, {width: 36, height: 30}]} source={{uri: icons.head[0]}} />
                      <Text style={styles.columnHeadTitle} allowFontScaling={false}>Singapore</Text>
                    </View>
                    <View style={styles.columnHeadCon}>
                      <View style={styles.columnHeadCountCon}>
                        <Text style={styles.columnHeadCount} allowFontScaling={false}>{this.state.tasks.origin && this.state.tasks.origin.totalItemCount}</Text>
                      </View>
                      <TouchableHighlight underlayColor="none" activeOpacity={0.85} onPress={() => {
                        this.props.navigation.navigate('TaskCreate', {taskIndex: 0})
                      }}>
                        <Image resizeMode='cover' style={{width: 28, height: 28}} source={{uri: icons.add}} />
                      </TouchableHighlight>
                    </View>
                  </View>
                  <View style={styles.columns}>
                    <ScrollView nestedScrollEnabled={true}>
                      {this.renderColumns(this.state.tasks && this.state.tasks.origin, 0)}
                    </ScrollView>
                  </View>
                </View>
                <View style={styles.slide}>
                <View style={styles.columnHead}>
                  <View style={styles.columnHeadCon}>
                    <Image resizeMode='contain' style={[styles.columnHeadIcon, {width: 36, height: 30}]} source={{uri: icons.head[0]}} />
                    <Text style={styles.columnHeadTitle} allowFontScaling={false}>Singapore</Text>
                  </View>
                  <View style={styles.columnHeadCon}>
                    <View style={styles.columnHeadCountCon}>
                      <Text style={styles.columnHeadCount} allowFontScaling={false}>{this.state.tasks.origin && this.state.tasks.origin.totalItemCount}</Text>
                    </View>
                    <TouchableHighlight underlayColor="none" activeOpacity={0.85} onPress={() => {
                      this.props.navigation.navigate('TaskCreate', {taskIndex: 0})
                    }}>
                      <Image resizeMode='cover' style={{width: 28, height: 28}} source={{uri: icons.add}} />
                    </TouchableHighlight>
                  </View>
                </View>
                <View style={styles.columns}>
                  <ScrollView nestedScrollEnabled={true}>
                    {this.renderColumns(this.state.tasks && this.state.tasks.origin, 1)}
                  </ScrollView>
                </View>
                </View>
                <View style={styles.slide}>
                <View style={styles.columnHead}>
                  <View style={styles.columnHeadCon}>
                    <Image resizeMode='contain' style={[styles.columnHeadIcon, {width: 36, height: 30}]} source={{uri: icons.head[0]}} />
                    <Text style={styles.columnHeadTitle} allowFontScaling={false}>Singapore</Text>
                  </View>
                  <View style={styles.columnHeadCon}>
                    <View style={styles.columnHeadCountCon}>
                      <Text style={styles.columnHeadCount} allowFontScaling={false}>{this.state.tasks.origin && this.state.tasks.origin.totalItemCount}</Text>
                    </View>
                    <TouchableHighlight underlayColor="none" activeOpacity={0.85} onPress={() => {
                      this.props.navigation.navigate('TaskCreate', {taskIndex: 0})
                    }}>
                      <Image resizeMode='cover' style={{width: 28, height: 28}} source={{uri: icons.add}} />
                    </TouchableHighlight>
                  </View>
                </View>
                <View style={styles.columns}>
                  <ScrollView nestedScrollEnabled={true}>
                    {this.renderColumns(this.state.tasks && this.state.tasks.origin, 2)}
                  </ScrollView>
                </View>
                </View>
              </Swiper>
            </View>
            <View style={[styles.timeline, {display: this.state.list.active == 'Timeline View' ? 'flex' : 'none'}]}>
              {this.renderRows(this.state.tasks && this.state.tasks.dated, 0)}
              {this.renderRows(this.state.tasks && this.state.tasks.unDated, 1)}
            </View>
          </View>
          <Footer />
        </ScrollView>
        <Modal animationType="slide" visible={this.state.modalVisible} transparent={false}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', marginTop: '15%' }}>
            <Text allowFontScaling={false} style={styles.modalTitle}>Select mood background</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', marginBottom: '15%' }}>
            <TouchableHighlight underlayColor="none" activeOpacity={0.5} style={styles.reject} onPress={() => this.setState({modalVisible: false})}>
              <Text allowFontScaling={false}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="none" activeOpacity={0.5} style={styles.accept} onPress={() => this.setState({modalVisible: false})}>
              <Text allowFontScaling={false}>Select</Text>
            </TouchableHighlight>
          </View>
        </Modal>
        <Bottom {...this.props} type="home" />
      </SafeAreaView>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4'
  },

  // backgroundContainer
  backgroundContainer: {
    position: 'relative'
  },
  backgroundContainerImage: {
    position: 'absolute',
    width: '100%',
    height: 130,
    zIndex: -1
  },
  backgroundContainerText: {
    width: '100%',
    height: 130,
    paddingTop: 40,
    zIndex: 111
  },
  backgroundContainerIconCon: {
    position: 'relative',
    padding: 5,
    backgroundColor: '#FFF',
    borderRadius: 40
  },
  backgroundContainerHead: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginLeft: '10%'
  },
  backgroundContainerDot: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: '#FFF',
  },
  backgroundContainerDotLine: {
    position: 'absolute',
    width: '100%',
    // left: 0,
    borderColor: '#fff',
    borderBottomWidth: 2,
  },
  backgroundContainerIcon: {
    width: 30,
    height: 30,
  },
  countryName: {
    fontWeight: '800',
    color: '#FFF',
    fontSize: 14,
    position: 'absolute',
    top: 22,
    width: 120,
    marginLeft: -55,
    textAlign: 'center'
  },

  // numberBox
  numberBox: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    marginTop: 50,
    position: 'relative'
  },
  numberBoxItem: {
    width: '31%',
    height: 80,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 10,
  },
  numberBoxItemBar: {
    position: 'absolute',
    height: 65,
    width: 3,
    left: 6,
    backgroundColor: '#CCC'
  },
  numberBoxItemText: {
    fontWeight: '600',
    fontSize: 14
  },
  numberBoxItemNum: {
    fontFamily: 'Baskerville',
    fontSize: 28,
    fontWeight: '400',
    marginBottom: 5
  },

  // All Tasks
  tasks: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    margin: 20,
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

  // columns
  columns: {
    margin: 20,
    backgroundColor: 'transparent'
  },
  column: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  columnHead: {
    margin: 20,
    marginBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  columnHeadCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  columnHeadTitle: {
    color: '#111',
    fontFamily: 'Baskerville',
    fontSize: 24,
    marginLeft: 10,
    position: 'relative'
  },
  columnHeadCountCon: {
    backgroundColor: '#fff',
    borderRadius: 40,
    alignSelf: 'center',
    marginRight: 10,
    padding: 6,
    paddingTop: 2,
    paddingBottom: 2
  },
  columnHeadCount: {
    fontFamily: 'Baskerville',
    fontWeight: '700',
    fontSize: 14,
    minWidth: 16,
    // height: 12,
    textAlign: 'center'
  },
  columnHeadIcon: {
    width: 22,
    height: 22,
    marginLeft: 3
  },
  columnFoot: {
    width: 50,
    height: 50
  },
  columnFootComment: {
    width: 38,
    height: 50
  },
  columnStatusCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  columnStatusHeadCon: {
    position: 'relative',
    flexDirection: 'row'
  },
  columnStatusTextCon: {
    marginBottom: 10,
    padding: 5,
    borderRadius: 20,
    alignSelf: 'flex-start',
    backgroundColor: '',
    width: 'auto'
  },
  columnStatusText: {
    fontSize: 13,
    marginLeft: 3,
    marginRight: 3,
    fontWeight: '700',
    color: '#FFF',
    display: 'flex'
  },
  columnTitle: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '700',
  },
  columnDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6
  },

  // rows
  timeline: {
    marginTop: 20,
    minHeight: 200,
    paddingBottom: 100,
  },
  rows: {
    marginLeft: 30,
    marginRight: 20,
    paddingLeft: 20,
    borderColor: '#D3D6D9',
    borderLeftWidth: 1
  },
  rowHead: {
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowHeadDot: {
    position: 'absolute',
    top: 0,
    left: -30,
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#000'
  },

  // swiper
  slide: {
    paddingBottom: 100,
    // width: '80%',
    // marginRight: 30
  },
});

export default Home;
