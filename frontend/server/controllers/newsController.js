const News = require('../models/News');

const { runFakeNewsCheck } = require('../ml/placeholder_detector'); 

exports.getAllNews = async (req, res, next) => {
  try {
    const newsItems = await News.find().sort({ createdAt: -1 }); // Newest first
    res.status(200).json(newsItems);
  } catch (error) {
    console.error('Error in getAllNews:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.addNews = async (req, res, next) => {
  try {
    
    const { title, content, source, url } = req.body;

    if (!title || !content) {
         return res.status(400).json({ success: false, error: 'Title and Content are required' });
    }

    

    const newNews = await News.create({
        title,
        content,
        source,
        url,
        // isVerified: detectionResult.isFake === null ? null : !detectionResult.isFake, // Example logic
        // detectionConfidence: detectionResult.confidence
    });

    res.status(201).json(newNews);
  } catch (error) {
    console.error('Error in addNews:', error);
     if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({ success: false, error: messages });
     }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Check news text for fakeness
// @route   POST /api/news/check
// @access  Public
exports.checkNews = async (req, res, next) => {
    try {
        const { text } = req.body;
        if (!text || typeof text !== 'string' || text.trim().length === 0) {
            return res.status(400).json({ success: false, error: 'Please provide news text to check' });
        }

        // --- ML Model Integration Placeholder ---
        // In a real scenario, you'd call your ML model here.
        // This could involve:
        // 1. Spawning a Python child process.
        // 2. Making an HTTP request to a separate Python ML service (Flask/FastAPI).
        // 3. Using a Node.js ML library (less common for complex NLP).

        console.log(`Checking news text (length: ${text.length})...`);
        const result = await runFakeNewsCheck(text); // Using placeholder
        console.log("Detection Result:", result)

        // --- End ML Placeholder ---

        res.status(200).json({
            success: true,
            isFake: result.isFake, // boolean or null
            confidence: result.confidence // number or null
        });

    } catch (error) {
        console.error('Error in checkNews:', error);
        res.status(500).json({ success: false, error: 'Server Error while checking news' });
    }
};