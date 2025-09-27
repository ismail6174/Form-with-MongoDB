// middleware/tokenVerify.js
import jwt from "jsonwebtoken";

export const tokenVerify = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);

      if (!verify) {
        return res.status(402).json({
          message: "Token unauthorized",
          status: false,
        });
      }

      // Save user id in request so controllers can use it
      req.userId = verify.id;
      next();
    } else {
      res.status(403).json({
        message: "JWT not provided",
      });
    }
  } catch (error) {
    res.status(403).json({
      message: error.message,
    });
  }
};






// import jwt from "jsonwebtoken";

// export const tokenVerify = async (req, res, next) => {
//   try {
//     if (req.headers.authorization) {
//       const token = req.headers.authorization.split(" ")[1];
//       console.log(token);

//       const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);

//       console.log(verify);

//       if (!verify) {
//         res.status(402).json({
//           message: "Token unauthorized",
//           status: false,
//         });
//       } else {
//         next();
//       }
//     } else {
//       res.status(403).json({
//         message: "JWT not provided",
//       });
//     }
//   } catch (error) {
//     res.status(403).json({
//       message: error,
//     });
//   }
// };