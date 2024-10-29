//import Notification from "../models/notification.model.js";
import reqa from "../models/requestacc.model.js";

export const getNotifications = async (req,res)=>{
    try {
		const userId = req.user._id;

		const notifications = await Notification.find({ to: userId }).populate({
			path: "from",
			select: "username profileImg",
		});

		await Notification.updateMany({ to: userId }, { read: true });

		res.status(200).json(notifications);
	} catch (error) {
		console.log("Error in getNotifications function", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
export const getAdminNotifications = async (req,res)=>{
    try {
		

		const AdminNotifications = await reqa.find()
		console.log(AdminNotifications)
		res.status(200).json(AdminNotifications);

		//res.status(200).json(notifications);
	} catch (error) {
		console.log("Error in getNotifications function", error.message);
		//res.status(500).json({ error: "Internal Server Error" });
	}
}

export const deleteNotifications = async (req, res) => {
	try {
		const userId = req.user._id;

		await Notification.deleteMany({ to: userId });

		res.status(200).json({ message: "Notifications deleted successfully" });
	} catch (error) {
		console.log("Error in deleteNotifications function", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};