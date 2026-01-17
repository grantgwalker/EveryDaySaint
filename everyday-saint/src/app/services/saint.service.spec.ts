import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { SaintService } from './saint.service';
import { Saint, SaintResponse } from '../models/saint.model';

describe('SaintService', () => {
  let service: SaintService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SaintService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(SaintService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getSaintByDate', () => {
    it('should fetch saint successfully', () => {
      const mockSaint: Saint = {
        name: 'Antony of Egypt',
        rank: 'lesser_festival',
        rank_priority: 3,
        life_summary: 'Test summary',
        key_life_events: ['Event 1'],
        path_to_sainthood: 'Test path',
        source_reference: 'Test source'
      };

      const mockResponse: SaintResponse = {
        date: '2026-01-17',
        saint: mockSaint
      };

      service.getSaintByDate('2026-01-17').subscribe({
        next: (saint) => {
          expect(saint).toEqual(mockSaint);
        },
        error: () => fail('Should not error')
      });

      const req = httpMock.expectOne('http://localhost:3000/api/saint?date=2026-01-17');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle 404 error (no saint)', () => {
      service.getSaintByDate('2026-01-01').subscribe({
        next: () => fail('Should not succeed'),
        error: (error) => {
          expect(error.type).toBe('no-saint');
          expect(error.message).toBe('No saint is commemorated today.');
        }
      });

      const req = httpMock.expectOne('http://localhost:3000/api/saint?date=2026-01-01');
      req.flush({ message: 'Not found' }, { status: 404, statusText: 'Not Found' });
    });

    it('should handle network error (backend unreachable)', () => {
      service.getSaintByDate('2026-01-17').subscribe({
        next: () => fail('Should not succeed'),
        error: (error) => {
          expect(error.type).toBe('unreachable');
          expect(error.message).toBe('Unable to load today\'s saint.');
        }
      });

      const req = httpMock.expectOne('http://localhost:3000/api/saint?date=2026-01-17');
      req.error(new ProgressEvent('error'));
    });

    it('should handle 500 error (server error)', () => {
      service.getSaintByDate('2026-01-17').subscribe({
        next: () => fail('Should not succeed'),
        error: (error) => {
          expect(error.type).toBe('unreachable');
          expect(error.message).toBe('Unable to load today\'s saint.');
        }
      });

      const req = httpMock.expectOne('http://localhost:3000/api/saint?date=2026-01-17');
      req.flush({ error: 'Server error' }, { status: 500, statusText: 'Internal Server Error' });
    });

    it('should handle invalid response', () => {
      service.getSaintByDate('2026-01-17').subscribe({
        next: () => fail('Should not succeed'),
        error: (error) => {
          expect(error.type).toBe('unknown');
          expect(error.message).toBe('Content unavailable.');
        }
      });

      const req = httpMock.expectOne('http://localhost:3000/api/saint?date=2026-01-17');
      req.flush({ date: '2026-01-17' }); // Missing saint property
    });
  });

  describe('getTodaysSaint', () => {
    it('should fetch today\'s saint', () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const todayStr = `${year}-${month}-${day}`;

      const mockSaint: Saint = {
        name: 'Test Saint',
        rank: 'festival',
        rank_priority: 2,
        life_summary: 'Test',
        key_life_events: [],
        path_to_sainthood: 'Test',
        source_reference: 'Test'
      };

      service.getTodaysSaint().subscribe({
        next: (saint) => {
          expect(saint).toEqual(mockSaint);
        }
      });

      const req = httpMock.expectOne(`http://localhost:3000/api/saint?date=${todayStr}`);
      req.flush({ date: todayStr, saint: mockSaint });
    });
  });
});
