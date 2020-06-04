import { createReducer, on } from '@ngrx/store';
import * as MSActions from './milestone.actions';
import { IMilestonePersonalState } from './milestone.model';
/**
 * Auth Initial State
 */
const inititalState: IMilestonePersonalState = {
  crudLoading: false,
  loading: false,
  errMsg: null,
  error: false,
  crudData: null,
  payloadData: [],
  queryExtras: null,
  editingConfig: null
}

export const milestonePersonalReducer = createReducer(
  inititalState,
  on(MSActions.addMilestoneStartAction, (state, {payload}) => {
    return {
      ...state,
      crudLoading: true,
      error: false,
      errMsg: null,
      crudData: payload
    }
  }),
  on(MSActions.addMilestoneDoneAction, (state, {payload}) => {
    return {
      ...state,
      crudLoading: false,
      error: false,
      errMsg: null,
      crudData: payload
    }
  }),
  on(MSActions.addMilestoneFailureAction, (state, {errorMsg}) => {
    return {
      ...state,
      crudLoading: false,
      error: true,
      errMsg: errorMsg,
      payloadData: [],
      crudData: null
    }
  }),
  on(MSActions.getAllMilestonesAction, (state, {extras}) => {
    return {
      ...state,
      loading: true,
      crudLoading: false,
      error: false,
      errMsg: null,
      queryExtras: extras
    }
  }),
  on(MSActions.getAllMilestonesFailureAction, (state, {errorMsg}) => {
    return {
      ...state,
      loading: false,
      crudLoading: false,
      error: true,
      errMsg: errorMsg,
      payloadData: [],
      crudData: null
    }
  }),
  on(MSActions.getAllMilestonesDoneAction, (state, {payload}) => {
    return {
      ...state,
      loading: false,
      crudLoading: false,
      error: false,
      errMsg: null,
      payloadData: payload,
      crudData: null
    }
  }),
  on(MSActions.editMilestoneStartAction, (state, {payload}) => {
    return {
      ...state,
      loading: true,
      crudLoading: false,
      error: false,
      errMsg: null,
      crudData: null,
      editingConfig: payload
    }
  }),
  on(MSActions.editMilestoneRedirectAction, (state, {payload}) => {
    return {
      ...state,
      error: false,
      errMsg: null,
      crudData: null,
      editingConfig: payload
    }
  }),
  on(MSActions.editMilestoneSaveDoneAction, (state) => {
    return {
      ...state,
      loading: false,
      crudLoading: false,
      error: false,
      errMsg: null,
      crudData: null,
      editingConfig: null
    }
  }),
  on(MSActions.editMilestoneSaveFailureAction, (state, {errorMsg}) => {
    return {
      ...state,
      loading: false,
      crudLoading: false,
      error: true,
      errMsg: errorMsg,
      crudData: null
    }
  }),

)
