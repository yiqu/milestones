import { createAction, props } from '@ngrx/store';
import { IJobConfig } from '../../models/job-config.model';
import { ErrorActionProp, QueryExtras } from './milestone.model';
import { VerifiedUser } from '../../models/user.model';

const ADD_MILESTONE_START: string = "[Milestone/API] Add New Milestone Start";
const ADD_MILESTONE_DONE: string = "[Milestone/API] Add New Milestone Done";
const ADD_MILESTONE_FAILURE: string = "[Milestone/API] Add New Milestone Failure";
const GET_MILESTONES_START: string = "[Milestone/API] Get All Milestones Start";
const GET_MILESTONES_FAILURE: string = "[Milestone/API] Get ALl Milestones Failure";
const GET_MILESTONES_DONE: string = "[Milestone/API] Get All Milestones Done";
const EDIT_MILESTONE_START: string = "[Milestone/API] Start Edit Milestone on UI";
const EDIT_MILESTONE_REDIRECT: string = "[Milestone/API] Redirect to Edit Milestone Component";
const EDIT_MILESTONE_SAVE_START: string = "[Milestone/API] Edit Milestone Saving to DB Start";
const EDIT_MILESTONE_SAVE_DONE: string = "[Milestone/API] Edit Milestone Saved to DB Done";
const EDIT_MILESTONE_SAVE_FAILURE: string = "[Milestone/API] Edit Milestone Saved to DB Failure";
const DELETE_MILESTONE_START: string = "[Milestone/API] Delete Milestone Start";
const DELETE_MILESTONE_DONE: string = "[Milestone/API] Delete Milestone Success";
const DELETE_MILESTONE_FAILURE: string = "[Milestone/API] Delete Milestone Failure";

export const addMilestoneStartAction = createAction(
  ADD_MILESTONE_START,
  props<{payload: IJobConfig}>()
)


export const addMilestoneDoneAction = createAction(
  ADD_MILESTONE_DONE,
  props<{payload: IJobConfig}>()
)

export const addMilestoneFailureAction = createAction(
  ADD_MILESTONE_FAILURE,
  props<ErrorActionProp>()
)

export const getAllMilestonesAction = createAction(
  GET_MILESTONES_START,
  props<{extras: QueryExtras}>()
)

export const getAllMilestonesFailureAction = createAction(
  GET_MILESTONES_FAILURE,
  props<ErrorActionProp>()
)


export const getAllMilestonesDoneAction = createAction(
  GET_MILESTONES_DONE,
  props<{payload: IJobConfig[]}>()
)

export const editMilestoneStartAction = createAction(
  EDIT_MILESTONE_START,
  props<{payload: IJobConfig}>()
)

export const editMilestoneRedirectAction = createAction(
  EDIT_MILESTONE_REDIRECT,
  props<{payload: IJobConfig}>()
)

export const editMilestoneSaveStartAction = createAction(
  EDIT_MILESTONE_SAVE_START,
  props<{payload: IJobConfig}>()
)

export const editMilestoneSaveDoneAction = createAction(
  EDIT_MILESTONE_SAVE_DONE
)

export const editMilestoneSaveFailureAction = createAction(
  EDIT_MILESTONE_SAVE_FAILURE,
  props<ErrorActionProp>()
)

export const deleteMilestoneStartAction = createAction(
  DELETE_MILESTONE_START,
  props<{docId: string, user: VerifiedUser}>()
)

export const deleteMilestoneDoneAction = createAction(
  DELETE_MILESTONE_DONE,
  props<{docId: string, user: VerifiedUser}>()
)

export const deleteMilestoneFailureAction = createAction(
  DELETE_MILESTONE_FAILURE,
  props<ErrorActionProp>()
)
