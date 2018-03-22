import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';
import { FlipCard } from '../';
import {
  altBgColor,
  textColor,
  altTextColor,
  lightBlue
} from '../../utils/colors';

const DOUBLE_PRESS_DELAY = 400;
class CardDetails extends Component {
  constructor(props) {
    super(props);

    this.lastPress = 0;
  }

  handleAnswerToggleProxy = () => {
    const { handleAnswerToggle } = this.props;
    const time = new Date().getTime();
    const delta = time - this.lastPress;

    if (delta < DOUBLE_PRESS_DELAY) {
      handleAnswerToggle();
    }

    this.lastPress = time;
  };

  renderCard = side => {
    const { card: { question, answer } } = this.props;

    return (
      <View style={[styles.card, styles[`flipCard${side}`]]}>
        <View>
          <Text style={styles.question}>{question}</Text>
          <View style={styles.separator} />
        </View>
        <View style={styles.answerContainer}>
          {side === 'Front' && (
            <Text style={[styles.answer, styles.hint]}>
              Double tap to see the answer
            </Text>
          )}
          {side === 'Back' && <Text style={styles.answer}>{answer}</Text>}
        </View>
      </View>
    );
  };

  render() {
    const { card: { showAnswer } } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.handleAnswerToggleProxy}>
        <View style={styles.cardContainer}>
          <FlipCard
            flipped={showAnswer}
            renderFront={() => this.renderCard('Front')}
            renderBack={() => this.renderCard('Back')}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    height:
      Dimensions.get('window').height - (Platform.OS === 'ios' ? 217 : 210),
    flexDirection: 'column',
    alignItems: 'stretch',
    position: 'relative'
  },
  card: {
    flex: 1,
    backgroundColor: altBgColor,
    padding: 30,
    borderWidth: 0,
    borderRadius: 6,
    shadowColor: 'rgba(0, 0, 0, 0.9)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 3,
    shadowOpacity: 0.5
  },
  answerContainer: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center'
  },
  question: {
    color: textColor,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
  answer: {
    color: altTextColor,
    fontSize: 17,
    textAlign: 'center'
  },
  hint: {
    opacity: 0.7
  },
  separator: {
    backgroundColor: lightBlue,
    height: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    marginBottom: 30,
    width: 40
  }
});

export default CardDetails;
