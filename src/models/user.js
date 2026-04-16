import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true
		},
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true
		},
		password: {
			type: String,
			required: true
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user"
		},
		plan: {
			type: String,
			enum: ["plus", "premium"],
			default: "plus"
		}
	},
	{
		timestamps: true,
		collection: "usuarios"
	}
);
const User = mongoose.model("User", userSchema);
export default User;