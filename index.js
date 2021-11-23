/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/Home';
import Root from './app/Root';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Root);
