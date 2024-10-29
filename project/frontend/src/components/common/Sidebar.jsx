import XSvg from "../svgs/X";

import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import User from "../../../../backend/MongoModels/userModel";

const Sidebar = () => {
	

	return (
		<div className='mg:flex-[2_2_0]  w-fit max-w-52 '>
			<div className='sticky top-0 left-0 h-screen flex-col hidden md:block md:w-full'>
			<ul class="mt-6 min-w-48 menu bg-base-200 lg:menu-horizontal w-full rounded-box min-h-52">
			
			<li>
				<a>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
				</svg>
				Inbox
				<span class="badge badge-sm">99+</span>
				</a>
			</li>
			<li>
				<a>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				Updates
				<span class="badge badge-sm badge-warning">NEW</span>
				</a>
			</li>
			<li>
				<a>
				Stats
				<span class="badge badge-xs badge-info"></span>
				</a>
			</li>
			</ul>
					
				
			</div>
		</div>
	);
};
export default Sidebar;
