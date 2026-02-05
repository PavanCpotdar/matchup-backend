import mongoose from "mongoose";

const swipeSchema = new mongoose.Schema(
    {
        fromUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        toUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        type: {
            type: String,
            enum: ["like", "dislike"],
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model('Swipe', swipeSchema);