import Gallery from "../models/Gallery.js";

export const galleryView = async (req, res) => {
  try {
    const galleryMoments = await Faculty.find();

    res.render("gallery", { galleryMoments });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createMoment = async (req, res) => {
  res.send("Hello World");
};
export const updateMoment = async (req, res) => {
  res.send("Hello World");
};
export const deleteMoment = async (req, res) => {
  res.send("Hello World");
};
