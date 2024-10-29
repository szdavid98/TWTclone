import { useState } from "react";

import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";

const HomePage = () => {
	const [feedType, setFeedType] = useState("forYou");

	return (
		<>
			<div className='flex-[4_4_0] mr-auto border-r min-h-screen min-w-auto w-full'>
				
					
				<h1 className="text-3xl text-center font-extrabold text-brown mt-6"> Keress valami magadnak valót</h1>
				
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:4 " >

						<div class="card bg-base-100 w-auto shadow-xl m-3">
							<figure>
								<img
								src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
								alt="Shoes" />
							</figure>
							<div class="card-body">
								<h2 class="card-title">
								Shoes!
								<div class="badge badge-secondary">NEW</div>
								</h2>
								<p>If a dog chews shoes whose shoes does he choose?</p>
								<div class="card-actions justify-end">
								<div class="badge badge-outline">Fashion</div>
								<div class="badge badge-outline">Products</div>
								</div>
							</div>
							
							
						</div>
						<div class="card bg-base-100 w-auto shadow-xl m-5 ">
							<figure>
								<img
								src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
								alt="Shoes" />
							</figure>
							<div class="card-body">
								<h2 class="card-title">
								Shoes!
								<div class="badge badge-secondary">NEW</div>
								</h2>
								<p>If a dog chews shoes whose shoes does he choose?</p>
								<div class="card-actions justify-end">
								<div class="badge badge-outline">Fashion</div>
								<div class="badge badge-outline">Products</div>
								</div>
							</div>
							
							
						</div>
						<div class="card bg-base-100 w-auto shadow-xl m-5">
							<figure>
								<img
								src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
								alt="Shoes" />
							</figure>
							<div class="card-body">
								<h2 class="card-title">
								Shoes!
								<div class="badge badge-secondary">NEW</div>
								</h2>
								<p>If a dog chews shoes whose shoes does he choose?</p>
								<div class="card-actions justify-end ">
									<div class="badge badge-outline hidden md:block">Fashion</div>
									<div class="badge badge-outline ">Products</div>
								</div>
							</div>
							
							
						</div>
					</div>
					

				
			</div>
		</>
	);
};
export default HomePage;
