const { fetchOne } = require("../utils/pg");

const addTodo = `insert into todolist(todo_title,  isdeleted, isdone)values($1, $2, $3) returning *`;
const updateTodo = `update todolist set todo_title = $1 where todo_id = $2 returning *`;
const deleteTodo =
  "update todolist set isdeleted = $1 WHERE todo_id = $2 returning *";
const isDone = `update todolist set isdone = $1 where todo_id = $2 returning *`;
const getByDateandPagination = `SELECT *
FROM todolist offset $1 limit $2`

const addTodoList = (title, isDeleted, isDone) =>
  fetchOne(addTodo, title, isDeleted, isDone);
const updateTodoList = (title, id) => fetchOne(updateTodo, title, id);
const deetedTodoList = (isdeleted, todo_id) =>
  fetchOne(deleteTodo, isdeleted, todo_id);
const isDoneList = (isdone, todo_id) => fetchOne(isDone, isdone, todo_id);
const getByPaginationAndFilter = (page, limit) =>
  fetch(getByDateandPagination, page, limit);
module.exports = {
  addTodoList,
  updateTodoList,
  deetedTodoList,
  isDoneList,
  getByPaginationAndFilter,
};
