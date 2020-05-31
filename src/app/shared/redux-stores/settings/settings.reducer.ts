import { createReducer, on } from '@ngrx/store';
import { SettingsState } from './settings.model';
import * as SettingsActions from './settings.actions';

/**
 * LS Initial State
 */
const inititalState: SettingsState = {
  loading: false,
  updateLoading: false,
  error: false,
  errorMsg: null,
  settingsConfig: null,
}


export const settingsReducer = createReducer(
  inititalState,
  on(SettingsActions.getSettingsStartAction, (state) => {
    return {
      ...state,
      loading: true,
      updateLoading: false,
      error: false,
      errorMsg: null,
    }
  }),
  on(SettingsActions.getSettingsDoneAction, (state, {settingsVal}) => {
    return {
      ...state,
      loading: false,
      updateLoading: false,
      errorMsg: null,
      error: false,
      settingsConfig: settingsVal
    }
  }),
  on(SettingsActions.getSettingsFailureAction, (state, {errorMsg}) => {
    return {
      ...state,
      loading: false,
      updateLoading: false,
      errorMsg: errorMsg,
      error: true,
      settingsConfig: null
    }
  }),
  on(SettingsActions.updateSettingsStartAction, (state, {settingsVal}) => {
    return {
      ...state,
      loading: false,
      updateLoading: true,
      errorMsg: null,
      error: false,
      settingsConfig: {...settingsVal}
    }
  }),
  on(SettingsActions.updateSettingsDoneAction, (state) => {
    return {
      ...state,
      loading: false,
      updateLoading: false,
      errorMsg: null,
      error: false,
    }
  }),
  on(SettingsActions.updateSettingsFailureAction, (state, {errorMsg}) => {
    return {
      ...state,
      loading: false,
      updateLoading: false,
      errorMsg: errorMsg,
      error: true,
    }
  }),
)
