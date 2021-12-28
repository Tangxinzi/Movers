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

class Web extends React.Component {
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
      bearer: {}
    };

    AsyncStorage.getItem('bearer')
    .then((response) => {
      this.setState({
        bearer: JSON.parse(response)
      })
      console.log(this.state.bearer.jwToken);
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
              uri: "https://staging-customerportal.moovaz.com/forwardrelocation/inbox/2322",
              headers: {
                // 'Content-Type': 'image/png',
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

module.exports = Web;
