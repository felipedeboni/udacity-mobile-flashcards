import { StackNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import { AppTabNavigator } from '../';
import { DeckDetailsScreen, CardAddScreen, QuizScreen } from '../../screens';
import { black, lightgray } from '../../utils/colors';

const AppStackNavigator = StackNavigator(
  {
    Home: {
      screen: AppTabNavigator,
      navigationOptions: {
        header: null
      }
    },
    DeckDetails: {
      screen: DeckDetailsScreen,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.title} Deck`
      })
    },
    AddCard: {
      screen: CardAddScreen,
      navigationOptions: ({ navigation }) => ({
        title:
          Platform.OS === 'ios'
            ? 'Add Question'
            : `${navigation.state.params.title} Deck - Add Question`
      })
    },
    Quiz: {
      screen: QuizScreen,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false,
        title:
          Platform.OS === 'ios'
            ? 'Quiz'
            : `${navigation.state.params.title} Quiz`
      })
    }
  },
  {
    navigationOptions: {
      headerTintColor: lightgray,
      headerStyle: {
        backgroundColor: black
      }
    }
  }
);

export default AppStackNavigator;
