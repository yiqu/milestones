import { VerifiedUser, AuthInfoFromUser } from '../../models/user.model';


export interface AuthState {
  verifiedUser: VerifiedUser;
  loading: boolean;
  error: boolean;
  errorMsg: string;
}

export class LoginStartActionProp {
  constructor(public authInfo: AuthInfoFromUser) {
  }
}

export class LoginSuccessActionProp {
  constructor(public verifiedUser: any, public redirect?: boolean) {
  }
}

export class LoginFailureActionProp {
  constructor(public errorMsg: any) {
  }
}


export class UserRegistrationFromEmailActionProp {
  constructor(public userEmail: string, public password: string, public saveSession: boolean) {
  }
}

export class AuthVerifiedUserProp {
  constructor(public user: VerifiedUser) {
  }
}


export class LogoutIfRedirectActionProp {
  constructor(public redirect: boolean) {
  }
}
