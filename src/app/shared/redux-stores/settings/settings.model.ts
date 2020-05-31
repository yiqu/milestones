import { ISettingsConfiguration } from '../../models/settings.models';

export interface SettingsState {
  loading: boolean,
  updateLoading: boolean,
  error: boolean,
  errorMsg: string,
  settingsConfig: ISettingsConfiguration;
}
