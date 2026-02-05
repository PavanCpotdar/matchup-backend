import Profile from "../models/Profile.model.js";

/* create or update user profile */
export const upsertProfile = async (req, res) => {
    try {
        const profile = await Profile.findOneAndUpdate(
            { userId: req.user._id },
            { ...req.body, userId: req.user._id },
            { new: true, upsert: true }
        );
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/* get user profile */
export const getMyProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({
            userId: req.user._id
        });
        res.json(profile);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};