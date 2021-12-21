import React, { Component } from 'react';
import Posts from './Posts';
import ViewSwiper from 'react-native-swiper';
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

class Event extends React.Component {
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
          }}>Posts</Text>
        </>
      </TouchableHighlight>
    ),
    headerRight: (
      <TouchableHighlight
        underlayColor='transparent'
        style={{paddingLeft: 10, paddingRight: 10}}
        onPress={() => {
          navigation.navigate('Search')
        }}
      >
        <Text allowFontScaling={false} style={{fontSize: 15}}>Search</Text>
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
      lists: Posts
    }

    // console.log(Posts());

    // AsyncStorage.removeItem('collections')
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.swiperContainer}>
            <ViewSwiper autoplay autoplayTimeout={4} dot={<View style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', width: 20, height: 3}} />} activeDot={<View style={{backgroundColor: '#ffffff', width: 20, height: 3}} />} paginationStyle={{bottom: 40}}>
              {
                this.state.lists.map((item, key) => {
                  if (key < 3) {
                    return (
                      <TouchableHighlight key={key} style={styles.swiperTouch} activeOpacity={0.9} underlayColor="none" onPress={() => { this.props.navigation.navigate('Detail', {index: key}) }}>
                        <>
                          <Image resizeMode='cover' style={styles.swiperImage} source={{uri: item.image}} />
                          <Text allowFontScaling={false} numberOfLines={1} style={styles.swiperTitle}>{item.title}</Text>
                        </>
                      </TouchableHighlight>
                    )
                  }
                })
              }
            </ViewSwiper>
          </View>
          {
            this.state.lists.map((item, key) => {
              if (key >= 3) {
                return (
                  <TouchableHighlight style={styles.list} key={key} activeOpacity={0.9} underlayColor="none" onPress={() => { this.props.navigation.navigate('Detail', {index: key}) }}>
                    <>
                      <View style={{flex: 1}}>
                        <Text allowFontScaling={false} numberOfLines={1} style={styles.title}>{item.title}</Text>
                        <Text allowFontScaling={false} numberOfLines={2} style={styles.description}>{item.description}</Text>
                      </View>
                      <Image style={styles.image} source={{uri: item.image}} />
                    </>
                  </TouchableHighlight>
                )
              }
            })
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {paddingBottom: 20},

  // swiper
  swiperContainer: {
    height: Dimensions.get('window').width / 1.9,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  swiperTouch: {
    borderRadius: 5,
  },
  swiperImage: {
    width: '100%',
    borderRadius: 5,
    height: Dimensions.get('window').width / 2.2
  },
  swiperTitle: {
    marginTop: 10,
    width: '80%',
    fontSize: 16,
    fontWeight: '600'
  },

  // lists
  title: {fontSize: 16, fontWeight: '600'},
  list: {display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 15, marginBottom: 0, padding: 15, borderRadius: 5, backgroundColor: '#FFF'},
  description: {display: 'none'},
  image: {width: 60, height: 60, marginLeft: 10, borderRadius: 5}
}

module.exports = Event;
