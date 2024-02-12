const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized. Token not provided." });
    }

    // Assuming token is in the format "Bearer <jwtToken>"
    const jwtToken = token.replace(/^Bearer\s+/, "");

    // Verifying the token
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    // Getting the complete user details & also we don't want password to be sent
    const userData = await User.findOne({ email: isVerified.email }).select("-password");

    if (!userData) {
      return res.status(401).json({ message: "Unauthorized. User not found." });
    }

    req.token = jwtToken;
    req.user = userData;
    req.userID = userData._id;

    // Move on to the next middleware or route handler
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports = authMiddleware;






// const jwt = require("jsonwebtoken");
// const User = require("../models/user-model");

// const authMiddleware = async (req, res, next) => {
//   const token = req.header("Authorization");

//   if (!token) {
//     // If you attempt to use an expired token, you'll receive a "401 Unauthorized HTTP" response.
//     return res
//       .status(401)
//       .json({ message: "Unauthorized HTTP, Token not provided" });
//   }

//   // Assuming token is in the format "Bearer <jwtToken>, Removing the "Bearer" prefix"
//   const jwtToken = token.replace("Bearer", "").trim();
//   console.log("token form auth middleware", jwtToken);

//   try {
//     const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

//     const userData = await User.findOne({ email: isVerified.email }).select({
//       password: 0,
//     });
//     console.log(userData);

//     req.user = userData;
//     req.token = token;
//     req.userID = userData._id;

//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized. Invalid token." });
//   }
// };

// module.exports = authMiddleware;
