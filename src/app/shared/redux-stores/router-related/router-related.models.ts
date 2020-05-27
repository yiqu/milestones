export interface RouterRedirectState {
  toUrl: string[];
}

export class RedirectUrlProp {
  constructor(public url: string[]) {
  }
}
