import {
  SET_MESSAGE,
  CLEAR_MESSAGE,
  MessageActionTypes,
} from 'store/types/message';

interface MessageStateType {
  message?: string;
}

const initialState: MessageStateType = {};

export default function messageReducer(
  state: MessageStateType = initialState,
  action: MessageActionTypes
): MessageStateType {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return {
        message: payload,
      };

    case CLEAR_MESSAGE:
      return {
        message: '',
      };

    default:
      return state;
  }
  /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
}
