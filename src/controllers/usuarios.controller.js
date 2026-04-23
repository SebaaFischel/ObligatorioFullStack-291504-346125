import { upgradePlan } from "../services/usuarios.service.v1.js";

const cambiarPlan = async (req, res) => {
    try {
        const result = await upgradePlan(req.idUsu);
        res.status(200).json(result);
    } catch (e) {
        res.status(e.code || 400).json({ message: e.message });
    }
};

export { cambiarPlan };
