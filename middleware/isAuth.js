const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const bearerToken = req.get("Authorization"); //Bearer Token
  if (!bearerToken) {
    const error = new Error("No Authorization Token Found!");
    error.status = 401;
    throw error;
  }
  const authTokenArr = bearerToken.split(" ");
  const authToken = authTokenArr[1];  //Auth Token

  if(authTokenArr[0] !== 'Bearer'){
    const error = new Error("Please add Prefix 'Bearer' in AuthToken.");
    error.status = 422;
    throw error;
  }

  let decodedToken = null;
  try {
    decodedToken = jwt.verify(
      authToken,
      "secretPassword&re7%efer45%$hhk55hj&*nbb4f$f00@99fsae;"
    );
  } catch (err) {
    err.status = 401;
    throw err;
  }
  // if (!decodedToken) {
  //   const error = new Error("Invalid Authorization Token!");
  //   error.status = 401;
  //   throw error;
  // }
  req.userId = decodedToken.userId;
  req.userEmail = decodedToken.email;
  next();
};
