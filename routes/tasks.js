const express = require('express');
const Task = require('../models/Task');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, async (req, res) => {
    try {
      let tasks;
  
      if (req.user.role === 'admin') {
        tasks = await Task.find();
      } else {
        tasks = await Task.find({ user: req.user.id });
      }
  
      res.render('index', { tasks });
    } catch (err) {
      res.status(500).json({ message: 'Ошибка сервера' });
    }
});

  
  router.post('/create', authenticateToken, async (req, res) => {
    const { title, description } = req.body;
  
    try {
      const task = new Task({
        title,
        description,
        user: req.user.id
      });
  
      await task.save();
      res.redirect('/tasks');
    } catch (err) {
      res.status(500).json({ message: 'Ошибка сервера' });
    }
});

router.delete('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: 'Задача удалена' });
    } catch (err) {
      res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Пример GET-запроса для добавления новой задачи
router.get('/create', (req, res) => {
  res.render('create-task');
});

module.exports = router;
