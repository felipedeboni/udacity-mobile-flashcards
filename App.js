import React from 'react';
import { View, Keyboard } from 'react-native';
import { Provider } from 'react-redux';
import { StyleProvider } from 'native-base';
import { AppStatusBar, AppStackNavigator } from './components';
import { setLocalNotification } from './utils/notifications';
import store from './config/store';
import { black } from './utils/colors';
import getTheme from './native-base-theme/components';
import { AppLoading } from 'expo';

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme()}>
          <View style={{ flex: 1 }}>
            <AppStatusBar backgroundColor={black} barStyle="light-content" />
            <AppStackNavigator
              /* It's going to deal with keyboard not being hidden when going to Add Deck to Deck List on iOS */
              onNavigationStateChange={() => Keyboard.dismiss()}
            />
          </View>
        </StyleProvider>
      </Provider>
    );
  }
}
