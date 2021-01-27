import {
  SET_ALL_SETTINGS,
  SET_SHOW_POPUP,
  SET_SHOW_LABEL,
  SET_AUTO_HIDDEN,
  SET_ASK_DIALOG,
  SET_SIZE_ICON,
  SET_WIDTH_STROKE,
  SET_ZOOM_SPEED,
  SetAllSettingsAction,
  SetShowPopAction,
  SetAutoHiddenAction,
  SetShowLabelAction,
  SetAskDialogAction,
  SetSizeIconAction,
  SetWidthStrokeAction,
  SetZoomSpeedAction,
} from '../types/settings';

export const setAllSettings = (settings: {
  showPopup?: boolean;
  showLabel?: boolean;
  autoHidden?: boolean;
  askDialog?: boolean;
  colorBackground?: boolean;
  sizeIcon?: number;
  widthStroke?: number;
  zoomSpeed?: number;
}): SetAllSettingsAction => ({
  type: SET_ALL_SETTINGS,
  payload: settings,
});

export const setShowPopup = (value: boolean): SetShowPopAction => ({
  type: SET_SHOW_POPUP,
  payload: value,
});

export const setShowLabel = (value: boolean): SetShowLabelAction => ({
  type: SET_SHOW_LABEL,
  payload: value,
});

export const setAutoHidden = (value: boolean): SetAutoHiddenAction => ({
  type: SET_AUTO_HIDDEN,
  payload: value,
});

export const setAskDialog = (value: boolean): SetAskDialogAction => ({
  type: SET_ASK_DIALOG,
  payload: value,
});

export const setSizeIcon = (value: number): SetSizeIconAction => ({
  type: SET_SIZE_ICON,
  payload: value,
});

export const setWidthStroke = (value: number): SetWidthStrokeAction => ({
  type: SET_WIDTH_STROKE,
  payload: value,
});

export const setZoomSpeed = (value: number): SetZoomSpeedAction => ({
  type: SET_ZOOM_SPEED,
  payload: value,
});
