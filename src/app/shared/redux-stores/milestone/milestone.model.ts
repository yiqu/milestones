import { IJobConfig } from '../../models/job-config.model';
import { VerifiedUser } from '../../models/user.model';

export class ErrorActionProp {
  constructor(public errorMsg: any) {
  }
}

/**
 * Milestone states
 */
export interface IMilestonePersonalState {
  loading: boolean;
  crudLoading: boolean;
  error: boolean;
  errMsg: string;
  crudData: IJobConfig;
  payloadData: IJobConfig[];
  queryExtras: any;
  editingConfig: IJobConfig;
  previousEntry: IJobConfig;
}

export class QueryExtras {
  constructor(public user: VerifiedUser, public queryExtras: any[]) {

  }
}

