import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'native-base'
import { Button } from 'native-base';
import { bgColor, textColor, altTextColor } from '../../utils/colors'

const DeckDetails = ({ deck, navigation }) => (
  <View style={styles.container}>
    <View style={styles.detailsContainer}>
      <Text style={styles.title}>{deck.title}</Text>
      <Text style={styles.subtitle}>
        {deck.questions.length} card{deck.questions.length === 1 ? '' : 's'}
      </Text>
    </View>
    <View style={styles.actionsContainer}>
      <Button
        block
        primary
        onPress={() => navigation.navigate('AddCard', { title: deck.title })}
        style={styles.btn}
      >
        <Text>Create New Question</Text>
      </Button>

      <Button
        block
        secondary={deck.questions.length > 0}
        disabled={deck.questions.length === 0}
        onPress={() => navigation.navigate('Quiz', { title: deck.title })}
      >
        <Text style={ deck.questions.length > 0 ? {} : styles.btnTextDisabled }>Start a Quiz</Text>
      </Button>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
    padding: 30,
    alignItems: 'stretch'
  },
  detailsContainer: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 26,
    color: textColor,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 20,
    color: altTextColor,
    textAlign: 'center'
  },
  btn: {
    marginBottom: 15,
    marginTop: 15
  },
  btnTextDisabled: {
    color: 'rgba(255, 255, 255, 0.2)'
  }
})

export default DeckDetails;
