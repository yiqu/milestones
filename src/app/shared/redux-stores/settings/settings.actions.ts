import { createAction, props } from '@ngrx/store';
import { ISettingsConfiguration } from '../../models/settings.models';

const UPDATE_SETTINGS_START: string = "[Settings/API] Update Settings Start";
const UPDATE_SETTINGS_DONE: string = "[Settings/API] Update Settings Success";
const UPDATE_SETTINGS_FAILURE: string = "[Settings/API] Update Settings Failure";
const GET_SETTINGS_START: string = "[Settings/API] Get Settings Start";
const GET_SETTINGS_DONE: string = "[Settings/API] Get Settings Success";
const GET_SETTINGS_FAILURE: string = "[Settings/API] Get Settings Failure";
const BUILD_SETTINGS_FG: string = "[Settings/FormGroup] Build Settings Form Group";

export const updateSettingsStartAction = createAction(
  UPDATE_SETTINGS_START,
  props<{settingsVal: ISettingsConfiguration}>()
)

export const updateSettingsDoneAction = createAction(
  UPDATE_SETTINGS_DONE
)

export const updateSettingsFailureAction = createAction(
  UPDATE_SETTINGS_FAILURE,
  props<{errorMsg: string}>()
)


export const getSettingsStartAction = createAction(
  GET_SETTINGS_START
)

export const getSettingsDoneAction = createAction(
  GET_SETTINGS_DONE,
  props<{settingsVal: ISettingsConfiguration}>()
)


export const getSettingsFailureAction = createAction(
  GET_SETTINGS_FAILURE,
  props<{errorMsg: string}>()
)
