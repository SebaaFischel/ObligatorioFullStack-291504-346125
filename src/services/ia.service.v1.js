import { GoogleGenerativeAI } from "@google/generative-ai";

const mejorarReseña = async (reseñaOriginal) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",

        systemInstruction: "Eres un editor de reseñas para una app de películas. Tu objetivo es recibir una reseña amateur y devolver una versión mejorada, concisa y elegante. No añadas explicaciones, solo devuelve la nueva reseña.",
        requestOptions: {
            timeout: 10,
        }
    });

    try {
        const prompt = `Embellece esta reseña: "${reseñaOriginal}"`;
        const result = await model.generateContent(prompt);
        const reseñaMejorada = result.response.text().trim();

        return { reseñaOriginal, reseñaMejorada };
    } catch (e) {
        if (e.message.includes("404")) {
            throw new Error("El modelo 'gemini-2.5-flash-lite' no está disponible en esta cuenta. Usa 'gemini-1.5-flash' para que funcione.");
        }
        throw e;
    }
};

export { mejorarReseña };
