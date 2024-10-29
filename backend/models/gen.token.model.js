import mongoose from "mongoose";

const ffaSchema = new mongoose.Schema(
	{
		
		code: {
			type: String,
			required: true,
			
		},
		
		
	},
	{ timestamps: true }
);


const ffamod = mongoose.model("2FAparams", ffaSchema);

export default ffamod;