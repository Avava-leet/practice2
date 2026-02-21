const express = require('express');
const app = express();
const port = 3000;

let goods = [
    {id: 1, name: 'удлинитель', price: 16},
    {id: 2, name: 'ресивер', price: 18},
    {id: 3, name: 'стамеска', price: 20},
];

// Middleware для парсинга JSON
app.use(express.json());

// Главная страница
app.get('/', (req, res) => {
    res.send('Главная страница');
});

// CRUD
app.post('/goods', (req, res) => {
    const { name, price } = req.body;
    const newGood = {
        id: Date.now(),
        name,
        price
    };
    goods.push(newGood);
    res.status(201).json(newGood);
});

app.get('/goods', (req, res) => {
    res.json(goods);
});

app.get('/goods/:id', (req, res) => {
    let good = goods.find(u => u.id == req.params.id);
    res.json(good);
});

app.patch('/goods/:id', (req, res) => {
    const good = goods.find(u => u.id == req.params.id);
    const { name, price } = req.body;
    if (name !== undefined) good.name = name;
    if (price !== undefined) good.price = price;
    res.json(good);
});

app.delete('/goods/:id', (req, res) => {
    const initialLength = goods.length;
    goods = goods.filter(u => u.id != req.params.id);
    res.json({message: 'Ok'});
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});