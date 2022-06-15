import Joi from "@hapi/joi";

export const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(60),
    email: Joi.string().required().min(3).max(60).email(),
    password: Joi.string().required().min(8),
  });

  return schema.validate(data);
};

export const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  });

  return schema.validate(data);
};
