# Saint of the Day - Quick Start Guide

This guide will help you get the "Saint of the Day" application running in under 5 minutes.

## Prerequisites Check

Before starting, ensure you have:
- Node.js 18.x or higher (`node --version`)
- npm 9.x or higher (`npm --version`)

## Step 1: Install Dependencies

Open two terminal windows and run these commands:

**Terminal 1 - Backend:**
```powershell
cd backend
npm install
```

**Terminal 2 - Frontend:**
```powershell
cd everyday-saint
npm install
```

## Step 2: Start the Backend

In Terminal 1:
```powershell
cd backend
npm run dev
```

You should see: `Saint of the Day API server running on port 3000`

## Step 3: Start the Frontend

In Terminal 2:
```powershell
cd everyday-saint
npm start
```

Angular will compile and open your browser automatically to `http://localhost:4200`

## Step 4: View the App

The app should load automatically showing today's saint. If today's date doesn't have a saint in the database, you'll see "No saint is commemorated today."

### Test with a Known Date

To test with a date that has saint data, you can temporarily modify the backend to return a specific date, or wait until one of these dates:

- **January 17** - Antony of Egypt (Lesser Festival)
- **January 25** - The Conversion of Paul (Festival)
- **March 19** - Joseph of Nazareth (Principal Feast)
- **June 24** - The Birth of John the Baptist (Principal Feast)
- **July 22** - Mary Magdalene (Festival)
- **August 15** - The Blessed Virgin Mary (Principal Feast)
- **November 30** - Andrew the Apostle (Festival)
- **December 26** - Stephen (Festival)

## Testing the Features

### Refresh Button
Click the circular arrow icon to reload the saint data.

### Share Button
Click the share icon to:
- Open native share dialog (on supported devices)
- Copy saint info to clipboard (fallback)

## Troubleshooting

### Backend won't start
- Check port 3000 isn't in use: `netstat -ano | findstr :3000`
- Ensure all dependencies installed: `npm install`

### Frontend shows "Unable to load today's saint"
- Verify backend is running on port 3000
- Check browser console for CORS errors
- Ensure `http://localhost:3000/health` returns `{"status":"ok"}`

### Frontend won't compile
- Clear node_modules and reinstall: 
  ```powershell
  Remove-Item -Recurse -Force node_modules
  npm install
  ```

## Running Tests

**Backend Tests:**
```powershell
cd backend
npm test
```

**Frontend Tests:**
```powershell
cd everyday-saint
npm test
```

## What's Next?

Once everything is running:
1. Explore the rich saint information display
2. Try the share functionality
3. Review the code structure in the README
4. Add more saints to `backend/saints.json`

For full documentation, see [README.md](../README.md)
