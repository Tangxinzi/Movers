'use strict';

import React, { Component } from 'react';
import icons from './icons/Icons';
import Bottom from './components/Bottom';
import Header from './components/Header';
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
  Appearance,
  DeviceEventEmitter
} from 'react-native';

export default class Folder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bearer: null,
      reloDetail: null,
      documents: [],
      fileByType: 'all',
      sortByColumn: {
        index: 0,
        text: ['Sort by document name', 'Sort by uploader name', 'Sort by uploaded name', 'Cancel']
      }
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
          this.setState({
            reloDetail: JSON.parse(response)
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

  fetchData (sortByColumn) {
    this.setState({documents: []})
    fetch(`https://api-staging-c.moovaz.com/api/v1/Customer/get-all-documents?RelocateId=${ this.state.reloDetail.relocateId }&pageNumber=0&pageSize=20&sortByColumn=${ sortByColumn || 'uploaded_on' }&sortByType=desc&FileByType=${ this.state.fileByType || 'FileByType' }`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ this.state.bearer.jwToken }`,
      }
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ documents: responseData.data.items })
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
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Text allowFontScaling={false} style={styles.title}>My Folder</Text>
              <Text allowFontScaling={false} style={styles.pinkLink}>UPLOAD FILE</Text>
            </View>
            <TouchableHighlight style={styles.tasks} underlayColor="rgba(255, 255, 255, 0.75)" activeOpacity={0.8} onPress={() => this.ActionSheet.show()}>
              <>
                <Text allowFontScaling={false} style={{color: '#909194'}}>{this.state.sortByColumn.text[this.state.sortByColumn.index]}</Text>
                <Image resizeMode='cover' style={styles.tasksIconArrowDown} source={{uri: icons.arrowDown}} />
                <ActionSheet ref={o => this.ActionSheet = o} title={'Select ...'} options={this.state.sortByColumn.text} cancelButtonIndex={3} onPress={(index) => {
                  this.state.sortByColumn.index = index
                  this.setState({ sortByColumn: this.state.sortByColumn })
                  switch (index) {
                    case 0:
                      this.fetchData('doc_name')
                      break;
                    case 1:
                      this.fetchData('uploaded_by')
                      break;
                    case 2:
                      this.fetchData('uploaded_on')
                      break;
                    default:

                  }
                }} />
              </>
            </TouchableHighlight>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.typeSelectionScroll}>
              <TouchableHighlight style={{borderColor: this.state.fileByType == 'all' ? '#e89cae' : '#d3d6d9', ...styles.typeSelection}} underlayColor="none" activeOpacity={0.9} onPress={() => {
                this.setState({
                  fileByType: 'all'
                })
                this.fetchData()
              }}>
                <Text allowFontScaling={false} style={styles.typeSelectionText} numberOfLines={1}>All</Text>
              </TouchableHighlight>
              <TouchableHighlight style={{borderColor: this.state.fileByType == 'my_file' ? '#e89cae' : '#d3d6d9', ...styles.typeSelection}} underlayColor="none" activeOpacity={0.9} onPress={() => {
                this.setState({
                  fileByType: 'my_file'
                })
                this.fetchData()
              }}>
                <Text allowFontScaling={false} style={styles.typeSelectionText} numberOfLines={1}>Files Uploaded</Text>
              </TouchableHighlight>
              <TouchableHighlight style={{borderColor: this.state.fileByType == 'received' ? '#e89cae' : '#d3d6d9', ...styles.typeSelection}} underlayColor="none" activeOpacity={0.9} onPress={() => {
                this.setState({
                  fileByType: 'received'
                })
                this.fetchData()
              }}>
                <Text allowFontScaling={false} style={styles.typeSelectionText} numberOfLines={1}>Files Received</Text>
              </TouchableHighlight>
              <TouchableHighlight style={{borderColor: this.state.fileByType == 'invoice' ? '#e89cae' : '#d3d6d9', ...styles.typeSelection}} underlayColor="none" activeOpacity={0.9} onPress={() => {
                this.setState({
                  fileByType: 'invoice'
                })
                this.fetchData()
              }}>
                <Text allowFontScaling={false} style={styles.typeSelectionText} numberOfLines={1}>Quotations Received</Text>
              </TouchableHighlight>
              <TouchableHighlight style={{borderColor: this.state.fileByType == 'quotation' ? '#e89cae' : '#d3d6d9', ...styles.typeSelection}} underlayColor="none" activeOpacity={0.9} onPress={() => {
                this.setState({
                  fileByType: 'quotation'
                })
                this.fetchData()
              }}>
                <Text allowFontScaling={false} style={styles.typeSelectionText} numberOfLines={1}>Invoices Received</Text>
              </TouchableHighlight>
            </ScrollView>
            <View style={styles.vendoies}>
            {
              this.state.documents.map((item, key) => {
                return (
                  <TouchableHighlight style={styles.documents} key={key} underlayColor="none" activeOpacity={0.85} onPress={() => {

                  }}>
                    <View style={styles.documentsRow}>
                      <View style={styles.documentsContent}>
                        <Text allowFontScaling={false} style={styles.companyName}>{item.originalFilename}</Text>
                        <Text allowFontScaling={false} style={styles.uploadedText}>Uploaded by</Text>
                        <Text allowFontScaling={false} style={styles.companyName}>{item.accountFirstName} {item.accountLastName}</Text>
                        <Text allowFontScaling={false} style={styles.uploadedText}>Last updated on</Text>
                        <Text allowFontScaling={false} style={styles.companyName}>{item.lastModified}</Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                )
              })
            }
            {
              !this.state.documents.length ? <Text style={styles.typeSelectionText} style={{padding: 15}}>Loading your documents ...</Text> : <></>
            }
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
  },
  title: {
    fontSize: 36,
    marginTop: 20,
    marginRight: 10,
    fontFamily: 'Baskerville',
  },
  pinkLink: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
    color: '#e89cae',
    // borderBottomWidth: 2,
    borderColor: 'pink',
    borderBottomStyle: 'dotted'
  },
  typeSelectionScroll: {
    marginTop: 40,
    marginBottom: 20
  },
  typeSelection: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    // borderColor: '#d3d6d9'
  },
  typeSelectionText: {
    fontSize: 16,
  },
  vendoies: {
    marginTop: 20,
    backgroundColor: '#FFF',
    minHeight: 800,
    overflow: 'hidden',
    borderRadius: 5
  },
  documents: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#d3d6d9',
  },
  documentsRow: {
    flexDirection: 'row'
  },
  documentsImage: {
    width: 70,
    height: 70,
    marginRight: 10
  },
  documentsContent: {
    flex: 1
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
    fontSize: 16,
    marginTop: 3,
    marginBottom: 3,
  },
  uploadedText: {
    color: '#75787b',
    fontSize: 12,
    marginTop: 10.5,
    marginBottom: 3,
  },

  // All Tasks
  tasks: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginTop: 20,
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
});
