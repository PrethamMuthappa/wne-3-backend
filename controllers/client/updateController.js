import asyncHandler from 'express-async-handler';
import UserSchema from '../../models/user';
import IdValidate from '../../utils/validation/idValidation';

/**
 * @description : User update 
 * @access: public
 * @param {object} req: request for update
 * @param {object} res: response for update
 * @return {object} : response for update {status, message, data}
 */
export const update = asyncHandler(async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    const data = req.body;

    IdValidate(id);

    try {
        if (id == user.id && !data.hasOwnProperty('userType')) {
            const result = await UserSchema.findByIdAndUpdate(
                id,
                data,
                { new: true }
            );

            res.json({
                data: result
            });
        } else {
            res.json({
                message: 'Forbidden'
            });
        }
    } catch (error) {
        throw new Error(error);
    }
});

export default {
    update
};
