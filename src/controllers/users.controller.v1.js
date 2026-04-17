import { upgradePlan } from "../services/users.service.v1.js";

export const cambiarPlan = async (req, res) => {
    try {
        const result = await upgradePlan(req.idUsu);
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};