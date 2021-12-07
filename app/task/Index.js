import React, { Component } from 'react';
import icons from '../icons/Icons';
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
  useWindowDimensions,
  Appearance
} from 'react-native';
const colorScheme = Appearance.getColorScheme();

class Index extends React.Component {
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
          }}>Task</Text>
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

    this.state = {
      task: null,
      taskVendor: [],
    };

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

        setTimeout(() => this.fetchData(), 1000)
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
    fetch(`https://api-staging-c.moovaz.com/api/v1/Customer/get-task-detail?taskId=${ this.props.navigation.state.params.taskId || '' }`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ this.state.bearer.jwToken }`,
      }
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ task: responseData.data })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done()

    fetch(`https://api-staging-c.moovaz.com/api/v1/Customer/get-task-vendor?taskId=${ this.props.navigation.state.params.taskId || '' }&isQuoteForm=false&pageSize=5`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ this.state.bearer.jwToken }`,
      }
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ taskVendor: responseData.data.items })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done()
  }

  renderColumns () {

  }

  render() {
    if (this.state.task) {
      return (
        <ScrollView>
          <View style={styles.container}>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
            <View style={[styles.columnStatusTextCon, {backgroundColor: this.state.task.statusText == 'New Task' ? '#ffaf00' : '' || this.state.task.statusText == 'Task/Note' ? '#e89cae' : '' || this.state.task.statusText == 'In Progress' ? '#448de3' : '' || this.state.task.statusText == 'Suggested Task' ? '#d3d6d9' : '' || this.state.task.statusText == 'Completed' ? '#00bd9d' : ''}]}>
              <Text style={styles.columnStatusText} allowFontScaling={false}>{this.state.task.statusText}</Text>
            </View>
            <View>
              <View style={[styles.row, {marginTop: 15, marginBottom: 15}]}>
                <Text allowFontScaling={false} style={styles.columnTitle}>{this.state.task.title}</Text>
                <View>
                  <Image resizeMode='cover' style={styles.columnHeadIcon} source={{uri: false ? icons.starred : icons.star}} />
                </View>
              </View>
              <Text allowFontScaling={false} style={styles.rowText}>{this.state.task.description}</Text>
            </View>
            {
              this.state.task.startDate ? (
                <>
                  <View style={styles.br}></View>
                  <View style={styles.row}>
                    <Text allowFontScaling={false} style={[styles.rowText, {color: '#75787b'}]}>Start Date</Text>
                    <Text allowFontScaling={false} style={styles.rowText}>{this.state.task.startDate}</Text>
                  </View>
                </>
              ) : (<></>)
            }
            {
              this.state.task.dueDate ? (
                <>
                  <View style={styles.br}></View>
                  <View style={styles.row}>
                    <Text allowFontScaling={false} style={[styles.rowText, {color: '#75787b'}]}>End Date</Text>
                    <Text allowFontScaling={false} style={styles.rowText}>{this.state.task.dueDate}</Text>
                  </View>
                </>
              ) : (<></>)
            }
            {
              this.state.task.budgetTypeCode && this.state.task.budgetAmount ? (
                <>
                  <View style={styles.br}></View>
                  <View style={styles.row}>
                    <Text allowFontScaling={false} style={[styles.rowText, {color: '#75787b'}]}>Budget</Text>
                    <Text allowFontScaling={false} style={styles.rowText}>{this.state.task.budgetTypeCode} {this.state.task.budgetAmount}</Text>
                  </View>
                  <View style={styles.br}></View>
                </>
              ) : (<></>)
            }
            <TouchableHighlight underlayColor="none" activeOpacity={0.85} onPress={() => {
                this.props.navigation.navigate('TaskCreate', {taskIndex: this.props.navigation.state.params.taskIndex || ''})
              }}
            >
              <View style={[styles.row, {justifyContent: 'center', marginTop: 40, marginBottom: 20}]}>
                <Image resizeMode='cover' style={{width: 28, height: 28}} source={{uri: icons.add}} />
                <Text allowFontScaling={false} style={[styles.rowText, {marginLeft: 10, color: '#e89cae', fontWeight: '600'}]}>ADD DUE DATE OR BUDGET</Text>
              </View>
            </TouchableHighlight>
            <View style={{borderRadius: 5, overflow: 'hidden'}}>
              {
                this.state.taskVendor.map((item, key) => {
                  return (
                    <View style={styles.vendor} key={key}>
                      <Text allowFontScaling={false} style={styles.vendorTitle}>{item.companyName}</Text>
                      <Text allowFontScaling={false} style={styles.vendorTitle}>{item.priceTierName}</Text>
                    </View>
                  )
                })
              }
            </View>
          </View>
        </ScrollView>
      )
    } else {
      return (
        <View style={{ height: 380, justifyContent: 'center', alignItems: 'center' }}>
          <Image resizeMode='cover' style={{width: 88, height: 88}} source={{uri: 'https://staging-customerportal.moovaz.com/static/media/loading.b5201de1.gif'}} />
        </View>
      )
    }
  }
}

const styles = {
  container: {
    position: 'relative',
    padding: 20,
    width: '100%'
  },
  br: {
    // marginTop: 10,
    marginBottom: 15,
    paddingBottom: 15,
    borderColor: 'rgba(0,0,0,.1)',
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rowText: {
    fontSize: 16
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
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 34,
    width: '86%'
  },
  columnDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6
  },
  columnHeadIcon: {
    width: 24,
    height: 24,
    marginLeft: 3
  },
  vendor: {
    padding: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#f4f4f4'
  },
  vendorTitle: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 5
  }
}

module.exports = Index;
