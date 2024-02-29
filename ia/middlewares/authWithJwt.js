const jwt = require("jsonwebtoken");

const authWithJwtMiddleware = (req, res, next) => {
  const token = req.body.jwt;

  if (!token) {
    res.json({ message: "blabla pas de jwt" });
  }

  try {
    const isValidJwt = jwt.verify(token, process.env.SECRET_JWT);
    if (isValidJwt) {
      const payload = jwt.decode(token);
      req.email = payload.email;
      next();
    } else {
      res.json({ message: "Route protégée", error: true });
    }
  } catch (error) {
    res.json({ message: "bad auth" });
  }
};

module.exports = authWithJwtMiddleware;
