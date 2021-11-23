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
      }}>{navigation.state.params.title}</Text>
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

    // CameraRoll.saveToCameraRoll(this.props.navigation.state.params.save)
    //   .then(function(result) {
    //     this.refs.toast.show("图片已保存至相册")
    //   }).catch(function(error) {
    //     this.refs.toast.show("保存失败")
    //   })

    this.state = {
      params: this.props.navigation.state.params,
      user: null
    };

    AsyncStorage.getItem('user')
    .then((response) => {
      this.setState({
        user: JSON.parse(response)
      })
    })
    .catch((error) => {
      this.setState({
        user: null
      })
    })
    .done();
  }

  componentWillUnmount() {
    if (this.state.params.title == '支付订单') {
      DeviceEventEmitter.emit('ChangeCart');
    }
  }

  onMessage = (e) => {
    let params = e.nativeEvent.data;
    params = JSON.parse(params);
    console.log("WebView onMessage ", params);
    switch (params.dataset.type) {
      case 'native':
        this.props.navigation.push(params.dataset.navigation, { title: params.dataset.title, uri: params.dataset.data + '?sign=' + this.state.user.token })
        break;
      case 'navigate':
        this.props.navigation.push(params.dataset.navigation, {id: params.dataset.id, title: params.dataset.title})
        break;
      case 'html':
        this.props.navigation.push('Html', { title: params.dataset.title, data: params.dataset.data })
        break;
      default:

    }
  };

  onLoadEnd = (e) => {
    console.log("WebView onLoadEnd e：", e.nativeEvent);
    let data = {
      source: "from rn",
    };
    this.web && this.web.postMessage(JSON.stringify(data)); //发送消息到H5
  };

  render() {
    return (
      <>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <WebView
          ref={(webview) => {
            this.web = webview
          }}
          scalesPageToFit={false}
          // injectedJavaScript={ INJECTEDJAVASCRIPT }
          startInLoadingState={true}
          onLoadEnd={this.onLoadEnd}
          automaticallyAdjustContentInsets={true}
          onMessage={this.onMessage}
          javaScriptEnabled={true}
          source={{uri: this.props.navigation.state.params.uri ? this.props.navigation.state.params.uri : ''}}
        />
      </>
    );
  }
}

module.exports = Web;
