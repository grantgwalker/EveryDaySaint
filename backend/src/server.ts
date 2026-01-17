import express, { Request, Response } from 'express';
import cors from 'cors';
import { getSaintByDate, isValidISODate } from './saint-service';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

/**
 * GET /api/saint?date=YYYY-MM-DD
 * 
 * Retrieves the saint for a given date.
 * 
 * Query parameters:
 * - date: ISO-8601 date string (YYYY-MM-DD), required
 * 
 * Responses:
 * - 200: Saint found, returns { date, saint }
 * - 400: Invalid date format
 * - 404: No saint for the date
 * - 500: Server error
 */
app.get('/api/saint', (req: Request, res: Response) => {
  const dateParam = req.query.date as string;
  
  // Validate date parameter exists
  if (!dateParam) {
    return res.status(400).json({
      error: 'Missing required query parameter: date'
    });
  }
  
  // Validate date format
  if (!isValidISODate(dateParam)) {
    return res.status(400).json({
      error: 'Invalid date format. Expected ISO-8601 format: YYYY-MM-DD'
    });
  }
  
  try {
    const saint = getSaintByDate(dateParam);
    
    if (!saint) {
      return res.status(404).json({
        date: dateParam,
        message: 'No saint is commemorated on this date.'
      });
    }
    
    return res.status(200).json({
      date: dateParam,
      saint
    });
  } catch (error) {
    console.error('Error retrieving saint:', error);
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
});

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// Start server only if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Saint of the Day API server running on port ${PORT}`);
  });
}

export default app;
