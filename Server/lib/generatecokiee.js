import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateCookie = (existingUser, res) => {
    if (!existingUser || !existingUser._id) {
        throw new Error("existingUser is undefined or missing required fields");
    }

    const token = jwt.sign(
        { existingUserId: existingUser._id, role: existingUser.role },
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


export default generateCookie;