import joi from 'joi';
import { USER_TYPES } from '../../constants/authConstants.js';
import { convertObjectToEnum } from '../common.js';


// Validation of keys and properties of user
export default  joi.object({
  username: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  isActive: joi.boolean(),
  shippingAddress: joi.array().items(joi.object()),
  wishlist: joi.array().items(joi.object()),
  userType: joi.number().allow(0),
  mobileNo: joi.number().allow(0),
  resetPasswordLink: joi.object({
    code: joi.string(),
    expireTime: joi.date().options({ convert: true }),
  }),
}).unknown(true);

// Validation keys and properties of user for updation
export const updateSchemaKeys = joi.object({
  username: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  isActive: joi.boolean(),
  shippingAddress: joi.array().items(joi.object()),
  wishlist: joi.array().items(joi.object()),
  userType: joi.number().allow(0),
  mobileNo: joi.number().allow(0),
  resetPasswordLink: joi.object({
    code: joi.string(),
    expireTime: joi.date().options({ convert: true }),
  }),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
}).unknown(true);
