import { Dispatch } from 'react';

export const SET_ALL_SETTINGS = 'SET_ALL_SETTINGS';
export const SET_SHOW_POPUP = 'SET_SHOW_POPUP';
export const SET_SHOW_LABEL = 'SET_SHOW_LABEL';
export const SET_AUTO_HIDDEN = 'SET_AUTO_HIDDEN';
export const SET_ASK_DIALOG = 'SET_ASK_DIALOG';
export const SET_SIZE_ICON = 'SET_SIZE_ICON';
export const SET_WIDTH_STROKE = 'SET_WIDTH_STROKE';
export const SET_ZOOM_SPEED = 'SET_ZOOM_SPEED';

export interface SetAllSettingsAction {
  type: typeof SET_ALL_SETTINGS;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

export interface SetShowPopAction {
  type: typeof SET_SHOW_POPUP;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

export interface SetShowLabelAction {
  type: typeof SET_SHOW_LABEL;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

export interface SetAutoHiddenAction {
  type: typeof SET_AUTO_HIDDEN;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

export interface SetAskDialogAction {
  type: typeof SET_ASK_DIALOG;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

export interface SetSizeIconAction {
  type: typeof SET_SIZE_ICON;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

export interface SetWidthStrokeAction {
  type: typeof SET_WIDTH_STROKE;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

export interface SetZoomSpeedAction {
  type: typeof SET_ZOOM_SPEED;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

export type SettingsActionTypes =
  | SetAllSettingsAction
  | SetShowPopAction
  | SetShowLabelAction
  | SetAutoHiddenAction
  | SetAskDialogAction
  | SetSizeIconAction
  | SetWidthStrokeAction
  | SetZoomSpeedAction;

export type SettingsActionFunction = (
  dispatch: Dispatch<SettingsActionTypes>
) => void;
