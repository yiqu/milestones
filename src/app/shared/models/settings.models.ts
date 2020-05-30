export interface ISettingsConfiguration {
  workDays: number;
}

export class SettingsConfig implements ISettingsConfiguration {
  constructor(public workDays: number) {

  }
}
