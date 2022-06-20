import Facility from "../models/Facility.js";

export const facilityView = async (req, res) => {
  try {
    res.send("Hello World");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const facilityDetailView = async (req, res) => {
  try {
    res.send("Hello World");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createFacility = async (req, res) => {
  try {
    res.send("Hello World");
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updateFacility = async (req, res) => {
  try {
    res.send("Hello World");
  } catch (error) {
    res.status(500).json(error);
  }
};
export const deleteFacility = async (req, res) => {
  try {
    // finding facility
    const facility = await Facility.findById(req.params.id);

    // if facility does not exist then returning a 404(object not found) error
    if (!facility) return res.status(404).json("No faculty found");

    await faculty.deleteOne();

    res.json("Facility successfully deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
