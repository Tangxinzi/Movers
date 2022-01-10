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
    
  }

  // LoadFile (url) {
  //   return new Promise((RES, REJ) => {
  //     fetch(url).then(response => response.blob()).then(blob => {
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         const data = e.target.result;
  //         RES(data.split('base64,')[1]);
  //       }
  //       reader.readAsDataURL(blob);
  //     }).catch(REJ);
  //   })
  // }

  render() {
    if (this.state.bearer) {
      return (
        <>
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
          <WebView
            source={{
              uri: "https://relo-api.moovaz.com/api/v1/Component/get-file?tick=637764106826616498&Id=5%2FwgkV64h8d8ommQbm7Zlxs8iWOxiDyy%2Bbf%2B56Ue54E%3D&code=opCT%2FXmUKekjsy3iur43Eg%3D%3D&KeyId=tMmY1K818OUkCBrr9xrir7jtFB28It1UZL6qB1eHJF4O%2FLMOrJU8tG0AXVt8kMTk&type=DOCUMENT_OF_CUSTOMER",
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
