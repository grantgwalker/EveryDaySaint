import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Saint, SaintResponse, SaintError } from '../models/saint.model';

@Injectable({
  providedIn: 'root'
})
export class SaintService {
  private apiUrl = 'http://localhost:3000/api/saint';

  constructor(private http: HttpClient) {}

  /**
   * Fetches the saint for a given date from the backend API.
   * 
   * @param date - ISO-8601 date string (YYYY-MM-DD)
   * @returns Observable that emits the Saint or throws a SaintError
   */
  getSaintByDate(date: string): Observable<Saint> {
    return this.http.get<SaintResponse>(`${this.apiUrl}?date=${date}`).pipe(
      map(response => {
        if (!response.saint) {
          throw this.createError('invalid-response', 'Content unavailable.');
        }
        return response.saint;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.handleError(error));
      })
    );
  }

  /**
   * Fetches today's saint.
   * 
   * @returns Observable that emits the Saint or throws a SaintError
   */
  getTodaysSaint(): Observable<Saint> {
    const today = this.formatDate(new Date());
    return this.getSaintByDate(today);
  }

  /**
   * Formats a Date object to ISO-8601 YYYY-MM-DD format.
   */
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Handles HTTP errors and converts them to SaintError objects.
   */
  private handleError(error: HttpErrorResponse): SaintError {
    // Backend unreachable (network error, server down, CORS issue, etc.)
    if (error.status === 0) {
      return this.createError('unreachable', 'Unable to load today\'s saint.');
    }

    // 404 - No saint for the date
    if (error.status === 404) {
      return this.createError('no-saint', 'No saint is commemorated today.');
    }

    // 400 or other client errors
    if (error.status >= 400 && error.status < 500) {
      return this.createError('invalid-response', 'Content unavailable.');
    }

    // 500 or other server errors
    if (error.status >= 500) {
      return this.createError('unreachable', 'Unable to load today\'s saint.');
    }

    // Unknown error
    return this.createError('unknown', 'Content unavailable.');
  }

  /**
   * Creates a SaintError object.
   */
  private createError(type: SaintError['type'], message: string): SaintError {
    return { type, message };
  }
}
