const express = require('express');
const {
  getAllNews,
  addNews,
  checkNews
} = require('../controllers/newsController');

const router = express.Router();

router.route('/')
  .get(getAllNews)
  .post(addNews);

router.route('/check')
    .post(checkNews);

// Add routes for getting single news, updating, deleting if needed later
// router.route('/:id')
//   .get(getSingleNews)
//   .put(updateNews)
//   .delete(deleteNews);

module.exports = router;