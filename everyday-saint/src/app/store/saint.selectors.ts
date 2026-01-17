import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SaintState } from './saint.state';

/**
 * Feature selector for saint state.
 */
export const selectSaintState = createFeatureSelector<SaintState>('saint');

/**
 * Selector for the current saint.
 */
export const selectSaint = createSelector(
  selectSaintState,
  (state: SaintState) => state.saint
);

/**
 * Selector for the current date.
 */
export const selectDate = createSelector(
  selectSaintState,
  (state: SaintState) => state.date
);

/**
 * Selector for loading state.
 */
export const selectIsLoading = createSelector(
  selectSaintState,
  (state: SaintState) => state.isLoading
);

/**
 * Selector for error message.
 */
export const selectError = createSelector(
  selectSaintState,
  (state: SaintState) => state.error
);

/**
 * Selector that returns true if saint data is available.
 */
export const selectHasSaint = createSelector(
  selectSaint,
  (saint) => saint !== null
);

/**
 * Selector that returns the full view model for the saint view.
 */
export const selectSaintViewModel = createSelector(
  selectSaint,
  selectDate,
  selectIsLoading,
  selectError,
  (saint, date, isLoading, error) => ({
    saint,
    date,
    isLoading,
    errorMessage: error
  })
);
