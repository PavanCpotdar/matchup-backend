import mongoose from "mongoose";


const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    age: {
        type: {
            type: Number,
            min: 18
        }
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    interestedIn: {
        type: String,
        enum: ["male", "female", "both"]
    },
    bio: {
        type: String,
        maxLength: 300
    },
    photos: [
        {
            type: String
        }
    ]

},
    { timestamps: true }
);

export default mongoose.model("profile", profileSchema)