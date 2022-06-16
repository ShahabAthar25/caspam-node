export const homeView = (req, res) => {
  res.render("faculty");
};

export const createFaculty = async (req, res) => {
  res.send(req.user);
};
