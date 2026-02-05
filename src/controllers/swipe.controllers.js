import Swipe from "../models/Swipe.model.js";
import Match from "../models/Match.model.js";
import mongoose from "mongoose";

export const swipeUser = async (req, res) => {
    try {
        const { toUserId, type } = req.body;

        const targetUser = new mongoose.Types.ObjectId(toUserId);

        await Swipe.create({
            fromUser: req.user._id,
            toUser: targetUser,
            type
        });

        if (type === "like") {
            const reverseLike = await Swipe.findOne({
                fromUser: targetUser,
                toUser: req.user._id,
                type: "like"
            });

            if (reverseLike) {
                const match = await Match.create({
                    users: [req.user._id, targetUser]
                });

                return res.json({
                    matched: true,
                    match
                });
            }
        }

        res.json({ matched: false });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
