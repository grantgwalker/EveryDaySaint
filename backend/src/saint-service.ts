import * as fs from 'fs';
import * as path from 'path';
import { Saint, SaintsData } from './types';

/**
 * Retrieves the saint for a given date using deterministic selection.
 * 
 * Selection logic:
 * 1. Get all saints for the date
 * 2. If no saints exist, return null
 * 3. Sort by rank_priority ascending
 * 4. Return the first saint
 * 
 * This function is designed to be modular - the data source can be swapped
 * from JSON to a database without changing the function signature.
 * 
 * @param date - ISO-8601 date string (YYYY-MM-DD)
 * @returns The saint for the date, or null if none exists
 */
export function getSaintByDate(date: string): Saint | null {
  const saintsPath = path.join(__dirname, '..', 'saints.json');
  const saintsData: SaintsData = JSON.parse(fs.readFileSync(saintsPath, 'utf-8'));
  
  const saintsForDate = saintsData[date];
  
  if (!saintsForDate || saintsForDate.length === 0) {
    return null;
  }
  
  // Sort by rank_priority ascending (1 = highest priority)
  const sortedSaints = [...saintsForDate].sort((a, b) => a.rank_priority - b.rank_priority);
  
  // Return the first saint (highest priority)
  return sortedSaints[0];
}

/**
 * Validates that a date string is in ISO-8601 YYYY-MM-DD format.
 * 
 * @param dateString - The date string to validate
 * @returns true if valid, false otherwise
 */
export function isValidISODate(dateString: string): boolean {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  
  if (!isoDateRegex.test(dateString)) {
    return false;
  }
  
  const date = new Date(dateString);
  const timestamp = date.getTime();
  
  if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
    return false;
  }
  
  // Verify the date string matches what we get back from the date object
  // This catches invalid dates like 2026-02-30
  return date.toISOString().startsWith(dateString);
}
