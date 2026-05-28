// Import required modules
const express = require('express');
const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));

// In-memory array
let items = [];
let id = 1;

// -------------------- ROUTES --------------------

// HOME PAGE
app.get('/', (req, res) => {
    // calculate total cups
    let total = items.reduce((sum, item) => sum + Number(item.cups), 0);

    res.render('index', { total });
});

// SHOW ADD PAGE
app.get('/add', (req, res) => {
    res.render('add');
});

// HANDLE ADD WATER (POST)
app.post('/add', (req, res) => {
    const { cups, notes } = req.body;

    items.push({
        id: id++,
        cups: Number(cups),
        notes: notes
    });

    res.redirect('/');
});

// HISTORY PAGE
app.get('/history', (req, res) => {
    res.render('history', { items });
});

// DELETE ENTRY
app.post('/delete/:id', (req, res) => {
    const idToDelete = Number(req.params.id);
    items = items.filter(item => item.id !== idToDelete);

    res.redirect('/history');
});

// RESET ALL DATA
app.post('/reset', (req, res) => {
    items = [];
    res.redirect('/');
});

// -------------------- SERVER --------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});