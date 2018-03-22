import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { getDecks, addDeck, addCard } from '../../actions';

class DeckContainer extends PureComponent {
  componentDidMount() {
    const { decks, getDecks } = this.props;

    if (!decks) {
      getDecks();
    }
  }

  addDeckHandler = title => {
    const { addDeck } = this.props;

    return addDeck(title);
  };

  addCardHandler = (title, card) => {
    const { addCard, navigation } = this.props;
    addCard(title, card);
    navigation.goBack();
  };

  toHome = () => {
    this.props.navigation.dispatch(
      NavigationActions.back({
        key: 'DeckAdd'
      })
    );
  };

  render() {
    const { component, getDecks, addCard, title, decks, ...props } = this.props;

    return React.createElement(component, {
      ...props,
      decks,
      deck: title ? decks.find(_ => _.title === title) : undefined,
      getDecksHandler: getDecks,
      addDeckHandler: this.addDeckHandler,
      addCardHandler: this.addCardHandler
    });
  }
}

const mapProps = state => ({
  decks: state
    ? Object.keys(state)
        .sort()
        .map(title => state[title])
    : undefined
});

const mapDispatch = dispatch => ({
  getDecks: () => dispatch(getDecks()),
  addDeck: title => dispatch(addDeck(title)),
  addCard: (title, card) => dispatch(addCard(title, card))
});

export default connect(mapProps, mapDispatch)(DeckContainer);
