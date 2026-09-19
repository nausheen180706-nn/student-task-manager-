const mongoose = require('mongoose');

const CATEGORIES = ['College', 'Assignment', 'Project', 'Coding', 'Personal', 'Exam'];
const PRIORITIES = ['Low', 'Medium', 'High'];

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      minlength: [1, 'Task title cannot be empty']
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: CATEGORIES,
        message: 'Category must be one of: College, Assignment, Project, Coding, Personal, Exam'
      }
    },
    priority: {
      type: String,
      required: [true, 'Priority is required'],
      enum: {
        values: PRIORITIES,
        message: 'Priority must be one of: Low, Medium, High'
      },
      default: 'Medium'
    },
    dueDate: {
      type: String,
      required: [true, 'Due date is required'],
      trim: true
    },
    dueTime: {
      type: String,
      default: '12:00',
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Map _id to id for seamless frontend compatibility
taskSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    return ret;
  }
});

taskSchema.set('toObject', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    return ret;
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
