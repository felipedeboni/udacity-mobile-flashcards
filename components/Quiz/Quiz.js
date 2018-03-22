import React, { PureComponent } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, Left, Right, Body } from 'native-base';
import Swiper from 'rn-deck-swiper';
import { CardDetails, QuizResults } from '../';
import { bgColor, altTextColor } from '../../utils/colors';

class Quiz extends PureComponent {
  constructor(props) {
    super(props);

    const { deck: { questions } } = this.props;

    this.swiping = false;

    this.state = {
      questions: this.prepareQuestions(),
      correct: 0,
      total: questions.length,
      current: 0,
      finished: false
    };
  }

  prepareQuestions = () => {
    const { deck: { questions } } = this.props;

    return questions.sort(() => 0.5 - Math.random()).map(_ => {
      _.showAnswer = false;
      return _;
    });
  };

  goToNextCard = correct => {
    this.setState(state => ({
      correct: correct ? state.correct + 1 : state.correct,
      current: state.current + 1,
      finished: state.current + 1 === state.total
    }));
  };

  handleSwipedRight = () => {
    this.goToNextCard(true);
    this.isSwiping = false;
  };

  handleSwipedLeft = () => {
    this.goToNextCard(false);
    this.isSwiping = false;
  };

  handleFinish = () => {
    this.setState(state => ({
      finished: true
    }));
  };

  handleRestart = () => {
    this.setState({
      questions: this.prepareQuestions(),
      correct: 0,
      current: 0,
      finished: false
    });
  };

  onAnswerIncorrectPress = () => {
    if (!this.isSwiping) {
      this.isSwiping = true;
      this.swiper.swipeLeft();
    }
  };

  onAnswerCorrectPress = () => {
    if (!this.isSwiping) {
      this.isSwiping = true;
      this.swiper.swipeRight();
    }
  };

  handleAnswerToggle = () => {
    this.setState(state => {
      let questions = [...state.questions];
      questions[state.current].showAnswer = !questions[state.current]
        .showAnswer;

      return {
        questions: questions
      };
    });
  };

  handleBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const { deck: { questions } } = this.props;
    const { current, finished, total, correct } = this.state;

    return (
      <View style={styles.container}>
        {finished && (
          <View style={styles.modal}>
            <QuizResults
              correct={correct}
              total={total}
              handleRestart={this.handleRestart}
              handleBack={this.handleBack}
            />
          </View>
        )}
        <View style={{ position: 'relative', zIndex: 1, flex: 1 }}>
          <View style={styles.swiperContainer}>
            {/*
              Do not use the onSwipedAll, everytime we change the cards
              it starts all over again. In order to fix this,
              we control the cardIndex and the finished.
            */}
            <Swiper
              ref={swiper => {
                this.swiper = swiper;
              }}
              cards={questions}
              cardIndex={current}
              verticalSwipe={false}
              onSwipedLeft={this.handleSwipedLeft}
              onSwipedRight={this.handleSwipedRight}
              showSecondCard={questions.length > 1}
              secondCardZoom={0.9}
              backgroundColor={'transparent'}
              cardStyle={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                width: 'auto',
                height: 'auto'
              }}
              renderCard={card =>
                card ? (
                  <CardDetails
                    card={card}
                    handleAnswerToggle={this.handleAnswerToggle}
                  />
                ) : null
              }
            />
          </View>
          <View>
            <Text style={styles.counter}>
              {current + 1} / {total}
            </Text>
          </View>
          <View style={styles.actionsContainer}>
            <Left style={{ flex: 0 }}>
              <Button
                danger
                containerViewStyle={{ borderRadius: 50 }}
                style={styles.btnAnswer}
                onPress={this.onAnswerIncorrectPress}
              >
                <Ionicons
                  name={'ios-close'}
                  size={50}
                  style={{
                    backgroundColor: 'transparent',
                    marginTop: Platform.OS === 'ios' ? 3 : 0,
                    color: '#FFF'
                  }}
                />
              </Button>
            </Left>
            <Body>
              <Button
                primary
                containerViewStyle={{ borderRadius: 50 }}
                style={[
                  styles.btnAnswer,
                  { alignSelf: 'center', width: 'auto' }
                ]}
                onPress={this.handleAnswerToggle}
              >
                <Text>Show Answer</Text>
              </Button>
            </Body>
            <Right style={{ flex: 0 }}>
              <Button
                success
                containerViewStyle={{ borderRadius: 50 }}
                style={styles.btnAnswer}
                onPress={this.onAnswerCorrectPress}
              >
                <Ionicons
                  name={'ios-checkmark'}
                  size={50}
                  style={{
                    backgroundColor: 'transparent',
                    marginTop: 3,
                    color: '#FFF'
                  }}
                />
              </Button>
            </Right>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
    paddingBottom: 30,
    alignItems: 'stretch',
    position: 'relative'
  },
  modal: {
    backgroundColor: bgColor,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 2
  },
  swiperContainer: {
    flexGrow: 1
  },
  actionsContainer: {
    flex: 0,
    flexDirection: 'row',
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30
  },
  btnAnswer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: 50,
    width: 50,
    overflow: 'hidden'
  },
  counter: {
    color: altTextColor,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default Quiz;
