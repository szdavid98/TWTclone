import mongoose from "mongoose";

const reqaSchema = new mongoose.Schema(
	{
		
		email: {
			type: String,
			require: true
		},
		mazon:{
			type: String,
			require: true,
		},
		message:{
			type: String,
			require: true,
		},
		fname:{
			type:String,
			require: true,
		},
		role:{
			type: String,
			require: true
		}
		
		
	},
	{ timestamps: true }
);


const reqa = mongoose.model("Requests", reqaSchema);

export default reqa;