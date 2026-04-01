import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db, generateId } from "../../config/db.js";

export const register = (req, res) => {
    const { name, username, email, password } = req.body;

    // Verificar email o username duplicado
    const existingUser = db.users.find(
        u => u.email === email || u.username === username
    );

    if (existingUser) {
        return res.status(400).json({ message: "Email o username ya existe" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = {
        id: generateId(),
        name,
        username,
        email,
        password: hashedPassword,
        role: "plus" // por defecto
    };

    db.users.push(newUser);

    return res.status(201).json({
        message: "Usuario registrado",
        userId: newUser.id
    });
};

export const login = (req, res) => {
    const { email, password } = req.body;

    const user = db.users.find(u => u.email === email);
    if (!user) {
        return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const passOk = bcrypt.compareSync(password, user.password);
    if (!passOk) {
        return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return res.json({ token });
};