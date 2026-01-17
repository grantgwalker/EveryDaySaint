import request from 'supertest';
import app from './server';
import * as saintService from './saint-service';

// Mock the saint service
jest.mock('./saint-service');
const mockSaintService = saintService as jest.Mocked<typeof saintService>;

describe('API Endpoints', () => {
  describe('GET /api/saint', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return 200 with saint data when saint exists', async () => {
      const mockSaint = {
        name: 'Antony of Egypt',
        rank: 'lesser_festival' as const,
        rank_priority: 3,
        life_summary: 'Test summary',
        key_life_events: ['Event 1', 'Event 2'],
        path_to_sainthood: 'Test path',
        source_reference: 'Test source'
      };

      mockSaintService.isValidISODate.mockReturnValue(true);
      mockSaintService.getSaintByDate.mockReturnValue(mockSaint);

      const response = await request(app)
        .get('/api/saint?date=2026-01-17')
        .expect(200);

      expect(response.body).toEqual({
        date: '2026-01-17',
        saint: mockSaint
      });
    });

    it('should return 404 when no saint exists for date', async () => {
      mockSaintService.isValidISODate.mockReturnValue(true);
      mockSaintService.getSaintByDate.mockReturnValue(null);

      const response = await request(app)
        .get('/api/saint?date=2026-01-01')
        .expect(404);

      expect(response.body).toEqual({
        date: '2026-01-01',
        message: 'No saint is commemorated on this date.'
      });
    });

    it('should return 400 for missing date parameter', async () => {
      const response = await request(app)
        .get('/api/saint')
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Missing required query parameter');
    });

    it('should return 400 for invalid date format', async () => {
      mockSaintService.isValidISODate.mockReturnValue(false);

      const response = await request(app)
        .get('/api/saint?date=2026/01/17')
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Invalid date format');
    });

    it('should return 400 for invalid date values', async () => {
      mockSaintService.isValidISODate.mockReturnValue(false);

      const response = await request(app)
        .get('/api/saint?date=2026-02-30')
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should handle multiple saints on same date deterministically', async () => {
      const mockSaint = {
        name: 'Stephen',
        rank: 'festival' as const,
        rank_priority: 2,
        life_summary: 'Test',
        key_life_events: [],
        path_to_sainthood: 'Test',
        source_reference: 'Test'
      };

      mockSaintService.isValidISODate.mockReturnValue(true);
      mockSaintService.getSaintByDate.mockReturnValue(mockSaint);

      const response = await request(app)
        .get('/api/saint?date=2026-12-26')
        .expect(200);

      expect(response.body.saint.name).toBe('Stephen');
    });
  });

  describe('GET /health', () => {
    it('should return 200 with ok status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toEqual({ status: 'ok' });
    });
  });
});
