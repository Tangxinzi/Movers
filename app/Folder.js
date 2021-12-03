'use strict';

import React, { Component } from 'react';
import icons from './Icons';
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
  Appearance
} from 'react-native';

export default class Folder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bearer: null,
      reloDetail: null,
      documents: []
    }

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
    fetch(`https://api-staging-c.moovaz.com/api/v1/Customer/get-all-documents?RelocateId=${ this.state.reloDetail.relocateId }&pageNumber=0&pageSize=20&sortByColumn=uploaded_on&sortByType=desc&FileByType=all`, {
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
            <Text allowFontScaling={false} style={styles.title}>My Folder</Text>
            <TouchableHighlight style={styles.tasks} underlayColor="rgba(255, 255, 255, 0.75)" activeOpacity={0.8} onPress={() => this.ActionSheet.show()}>
              <>
                <Text allowFontScaling={false} style={{color: '#909194'}}>Sort by uploaded date</Text>
                <Image resizeMode='cover' style={styles.tasksIconArrowDown} source={{uri: icons.arrowDown}} />
                <ActionSheet ref={o => this.ActionSheet = o} title={'Select ...'} options={['Sort by document name', 'Sort by uploader name', 'Sort by uploaded name', 'Cancel']} cancelButtonIndex={3} onPress={(index) => {
                  if (index == 4) {
                    return
                  }
                }} />
              </>
            </TouchableHighlight>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.typeSelectionScroll}>
              <TouchableHighlight style={[styles.typeSelection, {borderColor: '#e89cae'}]} underlayColor="none" activeOpacity={0.9}>
                <Text allowFontScaling={false} style={styles.typeSelectionText} numberOfLines={1}>All</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.typeSelection} underlayColor="none" activeOpacity={0.9}>
                <Text allowFontScaling={false} style={styles.typeSelectionText} numberOfLines={1}>Files Uploaded</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.typeSelection} underlayColor="none" activeOpacity={0.9}>
                <Text allowFontScaling={false} style={styles.typeSelectionText} numberOfLines={1}>Files Received</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.typeSelection} underlayColor="none" activeOpacity={0.9}>
                <Text allowFontScaling={false} style={styles.typeSelectionText} numberOfLines={1}>Quotations Received</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.typeSelection} underlayColor="none" activeOpacity={0.9}>
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
    marginBottom: 5,
    marginTop: 20,
    fontFamily: 'Baskerville',
  },
  typeSelectionScroll: {
    marginTop: 30,
    marginBottom: 30
  },
  typeSelection: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#d3d6d9'
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
});
