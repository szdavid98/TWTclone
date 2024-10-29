import { response } from "express";
import User from "../MongoModels/userModel.js";
import { generateTokenAndSetCookie } from "../lib/utls/gensessiontoken.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const reqacc = async (req, res) => {

	try {
		const {username, fullName,email, password} = req.body
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!username ||!fullName||!email||!password){
            return res.status(400).json({error:"Kérlek adj meg minden mezőt."})
        }
		if (!emailRegex.test(email)) {
			return res.status(400).json({ error: "Nem megfelelő email formátum" });
		}

		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ error: "A felhasználónév már foglalt" });
		}
		if(password.length <= 6){
			return res.status(400).json({ error: "A jelszónak több, mint 6 karakternek kell lennie" });
		}
		if(!fullName){
			return res.status(400).json({ error: "Add meg a neved" });
		}

		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.status(400).json({ error: "Email is already taken" });
		}
		
        const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		
		const newReq = new User({
			username,
            password: hashedPassword,
            fullName,
            email
            
		});

		if (newReq) {
			generateTokenAndSetCookie(newReq._id,res)
			await newReq.save();

			res.status(201).json({
				fullName,
				username,
				email,
				id: newReq._id,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in request controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const login = async (req, res) => {
    
		try {
			const { username, password } = req.body;
			const user = await User.findOne({ username });
			const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
	
			if (!user || !isPasswordCorrect) {
				return res.status(400).json({ error: "Invalid username or password" });
			}
	
			console.log('eddig jó')
			generateTokenAndSetCookie(user._id,res)
			
			res.status(200).json({
				_id: user._id,
				fullName: user.fullName,
				username: user.username,
				
			});
		} catch (error) {
			console.log("Error in login controller", error.message);
			res.status(500).json({ error: "Internal Server Error" });
		}
};

export const logout = async (req,res) =>{
	try {
		res.cookie("jwt","",{maxAge:0});
		res.status(200).json({message:"Sikeres kijelentkezés"})
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
		
	}
}

export const getMe = async(req,res)=>{
	try {
		const user = await User.findById(req.user._id).select("-password");
		res.status(200).json(user);
	} catch (error) {
		console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
		
	}
}
	