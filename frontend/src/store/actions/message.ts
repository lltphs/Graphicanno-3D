import { SET_MESSAGE, CLEAR_MESSAGE } from '../types/message';

export const setMessage: (message: string) => void = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const clearMessage: () => void = () => ({
  type: CLEAR_MESSAGE,
});
