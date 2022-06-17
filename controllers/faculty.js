import Faculty from "../models/Faculty.js";
import { createFacultyValidation } from "../utils/validation.js";

export const homeView = (req, res) => {
  res.render("faculty");
};

export const createFaculty = async (req, res) => {
  // Validating Request
  const { error } = createFacultyValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  try {
    // creating faculty
    const newFaculty = new Faculty({
      name: req.body.name,
      degree: req.body.degree,
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      linkedin: req.body.linkedin,
      email: req.body.email,
      image: req.body.image,
    });

    // saving faculty to database and storing it in an variable
    const faculty = await newFaculty.save();

    // returning faculty to user
    res.json(faculty);
  } catch (error) {
    res.status(500).json(error);
  }
};
