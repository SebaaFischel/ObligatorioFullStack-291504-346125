import User from "../models/user.js";

export const upgradePlan = async (userId) => {

    const user = await User.findById(userId);

    if (!user) throw new Error("Usuario no encontrado");
    if (user.role !== "user") throw new Error("Solo se pueden gestionar planes de usuarios regulares");
    if (user.plan === "premium") throw new Error("El usuario ya es premium");

    user.plan = "premium";
    await user.save();
    return {
        message: `El usuario ${user.username} ahora es Premium`,
        plan: user.plan
    };
};