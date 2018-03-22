import React from 'react';
import { DeckContainer } from '../../containers';
import { DeckDetails } from '../../components';

const DeckDetailsScreen = ({ navigation }) => (
  <DeckContainer
    component={DeckDetails}
    navigation={navigation}
    title={navigation.state.params.title}
  />
);

export default DeckDetailsScreen;
