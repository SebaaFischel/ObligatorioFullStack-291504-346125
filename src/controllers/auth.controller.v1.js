import { doLogin, registerUser } from "../services/auth.service.v1.js";
 
export const login = async (req, res) => {
    try {
        const token = await doLogin(req.body);
        res.status(200).json(token);
    } catch (e) {
        res.status(401).json({ message: e.message });
    }
};
 
export const register = async (req, res) => {
    try {
        const newUser = await registerUser(req.body);
        res.status(201).json(newUser);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};
 