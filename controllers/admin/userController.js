import asyncHandler from 'express-async-handler';
import UserSchema from '../../models/user';
import IdValidate from '../../utils/validation/idValidation';

/**
 * @description : List all users present in the database
 * @access: private
 * @param {object} req: request for all users
 * @param {object} res: response for all users
 * @return {object} : response for all users {status, message, data}
 */
export const getAllUser = asyncHandler(async (req, res) => {
    try {
        const [count, result] = await Promise.all([
            UserSchema.countDocuments(),
            UserSchema.find().select(['-refreshToken', '-loginReactiveTime'])
        ]);
        res.json({
            count,
            data: result
        });
    } catch (error) {
        throw new Error(error);
    }
});

/**
 * @description : Get a single user by id
 * @access: private
 * @param {object} req: request for a single user id
 * @param {object} res: response for a single user
 * @return {object} : response for a single user {status, message, data}
 */
export const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    IdValidate(id);
    const result = await UserSchema.findById(id);
    if (!result) {
        throw new Error('Records not found');
    }
    res.json({
        data: result
    });
});

/**
 * @description : Delete user from the database
 * @access: private
 * @param {object} req: request for user deletion
 * @param {object} res: response for user deletion
 * @return {object} : response for user deletion {status, message, data}
 */
export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    IdValidate(id);
    const result = await UserSchema.findByIdAndDelete(id);
    if (!result) {
        throw new Error('Records not found');
    }
    res.json({
        message: 'User deleted successfully'
    });
});

/**
 * @description : Update user
 * @access: public
 * @param {object} req: request for updating user
 * @param {object} res: response for update
 * @return {object} : response for update {status, message, data}
 */
export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    IdValidate(id);
    try {
        const result = await UserSchema.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );
        res.json({
            data: result
        });
    } catch (error) {
        throw new Error(error);
    }
});
