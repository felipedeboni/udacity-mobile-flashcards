import React from 'react';
import { DeckAdd } from '../../components';
import { DeckContainer } from '../../containers';

const DeckAddScreen = ({ navigation }) => (
  <DeckContainer component={DeckAdd} navigation={navigation} />
);

export default DeckAddScreen;
