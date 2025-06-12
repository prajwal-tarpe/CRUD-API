const { v4: uuidv4 } = require('uuid');
const tasks = require('../Models/taskData')

const createTask = (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: "Title and description are required" });
        }

        const newTask = { id: uuidv4(), title, description };
        tasks.push(newTask);

        res.status(200).json(newTask);
    } catch (error) {
        res.status(500).json({ error: "Server error while creating task" });
    }
};

const getAllTasks = (req, res) => {
    try {
        // Extract 'page' and 'limit' from query; set defaults if not provided
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        // Total number of tasks
        const totalTasks = tasks.length;

        // Calculate how many total pages are needed
        const totalPages = Math.ceil(totalTasks / limit);

        // Handle edge case: user requests a page that doesn't exist
        if (page > totalPages && totalTasks > 0) {
            return res.status(404).json({
                message: `Page ${page} does not exist. Only ${totalPages} page(s) available.`,
                success: false
            });
        }

        // Determine the start and end index for slicing
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        // Slice the array to get only tasks for the current page
        const paginatedTasks = tasks.slice(startIndex, endIndex);

        // Return the paginated tasks
        res.status(200).json({
            page,
            limit,
            totalTasks,
            totalPages,
            data: paginatedTasks,
            success: true
        });
    } catch (error) {
        res.status(500).json({ error: "Server error while fetching tasks" });
    }
};

const getTaskById = (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.status(200).json({
        message: "Fetched Task Successfully",
        success: true,
        data: task
    });
};

const updateTask = (req, res) => {
  const { title, description } = req.body;
  const task = tasks.find(t => t.id === req.params.id);

  if (!task) return res.status(404).json({ error: "Task not found" });

  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  task.title = title;
  task.description = description;

  res.status(200).json({
    success: true,
    message: "Task Updated Successfully",
    data: task
  });
};

const deleteTask = (req, res) => {
  try {
    const index = tasks.findIndex(t => t.id === req.params.id);
    console.log(index);
    if (index === -1) return res.status(404).json({ error: "Task not found" });

    const deletedTask = tasks.splice(index, 1);
    res.status(200).json({ message: "Task deleted", task: deletedTask[0] });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the task", details: error.message });
  }
};


module.exports ={ createTask, getAllTasks, getTaskById, deleteTask, updateTask };