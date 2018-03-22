import { AsyncStorage } from 'react-native';

const DATA_KEY = 'FLASHCARDS:data';

// GENERIC GET
const fetchData = () =>
  AsyncStorage.getItem(DATA_KEY).then(data => JSON.parse(data) || {});

// GENERIC SAVE
const saveData = data => AsyncStorage.mergeItem(DATA_KEY, JSON.stringify(data));

export const fetchDecks = () => fetchData();

const fetchDeck = title => fetchData().then(decks => decks[title]);

export const createDeck = title => {
  const deck = {
    [title]: {
      title,
      questions: []
    }
  };

  return saveData(deck).then(() => deck[title]);
};

export const createCard = (title, card) =>
  fetchDeck(title).then(data => {
    const { answer, question } = card;
    const questions = data.questions.concat({ answer, question });

    const deck = {
      [title]: {
        title,
        questions
      }
    };

    return saveData(deck).then(() => deck[title]);
  });
