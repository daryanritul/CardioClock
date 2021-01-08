import {ADD_CARDIO, REMOVE_CARDIO, SET_CARDIO} from './actions.types';

export default (state, action) => {
  switch (action.type) {
    case ADD_CARDIO:
      return [...state, action.payload];

    case REMOVE_CARDIO:
      return state.filter((cardio) => cardio.id !== action.payload);
    case SET_CARDIO:
      return action.payload;
  }
};
