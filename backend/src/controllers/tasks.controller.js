const tasksCtrl = {};

const Task = require('../models/Task');

tasksCtrl.getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

tasksCtrl.createTask = async (req, res) => {
  const { title, content, date, author } = req.body;
  const newTask = new Task({
    title,
    content,
    date,
    author,
  });
  await newTask.save();
  res.json({ message: 'Task Saved' });
};

tasksCtrl.getTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  console.log(task);
  res.json(task);
};

tasksCtrl.updateTask = async (req, res) => {
  const { title, content, date, author } = req.body;
  await Task.findByIdAndUpdate(req.params.id, {
    title,
    content,
    author,
    date,
  });
  res.json({ message: 'Task Updated' });
};

tasksCtrl.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task Deleted' });
};

module.exports = tasksCtrl;
