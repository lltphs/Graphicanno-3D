import { Dispatch } from 'redux';

export const SET_MESSAGE = 'SET_MESSAGE';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

interface SetMessageAction {
  type: typeof SET_MESSAGE;
  payload: string;
}

interface ClearMessageAction {
  type: typeof CLEAR_MESSAGE;
  payload?: undefined;
}

export type MessageActionTypes = SetMessageAction | ClearMessageAction;

export type MessageActionFunction = (
  dispatch: Dispatch<MessageActionTypes>
) => void | Promise<void>;
