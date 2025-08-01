const Joi = require("@hapi/joi");

const bookValidation = Joi.object({
  bookName: Joi.string().min(3).max(30).required(),
  author: Joi.string().email().required(),
  publishedDate: Joi.date().optional(),
  numberPages: Joi.int().optional(),
});

const groupValidation = Joi.object({
  bookName: Joi.string().min(3).max(30).required(),
  userName: Joi.string().min(3).max(30).required(),
});

module.exports = {
  bookValidation,
  groupValidation,
};
