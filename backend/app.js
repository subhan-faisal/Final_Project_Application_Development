const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const port = 3000;

// ─── Middleware ────────────────────────────────────────────────
app.use(cors());                                            // Enable CORS
app.use(express.json());                                    // Parse JSON bodies
app.use(express.static(path.join(__dirname, 'public')));    // Serve static frontend files

// ─── CORS TEST ROUTE ───────────────────────────────────────────
app.get('/ping', (req, res) => {
  console.log('Ping route was hit');
  res.send('pong');
});

// ─── In‑Memory Data Stores ─────────────────────────────────────
let parkingLots = [
  { id: 1, name: 'Lot A', totalSlots: 50, availableSlots: 20 },
  { id: 2, name: 'Lot B', totalSlots: 30, availableSlots: 5 }
];

let parkingSlots = [
  // { id: 1, lotId: 1, slotNumber: 'A1', status: 'Available', vehicleType: 'Any' }
];

let parkingActivities = [
  // { id: 1, userId: 1, slotId: 1, action: 'Check-In', timestamp: '2025-04-19T15:00:00Z' }
];

// ─── CRUD ROUTES FOR /lots ──────────────────────────────────────

// READ: Get all lots
app.get('/lots', (req, res) => {
  res.json(parkingLots);
});

// CREATE: Add a new lot
app.post('/lots', (req, res) => {
  const { name, totalSlots, availableSlots } = req.body;
  if (!name || totalSlots == null || availableSlots == null) {
    return res.status(400).json({ error: 'name, totalSlots, and availableSlots are required' });
  }
  const newLot = { id: parkingLots.length + 1, name, totalSlots, availableSlots };
  parkingLots.push(newLot);
  res.status(201).json(newLot);
});

// UPDATE: Modify an existing lot
app.put('/lots/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const lot = parkingLots.find(l => l.id === id);
  if (!lot) {
    return res.status(404).json({ error: 'Lot not found' });
  }
  const { name, totalSlots, availableSlots } = req.body;
  if (name !== undefined)           lot.name = name;
  if (totalSlots !== undefined)     lot.totalSlots = totalSlots;
  if (availableSlots !== undefined) lot.availableSlots = availableSlots;
  res.json(lot);
});

// DELETE: Remove a lot
app.delete('/lots/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const initialLength = parkingLots.length;
  parkingLots = parkingLots.filter(l => l.id !== id);
  if (parkingLots.length === initialLength) {
    return res.status(404).json({ error: 'Lot not found' });
  }
  res.sendStatus(204);
});

// ─── SLOT ROUTES ─────────────────────────────────────────────────

// READ: Get all slots for a specific lot
app.get('/lots/:lotId/slots', (req, res) => {
  const lotId = parseInt(req.params.lotId, 10);
  const slots = parkingSlots.filter(s => s.lotId === lotId);
  res.json(slots);
});

// CREATE: Add a new slot to a lot
app.post('/lots/:lotId/slots', (req, res) => {
  const lotId = parseInt(req.params.lotId, 10);
  const { slotNumber, status = 'Available', vehicleType = 'Any' } = req.body;
  if (!slotNumber) {
    return res.status(400).json({ error: 'slotNumber is required' });
  }
  const newSlot = { id: parkingSlots.length + 1, lotId, slotNumber, status, vehicleType };
  parkingSlots.push(newSlot);
  res.status(201).json(newSlot);
});

// UPDATE: Modify an existing slot
app.put('/slots/:slotId', (req, res) => {
  const slotId = parseInt(req.params.slotId, 10);
  const slot = parkingSlots.find(s => s.id === slotId);
  if (!slot) {
    return res.status(404).json({ error: 'Slot not found' });
  }
  const { slotNumber, status, vehicleType } = req.body;
  if (slotNumber !== undefined)  slot.slotNumber = slotNumber;
  if (status !== undefined)      slot.status     = status;
  if (vehicleType !== undefined) slot.vehicleType= vehicleType;
  res.json(slot);
});

// DELETE: Remove a slot
app.delete('/slots/:slotId', (req, res) => {
  const slotId = parseInt(req.params.slotId, 10);
  const initialLen = parkingSlots.length;
  parkingSlots = parkingSlots.filter(s => s.id !== slotId);
  if (parkingSlots.length === initialLen) {
    return res.status(404).json({ error: 'Slot not found' });
  }
  res.sendStatus(204);
});

// ─── ACTIVITY ROUTES ─────────────────────────────────────────────

// READ: List all activities
app.get('/activities', (req, res) => {
  res.json(parkingActivities);
});

// CREATE: Log a check-in activity
app.post('/activities/checkin', (req, res) => {
  const { userId, slotId } = req.body;
  if (!userId || !slotId) {
    return res.status(400).json({ error: 'userId and slotId are required' });
  }
  const activity = {
    id: parkingActivities.length + 1,
    userId,
    slotId,
    action: 'Check-In',
    timestamp: new Date().toISOString()
  };
  parkingActivities.push(activity);
  // update slot status
  const slot = parkingSlots.find(s => s.id === slotId);
  if (slot) slot.status = 'Occupied';
  res.status(201).json(activity);
});

// CREATE: Log a check-out activity
app.post('/activities/checkout', (req, res) => {
  const { userId, slotId } = req.body;
  if (!userId || !slotId) {
    return res.status(400).json({ error: 'userId and slotId are required' });
  }
  const activity = {
    id: parkingActivities.length + 1,
    userId,
    slotId,
    action: 'Check-Out',
    timestamp: new Date().toISOString()
  };
  parkingActivities.push(activity);
  // update slot status
  const slot = parkingSlots.find(s => s.id === slotId);
  if (slot) slot.status = 'Available';
  res.status(201).json(activity);
});

// ─── Start Server ──────────────────────────────────────────────
app.listen(port, () => {
  console.log(`Server & site running at http://localhost:${port}`);
});
