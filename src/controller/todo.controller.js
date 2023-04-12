const { Pool } = require("pg");
const Todos = require("../models/todo");
const pool = new Pool({
  connectionString: "postgres://postgres:123326125@127.0.0.1:5432/exam",
});
const { addTodoValidator } = require("../utils/joi");

const addTodo = async (req, res) => {
  try {
    const { error, value } = addTodoValidator.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { title, isDeleted, isDone } = value;

    await Todos.addTodoList(title, isDeleted, isDone);

    res.status(201).json({ message: "Success bro" });
  } catch (error) {
    console.log(error);
  }
};

const updateTodoList = async (req, res) => {
  try {
    const id = req.params.id;
    const { title } = req.body;

    if (!title) {
      return res.status(404).json({ message: "Not Found" });
    }

    await Todos.updateTodoList(title, id);

    res.status(200).json({ message: "Update Success" });
  } catch (error) {
    console.log(error);
  }
};

const deleteTodoList = async (req, res) => {
  try {
    const todo_id = req.params.id;

    await Todos.deetedTodoList((isdeleted = true), todo_id);

    res.status(200).json({ message: "Deleted Success" });
  } catch (error) {
    console.log(error);
  }
};

const isDonelistcha = async (req, res) => {
  try {
    const todo_id = req.params.id;

    await Todos.isDoneList((isdone = true), todo_id);

    res.status(200).json({ message: "isDone  Success bo'ldi karocchi" });
  } catch (error) {
    console.log(error);
  }
};

const getByDateandPagination = async (req, res) => {
  try {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);
    const page = parseInt(req.query.page || 2);
    const limit = parseInt(req.query.limit || 10);

    const offset = (page - 1) * limit;

    const totalCountResult = await pool.query(
      "SELECT COUNT(*) FROM todolist WHERE EXTRACT(YEAR FROM todo_created_at) = $1 AND EXTRACT(MONTH FROM todo_created_at) = $2",
      [year, month]
    );
    const totalCount = parseInt(totalCountResult.rows[0].count);

    const result = await pool.query(
      "SELECT * FROM todolist WHERE EXTRACT(YEAR FROM todo_created_at) = $1 AND EXTRACT(MONTH FROM todo_created_at) = $2 ORDER BY todo_created_at DESC LIMIT $3 OFFSET $4",
      [year, month, limit, offset]
    );
    const todos = result.rows;

    res.json({
      todos,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addTodo,
  updateTodoList,
  deleteTodoList,
  isDonelistcha,
  getByDateandPagination,
};
