const Joi = require("joi");


const addTodoValidator = Joi.object({
  title: Joi.string().alphanum().required(),
  isDeleted: Joi.boolean().required(),
  isDone:Joi.boolean().required()
});




module.exports = {
  addTodoValidator
};
