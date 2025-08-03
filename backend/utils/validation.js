const Joi = require("@hapi/joi");

const bookValidation = Joi.object({
  bookName: Joi.string().min(3).max(30).required(),
  author: Joi.string().email().required(),
  publishedDate: Joi.date().optional(),
  numberPages: Joi.number().integer().optional(),
});

const userValidation = Joi.object({
  userName: Joi.string().min(3).max(30).required(),
  userSurname: Joi.string().min(3).max(30).required(),
  userAge: Joi.number().required()
});

module.exports = {
  bookValidation,
  userValidation,
};
