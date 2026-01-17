# Saint of the Day

A complete web application displaying the Church of England Saint of the Day with rich biographical information and sharing capabilities.

## Architecture

- **Frontend**: Angular 19+ with TypeScript
- **Backend**: Node.js + Express REST API
- **Data Source**: JSON file (easily replaceable with database)

## Features

### User Features
- ✅ Display today's saint with rich biographical information
- ✅ View life summary, key life events, and path to sainthood
- ✅ Share saint information via Web Share API or clipboard
- ✅ Refresh to reload saint data
- ✅ Responsive design for mobile and desktop
- ✅ Accessible interface with ARIA labels

### Technical Features
- ✅ Type-safe TypeScript throughout
- ✅ Deterministic saint selection for multi-saint dates
- ✅ Comprehensive error handling
- ✅ Full test coverage (unit + integration)
- ✅ Modular, maintainable code architecture
- ✅ Future-proof design for database migration

## Project Structure

```
EveryDaySaint/
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── server.ts       # Express API
│   │   ├── saint-service.ts # Business logic
│   │   ├── types.ts        # TypeScript types
│   │   └── *.test.ts       # Tests
│   ├── saints.json         # Saints database
│   └── package.json
│
├── everyday-saint/         # Angular frontend
│   ├── src/
│   │   └── app/
│   │       ├── models/     # TypeScript models
│   │       ├── services/   # API services
│   │       ├── saint-card/ # Saint display component
│   │       ├── share-button/   # Share functionality
│   │       ├── refresh-button/ # Refresh functionality
│   │       └── *.spec.ts   # Tests
│   └── package.json
│
└── README.md              # This file
```

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

## Installation

### Backend Setup

```bash
cd backend
npm install
```

### Frontend Setup

```bash
cd everyday-saint
npm install
```

## Running the Application

### 1. Start the Backend API

```bash
cd backend
npm run dev
```

The API will run on `http://localhost:3000`

### 2. Start the Frontend

In a new terminal:

```bash
cd everyday-saint
npm start
```

The app will run on `http://localhost:4200`

### 3. Open the Application

Navigate to `http://localhost:4200` in your browser.

## Testing

### Backend Tests

```bash
cd backend
npm test
```

Tests include:
- ✅ Saint selection logic (single, multiple, none)
- ✅ Date validation
- ✅ API endpoint responses (200, 404, 400, 500)
- ✅ Deterministic selection for multi-saint dates

### Frontend Tests

```bash
cd everyday-saint
npm test
```

Tests include:
- ✅ Component rendering
- ✅ Service API calls and error handling
- ✅ Share button functionality (Web Share + clipboard)
- ✅ Refresh button behavior
- ✅ Error state handling

## API Documentation

### GET /api/saint?date=YYYY-MM-DD

Retrieves the saint for a specific date.

**Example Request:**
```
GET http://localhost:3000/api/saint?date=2026-01-17
```

**Example Response:**
```json
{
  "date": "2026-01-17",
  "saint": {
    "name": "Antony of Egypt",
    "rank": "lesser_festival",
    "rank_priority": 3,
    "life_summary": "Antony of Egypt (c. 251-356) is considered...",
    "key_life_events": [
      "Born in Egypt around 251 AD to a wealthy Christian family",
      "At age 20, sold all his possessions..."
    ],
    "path_to_sainthood": "Antony's sanctity was recognized...",
    "source_reference": "Common Worship: Calendar, Lectionary and Collects"
  }
}
```

See [backend/README.md](backend/README.md) for complete API documentation.

## Saints Data

The `backend/saints.json` file contains Church of England saints. Current dataset includes:

- **8 dates** with saint data
- **Single-saint dates**: Jan 17, Jan 25, Jun 24, Mar 19, Nov 30, Aug 15
- **Multi-saint dates**: Dec 26 (2 festivals), Jul 22 (festival + commemoration)

### Rank Priority

1. **Principal Feast** (priority: 1) - Most important celebrations
2. **Festival** (priority: 2) - Major celebrations
3. **Lesser Festival** (priority: 3) - Important commemorations
4. **Commemoration** (priority: 4) - Local or optional remembrances

When multiple saints share a date, the saint with the highest rank (lowest priority number) is displayed.

## Error Handling

The application handles three error states:

1. **Backend Unreachable**: "Unable to load today's saint."
2. **No Saint Found**: "No saint is commemorated today."
3. **Invalid Response**: "Content unavailable."

## Accessibility

- ✅ Semantic HTML structure
- ✅ ARIA labels on all interactive elements
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Screen reader friendly

## Browser Compatibility

- Modern browsers supporting ES2020+
- Web Share API (with clipboard fallback)
- CSS Grid and Flexbox

## Development

### Building for Production

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd everyday-saint
npm run build
```

The production build will be in `everyday-saint/dist/`.

### Adding New Saints

Edit `backend/saints.json` following this structure:

```json
{
  "YYYY-MM-DD": [
    {
      "name": "Saint Name",
      "rank": "principal_feast | festival | lesser_festival | commemoration",
      "rank_priority": 1-4,
      "life_summary": "Brief biography...",
      "key_life_events": [
        "Event 1",
        "Event 2"
      ],
      "path_to_sainthood": "How they became a saint...",
      "source_reference": "Source citation"
    }
  ]
}
```

Ensure `rank_priority` matches the rank:
- principal_feast = 1
- festival = 2
- lesser_festival = 3
- commemoration = 4

## Future Enhancements (Not in V1)

The following are explicitly **excluded** from Version 1:

- ❌ User accounts or authentication
- ❌ Browsing saints by date/name
- ❌ Editing or adding saints via UI
- ❌ Randomization or personalization
- ❌ Direct database integration (JSON is intentional for V1)

The architecture supports these future enhancements without breaking changes:

- Database migration (swap `getSaintByDate()` implementation)
- Additional API endpoints
- User preferences
- Extended saint information

## License

ISC

## Credits

Saint information sourced from Common Worship: Calendar, Lectionary and Collects (Church of England).

