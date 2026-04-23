import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        res.status(401).json({ message: "Token no enviado" })
        return;
    }
    try {
        const tokenUsu = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.idUsu = tokenUsu.idUsu
        req.rolUsu = tokenUsu.rolUsu
        next()
    } catch (e) {
        res.status(401).json({ message: "Token invalido" })
    }
}
export { authMiddleware }