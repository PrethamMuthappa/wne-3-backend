const joi = require('joi');

const USER_TYPES = require('../../constants/authConstants');
const convertObjectToEnum = require('../common');


// validation of keys and propertites of user
exports.schemaKeys = joi.object({
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
      code:joi.string(),
      expireTime:joi.date().options({ convert: true })
    })
  }).unknown(true);
  

  /** validation keys and properties of user for updation */
exports.updateSchemaKeys = joi.object({
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
      code:joi.string(),
      expireTime:joi.date().options({ convert: true })
    }),
    _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
  }).unknown(true);