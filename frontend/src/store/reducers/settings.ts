/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  SettingsActionTypes,
  SET_ALL_SETTINGS,
  SET_SHOW_POPUP,
  SET_SHOW_LABEL,
  SET_AUTO_HIDDEN,
  SET_ASK_DIALOG,
  SET_SIZE_ICON,
  SET_WIDTH_STROKE,
  SET_ZOOM_SPEED,
} from 'store/types/settings';

export interface SettingsStateType {
  showPopup: boolean;
  showLabel: boolean;
  autoHidden: boolean;
  askDialog: boolean;
  colorBackground: boolean;
  sizeIcon: number;
  widthStroke: number;
  zoomSpeed: number;
}

const initialState: SettingsStateType = {
  showPopup: false,
  showLabel: false,
  autoHidden: false,
  askDialog: true,
  colorBackground: true,
  sizeIcon: 3,
  widthStroke: 8,
  zoomSpeed: 5,
};

export default function authReducer(
  state: SettingsStateType = initialState,
  action: SettingsActionTypes
): SettingsStateType {
  const { type, payload } = action;
  switch (type) {
    case SET_ALL_SETTINGS: {
      return {
        ...state,
        showPopup: payload.showPopup ? payload.showPopup : state.showPopup,
        showLabel: payload.showLabel ? payload.showLabel : state.showLabel,
        autoHidden: payload.autoHidden ? payload.autoHidden : state.autoHidden,
        askDialog: payload.askDialog ? payload.askDialog : state.askDialog,
        colorBackground: payload.colorBackground
          ? payload.colorBackground
          : state.colorBackground,
        sizeIcon: payload.sizeIcon ? payload.sizeIcon : state.sizeIcon,
        zoomSpeed: payload.zoomSpeed ? payload.zoomSpeed : state.zoomSpeed,
      };
    }
    case SET_SHOW_POPUP: {
      return {
        ...state,
        showPopup: payload,
      };
    }
    case SET_SHOW_LABEL: {
      return {
        ...state,
        showLabel: payload,
      };
    }
    case SET_AUTO_HIDDEN: {
      return {
        ...state,
        autoHidden: payload,
      };
    }
    case SET_ASK_DIALOG: {
      return {
        ...state,
        askDialog: payload,
      };
    }
    case SET_SIZE_ICON: {
      return {
        ...state,
        sizeIcon: payload,
      };
    }
    case SET_WIDTH_STROKE: {
      return {
        ...state,
        widthStroke: payload,
      };
    }
    case SET_ZOOM_SPEED: {
      return {
        ...state,
        zoomSpeed: payload,
      };
    }
    default: {
      return state;
    }
  }
}
