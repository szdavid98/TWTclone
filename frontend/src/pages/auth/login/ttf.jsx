import { useState } from "react";
import { Link } from "react-router-dom";

import XSvg from "../../../components/svgs/X";

import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const TWFA = () => {
	const [formData, setFormData] = useState({
		code: "",	
	});
	const queryClient = useQueryClient();

	const {
		mutate: loginMutation,
		isPending,
		isError,
		error,
	} = useMutation({
		mutationFn: async ({ code }) => {
			try {
				const res = await fetch("/api/auth/ttauthcheck", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ code }),
				});

				const data = await res.json();
				console.log('ez az az adat', data)

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		 onSuccess: () => {
			// refetch the authUser
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
			queryClient.invalidateQueries({ queryKey: ["TO2FA"] });
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
		<div className='max-w-screen-xl mx-auto flex h-screen'>
			<div className='flex-1 hidden lg:flex items-center  justify-center'>
				<XSvg className='lg:w-2/3 fill-white' />
			</div>
			<div className='flex-1 flex flex-col justify-center items-center'>
				<form className='flex gap-4 flex-col' onSubmit={handleSubmit}>
					<XSvg className='w-24 lg:hidden fill-white' />
					<h1 className='text-4xl font-extrabold text-white'>It's 2FA</h1>
					

					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdPassword />
						<input
							type='text'
							className='grow'
							placeholder='Secret Code'
							name='code'
							onChange={handleInputChange}
							value={formData.code}
						/>
					</label>
					<button className='btn rounded-full btn-primary text-white'>
						{isPending ? "Loading..." : "Login"}
					</button>
					{isError && <p className='text-red-500'>{error.message}</p>}
				</form>
				
			</div>
		</div>
	);
};
export default TWFA;