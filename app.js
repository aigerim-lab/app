const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Подключаем шаблонизатор EJS
app.set('view engine', 'ejs');

// Подключаем статику
app.use(express.static('public'));

// Для парсинга данных формы
app.use(express.urlencoded({ extended: true }));

// Подключение к базе данных
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Подключаем маршруты
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

app.use((req, res) => {
    res.status(404).send('Страница не найдена');
  });
  
