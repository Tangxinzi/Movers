import React, { Component } from 'react';
import {
  Text,
  Alert,
  StatusBar,
  AsyncStorage,
  DeviceEventEmitter,
  TouchableHighlight
} from 'react-native';
import WebView from 'react-native-webview'
const INJECTEDJAVASCRIPT = `
  const meta = document.createElement('meta');
  meta.setAttribute('content', 'initial-scale=0.95, maximum-scale=0.95, user-scalable=0');
  meta.setAttribute('name', 'viewport');
  document.getElementsByTagName('head')[0].appendChild(meta);`

class BrowseFile extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: (
      <Text allowFontScaling={false} style={{
        fontSize: 17,
        fontWeight: '600',
        color: 'rgba(0, 0, 0, .9)',
        textAlign: 'center',
        margin: 0,
      }}></Text>
    ),
    headerRight: null,
    headerStyle: {
      borderBottomWidth: 0,
      elevation: 0,
      shadowOpacity: 0
    },
  });

  constructor(props) {
    super(props);

    this.state = {
      params: props.navigation.state.params,
      bearer: {}
    };

    AsyncStorage.getItem('bearer')
    .then((response) => {
      this.setState({
        bearer: JSON.parse(response)
      })
    })
    .catch((error) => {
      console.log('error', error)
    })
    .done()
  }

  render() {
    if (this.state.bearer) {
      return (
        <>
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
          <WebView
            source={{
              uri: "https://api-staging-c.moovaz.com/api/v1/Component/get-file?tick=637764050137975571&Id=LGup6JMg8zHhEb0%2BqszFwj3XlENM%2FLL1uqe81OQnnLs%3D&code=opCT%2FXmUKekjsy3iur43Eg%3D%3D&KeyId=cQRMrkscsese02BVQ0YyvDCDtomM2ra%2F1DBN9HJLAqBviPpP5LI2rJTu8wEo3sWa&type=RELOCATES",
              method: 'GET',
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Authorization': `Bearer ${ this.state.bearer.jwToken }`,
              }
            }}
          />
        </>
      )
    } else {
      return (
        <></>
      )
    }
  }
}

module.exports = BrowseFile;
