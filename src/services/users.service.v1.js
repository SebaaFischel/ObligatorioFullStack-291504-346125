import User from "../models/user.js";

export const upgradePlan = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("Usuario no encontrado");
    if (user.plan === "premium") throw new Error("Ya tienes contratado el plan Premium");
    user.plan = "premium";
    await user.save();
    return {
        message: `¡Felicidades ${user.username}! Ahora eres un usuario Premium.`,
        plan: user.plan
    };
};