const express = require('express');
const router = express.Router();
const { predictFakeNews } = require('../ml/model'); // Connect to your ML model

router.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    const prediction = await predictFakeNews(text); // ML prediction
    res.json({
      result: prediction > 0.5 ? 'Fake News' : 'Genuine News',
      confidence: prediction
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});