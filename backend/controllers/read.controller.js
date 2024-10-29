import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";

import bcrypt from "bcryptjs";

export const recieveDataReader = async (req, res) => {
    const {message} = req.body;
	try {
        console.log(message)
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message:"Megvan" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error-Nincs meg :(" });
	}
};



