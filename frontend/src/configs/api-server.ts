let API_SERVER_VAL = 'http://localhost';

switch (process.env.NODE_ENV) {
  case 'development':
    // if (process.env.REACT_APP_API_SERVER) {
    //   API_SERVER_VAL = process.env.REACT_APP_API_SERVER;
    // } 
    API_SERVER_VAL = 'http://localhost:80';
    break;
  case 'production':
    if (process.env.REACT_APP_API_SERVER) {
      API_SERVER_VAL = process.env.REACT_APP_API_SERVER;
    }
    break;
  default:
    API_SERVER_VAL = 'http://localhost';
    break;
}

export const API_SERVER = API_SERVER_VAL;

let WS_SERVER_VAL = 'ws://localhost';

switch (process.env.NODE_ENV) {
  case 'development':
    // if (process.env.REACT_APP_WS_SERVER) {
    // 	 WS_SERVER_VAL = process.env.REACT_APP_WS_SERVER;
    // } 
	WS_SERVER_VAL = 'ws://localhost:80';
    break;
  case 'production':
    if (process.env.REACT_APP_WS_SERVER) {
      WS_SERVER_VAL = process.env.REACT_APP_WS_SERVER;
    }
    break;
  default:
    WS_SERVER_VAL = 'ws://localhost';
    break;
}

export const WS_SERVER = WS_SERVER_VAL;

export const SESSION_DURATION = 5 * 3600 * 1000;

