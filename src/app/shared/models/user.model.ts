export class User {
  constructor(public id?: string, public display?: string, public user?: any) {
    this.id = id ? id : "UnknownID";
    this.display = display ? display : "Unknown User";
    this.user = user;
  }
}


export interface IAuthInfo {
  id: string;
  password: string;
}

export class AuthInfo implements IAuthInfo{
  constructor(public id: string, public password: string, public saveSession: boolean){
  }
}

export class VerifiedUser {

  constructor(
    public createdAt: string,
    public displayName: string,
    public email: string,
    public emailVerified: string,
    public isAnonymous: string,
    public lastLoginAt: string,
    public photoURL: string,
    public providerData: ProviderData[],
    public stsTokenManager: any,
    public tenantId: string,
    public uid: string,
    public phoneNumber: string,
    public inAppAliases: InAppAlias,
    public logins: string[]
  ) {
  }

}

export class InAppAlias {
  constructor(public alias: User) {
  }
}

export class UserDetail {

  constructor(
    public displayName: string,
    public email: string,
    public uid: string,
  ) {
  }

}

export class ProviderData {
  constructor(
    public displayName: string,
    public email: string,
    public phoneNumber: string,
    public photoURL: string,
    public providerId: string,
    public uid: string,
  ) {

  }
}
