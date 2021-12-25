import React, { Component } from 'react';
import getPosts from './Posts';
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

class Collection extends React.Component {
  static navigationOptions ({ navigation }) {
    const { params } = navigation.state;

    return {
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
            }}>Collections</Text>
          </>
        </TouchableHighlight>
      ),
      headerRight: (
        <TouchableHighlight
          style={{padding: 10}}
          activeOpacity={0.85}
          underlayColor="none"
          onPress={() => {
            navigation.state.params.clearCollection()
          }}
        >
          <Text allowFontScaling={false} style={{fontSize: 15}}>Clear</Text>
        </TouchableHighlight>
      ),
      tabBarVisible: false,
      headerStyle: {
        elevation: 0,
      },
    }
  };

  clearCollection = () => {
    Alert.alert('Tips', 'Are you sure to empty the collection?',
      [
        {
          text: "Cancel", onPress: () => {}
        },
        {
          text: "OK", onPress: () => {
            AsyncStorage.removeItem('collections')
            this.setState({lists: []})
          }
        }
      ]
    )
  }

  componentDidMount() {
    this.props.navigation.setParams({
      clearCollection: this.clearCollection
    })
    this._navListener = this.props.navigation.addListener('didFocus', () => this.changeCollections())
    this.listener = DeviceEventEmitter.addListener('Change', () => this.changeCollections())
  }

  constructor(props) {
    super(props);

    this.state = {
      lists: []
    }

    getPosts('http://127.0.0.1:3000/posts?type=json', (data) => {
      this.setState({
        lists: data
      })
    })

    // this.changeCollections()
  }

  changeCollections() {
    AsyncStorage.getItem('collections').then(collections => {
      collections = JSON.parse(collections)
      this.setState({ lists: collections || [] })
    })
    .catch((error) => {
      console.log('error', error)
    })
    .done()
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {
            this.state.lists.map((item, key) => {
              return (
                <TouchableHighlight style={styles.list} key={key} activeOpacity={0.9} underlayColor="none" onPress={() => { this.props.navigation.navigate('Detail', {index: item.index || 0}) }}>
                  <>
                    <View style={{flex: 1}}>
                      <Text allowFontScaling={false} numberOfLines={1} style={styles.title}>{item.title}</Text>
                      <Text allowFontScaling={false} numberOfLines={2} style={styles.content}>{item.content}</Text>
                    </View>
                    <Image style={styles.image} source={{uri: item.image}} />
                  </>
                </TouchableHighlight>
              )
            })
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  title: {fontSize: 16, fontWeight: '600'},
  list: {display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 15, marginBottom: 0, padding: 15, borderRadius: 5, backgroundColor: '#FFF'},
  content: {display: 'none'},
  image: {width: 60, height: 60, marginLeft: 10, borderRadius: 5}
}

module.exports = Collection;
