const express = require('express');
const {
  getTirths,
  getTirth,
  createTirth,
  updateTirth,
  deleteTirth,
} = require('../controllers/tirthController');

const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Public Routes
router.get('/', getTirths);
router.get('/:id', getTirth);

// Admin Only Routes
router.post('/', protect, authorize('admin'), createTirth);
router.put('/:id', protect, authorize('admin'), updateTirth);
router.delete('/:id', protect, authorize('admin'), deleteTirth);

module.exports = router;