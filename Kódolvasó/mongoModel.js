import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		_id:{
			type: String,
			required: true,
		},
		cikkszam: {
			type: String,
			required: true,
			
		},
		gyartasiido: {
			type: String,
			required: false,
		},
		sorozatszam: {
			type: String,
			required: false,
			
		}
		
	},
	{ timestamps: true }
);

const Cikk = mongoose.model("Motorhousing", userSchema);

export default Cikk;