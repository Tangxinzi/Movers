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
    
  }

  render() {
    if (this.state.bearer) {
      return (
        <>
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
          <WebView
            source={{
              uri: "https://message-staging-c.moovaz.com/mobileHub/negotiate?RelocateId=d5f20c36-d5ac-4088-b11d-6ce8c39f519d&UserId=LCGUmMlah7G1D77VWHQcJ6h9mrYZJbQAiJX5OOs1lfU8LJHWmAljWC64uLu4t80g&Role=customer&negotiateVersion=1",
              method: 'POST',
              headers: {
                'Content-Type': 'text/plain;charset=UTF-8',
                'Cookie': `_fbp=fb.1.1636965229441.1777376798; hubspotutk=db09dd63fc3f268d57acfe3d5b2e2d26; _hjSessionUser_2715251=eyJpZCI6ImJjOTdmODI4LWM5MDItNTMyNy1hOWFiLTA2MGNlMjYwZTQ0MyIsImNyZWF0ZWQiOjE2Mzc3NTExMTU0NDUsImV4aXN0aW5nIjp0cnVlfQ==; messagesUtk=ec0db415667142cb99bffd6e1b977218; __hstc=239551708.db09dd63fc3f268d57acfe3d5b2e2d26.1636965241602.1636965241602.1639051301908.2; _gcl_au=1.1.1123579242.1639051303; _gid=GA1.2.1737001984.1640738590; _ga=GA1.1.423117982.1636965222; _hjSession_2715251=eyJpZCI6IjYyNjBkYmY2LWU4Y2UtNDIyMi1hNjgzLWFiYjM1NTliOWRhMCIsImNyZWF0ZWQiOjE2NDA3NzMwMDcwMzZ9; _hjAbsoluteSessionInProgress=1; _ga_Y4MLL9M13T=GS1.1.1640772993.77.1.1640773347.0`,
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
