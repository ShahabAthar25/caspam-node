const jwt = require("jsonwebtoken");

export default function (req, res, next) {
  // getting the token from the request
  const authHeader = req.header("Authorization");

  // splitting token into two parts to seprate the "Bearer" part and
  // selecting the token
  const token = authHeader && authHeader.split(" ")[1];

  // if token is none then sending a 401(Unauthorized) response
  if (!token) return res.status(401).json("Access denied");

  // verifying token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    // if any error then sending a 403(forbidden) response
    if (err) return res.sendStatus(403);

    // setting a user propertie of req
    req.user = user;

    // telling the server to perform the next command
    next();
  });
}
