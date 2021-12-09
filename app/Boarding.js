import React, { Component } from 'react';
import Footer from './components/Footer';
import iconsLogin from './icons/iconsLogin';
import iconsBoarding from './icons/iconsBoarding';
import {
  Text,
  View,
  Image,
  Alert,
  Linking,
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

class Boarding extends React.Component {
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
          }}>Boarding</Text>
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
      who: [
        {
          title: 'Adults',
          num: 0
        },
        {
          title: 'Children',
          num: 0
        },
        {
          title: 'Pets',
          num: 0
        },
      ],
      move: [
        {
          title: 'Job Assignment',
          radio: true,
          icon: iconsBoarding.move.jobAssignment
        },
        {
          title: 'Study',
          radio: false,
          icon: iconsBoarding.move.study
        },
        {
          title: 'Job Seeking',
          radio: false,
          icon: iconsBoarding.move.jobSeeking
        },
        {
          title: 'Immigration',
          radio: false,
          icon: iconsBoarding.move.immigration
        },
        {
          title: 'Family',
          radio: false,
          icon: iconsBoarding.move.family
        },
        {
          title: 'Retirement',
          radio: false,
          icon: iconsBoarding.move.retirement
        },
        {
          title: 'Returning Home',
          radio: false,
          icon: iconsBoarding.move.returningHome
        },
        {
          title: 'Pleasure',
          radio: false,
          icon: iconsBoarding.move.pleasure
        },
        {
          title: 'Others',
          radio: false,
          icon: iconsBoarding.move.other,
        },
      ]
    };
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
          <View style={styles.header}>
            <Image resizeMode='cover' style={styles.headerLogo} source={{uri: iconsBoarding.logo}} />
            <Text allowFontScaling={false} style={styles.headerTitle}>Hi!</Text>
            <Text allowFontScaling={false} style={styles.headerTitle}>I’m your Relocation Buddy.</Text>
            <Text allowFontScaling={false} style={styles.headerText}>Tell me more about your relocation so that I can make it as painless and stress-free as it can be!</Text>
          </View>
          <View style={styles.form}>
            <Text allowFontScaling={false} style={styles.titleInputContainer}>1. Move Details</Text>
            <View style={styles.textInputContainer}>
              <Text allowFontScaling={false} style={{color: 'rgb(51, 51, 51)'}}>You’re moving from*</Text>
              <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                placeholder=""
                clearButtonMode="while-editing"
                keyboardType=""
                defaultValue={this.state.from}
                placeholderTextColor="#CCC"
                onChangeText={(from) => this.setState({ from })}
              />
            </View>
            <View style={styles.textInputContainer}>
              <Text allowFontScaling={false} style={{color: 'rgb(51, 51, 51)'}}>To*</Text>
              <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                placeholder=""
                clearButtonMode=""
                password={true}
                defaultValue={this.state.to}
                placeholderTextColor="#CCC"
                // secureTextEntry
                onChangeText={(to) => this.setState({ to })}
              />
            </View>
            <View style={styles.textInputContainer}>
              <Text allowFontScaling={false} style={{color: 'rgb(51, 51, 51)'}}>Departing On*</Text>
              <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                placeholder=""
                clearButtonMode=""
                password={true}
                defaultValue={this.state.departing}
                placeholderTextColor="#CCC"
                // secureTextEntry
                onChangeText={(departing) => this.setState({ departing })}
              />
            </View>
            <View style={styles.textInputContainer}>
              <Text allowFontScaling={false} style={{color: 'rgb(51, 51, 51)'}}>Arriving On</Text>
              <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                placeholder=""
                clearButtonMode=""
                password={true}
                defaultValue={this.state.departing}
                placeholderTextColor="#CCC"
                // secureTextEntry
                onChangeText={(arriving) => this.setState({ arriving })}
              />
            </View>
          </View>
          <View style={styles.textSubmitFoot}>
            <TouchableHighlight underlayColor='transparent' style={styles.touch} onPress={() => {}}>
              <Text allowFontScaling={false} numberOfLines={1} style={styles.touchText}>NEXT</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.form}>
            <Text allowFontScaling={false} style={styles.titleInputContainer}>2. What has inspired your move?</Text>
            {
              this.state.move.map((item, key) => {
                return (
                  <TouchableHighlight key={key} activeOpacity={0.9} underlayColor="none" style={styles.item}>
                    <>
                      <Image resizeMode='cover' style={styles.radio} source={{uri: item.radio ? iconsBoarding.radio : iconsBoarding.rectangle}} />
                      <Text style={styles.moveText} allowFontScaling={false}>{item.title}</Text>
                      <Image resizeMode='cover' style={styles.moveImage} source={{uri: item.icon}} />
                    </>
                  </TouchableHighlight>
                )
              })
            }
          </View>
          <View style={styles.textSubmitFoot}>
            <TouchableHighlight underlayColor='transparent' style={styles.touch} onPress={() => {}}>
              <Text allowFontScaling={false} numberOfLines={1} style={styles.touchText}>NEXT</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.form}>
            <Text allowFontScaling={false} style={styles.titleInputContainer}>3. Who’s moving with you?</Text>
            {
              this.state.who.map((item, key) => {
                return (
                  <TouchableHighlight key={key} activeOpacity={0.9} underlayColor="none" style={styles.whoItem}>
                    <>
                      <Text style={styles.whoText} allowFontScaling={false}>{item.title}</Text>
                      <View style={styles.active}>
                        <Image resizeMode='cover' style={styles.activeImage} source={{uri: iconsBoarding.minus}} />
                        <View style={styles.activeContent}>
                          <Text style={styles.activeText} allowFontScaling={false}>{item.num}</Text>
                        </View>
                        <Image resizeMode='cover' style={styles.activeImage} source={{uri: iconsBoarding.plus}} />
                      </View>
                    </>
                  </TouchableHighlight>
                )
              })
            }
          </View>
          <View style={styles.textSubmitFoot}>
            <TouchableHighlight underlayColor='transparent' style={styles.touch} onPress={() => {}}>
              <Text allowFontScaling={false} numberOfLines={1} style={styles.touchText}>NEXT</Text>
            </TouchableHighlight>
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

  // who
  whoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  active: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  whoText: {
    fontSize: 16,
    flex: 1
  },
  activeImage: {
    width: 32,
    height: 32,
  },
  activeContent: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#D3D6D9',
    borderRadius: 5,
    width: 40,
    height: 40,
    marginLeft: 15,
    marginRight: 15
  },
  activeText: {
    fontSize: 20,
  },

  // item
  item: {
    backgroundColor: '#F4F4F4',
    padding: 20,
    height: 80,
    borderRadius: 8,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative'
  },
  moveText: {
    fontSize: 17
  },
  moveImage: {
    width: 82,
    height: 60,
    position: 'absolute',
    bottom: 0,
    right: 0
  },

  // header
  header: {
    alignItems: 'center',
  },
  headerLogo: {
    marginTop: 40,
    marginBottom: 40,
    width: 134,
    height: 76,
  },
  headerTitle: {
    fontFamily: 'Baskerville',
    textAlign: 'center',
    fontSize: 32,
  },
  headerText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 30
  },
  form: {
    position: 'relative',
    padding: 20,
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
    marginBottom: 50,
    alignItems: 'flex-end',
  },
  textInputContainer: {
    width: '100%',
    marginBottom: 30
  },
  radio: { width: 22, height: 22, marginRight: 11, },
  touch: { backgroundColor: '#FFF', borderWidth: 0.5, borderColor: '#E89CAE', width: 145, height: 46, justifyContent: 'center', borderRadius: 23 },
  touchText: { fontSize: 16, fontWeight: '600', color: '#e89cae', textAlign: 'center', marginHorizontal: 16 }
}

module.exports = Boarding;
