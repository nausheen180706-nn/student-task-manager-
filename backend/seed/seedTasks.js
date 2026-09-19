const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Task = require('../models/Task');

// Load environment variables from backend/.env
dotenv.config({ path: path.join(__dirname, '../.env') });

const getRelativeDateString = (offsetDays = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const todayStr = getRelativeDateString(0);
const tomorrowStr = getRelativeDateString(1);
const yesterdayStr = getRelativeDateString(-1);
const dayAfterTomorrowStr = getRelativeDateString(2);
const nextWeekStr = getRelativeDateString(5);

const sampleTasks = [
  {
    title: 'Complete Deep Learning Assignment',
    description: 'Finish Recurrent Neural Networks (RNN) and LSTM implementation in PyTorch notebook.',
    category: 'Assignment',
    priority: 'High',
    dueDate: todayStr,
    dueTime: '17:00',
    completed: false
  },
  {
    title: 'Practice JavaScript & DOM Manipulation',
    description: 'Solve 5 exercises on array map/filter/reduce and build a mini interactive accordion widget.',
    category: 'Coding',
    priority: 'Medium',
    dueDate: todayStr,
    dueTime: '19:00',
    completed: false
  },
  {
    title: 'Study DBMS & Normalization',
    description: 'Review 1NF, 2NF, 3NF and BCNF concepts with practical table decomposition exercises.',
    category: 'College',
    priority: 'High',
    dueDate: tomorrowStr,
    dueTime: '14:00',
    completed: false
  },
  {
    title: 'Complete Mini Project Architecture',
    description: 'Finalize database ER diagram and Express route specifications with project partner.',
    category: 'Project',
    priority: 'High',
    dueDate: dayAfterTomorrowStr,
    dueTime: '16:30',
    completed: false
  },
  {
    title: 'Prepare Webinar Presentation',
    description: 'Design interactive slide deck explaining React frontend and Node/Express/MongoDB connection.',
    category: 'Project',
    priority: 'High',
    dueDate: todayStr,
    dueTime: '21:00',
    completed: false
  },
  {
    title: 'Practice Python Data Structures',
    description: 'Implement Stack, Queue, and Binary Search Tree algorithms using clean Python classes.',
    category: 'Coding',
    priority: 'Low',
    dueDate: nextWeekStr,
    dueTime: '18:00',
    completed: false
  },
  {
    title: 'Submit AI Assignment',
    description: 'Write search heuristics and A* algorithm report with benchmarking comparisons.',
    category: 'Assignment',
    priority: 'Medium',
    dueDate: tomorrowStr,
    dueTime: '23:59',
    completed: false
  },
  {
    title: 'Revise Computer Networks',
    description: 'Summarize 3-way TCP handshake, UDP headers, and OSI reference model layers.',
    category: 'College',
    priority: 'Medium',
    dueDate: yesterdayStr,
    dueTime: '11:45',
    completed: true,
    completedAt: new Date(Date.now() - 86400000)
  },
  {
    title: 'Complete MongoDB Tutorial',
    description: 'Practice Mongoose schema definitions, CRUD operations, aggregations, and indexes.',
    category: 'Coding',
    priority: 'High',
    dueDate: todayStr,
    dueTime: '12:00',
    completed: true,
    completedAt: new Date()
  },
  {
    title: 'Prepare Hackathon Idea Pitch',
    description: 'Draft 2-minute elevator pitch for student developer hackathon problem statement.',
    category: 'Personal',
    priority: 'Medium',
    dueDate: nextWeekStr,
    dueTime: '20:00',
    completed: false
  },
  {
    title: 'Read Research Paper on LLM Agents',
    description: 'Analyze reasoning workflows, memory structures, and tool integration patterns.',
    category: 'Exam',
    priority: 'Low',
    dueDate: dayAfterTomorrowStr,
    dueTime: '15:00',
    completed: false
  },
  {
    title: 'Complete UI/UX Design System in Figma',
    description: 'Select harmonious color palettes, typography scale, and responsive grid layouts.',
    category: 'Personal',
    priority: 'Low',
    dueDate: yesterdayStr,
    dueTime: '09:00',
    completed: true,
    completedAt: new Date(Date.now() - 86400000 * 2)
  }
];

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskflow_db';
    console.log(`Connecting to MongoDB at: ${mongoUri}`);

    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully for seeding.');

    // Clear existing tasks
    await Task.deleteMany({});
    console.log('Existing tasks cleared from database.');

    // Insert sample tasks
    const createdTasks = await Task.insertMany(sampleTasks);
    console.log(`Successfully seeded ${createdTasks.length} student tasks into MongoDB!`);

    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (error) {
    console.error(`Error while seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();
