const Joi = require('@hapi/joi');
// const { globalConstants, mt5Constants } = require('ms-constants');

// MT5 Schema for update MT5 accounts
const userPasswordSchema = Joi.object().keys({
  password: Joi.string().required(),
  username: Joi.string().required()
});

const userCreateSchema = Joi.object().keys({
  password: Joi.string().optional(),
  username: Joi.string().required(),
  full_name: Joi.string().required(),
  last_name: Joi.string().required(),
  first_name: Joi.string().required(),
  phone: Joi.string().required(),
  role_id: Joi.number().required(),
  avatar: Joi.string().required(),
  department_id: Joi.number().required(),
});

const userUpdateSchema = Joi.object().keys({
  // password: Joi.string().required(),
  username: Joi.string().required(),
  full_name: Joi.string().required(),
  last_name: Joi.string().required(),
  first_name: Joi.string().required(),
  phone: Joi.string().required(),
  role_id: Joi.number().required(),
  avatar: Joi.string().required(),
  department_id: Joi.number().required(),
});

const userDeleteSchema = Joi.object().keys({
  username: Joi.string().required()
});


module.exports = {
  userPasswordSchema,
  userCreateSchema,
  userUpdateSchema,
  userDeleteSchema
}
