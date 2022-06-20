export const aboutView = (req, res) => {
  try {
    const active = "about";

    res.render("about/about", { active });
  } catch (error) {
    res.status(500).json(error);
  }
};
