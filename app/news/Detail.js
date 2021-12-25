import React, { Component } from 'react';
import Icons from './Icons';
import getPosts from './Posts';
import RenderHtml from 'react-native-render-html';
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
  useWindowDimensions
} from 'react-native';

let { width, height } = Dimensions.get('window');

class Detail extends React.Component {
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
            }}>Details</Text>
          </>
        </TouchableHighlight>
      ),
      headerRight: (
        <TouchableHighlight
          style={{padding: 10}}
          activeOpacity={0.85}
          underlayColor="none"
          onPress={() => {
            navigation.setParams({
              collection: !navigation.state.params.collection
            })

            navigation.state.params.navigatePress()
          }}
        >
          <Image resizeMode='cover' style={styles.star} source={{uri: navigation.state.params.collection ? Icons.collectionActive : Icons.collection}} />
        </TouchableHighlight>
      ),
      tabBarVisible: false,
      headerStyle: {
        elevation: 0,
      },
    }
  };

  navigatePress = () => {
    const collections = this.state.collections || []
    this.setState({ collection: this.props.navigation.state.params.collection })

    if (!this.props.navigation.state.params.collection) {
      this.state.lists[this.props.navigation.state.params.index]['index'] = this.props.navigation.state.params.index
      collections.push(this.state.lists[this.props.navigation.state.params.index])
      AsyncStorage.setItem('collections', JSON.stringify(collections))
      Alert.alert('Tips', 'Post Collected',
        [
          {
            text: "OK"
          }
        ]
      )
    } else {
      const _collections = []
      for (var i = 0; i < collections.length; i++) {
        if (collections[i].title != this.state.lists[this.props.navigation.state.params.index].title) {
          _collections.push(collections[i])
        }
      }
      AsyncStorage.setItem('collections', JSON.stringify(_collections))
      Alert.alert('Tips', 'Collection cancelled',
        [
          {
            text: "OK"
          }
        ]
      )
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      navigatePress: this.navigatePress,
      collection: false
    })
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('Change')
  }

  constructor(props) {
    super(props);

    this.state = {
      collection: false,
      collections: [],
      params: this.props.navigation.state.params,
      lists: [],
      source: null
    }

    getPosts('http://127.0.0.1:3000/posts?type=json', (data) => {
      this.setState({
        lists: data,
        source: {html: data[this.props.navigation.state.params.index].content}
      })

      // AsyncStorage.removeItem('collections') // 清空收藏
      AsyncStorage.getItem('collections').then(collections => {
        collections = JSON.parse(collections)
        this.setState({ collections })
        for (var i = 0; i < collections.length; i++) {
          if (collections[i].title == this.state.lists[this.props.navigation.state.params.index].title) {
            this.props.navigation.setParams({
              collection: true
            })
          }
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
      .done()
    })
  }

  render() {
    return (
      <ScrollView>
        {
          this.state.lists.length ? (
            <View style={styles.container}>
              <View style={{flex: 1, padding: 10}}>
                <Text allowFontScaling={false} style={styles.title}>{this.state.lists[this.props.navigation.state.params.index].title}</Text>
                <RenderHtml contentWidth={320} source={this.state.source} />
              </View>
            </View>
          ) : (<></>)
        }
      </ScrollView>
    );
  }
}

const styles = {
  container: {backgroundColor: '#FFF', paddingBottom: 20},
  title: {marginTop: 10, marginBottom: 20, fontSize: 24, fontWeight: '600'},
  content: {fontSize: 18, lineHeight: 26},
  image: {width: width - 20, height: 200, marginBottom: 10},
  star: {width: 28, height: 28},
  p: {fontWeight: '800'}
}

module.exports = Detail;
