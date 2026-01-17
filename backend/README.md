# Saint of the Day - Backend API

Node.js backend API for the Saint of the Day application. Provides a REST API to retrieve Church of England saints commemorated on specific dates.

## Features

- **REST API**: Single endpoint `GET /api/saint?date=YYYY-MM-DD`
- **Input Validation**: Strict ISO-8601 date format validation
- **Deterministic Selection**: When multiple saints exist for a date, selects by rank priority
- **Type Safety**: Full TypeScript implementation
- **Modular Design**: Data source can be swapped without changing function signatures
- **Comprehensive Tests**: Unit and integration tests included

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

## Installation

```bash
cd backend
npm install
```

## Configuration

The API uses a JSON file (`saints.json`) as the data source. The file structure:

```json
{
  "YYYY-MM-DD": [
    {
      "name": "string",
      "rank": "principal_feast | festival | lesser_festival | commemoration",
      "rank_priority": 1-4,
      "life_summary": "string",
      "key_life_events": ["string"],
      "path_to_sainthood": "string",
      "source_reference": "string"
    }
  ]
}
```

## Usage

### Development Mode

```bash
npm run dev
```

Runs the server with `ts-node` on port 3000.

### Production Mode

```bash
npm run build
npm start
```

Compiles TypeScript to JavaScript and runs the compiled code.

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## API Endpoints

### GET /api/saint

Retrieves the saint for a specific date.

**Query Parameters:**
- `date` (required): ISO-8601 date string (YYYY-MM-DD)

**Success Response (200):**
```json
{
  "date": "2026-01-17",
  "saint": {
    "name": "Antony of Egypt",
    "rank": "lesser_festival",
    "rank_priority": 3,
    "life_summary": "...",
    "key_life_events": ["..."],
    "path_to_sainthood": "...",
    "source_reference": "Common Worship: Calendar, Lectionary and Collects"
  }
}
```

**Error Responses:**

- **400 Bad Request**: Invalid date format
  ```json
  {
    "error": "Invalid date format. Expected ISO-8601 format: YYYY-MM-DD"
  }
  ```

- **404 Not Found**: No saint for the date
  ```json
  {
    "date": "2026-01-01",
    "message": "No saint is commemorated on this date."
  }
  ```

- **500 Internal Server Error**: Server error
  ```json
  {
    "error": "Internal server error"
  }
  ```

### GET /health

Health check endpoint.

**Success Response (200):**
```json
{
  "status": "ok"
}
```

## Selection Logic

When multiple saints exist for a single date:

1. Retrieve all saints for the requested date
2. Sort by `rank_priority` ascending (1 = highest priority)
3. Return the first saint

**Rank Priority:**
- `principal_feast` = 1
- `festival` = 2
- `lesser_festival` = 3
- `commemoration` = 4

This ensures deterministic, predictable results.

## Project Structure

```
backend/
├── src/
│   ├── server.ts           # Express server and API routes
│   ├── saint-service.ts    # Core business logic
│   ├── types.ts            # TypeScript type definitions
│   ├── server.test.ts      # API endpoint tests
│   └── saint-service.test.ts  # Service unit tests
├── saints.json             # Saints data
├── package.json
├── tsconfig.json
└── jest.config.js
```

## Environment Variables

- `PORT`: Server port (default: 3000)

Example:
```bash
PORT=8080 npm start
```

## Future Enhancements

The `getSaintByDate()` function is designed to be modular. To swap the JSON data source for a database:

1. Update the implementation in `saint-service.ts`
2. Keep the same function signature: `getSaintByDate(date: string): Saint | null`
3. No changes required to the API layer or consumers

## License

ISC
