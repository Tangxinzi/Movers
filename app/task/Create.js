import React, { Component } from 'react';
import Axios from 'react-native-axios';
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
} from 'react-native';

class Login extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    // headerRight: (
    //   <TouchableHighlight
    //     underlayColor='transparent'
    //     style={{paddingLeft: 10, paddingRight: 10}}
    //     onPress={() => navigation.goBack()}
    //   >
    //     <Text allowFontScaling={false} style={{fontSize: 15}}>返回</Text>
    //   </TouchableHighlight>
    // ),
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
          }}>Add A Task</Text>
        </>
      </TouchableHighlight>
    ),
    tabBarVisible: false,
    headerStyle: {
      elevation: 0,
    },
  });

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillUnmount() {

  }

  fetchLogin() {

  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <View style={styles.container}>
          <KeyboardAvoidingView
            style={{width: '100%', height: '100%', alignItems: 'center'}}
            keyboardVerticalOffset={10}
          >
            <View style={styles.textInputContainer}>
              <Text allowFontScaling={false}>Title*</Text>
              <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                placeholder=""
                clearButtonMode="while-editing"
                keyboardType="numeric"
                defaultValue={this.state.phone}
                placeholderTextColor="#CCC"
                onChangeText={(params) => {
                  this.setState({
                    phone: params
                  });
                }}
              />
            </View>
            <View style={styles.textInputContainer}>
              <Text allowFontScaling={false}>Description</Text>
              <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                placeholder=""
                clearButtonMode="while-editing"
                keyboardType="numeric"
                defaultValue={this.state.phone}
                placeholderTextColor="#CCC"
                onChangeText={(params) => {
                  this.setState({
                    phone: params
                  });
                }}
              />
            </View>
            <View style={styles.textInputContainer}>
              <Text allowFontScaling={false}>Additional Notes</Text>
              <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                placeholder=""
                clearButtonMode="while-editing"
                keyboardType="numeric"
                defaultValue={this.state.phone}
                placeholderTextColor="#CCC"
                onChangeText={(params) => {
                  this.setState({
                    phone: params
                  });
                }}
              />
            </View>
            <View style={styles.textSubmitFoot}>
              <TouchableHighlight
                underlayColor='transparent'
                style={{backgroundColor: '#E89CAE', padding: 10, borderRadius: 20}}
                onPress={() => {
                  this.fetchLogin()
                }}
              >
                <>
                  <Text allowFontScaling={false} numberOfLines={1} style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: 'rgba(255, 255, 255, 0.9)',
                    textAlign: 'center',
                    marginHorizontal: 16
                  }}>Create</Text>
                </>
              </TouchableHighlight>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    backgroundColor: '#FFF'
  },
  textInput: {
    width: '100%',
    borderColor: '#D3D6D9',
    color: '#111',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    height: 44,
    marginTop: 6,
    fontWeight: '700',
    color: '#111',
    textAlign: 'left'
  },
  textSubmitFoot: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textInputContainer: {
    width: '100%',
    marginBottom: 20
  },
  containerLogo: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginBottom: 10
  },
  logoDec: {
    fontSize: 14
  },
}

module.exports = Login;
