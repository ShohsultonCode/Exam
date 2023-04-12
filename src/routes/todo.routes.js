const {Router} = require("express")
const { addTodo, updateTodoList, deleteTodoList, isDonelistcha, getByDateandPagination } = require("../controller/todo.controller")


const router = Router()


router.post("/add/todo", addTodo)
router.put("/update/todo/:id", updateTodoList)
router.put("/delete/todo/:id", deleteTodoList)
router.put("/status/todo/:id", isDonelistcha)
router.get("/get/:year/:month", getByDateandPagination)




module.exports = router