const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update password
router.put('/password', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid current password' });

    user.password = req.body.newPassword;
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/signup', async (req, res) => {
  const { email, password, role } = req.body;

  // TODO: Add validation, hashing
  const user = { email, password, role };
  // Save to DB (example using MongoDB)
  await db.collection('users').insertOne(user);

  res.json({ message: 'Signup successful!' });
});

module.exports = router;