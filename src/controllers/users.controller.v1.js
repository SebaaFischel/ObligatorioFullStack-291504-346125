import { upgradePlan } from "../services/users.service.v1.js";

export const cambiarPlan = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await upgradePlan(id);
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};