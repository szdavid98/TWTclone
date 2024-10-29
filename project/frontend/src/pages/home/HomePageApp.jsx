
import { useState } from "react";

import { useMutation,  useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const HomePageApp = () => {
	const [formData, setFormData] = useState({
		keresettszoveg: ""
	});
	const[responseData,setResponseData] = useState(null)
	const queryClient = useQueryClient();

	const {
		mutate: loginMutation,
		isPending,
		isError,
		error,
	} = useMutation({
		mutationFn: async ({ keresettszoveg }) => {
			try {
				const res = await fetch("/api/posts/keres", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ keresettszoveg }),
				});

				const data = await res.json();
				

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess: (data) => {
			setResponseData(data);
			// refetch the authUser
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		loginMutation(formData);
	};
	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div>
			<form className='flex gap-4 flex-col' onSubmit={handleSubmit}>
				<div class="flex w-full border-b border-gray-700">
					<label className="form-control w-full max-w-xs m-4 " >
						<input id='keresendo' type="text" name="keresettszoveg" onChange={handleInputChange} placeholder="Keresel Valamit?" className="input input-bordered w-full max-w-xs" value={formData.keresettszoveg}/>
						
					</label>
					<button className='m-4 w-1/3 btn rounded-full btn-primary text-white' type="submit" >
									{isPending ? "Keresés..." : "Keresés"}
					</button>

				</div>
			</form>
				{responseData &&(
					<div className="flex bg-base-200 rounded w-90 m-h-60 m-3 p-3 border-2 border-slate-50">
						<div className="w-2/3 flex flex-col  justify-center">
							<p className="text-lg ">Azonosító: {JSON.stringify(responseData._id,null,2)}</p>
							<p className="text-lg ">Gyártó: Tugcelik</p>
							<p className="text-lg ">Sorozatszám: {JSON.stringify(responseData.sorozatszam,null,2)}</p>
							<p className="text-lg ">Gyártási Idő: {JSON.stringify(responseData.gyartasiido,null,2)}</p>
							<p className="text-lg ">Rögzítve: {JSON.stringify(responseData.createdAt,null,2)}</p>
							<p className="text-lg text-red-500 ">Státusz: Még nincs beépítve</p>
						</div>
						
						<div className="w-1/3 flex flex-col items-center justify-center">
							<div className="radial-progress text-primary flex items-center" style={{ "--value": 95 }} role="progressbar">	 95%
							</div>
							<p className="text-lg ">Tugcelik</p>
						</div>
						
					</div>
				)}
		</div>
	);
};
export default HomePageApp;
