import { GET_DECKS, ADD_DECK, ADD_CARD } from '../actions';

const decks = (state, action) => {
  switch (action.type) {
    case GET_DECKS:
      return action.decks;

    case ADD_DECK:
    case ADD_CARD:
      return {
        ...state,
        [action.deck.title]: action.deck
      };
    default:
      return state;
  }
};

export default decks;
