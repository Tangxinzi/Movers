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
import Icons from './Icons'
import Event from './Event'
import Detail from './Detail'
import Collection from './Collection'
import Search from './Search'

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
}

const EventStack = createStackNavigator({
  Event: Event
})

const CollectionStack = createStackNavigator({
  Event: Collection
})

const BottomNavigatorScreen = createBottomTabNavigator({
  EventStack: {
    screen: EventStack,
    navigationOptions: {
      tabBarLabel: 'Posts',
      tabBarIcon: ({tintColor, focused}) => (
        <Image style={{color: tintColor, width: 24, height: 24}} source={{uri: !focused ? Icons.event : Icons.eventFocused}} />
      ),
    },
  },
  CollectionStack: {
     screen: CollectionStack,
     navigationOptions: {
        tabBarLabel: 'Collections',
        tabBarIcon: ({tintColor, focused}) => (
          <Image style={{color: tintColor, width: 24, height: 24}} source={{uri: !focused ? Icons.collection : Icons.collectionFocused}} />
        ),
     },
  },
});

const App = createStackNavigator({
  BottomNavigatorScreen: {
    screen: BottomNavigatorScreen,
    navigationOptions: {
      header: null
    }
  },
  Event: {
    screen: Event
  },
  Detail: {
    screen: Detail
  },
  Collection: {
    screen: Collection
  },
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
    Search: {
       screen: Search,
       navigationOptions: {
          tabBarLabel: '搜索',
       },
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
