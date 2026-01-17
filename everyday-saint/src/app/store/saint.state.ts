import { Saint } from '../models/saint.model';

/**
 * Saint feature state interface.
 */
export interface SaintState {
  saint: Saint | null;
  date: string;
  isLoading: boolean;
  error: string | null;
}

/**
 * Initial state for saint feature.
 */
export const initialSaintState: SaintState = {
  saint: null,
  date: '',
  isLoading: false,
  error: null
};
