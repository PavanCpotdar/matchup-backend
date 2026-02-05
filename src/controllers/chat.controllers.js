import Message from "../models/Message.model.js";

export const getMessages = async (req, res) => {
    const { matchId } = req.params;

    const messages = await Message.find({ matchId })
        .populate("sender", "name")
        .sort("createdAt");

    res.json(messages);
};

export const sendMessage = async (req, res) => {
    const { matchId } = req.params;
    const { text } = req.body;

    const message = await Message.create({
        matchId,
        sender: req.user._id,
        text
    });

    res.status(201).json(message);
};
