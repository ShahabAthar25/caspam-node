import Gallery from "../models/Gallery.js";
import { createGalleryMomentValidation } from "../utils/validation.js";

export const galleryView = async (req, res) => {
  try {
    const active = "gallery";
    const galleryMoments = await Gallery.find();

    res.render("gallery/gallery", { galleryMoments, active });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createMoment = async (req, res) => {
  // Validating Request
  const { error } = createGalleryMomentValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  try {
    // not allowing user to create moments with duplicate titles
    const titleExist = await Gallery.findOne({ title: req.body.title });
    if (titleExist) return res.status(400).json("Title already exist");

    // not allowing user to create moments with duplicate images
    const imageExist = await Gallery.findOne({ image: req.body.image });
    if (imageExist) return res.status(400).json("Image already exist");

    // creating gallery moment
    const newMoment = new Gallery({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
    });

    // saving moment to database and storing it in an variable
    const moment = await newMoment.save();

    // returning moment to user
    res.json(moment);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updateMoment = async (req, res) => {
  try {
    // finding gallery moment
    const gallery = await Gallery.findById(req.params.id);

    // if gallery moment does not exist then returning a 404(object not found) error
    if (!gallery) return res.status(404).json("No gallert moment found");

    // checking if user is changing the title
    if (req.body.title) {
      // not allowing user to create moments with duplicate titles
      const titleExist = await Gallery.findOne({ title: req.body.title });
      if (titleExist) return res.status(400).json("Title already exist");
    }

    // checking if user is changing the image
    if (req.body.image) {
      // not allowing user to create moments with duplicate images
      const imageExist = await Gallery.findOne({ image: req.body.image });
      if (imageExist) return res.status(400).json("Image already exist");
    }

    // updating gallery moment
    await gallery.updateOne({
      $set: req.body,
    });

    res.json("Gallery moment updated successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
export const deleteMoment = async (req, res) => {
  try {
    // finding gallery moment
    const moment = await Gallery.findById(req.params.id);

    // if faculty does not exist then returning a 404(object not found) error
    if (!moment) return res.status(404).json("Gallery moment not found");

    await moment.deleteOne();

    res.json("Gallery moment successfully deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
