import { createAction, props } from '@ngrx/store';
import { IJobConfig } from '../../models/job-config.model';
import { ErrorActionProp, QueryExtras } from './milestone.model';

const ADD_MILESTONE_START: string = "[Milestone/API] Add New Milestone Start";
const ADD_MILESTONE_DONE: string = "[Milestone/API] Add New Milestone Done";
const ADD_MILESTONE_FAILURE: string = "[Milestone/API] Add New Milestone Failure";
const GET_MILESTONES_START: string = "[Milestone/API] Get All Milestones Start";
const GET_MILESTONES_FAILURE: string = "[Milestone/API] Get ALl Milestones Failure";
const GET_MILESTONES_DONE: string = "[Milestone/API] Get All Milestones Done";

export const addMilestoneStartAction = createAction(
  ADD_MILESTONE_START,
  props<{payload: IJobConfig}>()
)


export const addMilestoneDoneAction = createAction(
  ADD_MILESTONE_DONE
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

