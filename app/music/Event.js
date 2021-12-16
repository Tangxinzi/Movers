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
          }}>新闻</Text>
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
      lists: [
        {
          title: '🍇',
          description: 'An emoji is a pictogram, logogram, ideogram or smiley embedded in text and used in electronic messages and web pages. The primary function of emoji is to ...',
          image: 'https://qpic.y.qq.com/music_cover/GUalk7A0sBGvkxmUrXIf7BgaeBUQ3SnibMZhvVQVRnhsquYZy1ktPgw/300'
        },
        {
          title: '🍉',
          description: 'An emoji is a pictogram, logogram, ideogram or smiley embedded in text and used in electronic messages and web pages. The primary function of emoji is to ...',
          image: 'https://qpic.y.qq.com/music_cover/GUalk7A0sBGvkxmUrXIf7BgaeBUQ3SnibMZhvVQVRnhsquYZy1ktPgw/300'
        },
        {
          title: '🍊',
          description: 'An emoji is a pictogram, logogram, ideogram or smiley embedded in text and used in electronic messages and web pages. The primary function of emoji is to ...',
          image: 'https://qpic.y.qq.com/music_cover/GUalk7A0sBGvkxmUrXIf7BgaeBUQ3SnibMZhvVQVRnhsquYZy1ktPgw/300'
        },
        {
          title: '🍋',
          description: 'An emoji is a pictogram, logogram, ideogram or smiley embedded in text and used in electronic messages and web pages. The primary function of emoji is to ...',
          image: 'https://qpic.y.qq.com/music_cover/GUalk7A0sBGvkxmUrXIf7BgaeBUQ3SnibMZhvVQVRnhsquYZy1ktPgw/300'
        },
        {
          title: '🍎',
          description: 'An emoji is a pictogram, logogram, ideogram or smiley embedded in text and used in electronic messages and web pages. The primary function of emoji is to ...',
          image: 'https://qpic.y.qq.com/music_cover/GUalk7A0sBGvkxmUrXIf7BgaeBUQ3SnibMZhvVQVRnhsquYZy1ktPgw/300'
        },
      ]
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {
            this.state.lists.map((item, key) => {
              return (
                <TouchableHighlight style={styles.list} key={key} activeOpacity={0.9} underlayColor="none">
                  <>
                    <View style={{flex: 1}}>
                      <Text allowFontScaling={false} numberOfLines={1} style={styles.title}>{item.title}</Text>
                      <Text allowFontScaling={false} numberOfLines={2} style={styles.description}>{item.description}</Text>
                    </View>
                    <Image resizeMode='contain' style={styles.image} source={{uri: item.image}} />
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
  title: {marginBottom: 10},
  list: {display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 15, marginBottom: 0, padding: 15, borderRadius: 5, backgroundColor: '#FFF'},
  image: {width: 60, height: 60, marginLeft: 10, borderRadius: 5}
}

module.exports = Event;
