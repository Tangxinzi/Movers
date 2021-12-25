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

class Search extends React.Component {
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
          }}>Search</Text>
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

    this.state = {
      lists: [],
      search: []
    }

    getPosts('http://127.0.0.1:3000/posts?type=json', (data) => {
      this.setState({
        lists: data
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput
            allowFontScaling={true}
            style={styles.textInput}
            placeholder="Search ..."
            clearButtonMode="while-editing"
            password={false}
            defaultValue={this.state.search}
            placeholderTextColor="#CCC"
            onChangeText={(text) => {
              if (text.length) {
                var lists = this.state.lists, search = []
                for (var i = 0; i < lists.length; i++) {
                  console.log(lists[i].title.indexOf(text))
                  if (lists[i].title.indexOf(text) >= 0) {
                    search.push(lists[i])
                  }
                }
                this.setState({ search })
              } else {
                this.setState({ search: [] })
              }
            }}
          />
        </View>
        <View style={styles.container}>
          {
            this.state.search.map((item, key) => {
              return (
                <TouchableHighlight style={styles.list} key={key} activeOpacity={0.9} underlayColor="none" onPress={() => { this.props.navigation.navigate('Detail', {index: key}) }}>
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
      </View>
    );
  }
}

const styles = {
  container: {flex: 1},
  // search
  textInputContainer: {padding: 8, backgroundColor: '#f4f4f4', borderBottomWidth: 1, borderColor: '#d9d9d9'},
  textInput: { textAlign: 'center', borderColor: '#dfdede', borderWidth: 1, borderRadius: 4, paddingLeft: 10, paddingRight: 10, height: 40, fontWeight: '600', color: '#111', textAlign: 'left' },

  // lists
  title: {fontSize: 16, fontWeight: '600'},
  list: {display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 15, marginBottom: 0, padding: 15, borderRadius: 5, backgroundColor: '#FFF'},
  content: {display: 'none'},
  image: {width: 60, height: 60, marginLeft: 10, borderRadius: 5}
}

module.exports = Search;
