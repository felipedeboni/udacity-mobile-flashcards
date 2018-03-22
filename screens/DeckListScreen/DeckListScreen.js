import React from 'react';
import { DeckContainer } from '../../containers';
import { DeckList } from '../../components';

const DeckListScreen = ({ navigation }) => (
  <DeckContainer component={DeckList} navigation={navigation} />
);

export default DeckListScreen;
