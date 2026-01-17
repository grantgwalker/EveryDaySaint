import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { SaintService } from '../services/saint.service';
import * as SaintActions from './saint.actions';
import { SaintError } from '../models/saint.model';

@Injectable()
export class SaintEffects {
  private actions$ = inject(Actions);
  private saintService = inject(SaintService);

  /**
   * Effect that handles loading today's saint.
   */
  loadTodaysSaint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SaintActions.loadTodaysSaint, SaintActions.refreshSaint),
      switchMap(() =>
        this.saintService.getTodaysSaint().pipe(
          map(saint => {
            const date = this.getTodaysDate();
            return SaintActions.loadTodaysSaintSuccess({ saint, date });
          }),
          catchError((error: SaintError) =>
            of(SaintActions.loadTodaysSaintFailure({ error }))
          )
        )
      )
    )
  );

  /**
   * Gets today's date in ISO-8601 format (YYYY-MM-DD).
   */
  private getTodaysDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
