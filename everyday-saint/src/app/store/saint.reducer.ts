import { createReducer, on } from '@ngrx/store';
import { SaintState, initialSaintState } from './saint.state';
import * as SaintActions from './saint.actions';

/**
 * Saint feature reducer.
 */
export const saintReducer = createReducer(
  initialSaintState,

  // Handle load saint action
  on(SaintActions.loadTodaysSaint, (state): SaintState => ({
    ...state,
    isLoading: true,
    error: null,
    saint: null
  })),

  // Handle refresh saint action (same as load)
  on(SaintActions.refreshSaint, (state): SaintState => ({
    ...state,
    isLoading: true,
    error: null,
    saint: null
  })),

  // Handle successful saint load
  on(SaintActions.loadTodaysSaintSuccess, (state, { saint, date }): SaintState => ({
    ...state,
    saint,
    date,
    isLoading: false,
    error: null
  })),

  // Handle failed saint load
  on(SaintActions.loadTodaysSaintFailure, (state, { error }): SaintState => ({
    ...state,
    saint: null,
    isLoading: false,
    error: error.message
  }))
);
