// import jwt from "jsonwebtoken";
// import User from "../models/User.model.js";

// const authMiddleware = async (req, res, next) => {
//     try {
//         // read token from cookies

//         const token = req.cookies.token;

//         if (!token) {
//             return res.status(401).json({
//                 message: " authorization denied"
//             });
//         }
//         // verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);


//         const user = await User.findById(decoded.userId);

//         if (!user) {
//             return res.status(401).json({
//                 message: "authorization denied"
//             });
//         }
//         req.user = user;
//         next();
//     } catch (error) {
//         res.status(401).json({
//             message: "authorization denied"
//         });
//     }
// };


// export default authMiddleware


import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "authorization denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "authorization denied" });
    }
};

export default authMiddleware;
