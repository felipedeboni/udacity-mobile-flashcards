import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from 'native-base'
import { Entypo } from '@expo/vector-icons'
import { bgColor, textColor, altTextColor } from '../../utils/colors'
import { clearLocalNotifications, setLocalNotification } from '../../utils/notifications'

class QuizResults extends PureComponent {
  componentDidMount() {
    clearLocalNotifications().then(setLocalNotification);
  }

  render() {
    const { correct, total, handleRestart, handleBack } = this.props;
    const percentage = Number((correct * 100 / total).toFixed(2))

    return (
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.title}>{percentage}%</Text>
          { percentage === 100 &&
            <View style={styles.result}>
              <Text style={styles.subtitle}>Congratulations!</Text>
              <Entypo
                name={'trophy'}
                size={110}
                style={[styles.icon]}
              />
            </View>
          }
          { percentage >= 75 && percentage < 100 &&
            <View style={styles.result}>
              <Text style={styles.subtitle}>Almost there, keep studying!</Text>
              <Entypo
                name={'medal'}
                size={110}
                style={styles.icon}
              />
            </View>
          }
          { percentage >= 50 && percentage < 75 &&
            <View style={styles.result}>
              <Text style={styles.subtitle}>You can do better!</Text>
              <Entypo
                name={'emoji-neutral'}
                size={110}
                style={styles.icon}
              />
            </View>
          }
          { percentage < 50 &&
            <View style={styles.result}>
              <Text style={styles.subtitle}>It's a disaster! Try again...</Text>
              <Entypo
                name={'emoji-sad'}
                size={110}
                style={styles.icon}
              />
            </View>
          }
        </View>
        <View style={styles.actionsContainer}>
          <Button primary block onPress={handleBack} style={[styles.btn]}>
            <Text>Back to Deck</Text>
          </Button>
          <Button secondary block onPress={handleRestart}>
            <Text>Restart Quiz</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
    padding: 30,
    alignItems: 'stretch'
  },
  resultContainer: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  result: {
    alignItems: 'center'
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: textColor,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 20,
    color: altTextColor,
    textAlign: 'center'
  },
  icon: {
    marginTop: 30
  },
  btn: {
    marginBottom: 15,
    marginTop: 15
  }
})

export default QuizResults
