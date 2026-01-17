import { createAction, props } from '@ngrx/store';
import { Saint, SaintError } from '../models/saint.model';

/**
 * Action to load today's saint.
 */
export const loadTodaysSaint = createAction(
  '[Saint] Load Todays Saint'
);

/**
 * Action dispatched when saint is successfully loaded.
 */
export const loadTodaysSaintSuccess = createAction(
  '[Saint] Load Todays Saint Success',
  props<{ saint: Saint; date: string }>()
);

/**
 * Action dispatched when saint loading fails.
 */
export const loadTodaysSaintFailure = createAction(
  '[Saint] Load Todays Saint Failure',
  props<{ error: SaintError }>()
);

/**
 * Action to refresh/reload the current saint.
 */
export const refreshSaint = createAction(
  '[Saint] Refresh Saint'
);
