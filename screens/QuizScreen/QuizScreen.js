import React from 'react';
import { DeckContainer } from '../../containers';
import { Quiz } from '../../components';

const QuizScreen = ({ navigation }) => (
  <DeckContainer
    component={Quiz}
    navigation={navigation}
    title={navigation.state.params.title}
  />
);

export default QuizScreen;
