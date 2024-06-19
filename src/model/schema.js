import Joi from "joi";

export const schema = Joi.object({
    title: Joi.string()
        .min(3)
        .required()
        .max(30),
    description: Joi.string()
        .min(3)
        .max(30)
        .required()
})