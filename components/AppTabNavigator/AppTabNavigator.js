import { TabNavigator, TabBarTop } from 'react-navigation';
import { Platform } from 'react-native'
import { DeckListScreen, DeckAddScreen } from '../../screens';
import { gray, black, lightgray, lightBlue } from '../../utils/colors'

const AppTabNavigator = TabNavigator(
  {
    DeckList: {
      screen: DeckListScreen,
      navigationOptions: {
        tabBarLabel: 'Deck List'
      }
    },
    DeckAdd: {
      screen: DeckAddScreen,
      navigationOptions: {
        tabBarLabel: 'Add Deck'
      }
    }
  },
  {
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: lightBlue
      },
      activeTintColor: lightgray,
      inactiveTintColor: gray,
      labelStyle: {
        fontWeight: 'bold'
      },
      style: {
        height: Platform.OS === 'ios' ? 50 : 56,
        backgroundColor: black
      }
    },
    swipeEnabled: false
  }
);

export default AppTabNavigator;
