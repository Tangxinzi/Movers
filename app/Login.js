import React, { Component } from 'react';
import Footer from './components/Footer';
import iconsLogin from './icons/iconsLogin';
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
    headerLeft: (
      <TouchableHighlight
        underlayColor='transparent'
        style={{paddingLeft: 10, paddingRight: 10}}
      >
        <Text allowFontScaling={false} style={{fontSize: 15}}></Text>
      </TouchableHighlight>
    ),
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
          }}>Login</Text>
        </>
      </TouchableHighlight>
    ),
    headerRight: (
      <TouchableHighlight
        underlayColor='transparent'
        style={{paddingLeft: 10, paddingRight: 10}}
        onPress={() => {

        }}
      >
        <Text allowFontScaling={false} style={{fontSize: 15}}></Text>
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
      email: "mrsjanesmith@yopmail.com",
      password: "MasterPassword"
    };

    AsyncStorage.getItem('bearer')
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      this.props.navigation.navigate('Login')
      console.log(error);
    })
    .done()

    AsyncStorage.removeItem('bearer');
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('Change')
  }

  fetchLogin() {
    fetch(`https://api-staging-c.moovaz.com/api/Account/authenticate`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": this.state.email,
        "password": this.state.password
      })
    })
    .then(response => response.json())
    .then(responseData => {
      if (responseData.errorCode == 0) {
        AsyncStorage.setItem('bearer', JSON.stringify(responseData.data))
        this.props.navigation.navigate('HomeScreen')
      } else {
        Alert.alert('Tips', responseData.message || '', [
          {
            text: "OK", onPress: () => {}
          }
        ])
      }
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
          <View style={styles.header}>
            <Image resizeMode='cover' style={styles.headerLogo} source={{uri: iconsLogin.logo}} />
            <Text allowFontScaling={false} style={styles.headerTitle}>We'll help you move it!</Text>
            <Text allowFontScaling={false} style={styles.headerText}>Relocation is a chore. With your first step sorted out at moovaz, your relocation experience will be a walk in the park too. Start your moovaz journey, log in now with the details sent to your email address.</Text>
          </View>
          <View style={styles.login}>
            <KeyboardAvoidingView keyboardVerticalOffset={10}>
              <View style={styles.textInputContainer}>
                <Text allowFontScaling={false} style={styles.titleInputContainer}>Login</Text>
                <Text allowFontScaling={false} style={{color: 'rgb(51, 51, 51)'}}>Email Address</Text>
                <TextInput
                  allowFontScaling={false}
                  style={styles.textInput}
                  placeholder="For eg. dave@moovaz.life"
                  clearButtonMode="while-editing"
                  keyboardType="email-address"
                  defaultValue={this.state.email}
                  placeholderTextColor="#CCC"
                  onChangeText={(email) => this.setState({ email })}
                />
              </View>
              <View style={styles.textInputContainer}>
                <Text allowFontScaling={false} style={{color: 'rgb(51, 51, 51)'}}>Password</Text>
                <TextInput
                  allowFontScaling={false}
                  style={styles.textInput}
                  placeholder=""
                  clearButtonMode="while-editing"
                  password={true}
                  defaultValue={this.state.password}
                  placeholderTextColor="#CCC"
                  secureTextEntry
                  onChangeText={(password) => this.setState({ password })}
                />
                <Text allowFontScaling={false} style={{marginTop: 15, color: '#e89cae', fontWeight: '700'}}>Forgot password?</Text>
              </View>
              <View style={styles.textSubmitFoot}>
                <TouchableHighlight
                  underlayColor='transparent'
                  style={{backgroundColor: this.state.email != '' && this.state.password != '' ? '#e89cae' : 'grey', width: 145, height: 46, justifyContent: 'center', borderRadius: 23}}
                  onPress={() => {
                    if (this.state.email != '' && this.state.password != '') {
                      this.fetchLogin()
                    }
                  }}
                >
                  <Text allowFontScaling={false} numberOfLines={1} style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: 'rgba(255, 255, 255, 0.9)',
                    textAlign: 'center',
                    marginHorizontal: 16
                  }}>LOGIN</Text>
                </TouchableHighlight>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.bottomItem}>
            <Image resizeMode='cover' style={styles.bottomItemImage} source={{uri: 'https://staging-customerportal.moovaz.com/static/media/login-people.daab9c7d.png'}} />
            <View style={styles.bottomItemContent}>
              <Text allowFontScaling={false} style={styles.bottomItemTitle}>Access to our trusted partners</Text>
              <Text allowFontScaling={false} style={styles.bottomItemText}>Browse through a wide variety of services provided by our trusted partners.</Text>
            </View>
          </View>
          <View style={styles.bottomItem}>
            <Image resizeMode='cover' style={styles.bottomItemImage} source={{uri: iconsLogin.boxes}} />
            <View style={styles.bottomItemContent}>
              <Text allowFontScaling={false} style={styles.bottomItemTitle}>Track your location prep</Text>
              <Text allowFontScaling={false} style={styles.bottomItemText}>Personalise your dashboard & never miss any updates of your relocation progress.</Text>
            </View>
          </View>
          <View style={styles.bottomItem}>
            <Image resizeMode='cover' style={styles.bottomItemImage} source={{uri: iconsLogin.phone}} />
            <View style={styles.bottomItemContent}>
              <Text allowFontScaling={false} style={styles.bottomItemTitle}>Discover pocket friendly deals and offers</Text>
              <Text allowFontScaling={false} style={styles.bottomItemText}>Enjoy exclusive discounts and offers provided by our trusted partners.</Text>
            </View>
          </View>
        </View>
        <Footer />
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    padding: 30,
    width: '100%'
  },

  // bottom
  bottom: {
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    marginBottom: 30,
  },
  bottomItemContent: {
    flex: 1,
    marginLeft: 25,
  },
  bottomItemImage: {
    width: 65,
    height: 62,
  },
  bottomItemTitle: {
    fontWeight: '700',
    fontSize: 18,
  },
  bottomItemText: {
    marginTop: 6,
    lineHeight: 22,
    fontSize: 15,
    fontWeight: '400',
    color: '#212529'
  },

  // header
  header: {
    alignItems: 'center',

  },
  headerLogo: {
    width: 130,
    height: 28,
  },
  headerTitle: {
    fontFamily: 'Baskerville',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 30,
    fontSize: 36,
  },
  headerText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30
  },
  login: {
    position: 'relative',
    padding: 30,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10
  },
  textInput: {
    width: '100%',
    borderColor: '#d3d6d9',
    borderWidth: 1,
    borderRadius: 4,
    padding: 15,
    // height: 43,
    marginTop: 10,
    fontWeight: '700',
    borderRadius: 0,
    color: '#111',
    textAlign: 'left'
  },
  titleInputContainer: {
    opacity: .8,
    fontWeight: '700',
    fontSize: 24,
    color: '#000',
    marginBottom: 30,
  },
  textSubmitFoot: {
    marginTop: 30,
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  textInputContainer: {
    width: '100%',
    marginBottom: 30
  },
}

module.exports = Login;
