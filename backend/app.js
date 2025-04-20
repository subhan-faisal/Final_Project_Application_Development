const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const port = 3000;

// ─── Middleware ────────────────────────────────────────────────
app.use(cors());                                  // Enable CORS for all origins
app.use(express.json());                          // Parse JSON bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve frontend files

// ─── CORS TEST ROUTE ───────────────────────────────────────────
app.get('/ping', (req, res) => {
  console.log('Ping route was hit');  // Debugging
  res.send('pong');
});

// ─── Dummy Data ────────────────────────────────────────────────
let parkingLots = [
  { id: 1, name: 'Lot A', totalSlots: 50, availableSlots: 20 },
  { id: 2, name: 'Lot B', totalSlots: 30, availableSlots: 5 }
];

// ─── API ROUTES ─────────────────────────────────────────────────
app.get('/lots', (req, res) => {
  res.json(parkingLots);
});

// ─── Start Server ──────────────────────────────────────────────
app.listen(port, () => {
  console.log(`Server & site running at http://localhost:${port}`);
});
