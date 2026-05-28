const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let items = [];
let id = 1;

// HOME
app.get('/', (req, res) => {
    let total = items.reduce((sum, item) => sum + Number(item.cups), 0);
    res.render('index', { total });
});

// ADD PAGE
app.get('/add', (req, res) => {
    res.render('add');
});

// ADD POST
app.post('/add', (req, res) => {
    const { cups, notes } = req.body;

    items.push({
        id: id++,
        cups: Number(cups),
        notes
    });

    res.redirect('/');
});

// HISTORY PAGE
app.get('/history', (req, res) => {
    res.render('history', { items });
});

// DELETE
app.post('/delete/:id', (req, res) => {
    items = items.filter(i => i.id !== Number(req.params.id));
    res.redirect('/history');
});

// RESET
app.post('/reset', (req, res) => {
    items = [];
    res.redirect('/');
});

app.listen(3000, () => console.log("http://localhost:3000"));