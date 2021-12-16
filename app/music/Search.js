import React, { Component } from 'react';
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
          }}>搜索</Text>
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
      lists: []
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput
            allowFontScaling={true}
            style={styles.textInput}
            placeholder="搜索"
            clearButtonMode="while-editing"
            password={false}
            defaultValue={this.state.search}
            placeholderTextColor="#CCC"
            onChangeText={(search) => this.setState({ search })}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {flex: 1, backgroundColor: '#FFF'},
  textInputContainer: {marginBottom: 20, padding: 8, backgroundColor: '#f4f4f4'},
  textInput: { textAlign: 'center', borderColor: '#dfdede', borderWidth: 1, borderRadius: 4, paddingLeft: 10, paddingRight: 10, height: 40, fontWeight: '600', color: '#111', textAlign: 'left' }
}

module.exports = Search;
