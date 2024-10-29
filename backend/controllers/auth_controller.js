import { generateTokenAndSetCookie,generateTokenAndSet2FACookie } from "../lib/utils/generateToken.js";
import User from "../models/user.model.js";
import reqa from "../models/requestacc.model.js";
import bcrypt from "bcryptjs";
import { sendmail } from "../email/email.sender.js";
import jwt from "jsonwebtoken";
import ffamod from "../models/gen.token.model.js";


/*export const signup = async (req, res) => {

	try {
		const {username, fullName,password,email} = req.body
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ error: "Invalid email format" });
		}

		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ error: "Username is already taken" });
		}

		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.status(400).json({ error: "Email is already taken" });
		}

		if (password.length < 6) {
			return res.status(400).json({ error: "Password must be at least 6 characters long" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			fullName,
			username,
			email,
			password: hashedPassword,
		});

		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();
			sendmail(newUser.email);

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				email: newUser.email,
				followers: newUser.followers,
				following: newUser.following,
				profileImg: newUser.profileImg,
				coverImg: newUser.coverImg,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};*/

export const login = async (req, res) => {
    
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		
		sendmail(user.email, user._id)
		generateTokenAndSet2FACookie(user._id,res)

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			email: user.email,
			followers: user.followers,
			following: user.following,
			profileImg: user.profileImg,
			coverImg: user.coverImg,
			required: true
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
export const loginFAcheck = async (req, res) => {
    
	try {
		const { code } = req.body;
		console.log(code)
		const tokenId = req.cookies.FAjwt
		const tokenIdDecoded = jwt.verify(tokenId, process.env.JWT_SECRET)
		const user = await ffamod.findById(tokenIdDecoded.userId);
		console.log('egy ujabb faszsag',user._id.toString())

		if (user.code != code) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		
		res.cookie("FAjwt", "", { maxAge: 0 });
		generateTokenAndSetCookie(user._id,res)
		
		res.status(200).json({
			_id: user.userId,
		})
		console.log('eddig megvagyunk')

		
	} catch (error) {
		console.log("Error in login controller2FA", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
export const loginFA = async (req, res) => {
    try {
		console.log(req.cookies.FAjwt)
		const token = req.cookies.FAjwt;
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		console.log('még ez is megvan')
		const user = await User.findById(decoded.userId);
		console.log('ez mar nincs meg', decoded)
		res.status(200).json(user);
	} catch (error) {
		console.log("Error in login2FAshit controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
	/*try {
		const token = req.cookie.FAjwt;
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		const user = await User.findById(decoded);
		

		if (!user) {
			return res.status(400).json({ error: "Not good" });
		}

		

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			email: user.email,
			followers: user.followers,
			following: user.following,
			profileImg: user.profileImg,
			coverImg: user.coverImg,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}*/
};

export const logout = async (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.cookie("FAjwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const getMe = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select("-password");
		res.status(200).json(user);
	} catch (error) {
		console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const reqacc = async (req, res) => {

	try {
		const {username, fullName,email, message, role} = req.body
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ error: "Invalid email format" });
		}

		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ error: "M identifier is already in use" });
		}
		if(!role){
			return res.status(400).json({ error: "Need to choose a role" });
		}
		if(!fullName){
			return res.status(400).json({ error: "Need to add your name" });
		}

		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.status(400).json({ error: "Email is already taken" });
		}
		if(!message){
			return res.status(400).json({error:"Reason must beclarified"})
		}



		const newReq = new reqa({
			email: email,
			mazon: username,
			message: message,
			fname: fullName,
			role: role,
		});

		if (newReq) {
			
			await newReq.save();

			res.status(201).json({
				message:'Sikeresen elküldve'
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in request controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}