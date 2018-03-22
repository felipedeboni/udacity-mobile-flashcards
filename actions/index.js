import { fetchDecks, createDeck, createCard } from '../utils/db';

export const GET_DECKS = 'GET_DECKS';
export const getDecks = () => dispatch =>
  new Promise((resolve, reject) => {
    fetchDecks()
      .then(decks => {
        dispatch({
          type: GET_DECKS,
          decks
        })

        resolve()
      })
      .catch(() => reject)
  })

export const ADD_DECK = 'ADD_DECK';
export const addDeck = title => dispatch =>
  new Promise((resolve, reject) => {
    createDeck(title)
      .then(deck => {
        dispatch({
          type: ADD_DECK,
          deck
        })

        resolve()
      })
      .catch(() => reject)
  })

export const ADD_CARD = 'ADD_CARD';
export const addCard = (title, card) => dispatch =>
  new Promise((resolve, reject) => {
    createCard(title, card).then(deck => {
      dispatch({
        type: ADD_CARD,
        deck
      })

      resolve()
    })
    .catch(() => reject)
  })
