import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import LoadingSpinner from "../../components/common/LoadingSpinner";

import { IoSettingsOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

const NotificationPageAdmin = () => {
	const queryClient = useQueryClient();
	const { data: notifications, isLoading } = useQuery({
		queryKey: ["notificationsAdmin"],
		queryFn: async () => {
			try {
				console.log('ez fut')
				const res = await fetch("/api/notifications/log");
				const data = await res.json();
				if (!res.ok) throw new Error(data.error || "Something went wrong");
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
	});
	

	/*const { mutate: deleteNotifications } = useMutation({
		mutationFn: async () => {
			try {
				const res = await fetch("/api/notifications", {
					method: "DELETE",
				});
				const data = await res.json();

				if (!res.ok) throw new Error(data.error || "Something went wrong");
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			toast.success("Notifications deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["notifications"] });
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});*/
	function Mycomponent(){
		const handleClick = () =>{
			alert(1)
		}
	}
	
	return (
		<>
			<div className='flex-[4_4_0] border-l border-r border-gray-700 min-h-screen'>
				<div className='flex justify-between items-center p-4 border-b border-gray-700'>
					<p className='font-bold'>Notifications</p>
					
				</div>
				{isLoading && (
					<div className='flex justify-center h-full items-center'>
						<LoadingSpinner size='lg' />
					</div>
				)}
				{notifications?.length === 0 && <div className='text-center p-4 font-bold'>No notifications 🤔</div>}
				{notifications?.map((notification) => (
					<div className='border-b border-gray-700' key={notification._id}>
						
						<div className='flex gap-2 p-4' >
							<p><b>{notification.fname}</b> Szeretne új hozzáférést kérni.</p>
							
								<div className="flex bg-base-200 rounded w-90 m-h-60 m-3 p-3 border-2 border-slate-50 hidden">
									<div className="w-2/3 flex flex-col  justify-center">
										<p className="text-lg ">Azonosító: {notification.mazon}</p>
										<p className="text-lg ">Név: {notification.fname}</p>
										<p className="text-lg ">Üzenet: {notification.message}</p>
										<p className="text-lg ">Role {notification.role}</p>
										
									</div>
									
									<div className="w-1/3 flex flex-col items-center justify-center">
										<div className="radial-progress text-primary flex items-center" style={{ "--value": 95 }} role="progressbar">	 95%
										</div>
										<p className="text-lg ">Tugcelik</p>
									</div>
									
								</div>
								
						</div>
						
					</div>
					
				))}
			</div>
		</>
	);
};
export default NotificationPageAdmin;
