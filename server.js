const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*", // У продакшені змініть на адресу вашого сайту
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Користувач підключився:', socket.id);

  // Отримання вибору сервера від клієнта
  socket.on('selectServer', (data) => {
    console.log(`Клієнт ${socket.id} обрав сервер: ${data.server}`);
    // Тут ви можете додати логіку перемикання проксі-вузлів
  });

  // Сигналізація: Отримання оффера
  socket.on('offer', (offer) => {
    console.log('Отримано offer від клієнта');
    // Пересилаємо оффер на ваш VPN-сервер (тут логіка залежить від вашої архітектури)
    // У даному прикладі просто транслюємо іншим або обробляємо
    socket.broadcast.emit('offer', offer);
  });

  // Сигналізація: Отримання відповіді (answer)
  socket.on('answer', (answer) => {
    socket.broadcast.emit('answer', answer);
  });

  // Сигналізація: Обмін ICE кандидатами
  socket.on('ice-candidate', (candidate) => {
    socket.broadcast.emit('ice-candidate', candidate);
  });

  socket.on('disconnect', () => {
    console.log('Користувач відключився');
  });
});

http.listen(3000, () => {
  console.log('Сервер сигналізації запущено на порту 3000');
});
