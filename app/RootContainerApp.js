import React from 'react';
import {
  Button,
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
  TextInput,
  Dimensions,
  ScrollView,
  Linking,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import iconsBottom from './icons/iconsBottom';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, CardStyleInterpolators } from 'react-navigation-stack';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import DeviceStorage from './DeviceStorage'
import Inbox from './Inbox'
import Home from './Home'
import Folder from './Folder'
import BrowseFile from './BrowseFile'
import Services from './Services'
import Web from './Web'
import Login from './Login'
import Boarding from './Boarding'
import Quote from './Quote'

import TaskIndex from './task/Index'
import TaskCreate from './task/Create'
import TaskEdit from './task/Edit'

class HomeScreen extends React.Component {
  render() {
    return (
      <Home {...this.props} />
    );
  }
}

class InboxScreen extends React.Component {
  render() {
    return (
      <Inbox {...this.props} />
    );
  }
}

class FolderScreen extends React.Component {
  render() {
    return (
      <Folder {...this.props} />
    );
  }
}

class ServiceScreen extends React.Component {
  render() {
    return (
      <Services {...this.props} />
    );
  }
}

class InboxTotalComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalItemCount: 0
    }

    AsyncStorage.getItem('bearer')
    .then((response) => {
      if (response) {
        const bearer = JSON.parse(response)
        fetch(`https://relo-api.moovaz.com/api/v1/Customer/get-total-unread?`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ bearer.jwToken }`,
          }
        })
        .then(response => response.json())
        .then(responseData => {
          this.setState({
            totalItemCount: responseData.data.totalItemCount
          })
        })
        .catch((error) => {
          console.log('err: ', error)
        })

      }
    })
  }

  render() {
    return (
      <Text style={styles.textBottomMark} allowFontScaling={false}>{this.state.totalItemCount || 0}</Text>
    );
  }
}



const styles = StyleSheet.create({
  // iconsBottomContainer
  iconsBottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    paddingTop: 5,
    paddingBottom: 10,
    backgroundColor: '#FFF'
  },
  iconsBottomHome: {
    shadowColor: 'rgba(87, 87, 87, 0.8)',
    elevation: 10,
    shadowOffset: {h: 10, w: 10},
    shadowRadius: 8,
    shadowOpacity: 0.3,

    width: 65,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    boxShadow: '4px 4px 20px rgb(74, 74, 74)',
    borderRadius: 65,
    bottom: 15,
    marginLeft: 5,
    marginRight: 5
  },
  iconsBottom: {
    position: 'relative',
    flex: 1,
    alignItems: 'center'
  },
  iconBottom: {
    width: 23,
    height: 23,
    marginBottom: 0
  },
  iconsContent: {
    height: 20,
    marginBottom: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBottom: {
    fontSize: 12,
    fontWeight: '700'
  },
  textTotalBottom: {

  },
  textBottomMark: {
    position: 'absolute',
    top: -6,
    right: 20,
    backgroundColor: '#e89cae',
    color: '#fff',
    padding: 2,
    fontWeight: '500',
    fontSize: 10,
    borderRadius: 8,
    minWidth: 18,
    textAlign: 'center',
    overflow: 'hidden'
  }
});

const TabBarComponent = props => <BottomTabBar {...props} />;
const BottomNavigatorScreen = createBottomTabNavigator({
  Inbox: {
    screen: InboxScreen,
    navigationOptions: {
      tabBarLabel: 'Inbox',
      tabBarButtonComponent: ({tintColor, focused}) => {
        return (
          <TouchableHighlight style={{...styles.iconsBottom, marginTop: 6}} underlayColor="none" activeOpacity={0.85} onPress={() => this.navProps.jumpTo('Inbox')}>
            <>
              <View style={styles.iconsContent}>
                <Image resizeMode='cover' style={{...styles.iconBottom, height: focused ? 18 : 20 }} source={{uri: focused ? iconsBottom.inboxActive : iconsBottom.inbox}} />
              </View>
              <Text style={styles.textBottom} allowFontScaling={false}>Inbox</Text>
              <InboxTotalComponent style={styles.textTotalBottom} />
            </>
          </TouchableHighlight>
        )
      },
    },
  },
  Folder: {
    screen: FolderScreen,
    navigationOptions: {
      tabBarLabel: 'Folder',
      tabBarButtonComponent: ({tintColor, focused}) => {
        return (
          <TouchableHighlight style={{...styles.iconsBottom, marginTop: 6}} underlayColor="none" activeOpacity={0.85} onPress={() => this.navProps.jumpTo('Folder')}>
            <>
              <View style={styles.iconsContent}>
                <Image resizeMode='cover' style={{...styles.iconBottom, height: focused ? 18 : 20 }} source={{uri: focused ? iconsBottom.folderActive : iconsBottom.folder}} />
              </View>
              <Text style={styles.textBottom} allowFontScaling={false}>Folder</Text>
            </>
          </TouchableHighlight>
        )
      },
    },
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarButtonComponent: ({tintColor, focused, onPress}) => (
        <TouchableHighlight style={styles.iconsBottom, styles.iconsBottomHome} underlayColor="none" activeOpacity={0.85} onPress={() => this.navProps.jumpTo('Home')}>
          <>
            <Image resizeMode='cover' style={{...styles.iconBottom, marginBottom: 4, width: 30, height: 30 }} source={{uri: focused ? iconsBottom.homeActive : iconsBottom.home}} />
            <Text style={styles.textBottom} allowFontScaling={false}>Home</Text>
          </>
        </TouchableHighlight>
      ),
    },
  },
  Service: {
    screen: ServiceScreen,
    navigationOptions: {
      tabBarLabel: 'Service',
      tabBarButtonComponent: ({tintColor, focused}) => {
        return (
          <TouchableHighlight style={{...styles.iconsBottom, marginTop: 6}} underlayColor="none" activeOpacity={0.85} onPress={() => this.navProps.jumpTo('Service')}>
            <>
              <View style={styles.iconsContent}>
                <Image resizeMode='cover' style={{...styles.iconBottom, width: focused ? 20 : 23 }} source={{uri: focused ? iconsBottom.servicesActive : iconsBottom.services}} />
              </View>
              <Text style={styles.textBottom} allowFontScaling={false}>Service</Text>
            </>
          </TouchableHighlight>
        )
      },
    },
  },
  Resources: {
    screen: ServiceScreen,
    navigationOptions: {
      tabBarLabel: 'Resources',
      tabBarButtonComponent: ({tintColor, focused}) => {
        return (
          <TouchableHighlight style={{...styles.iconsBottom, marginTop: 6}} underlayColor="none" activeOpacity={0.85} onPress={() => {
            var url = 'https://www.moovaz.com/all-you-need-to-know-about-international-relocation/'
            Linking.canOpenURL(url).then(supported => {
              if (!supported) {
                console.warn('Can\'t handle url: ' + url);
              } else {
                return Linking.openURL(url)
              }
            }).catch(err => console.error('An error occurred', url))
          }}>
            <>
              <View style={styles.iconsContent}>
                <Image resizeMode='cover' style={{...styles.iconBottom, height: 25 }} source={{uri: focused ? iconsBottom.resourcesActive : iconsBottom.resources}} />
              </View>
              <Text style={styles.textBottom} allowFontScaling={false}>Resources</Text>
            </>
          </TouchableHighlight>
        )
      },
    },
  },
}, {
  tabBarComponent: props => {
    this.navProps = props

    return (
      <TabBarComponent {...props} style={{ paddingTop: 3, justifyContent: 'space-between' }} />
    )
  },
  initialRouteName: "Home"
});

const Root = createAppContainer(BottomNavigatorScreen);

export default class RootContainerApp extends React.Component {
  render() {
    return <Root />;
  }
}
