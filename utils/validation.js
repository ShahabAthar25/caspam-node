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
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

export const createFacultyValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    degree: Joi.string().required(),
    facebook: Joi.string().required(),
    twitter: Joi.string().required(),
    linkedin: Joi.string().required(),
    email: Joi.string().required().email(),
    image: Joi.string().required(),
  });

  return schema.validate(data);
};

export const createGalleryMomentValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
  });

  return schema.validate(data);
};

export const createFacilityValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    snippet: Joi.string().required().max(200),
    description: Joi.string().required(),
    image: Joi.string().required(),
  });

  return schema.validate(data);
};

export const createBlogValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    snippet: Joi.string().required().max(200),
    body: Joi.string().required(),
    image: Joi.string().required(),
    category: Joi.string()
      .required()
      .valid(
        "maths",
        "sports",
        "announcement",
        "message",
        "health",
        "syllabus",
        "undergraduat",
        "masters",
        "phd"
      ),
  });

  return schema.validate(data);
};
