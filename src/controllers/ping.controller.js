const pong = (req, res) => {
    res.status(200).json({ message: "pong" });
};

export { pong };