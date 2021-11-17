/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import icons from './Icons';
import Swiper from 'react-native-swiper';
import ActionSheet from 'react-native-actionsheet';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
  FlatList,
  Dimensions,
  Image,
  Text,
  View,
} from 'react-native';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numberBox: [
        {
          text: 'Days to your move',
          color: '#000',
          num: 100
        },
        {
          text: 'Tasks in Progress',
          color: '#458de3',
          num: 10
        },
        {
          text: 'Tasks Completed',
          color: '#64ccc9',
          num: 0
        }
      ],
      tasks: {},
      active: 'Task View'
    }

    this.fetchDataListColumn()
  }

  fetchDataListColumn() {
    fetch(`https://api-staging-c.moovaz.com/api/v1/Customer/get-task-list-column?relocateId=56816b12-d01e-489b-b6e9-8112f86ba420&status=all`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNWQwODY1OS1lMGEyLTQyN2ItYjBlYS1hZWZiNTBkMDdkNTMiLCJlbWFpbCI6ImpqaHVic3BvdHRlc3QxMUB5b3BtYWlsLmNvbSIsInVpZCI6Im5kS3lEN2lMNVk2Nk44ZUwvLzFweU55bWRtb3lYOUJiMlB2Z2kzdGpkUkZ2YnRmYjU2OUZ4OHRQM0VDUnNBTnQiLCJpcCI6IjE3Mi4zMS40MC4xOTQiLCJyb2xlIjoiY3VzdG9tZXIiLCJleHAiOjE2MzcyMzUzODksImlzcyI6Ik1vb3ZheklkZW50aXR5IiwiYXVkIjoiTW9vdmF6V2ViQXBwIn0.7s12wTIHcPxtHika2cmXgV5thj9fSYfnb9PJy3VBGwA',
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
    .done();
  }

  renderColumns = (tasks, index) => {
    if (tasks) {
      return (
        <>
          <View style={styles.columnHead}>
            <View style={styles.columnHeadCon}>
              <Image resizeMode='contain' style={[styles.columnHeadIcon, {width: 36, height: 30}]} source={{uri: icons.head[index]}} />
              <Text style={styles.columnHeadTitle} allowFontScaling={false}>{ index == 0 ? 'Singapore' : index == 1 ? 'Sydney' : index == 2 ? 'My Memos' : '' }</Text>
            </View>
            <View style={styles.columnHeadCon}>
              <View style={styles.columnHeadCountCon}>
                <Text style={styles.columnHeadCount} allowFontScaling={false}>{tasks.totalItemCount}</Text>
              </View>
              <Image resizeMode='cover' style={{width: 28, height: 28}} source={{uri: icons.add}} />
            </View>
          </View>
          <FlatList
            data={tasks.items}
            horizontal={false}
            numColumns={1}
            style={styles.columns}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) =>
              <View style={[styles.column, {backgroundColor: item.statusText == 'Task/Note' ? '#FFF5F8' : '#FFF'}]} key={index}>
                <View style={styles.columnStatusCon}>
                  <View style={[styles.columnStatusTextCon, {backgroundColor: item.statusText == 'Task/Note' ? '#e89cae' : '' || item.statusText == 'In Progress' ? '#448de3' : '' || item.statusText == 'Suggested Task' ? '#d3d6d9' : ''}]}>
                    <Text style={styles.columnStatusText} allowFontScaling={false}>{item.statusText}</Text>
                  </View>
                  <View style={styles.columnStatusHeadCon}>
                    <Image resizeMode='cover' style={styles.columnHeadIcon} source={{uri: icons.star}} />
                    <Image resizeMode='cover' style={styles.columnHeadIcon} source={{uri: icons.more}} />
                  </View>
                </View>
                <Text style={styles.columnTitle} allowFontScaling={false}>{item.title}</Text>
                <Text style={styles.columnDescription} allowFontScaling={false}>{item.description}</Text>
              </View>
            }
          />
        </>
      )
    } else {
      return (
        <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator
            size="small"
          />
        </View>
      )
    }
  }

  fetchDataListRow() {
    fetch(`https://api-staging-c.moovaz.com/api/v1/Customer/get-task-list-row?relocateId=56816b12-d01e-489b-b6e9-8112f86ba420&status=all`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNWQwODY1OS1lMGEyLTQyN2ItYjBlYS1hZWZiNTBkMDdkNTMiLCJlbWFpbCI6ImpqaHVic3BvdHRlc3QxMUB5b3BtYWlsLmNvbSIsInVpZCI6Im5kS3lEN2lMNVk2Nk44ZUwvLzFweU55bWRtb3lYOUJiMlB2Z2kzdGpkUkZ2YnRmYjU2OUZ4OHRQM0VDUnNBTnQiLCJpcCI6IjE3Mi4zMS40MC4xOTQiLCJyb2xlIjoiY3VzdG9tZXIiLCJleHAiOjE2MzcyMzUzODksImlzcyI6Ik1vb3ZheklkZW50aXR5IiwiYXVkIjoiTW9vdmF6V2ViQXBwIn0.7s12wTIHcPxtHika2cmXgV5thj9fSYfnb9PJy3VBGwA',
      }
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        tasks: responseData.data
      })
      console.log(responseData.data);
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  renderRows = (tasks, index) => {
    if (tasks) {
      return (
        <>
          <View style={styles.rows}>
            <View style={styles.rowHead}>
              <View style={styles.columnHeadCon}>
                <View style={styles.rowHeadDot}></View>
                <Text style={styles.columnHeadTitle} allowFontScaling={false}>{ index == 0 ? 'Dated Tasks' : index == 1 ? 'Undated Tasks' : '' }</Text>
              </View>
              <View style={styles.columnHeadCon}>
                <View style={styles.columnHeadCountCon}>
                  <Text style={styles.columnHeadCount} allowFontScaling={false}>{tasks.totalItemCount}</Text>
                </View>
                <Image resizeMode='cover' style={{width: 28, height: 28}} source={{uri: icons.add}} />
              </View>
            </View>
            {
              tasks.items.map((item, key) => {
                return (
                  <TouchableHighlight key={key} activeOpacity={0.9} underlayColor="none">
                    <View style={[styles.column, {backgroundColor: item.statusText == 'Task/Note' ? '#FFF5F8' : '#FFF'}]} key={index}>
                      <View style={styles.columnStatusCon}>
                        <View style={[styles.columnStatusTextCon, {backgroundColor: item.statusText == 'Task/Note' ? '#e89cae' : '' || item.statusText == 'In Progress' ? '#448de3' : '' || item.statusText == 'Suggested Task' ? '#d3d6d9' : ''}]}>
                          <Text style={styles.columnStatusText} allowFontScaling={false}>{item.statusText}</Text>
                        </View>
                        <View style={styles.columnStatusHeadCon}>
                          <Image resizeMode='cover' style={styles.columnHeadIcon} source={{uri: icons.star}} />
                          <Image resizeMode='cover' style={styles.columnHeadIcon} source={{uri: icons.more}} />
                        </View>
                      </View>
                      <Text style={styles.columnTitle} allowFontScaling={false}>{item.title}</Text>
                      <Text style={styles.columnDescription} allowFontScaling={false}>{item.description}</Text>
                    </View>
                  </TouchableHighlight>
                )
              })
            }
          </View>
        </>
      )
    } else {
      return <></>
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.backgroundContainer}>
            <Image resizeMode='cover' style={styles.backgroundContainerImage} source={{uri: icons.headbg}} />
            <View style={styles.backgroundContainerText}>
              <Text allowFontScaling={false} style={{color: '#FFF'}}>Singapore</Text>
              <Image resizeMode='cover' style={styles.backgroundContainerIcon} source={{uri: 'https://staging-customerportal.moovaz.com/static/media/goodbye.e157fe90.svg'}} />
              <Text allowFontScaling={false} style={{color: '#FFF'}}>Australia</Text>
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
              <Text allowFontScaling={false} style={{color: '#909194'}}>All Tasks</Text>
              <Image resizeMode='cover' style={styles.tasksIconArrowDown} source={{uri: icons.arrowDown}} />
            </>
          </TouchableHighlight>
          <View style={[styles.tasks, {marginTop: 0, padding: 0}]}>
            <TouchableHighlight style={styles.taskView} underlayColor="rgba(255, 255, 255, 0.75)" activeOpacity={0.8} onPress={() => {
              this.fetchDataListColumn()
              this.setState({active: 'Task View'})
            }}>
              <>
                <Image resizeMode='cover' style={styles.tasksIcon} source={{uri: this.state.active == 'Task View' ? icons.taskActive : icons.task}} />
                <Text allowFontScaling={false} style={{color: this.state.active == 'Task View' ? '#E89CAE' : '#909194'}}>Task View</Text>
              </>
            </TouchableHighlight>
            <TouchableHighlight style={styles.taskTimeline} underlayColor="rgba(255, 255, 255, 0.75)" activeOpacity={0.8} onPress={() => {
              this.fetchDataListRow()
              this.setState({active: 'Timeline View'})
            }}>
              <>
                <Image resizeMode='cover' style={styles.tasksIcon} source={{uri: this.state.active == 'Timeline View' ? icons.timelineActive : icons.timeline}} />
                <Text allowFontScaling={false} style={{color: this.state.active == 'Timeline View' ? '#E89CAE' : '#909194'}}>Timeline View</Text>
              </>
            </TouchableHighlight>
            <Image resizeMode='cover' style={[styles.tasksIcon, {marginRight: 13, width: 20, height: 20}]} source={{uri: icons.theme}} />
          </View>
          <ActionSheet
            ref={o => this.ActionSheet = o}
            title={'Select ...'}
            options={['All Tasks', 'Starred', 'In Progress', 'Completed', 'Cancel']}
            cancelButtonIndex={4}
            // destructiveButtonIndex={4}
            onPress={(index) => { /* do something */ }}
          />
          <View style={[styles.taskview, {display: this.state.active == 'Task View' ? 'flex' : 'none'}]}>
            <Swiper autoplay={false} height={1000} showsButtons={false} showPagination={false} index={0} dot={<></>} activeDot={<></>}>
              <View style={styles.slide}>
                {this.renderColumns(this.state.tasks && this.state.tasks.origin, 0)}
              </View>
              <View style={styles.slide}>
                {this.renderColumns(this.state.tasks && this.state.tasks.destination, 1)}
              </View>
              <View style={styles.slide}>
                {this.renderColumns(this.state.tasks && this.state.tasks.taskNote, 2)}
              </View>
            </Swiper>
          </View>
          <View style={[styles.timeline, {display: this.state.active == 'Timeline View' ? 'flex' : 'none'}]}>
            {this.renderRows(this.state.tasks && this.state.tasks.dated, 0)}
            {this.renderRows(this.state.tasks && this.state.tasks.unDated, 1)}
          </View>
          <View style={styles.footer}>
            <Image resizeMode='cover' style={styles.footerImage} source={{uri: icons.footer}} />
          </View>
        </ScrollView>
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
    height: 120,
    zIndex: -1
  },
  backgroundContainerText: {
    // position: 'absolute',
    // bottom: 0,
    width: '100%',
    height: 120,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 111
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
    borderRightWidth: 1
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
    backgroundColor: '#FFF'
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
    width: 24,
    height: 24,
    marginLeft: 3
  },
  columnStatusCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    minHeight: 200
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
    paddingBottom: 40,
    // width: '80%',
    // marginRight: 30
  },

  // footer
  footerImage: {
    marginTop: 180,
    width: '100%',
    height: 180
  }
});

export default Home;
