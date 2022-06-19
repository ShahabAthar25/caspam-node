import Faculty from "../models/Faculty.js";
import { createFacultyValidation } from "../utils/validation.js";

export const homeView = async (req, res) => {
  try {
    const active = "faculty";
    const facultyMembers = await Faculty.find();

    res.render("faculty", { facultyMembers, active });
  } catch (error) {
    res.status(500).json(error);
  }
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

export const updateFaculty = async (req, res) => {
  try {
    // finding faculty
    const faculty = await Faculty.findById(req.params.id);

    // if faculty does not exist then returning a 404(object not found) error
    if (!faculty) return res.status(404).json("No faculty member found");

    // updating faculty member
    await faculty.updateOne({
      $set: req.body,
    });

    res.json("Faculty member updated successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteFaculty = async (req, res) => {
  try {
    // finding faculty
    const faculty = await Faculty.findById(req.params.id);

    // if faculty does not exist then returning a 404(object not found) error
    if (!faculty) return res.status(404).json("No faculty found");

    await faculty.deleteOne();

    res.json("faculty member successfully deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
