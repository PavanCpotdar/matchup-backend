import Message from "../models/Message.model.js";

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            matchId: req.params.id
        }).sort({ createdAt: 1 });

        res.json(messages);   // ✅ MUST be ARRAY
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const message = await Message.create({
            matchId: req.params.id,
            sender: req.user._id,
            text: req.body.text
        });

        res.json(message);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
