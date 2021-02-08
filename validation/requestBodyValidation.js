const {
    Joi
} = require('celebrate');

const loginSchema = {
    body: {
        username: Joi.string().required(),
        password: Joi.string().required()
    }
};

const userSchema = {
    body: {
        firstName: Joi.string().required(),
        password: Joi.required(),
        mobile: Joi.string().length(12).required(),
        emailId: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        companyId: Joi.number(),
        isActive: Joi.boolean(),
        managerId: Joi.number(),
        area: Joi.string().required(),
        landmark: Joi.string().required(),

    }
};
const userRoleSchema = {
    body: {
        username: Joi.required(),
        password: Joi.required()
    }
};

const categorySchema={
    body:{
        id:Joi.number().required(),
        name:Joi.required(),
        cgst:Joi.number().required(),
        sgst:Joi.number().required(),
    }
}
const shopSchema={
    body:{
        id:Joi.number().required(),
        name:Joi.required(),
        cgst:Joi.number().required(),
        sgst:Joi.number().required(),
    }
}

module.exports = {
    loginSchema,
    userSchema,
    userRoleSchema
}