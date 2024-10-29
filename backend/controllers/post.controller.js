/*import Notification from "../models/notification.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";*/
import Cikk from "../models/mongoModel.js";

/*export const createPost = async (req,res)=>{
    try {
        const {text} = req.body;
        let {img} = req.body;
        const userId = req.user._id.toString();
        const user = await User.findById(userId);
        if(!user) return res.status(400).json({message:"User not found"});
        if (!text && !img){
            return res.status(400).json({message: "Post must have text or Img"})
        }
        if(img){
            const uploadedResponse = await cloudinary.uploader.upload(img)
            img = uploadedResponse.secure_url;
        }
        const newPost =new Post({
            user: userId,
            text,
            img
        })

        await newPost.save()
        return res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
		console.log("Error in createPost controller: ", error);
    }
}

export const deletePost = async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(401).json({message:"Post not found"})
        if (post.user.toString() !== req.user._id.toString()){
            return res.status(401).json({message: "You dont have right to delete this post."})
        }
        if (post.img) {
			const imgId = post.img.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(imgId);
		}

		await Post.findByIdAndDelete(req.params.id);

		res.status(200).json({ message: "Post deleted successfully" });
	} catch (error) {
		console.log("Error in deletePost controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
    

}

export const commentOnPost = async (req,res)=>{
    try {
        const {text} = req.body;
        const userId = req.user._id;
        const postId = req.params.id
        if (!text){
            return res.status(400).json({error: "Text field is required"});
        }
        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({error:"Post not found!"})
        }

        const comment = {user: userId, text}
        post.comments.push(comment);
        await post.save();
    } catch (error) {
        console.log("Error in commentOnPost controller: ", error);
		res.status(500).json({ error: "Internal server error" });
    }
}

export const likeUnlikePost = async (req,res)=>{
    try {
        const userId = req.user._id;
        const {id: postId} = req.params;

        const post = await Post.findById(postId)

        if(!post){
            return res.status(404).json({error: "Post not found"})
        }
        const userLikedPost = post.likes.includes(userId);
       
        if (userLikedPost) {
			// Unlike post
			await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
			await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

			const updatedLikes = post.likes.filter((id) => id.toString() !== userId.toString());
			res.status(200).json(updatedLikes);
		} else {
			// Like post
			post.likes.push(userId);
			await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
			await post.save();

			const notification = new Notification({
				from: userId,
				to: post.user,
				type: "like",
			});
			await notification.save();

			const updatedLikes = post.likes;
			res.status(200).json(updatedLikes);
		}
	} catch (error) {
		console.log("Error in likeUnlikePost controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
}
export const getLikedPosts = async (req, res) => {
	const userId = req.params.id;

	try {
		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ error: "User not found" });

		const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
			.populate({
				path: "user",
				select: "-password",
			})
			.populate({
				path: "comments.user",
				select: "-password",
			});

		res.status(200).json(likedPosts);
	} catch (error) {
		console.log("Error in getLikedPosts controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
export const getFollowingPosts = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ error: "User not found" });

		const following = user.following;

		const feedPosts = await Post.find({ user: { $in: following } })
			.sort({ createdAt: -1 })
			.populate({
				path: "user",
				select: "-password",
			})
			.populate({
				path: "comments.user",
				select: "-password",
			});

		res.status(200).json(feedPosts);
	} catch (error) {
		console.log("Error in getFollowingPosts controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
export const getUserPosts = async (req, res) => {
	try {
		const { username } = req.params;

		const user = await User.findOne({ username });
		if (!user) return res.status(404).json({ error: "User not found" });

		const posts = await Post.find({ user: user._id })
			.sort({ createdAt: -1 })
			.populate({
				path: "user",
				select: "-password",
			})
			.populate({
				path: "comments.user",
				select: "-password",
			});

		res.status(200).json(posts);
	} catch (error) {
		console.log("Error in getUserPosts controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};*/
export const getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find()
			.sort({ createdAt: -1 })
			.populate({
				path: "user",
				select: "-password",
			})
			.populate({
				path: "comments.user",
				select: "-password",
			});

		if (posts.length === 0) {
			return res.status(200).json([]);
		}

		res.status(200).json(posts);
	} catch (error) {
		console.log("Error in getAllPosts controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
export const getAllCikks = async (req, res) => {
	try {
		const posts = await Cikk.find()
			.sort({ createdAt: -1 })
			.populate({
				path: "cikkszam",
				
			})
			

		if (posts.length === 0) {
			return res.status(200).json([]);
		}

		res.status(200).json(posts);
	} catch (error) {
		console.log("Error in getAllPosts controller: ", error);
		res.status(500).json({ error: "Internal server error" });
		
	}
};
export let cikkbeolvasas = async (cksz) =>{
    try {
        
        let existingUser = await Cikk.findById(cksz)
        
        if(!existingUser){
            
            let cksz1 = cksz.slice(0,9)
            let cksz2 = cksz.slice(9,17)
            let cksz3 = cksz.slice(17,21)
            let newPost =new Cikk({
                _id: cksz.toString(),
                cikkszam: cksz2.toString(),
                gyartasiido:cksz1.toString(),
                sorozatszam:cksz3.toString()
            })
            await newPost.save()
           console.log('>>>>>>>>>>>Sikeresen elmentetted.<<<<<<<<<<<<<<<')
        }else{
            console.log('>>>>>>>>>>>Már elmentetted.<<<<<<<<<<<<<<<')
        }

        
        
        
    } catch (error) {
        console.log("Hiba a cikkszám rögzítése során: ", error);
		
    }
}
export const getKeresett = async (req, res) => {
	const {keresettszoveg} = req.body;
	console.log(keresettszoveg)
	try {
		const user1 = await Cikk.findById(keresettszoveg);
		console.log(user1)
		if (!user1) return res.status(404).json({ error: "Nincs ilyen item" });

		res.status(200).json(user1);
		console.log('megtalálva:',user1)
	} catch (error) {
		console.log("Error in getLikedPosts controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};