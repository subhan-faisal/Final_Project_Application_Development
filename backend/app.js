const cors = require('cors');
app.use(cors());
const express = require('express');
const app = express();
const port = 3000;

// Dummy parking data
let parkingLots = [
  { id: 1, name: 'Lot A', totalSlots: 50, availableSlots: 20 },
  { id: 2, name: 'Lot B', totalSlots: 30, availableSlots: 5 }
];

// Middleware to parse JSON
app.use(express.json());

// GET all lots
app.get('/lots', (req, res) => {
  res.json(parkingLots);
});

// POST create a new lot
app.post('/lots', (req, res) => {
  const newLot = req.body;
  newLot.id = parkingLots.length + 1;
  parkingLots.push(newLot);
  res.status(201).json(newLot);
});

// UPDATE a lot
app.put('/lots/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updated = req.body;
  let lot = parkingLots.find(l => l.id === id);
  if (lot) {
    Object.assign(lot, updated);
    res.json(lot);
  } else {
    res.status(404).send("Lot not found");
  }
});

// DELETE a lot
app.delete('/lots/:id', (req, res) => {
  const id = parseInt(req.params.id);
  parkingLots = parkingLots.filter(l => l.id !== id);
  res.send("Deleted");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
const cors = require('cors');
app.use(cors());
