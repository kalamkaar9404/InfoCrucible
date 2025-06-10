const express = require('express');
const router = express.Router();
const News = require('../models/News');
const auth = require('../middleware/auth');

// Get all news
router.get('/', async (req, res) => {
  try {
    const news = await News.find().sort('-createdAt');
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Access denied' });
  
  try {
    const news = new News(req.body);
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});