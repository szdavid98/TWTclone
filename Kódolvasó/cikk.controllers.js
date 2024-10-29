
import Cikk from "./mongoModel.js";


export const getAllPosts = async (req, res) => {
	try {
		const posts = await Cikk.find()
			.sort({ createdAt: -1 })
			.populate({
				path: "cikkszam",
				
			})
			

		if (posts.length === 0) {
			consol.log('Nincs még rögzítev')
		}

		console.log(posts);
	} catch (error) {
		console.log("Error in getAllPosts controller: ", error);
		
	}
};

export let cikkbeolvasas = async (cksz) =>{
    try {
      
        let query = {gyartasiido: cksz};
        let existingUser = await Cikk.findOne(query)
        console.log(existingUser)
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
           console.log('sikeresen mentve')
        }else{
            console.log('Már elmentetted.')
        }

        
        
        
    } catch (error) {
        console.log("Hiba a cikkszám rögzítése során: ", error);
		
    }
}
