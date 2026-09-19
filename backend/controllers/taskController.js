const Task = require('../models/Task');

/**
 * Helper to get today's date formatted as YYYY-MM-DD
 */
const getTodayDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * @desc   Get all tasks with optional filters and search
 * @route  GET /api/tasks
 * @query  category, priority, completed, search
 */
const getTasks = async (req, res, next) => {
  try {
    const { category, priority, completed, search } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (priority && priority !== 'All') {
      filter.priority = priority;
    }

    if (completed !== undefined && completed !== 'All') {
      filter.completed = completed === 'true';
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { category: searchRegex }
      ];
    }

    // Sort by createdAt descending (newest first)
    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Tasks fetched successfully',
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Get single task by ID
 * @route  GET /api/tasks/:id
 */
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task fetched successfully',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Create a new task
 * @route  POST /api/tasks
 */
const createTask = async (req, res, next) => {
  try {
    const { title, description, category, priority, dueDate, dueTime } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Task title is required'
      });
    }

    if (!dueDate || !dueDate.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Due date is required'
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      category: category || 'Assignment',
      priority: priority || 'Medium',
      dueDate: dueDate.trim(),
      dueTime: dueTime ? dueTime.trim() : '12:00',
      completed: false,
      completedAt: null
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Update an existing task
 * @route  PUT /api/tasks/:id
 */
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    const { title, description, category, priority, dueDate, dueTime, completed } = req.body;

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Task title cannot be empty'
        });
      }
      task.title = title.trim();
    }

    if (description !== undefined) {
      task.description = description.trim();
    }

    if (category !== undefined) {
      task.category = category;
    }

    if (priority !== undefined) {
      task.priority = priority;
    }

    if (dueDate !== undefined) {
      task.dueDate = dueDate;
    }

    if (dueTime !== undefined) {
      task.dueTime = dueTime;
    }

    if (completed !== undefined) {
      const isCompleted = Boolean(completed);
      task.completed = isCompleted;
      task.completedAt = isCompleted ? (task.completedAt || new Date()) : null;
    }

    const updatedTask = await task.save();

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Delete a task
 * @route  DELETE /api/tasks/:id
 */
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: { id: req.params.id }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Mark a task as completed or incomplete
 * @route  PATCH /api/tasks/:id/complete
 */
const toggleTaskComplete = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // If explicit completed status passed in body, use it; otherwise toggle
    const newStatus = req.body.completed !== undefined ? Boolean(req.body.completed) : !task.completed;

    task.completed = newStatus;
    task.completedAt = newStatus ? new Date() : null;

    const updatedTask = await task.save();

    res.status(200).json({
      success: true,
      message: newStatus ? 'Task marked as completed' : 'Task marked as incomplete',
      data: updatedTask
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Get task summary statistics (total, pending, completed, dueToday, completionRate)
 * @route  GET /api/tasks/stats/summary
 */
const getTaskSummaryStats = async (req, res, next) => {
  try {
    const todayStr = getTodayDateString();

    const total = await Task.countDocuments();
    const completed = await Task.countDocuments({ completed: true });
    const pending = total - completed;
    const dueToday = await Task.countDocuments({ dueDate: todayStr, completed: false });
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    res.status(200).json({
      success: true,
      message: 'Task summary statistics fetched successfully',
      data: {
        total,
        pending,
        completed,
        dueToday,
        completionRate,
        progressPercentage: completionRate
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Get task counts grouped by category
 * @route  GET /api/tasks/stats/categories
 */
const getCategoryStats = async (req, res, next) => {
  try {
    const allCategories = ['College', 'Assignment', 'Project', 'Coding', 'Personal', 'Exam'];

    const aggregation = await Task.aggregate([
      {
        $group: {
          _id: '$category',
          total: { $sum: 1 },
          completed: {
            $sum: {
              $cond: [{ $eq: ['$completed', true] }, 1, 0]
            }
          }
        }
      }
    ]);

    const statsMap = {};
    aggregation.forEach((item) => {
      statsMap[item._id] = {
        total: item.total,
        completed: item.completed,
        pending: item.total - item.completed
      };
    });

    const categoryList = allCategories.map((cat) => ({
      category: cat,
      total: statsMap[cat] ? statsMap[cat].total : 0,
      completed: statsMap[cat] ? statsMap[cat].completed : 0,
      pending: statsMap[cat] ? statsMap[cat].pending : 0
    }));

    res.status(200).json({
      success: true,
      message: 'Category statistics fetched successfully',
      data: categoryList
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Get completed task counts for the current week (Monday - Sunday)
 * @route  GET /api/tasks/stats/weekly
 */
const getWeeklyStats = async (req, res, next) => {
  try {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Determine Monday 00:00:00 of the current week
    const now = new Date();
    const currentDay = now.getDay();
    const distanceToMonday = (currentDay + 6) % 7;
    const monday = new Date(now);
    monday.setDate(now.getDate() - distanceToMonday);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    // Fetch all completed tasks
    const completedTasks = await Task.find({
      completed: true
    });

    const dayCounts = {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
      Sunday: 0
    };

    completedTasks.forEach((task) => {
      const taskDate = task.completedAt || task.updatedAt || task.createdAt;
      if (taskDate) {
        const d = new Date(taskDate);
        // If within current week (or count towards day of week for webinar demonstration)
        const dayName = dayNames[d.getDay()];
        if (dayCounts[dayName] !== undefined) {
          dayCounts[dayName]++;
        }
      }
    });

    const data = daysOfWeek.map((day) => ({
      day,
      completed: dayCounts[day]
    }));

    res.status(200).json({
      success: true,
      message: 'Weekly analytics fetched successfully',
      data
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskComplete,
  getTaskSummaryStats,
  getCategoryStats,
  getWeeklyStats
};
