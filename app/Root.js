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
  ScrollView
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, CardStyleInterpolators } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from './Home'
import Web from './Web'
import Login from './Login'

import TaskCreate from './task/Create'

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* other code from before here */}
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('DetailsScreen')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    header: null,
    tabBarVisible: false,
    headerTitleStyle: {color: '#000000'},
    headerStyle: {
      backgroundColor: '',
      elevation: 0,
      shadowOpacity: 0
    },
    headerBackTitle: null
  })

  render() {
    return (
      <Home {...this.props} />
    );
  }
}

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

const BottomNavigatorScreen = createBottomTabNavigator({
  Home: {
     screen: HomeStack,
     navigationOptions: {
        tabBarLabel: '首页',
     },
  }
});

const App = createStackNavigator({
  BottomNavigatorScreen: {
    screen: BottomNavigatorScreen,
    navigationOptions: {
      header: null
    }
  },
  DetailsScreen: { screen: DetailsScreen },
  Web: {
    screen: Web
  }
}, {
  mode: 'card',
  // headerMode: 'none',
  navigationOptions: {
    headerBackTitleVisible: false,
    cardStack: {
      gesturesEnabled: true
    }
  },
  defaultNavigationOptions: {
    headerStyle: {
      elevation: 0, // 移除 Android Header 阴影
      shadowOpacity: 0, // 移除 iOS Header 阴影
    },
    headerTitleAlign: 'center', // Android 标题居中
    headerBackTitleVisible: false, // 隐藏 iOS 返回按钮标题
    headerPressColorAndroid: 'transparent', // 移除 Android 点击返回按钮效果
    // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // 切换路由时水平动画
    // headerStyleInterpolator: HeaderStyleInterpolators.forUIKit, // 切换路时 Header 动画
  },
  transitionConfig: () => ({ // 跳转时，从右向左，滑入
    screenInterpolator: CardStackStyleInterpolator.forHorizontal
  })
})

const Root = createStackNavigator(
  {
    App: {
      screen: App,
      navigationOptions: {
        header: null,
        headerBackTitleVisible: false,
        headerStyle: {
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0
        }
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        headerBackTitleVisible: false,
        headerStyle: {
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0
        }
      }
    },
    TaskCreate: {
      screen: TaskCreate,
      navigationOptions: {
        headerBackTitleVisible: false,
        headerStyle: {
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0
        }
      }
    },
  },
  {
    mode: 'modal',
    // headerMode: 'none',
    transitionConfig: () => ({ // 跳转时，从右向左，滑入
      screenInterpolator: CardStackStyleInterpolator.forHorizontal
    })
  }
);

export default createAppContainer(Root);
