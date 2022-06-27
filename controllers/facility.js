import Facility from "../models/Facility.js";
import { createFacilityValidation } from "../utils/validation.js";

export const facilityView = async (req, res) => {
  try {
    const active = "facility";
    const facilities = await Facility.find();

    res.render("facility/facility", { facilities, active });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const facilityDetailView = async (req, res) => {
  try {
    const active = "facility";
    const facility = await Facility.findById(req.params.id);

    res.render("facility/facilityDetail", { facility, active });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createFacility = async (req, res) => {
  // Validating Request
  const { error } = createFacilityValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  try {
    // creating facility
    const newFacility = new Facility({
      title: req.body.title,
      snippet: req.body.snippet,
      description: req.body.description,
      image: req.body.image,
    });

    // saving facility to database and storing it in an variable
    const facility = await newFacility.save();

    // returning facility to user
    res.json(facility);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updateFacility = async (req, res) => {
  try {
    // finding facility
    const facility = await Facility.findById(req.params.id);

    // if faculty does not exist then returning a 404(object not found) error
    if (!facility) return res.status(404).json("No facility found");

    // updating faculty member
    await facility.updateOne({
      $set: req.body,
    });

    res.json("Facility updated successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
export const deleteFacility = async (req, res) => {
  try {
    // finding facility
    const facility = await Facility.findById(req.params.id);

    // if facility does not exist then returning a 404(object not found) error
    if (!facility) return res.status(404).json("No facility found");

    await faculty.deleteOne();

    res.json("Facility successfully deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
