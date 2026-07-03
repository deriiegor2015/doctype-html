const express = require('express');
const app = express();
const path = require('path'); // Додайте цей рядок
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: { origin: "*" }
});

// !!! Цей рядок вказує Express шукати файли в папці public
app.use(express.static(path.join(__dirname, 'public')));

// Додаткова перевірка (для гарантії)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ... ваша логіка socket.io (io.on('connection', ...))

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Сервер працює на порті ${PORT}`);
});
