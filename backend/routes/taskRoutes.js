const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskComplete,
  getTaskSummaryStats,
  getCategoryStats,
  getWeeklyStats
} = require('../controllers/taskController');

// Statistics endpoints (MUST be defined before /:id routes)
router.get('/stats/summary', getTaskSummaryStats);
router.get('/stats/categories', getCategoryStats);
router.get('/stats/weekly', getWeeklyStats);

// Task collection endpoints
router.route('/')
  .get(getTasks)
  .post(createTask);

// Single task endpoints
router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

// Task completion toggle endpoint
router.patch('/:id/complete', toggleTaskComplete);

module.exports = router;
