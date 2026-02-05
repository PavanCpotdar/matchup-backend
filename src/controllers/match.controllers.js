import Match from "../models/Match.model.js";
import User from "../models/User.model.js"; // 👈 REQUIRED

export const getMyMatches = async (req, res) => {
    try {
        const matches = await Match.find({
            users: req.user._id
        }).populate("users", "name email");

        res.json(matches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
