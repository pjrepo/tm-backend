import Task from "../models/taskModel.js";

export const createTask = async (req, res, next) => {
  const newTask = new Task({
    title: req.body.title,
    completed: req.body.completed,
    user: req.user.id,
  });

  try {
    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (error) {
    next(error);
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getPendingTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id, completed: false }).sort(
      {
        createdAt: -1,
      }
    );
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getCompletedTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id, completed: true }).sort({
      createdAt: -1,
    });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const toggleStatusTask = async (req, res, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json("Task has been deleted successfully!!");
  } catch (error) {
    next(error);
  }
};

export const deleteAllTasks = async (req, res, next) => {
  try {
    await Task.deleteMany({});
    res.status(200).json("All tasks have been deleted successfully!!");
  } catch (error) {
    next(error);
  }
};
