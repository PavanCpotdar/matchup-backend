import Profile from "../models/Profile.model.js";
import Swipe from "../models/Swipe.model.js";

export const discoverUsers = async (req, res) => {
    try {
        const myProfile = await Profile.findOne({ userId: req.user._id });

        if (!myProfile) {
            return res.status(400).json({ message: "Complete your profile first" });
        }

        const swipes = await Swipe.find({ fromUser: req.user._id }).select("toUser");

        const swipedUserIds = swipes.map(s => s.toUser);

        const profiles = await Profile.find({
            userId: {
                $nin: [...swipedUserIds, req.user._id]
            },
            gender:
                myProfile.interestedIn === "both"
                    ? { $in: ["male", "female", "other"] }
                    : myProfile.interestedIn
        }).populate("userId", "name email");

        res.json(profiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
