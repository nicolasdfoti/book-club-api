const Joi = require("@hapi/joi");

const bookValidation = Joi.object({
  bookName: Joi.string().min(3).max(30).required(),
  author: Joi.string().required(),
  publishedDate: Joi.date().optional(),
  numberPages: Joi.number().integer().optional(),
});

const userValidation = Joi.object({
  userName: Joi.string().min(3).max(30).required(),
  userSurname: Joi.string().min(3).max(30).required(),
  userAge: Joi.number().required(),
});

const bookGroupValidation = Joi.object({
  groupName: Joi.string().min(3).max(30).required(),
  groupDescription: Joi.string().min(3).max(100).optional(),
  bookName: Joi.string().min(3).max(30).required(),
  groupMembers: Joi.array().items(Joi.string().required()).optional(),
});

const bookGroupCommentValidation = Joi.object({
  commentText: Joi.string().min(1).max(500).required(),
  userName: Joi.string().min(3).max(30).required(),
  bookGroupId: Joi.string().required(),
  commentDate: Joi.date().optional(),
});

module.exports = {
  bookValidation,
  userValidation,
  bookGroupValidation,
  bookGroupCommentValidation,
};
