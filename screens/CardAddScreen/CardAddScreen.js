import React from 'react';
import { DeckContainer } from '../../containers';
import { CardAdd } from '../../components';

const CardAddScreen = ({ navigation }) => (
  <DeckContainer
    component={CardAdd}
    navigation={navigation}
    title={navigation.state.params.title}
  />
);

export default CardAddScreen;
