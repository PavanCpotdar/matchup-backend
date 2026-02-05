export const getMe = async (req, res) => {
    try {
        res.json({
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                createAt: req.user.createdAt,
            }
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}