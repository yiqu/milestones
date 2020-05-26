import { VerifiedUser } from '../../models/user.model';


export interface AuthState {
  verifiedUser: VerifiedUser;
  loading: boolean;
  error: boolean;
  errorMsg: string;
}

