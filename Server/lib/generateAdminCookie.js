import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateAdminCookie = (existingAdmin, res) => {
    if (!existingAdmin || !existingAdmin._id) {
        throw new Error("existingAdmin is undefined or missing required fields");
    }

    const token = jwt.sign(
        { existingAdminId: existingAdmin._id, role: existingAdmin.role },
        process.env.JWT_SECRET,
        { expiresIn: "15d" }
    );

    res.cookie("jwtToken", token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
    });

    return token;
};


export default generateAdminCookie;