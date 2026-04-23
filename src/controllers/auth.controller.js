import { doLogin, registerUser } from "../services/auth.service.v1.js";
 
const login = async (req, res) => {
    try {
        const token = await doLogin(req.body);
        res.status(200).json(token);
    } catch (e) {
        res.status(e.code || 401).json({ message: e.message });
    }
};
 
const registrar = async (req, res) => {
    try {
        const usuarioNuevo = await registerUser(req.body);
        res.status(201).json(usuarioNuevo);
    } catch (e) {
        res.status(e.code || 400).json({ message: e.message });
    }
};

export { login, registrar };
