import { getSaintByDate, isValidISODate } from './saint-service';
import * as fs from 'fs';
import * as path from 'path';

// Mock the file system
jest.mock('fs');
const mockFs = fs as jest.Mocked<typeof fs>;

describe('Saint Service', () => {
  describe('getSaintByDate', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return saint for a date with single saint', () => {
      const mockData = {
        '2026-01-17': [
          {
            name: 'Antony of Egypt',
            rank: 'lesser_festival',
            rank_priority: 3,
            life_summary: 'Test summary',
            key_life_events: ['Event 1'],
            path_to_sainthood: 'Test path',
            source_reference: 'Test source'
          }
        ]
      };

      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

      const result = getSaintByDate('2026-01-17');

      expect(result).toBeDefined();
      expect(result?.name).toBe('Antony of Egypt');
      expect(result?.rank).toBe('lesser_festival');
    });

    it('should return null for a date with no saints', () => {
      const mockData = {};
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

      const result = getSaintByDate('2026-01-01');

      expect(result).toBeNull();
    });

    it('should return highest priority saint when multiple saints exist', () => {
      const mockData = {
        '2026-12-26': [
          {
            name: 'Stephen',
            rank: 'festival',
            rank_priority: 2,
            life_summary: 'Test',
            key_life_events: [],
            path_to_sainthood: 'Test',
            source_reference: 'Test'
          },
          {
            name: 'John, Apostle and Evangelist',
            rank: 'festival',
            rank_priority: 2,
            life_summary: 'Test',
            key_life_events: [],
            path_to_sainthood: 'Test',
            source_reference: 'Test'
          }
        ]
      };

      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

      const result = getSaintByDate('2026-12-26');

      expect(result).toBeDefined();
      expect(result?.name).toBe('Stephen');
    });

    it('should return principal feast over festival when both exist', () => {
      const mockData = {
        '2026-07-22': [
          {
            name: 'Mary Magdalene',
            rank: 'festival',
            rank_priority: 2,
            life_summary: 'Test',
            key_life_events: [],
            path_to_sainthood: 'Test',
            source_reference: 'Test'
          },
          {
            name: 'Test Principal',
            rank: 'principal_feast',
            rank_priority: 1,
            life_summary: 'Test',
            key_life_events: [],
            path_to_sainthood: 'Test',
            source_reference: 'Test'
          }
        ]
      };

      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

      const result = getSaintByDate('2026-07-22');

      expect(result).toBeDefined();
      expect(result?.name).toBe('Test Principal');
      expect(result?.rank_priority).toBe(1);
    });
  });

  describe('isValidISODate', () => {
    it('should return true for valid ISO dates', () => {
      expect(isValidISODate('2026-01-17')).toBe(true);
      expect(isValidISODate('2026-12-31')).toBe(true);
      expect(isValidISODate('2024-02-29')).toBe(true); // Leap year
    });

    it('should return false for invalid formats', () => {
      expect(isValidISODate('2026-1-17')).toBe(false);
      expect(isValidISODate('2026/01/17')).toBe(false);
      expect(isValidISODate('17-01-2026')).toBe(false);
      expect(isValidISODate('2026-01-17T00:00:00')).toBe(false);
    });

    it('should return false for invalid dates', () => {
      expect(isValidISODate('2026-02-30')).toBe(false);
      expect(isValidISODate('2026-13-01')).toBe(false);
      expect(isValidISODate('2026-00-01')).toBe(false);
      expect(isValidISODate('2023-02-29')).toBe(false); // Not a leap year
    });

    it('should return false for non-date strings', () => {
      expect(isValidISODate('not-a-date')).toBe(false);
      expect(isValidISODate('')).toBe(false);
      expect(isValidISODate('2026')).toBe(false);
    });
  });
});
