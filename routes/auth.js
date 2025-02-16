const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/User'); // Путь к модели User
const router = express.Router();

// Форма входа (GET)
router.get('/login', (req, res) => {
  res.render('login');
});

// Обработка входа (POST)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // В реальном приложении можно отправить токен как куки, но пока просто выводим его на экран
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Форма регистрации (GET)
router.get('/register', (req, res) => {
  res.render('register');
});

// Регистрация пользователя (POST)
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Имя обязательно'),
    body('email').isEmail().withMessage('Некорректный email'),
    body('password').isLength({ min: 6 }).withMessage('Пароль должен быть не менее 6 символов'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('register', { errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).render('register', { errors: [{ msg: 'Email уже зарегистрирован' }] });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();

      res.redirect('/auth/login');
    } catch (err) {
      console.error(err);
      res.status(500).send('Ошибка сервера');
    }
  }
);

module.exports = router;
