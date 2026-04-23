import { mejorarReseña } from "../services/ia.service.v1.js";

const optimizarReseña = async (req, res) => {
    try {
        const { reseña } = req.body;
        if (!reseña) {
            return res.status(400).json({ message: "La reseña es requerida" });
        }
        const resultado = await mejorarReseña(reseña);
        res.status(200).json(resultado);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export { optimizarReseña };
