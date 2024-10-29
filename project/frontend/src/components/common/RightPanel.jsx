import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import useFollow from "../../hooks/useFollow";

import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import LoadingSpinner from "./LoadingSpinner";

const RightPanel = () => {
	const { data: suggestedUsers, isLoading } = useQuery({
		queryKey: ["suggestedUsers"],
		queryFn: async () => {
			try {
				const res = await fetch("/api/users/suggested");
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong!");
				}
				return data;
			} catch (error) {
				throw new Error(error.message);
			}
		},
	});

	const { follow, isPending } = useFollow();

	if (suggestedUsers?.length === 0) return <div className='md:w-64 w-0'></div>;

	return (
		<div className='hidden lg:block my-4 mx-2'>
			<div className='bg-[#16181C] p-4 rounded-md sticky top-2'>
				<p className='font-bold'>Beszállítók</p>
				<div className='flex flex-col gap-4'>
					{/* item */}
					{isLoading && (
						<>
							<RightPanelSkeleton />
							<RightPanelSkeleton />
							<RightPanelSkeleton />
							<RightPanelSkeleton />
						</>
					)}
					{!isLoading && (
							<Link
								
								className='flex items-center justify-between gap-4'
								
							>
								<div className='flex gap-2 items-center'>
									<div className='avatar'>
										<div className='w-8 rounded-full'>
											<img src={ "/avatar-placeholder.png"} />
										</div>
									</div>
									<div className='flex flex-col'>
										<span className='font-semibold tracking-tight truncate w-28'>
											Tugcelik
										</span>
										<span className='text-sm text-slate-500'>Teljesítmény:</span>
									</div>
								</div>
								<div>
								<div className="radial-progress text-primary flex items-center" style={{ "--value": 95 }} role="progressbar">	 95%
								</div>
									
								</div>
							
							</Link>
						)}
				</div>
				<Link
								
								className='flex items-center justify-between gap-4 mt-6'
								
							>
								<div className='flex gap-2 items-center'>
									<div className='avatar'>
										<div className='w-8 rounded-full'>
											<img src={ "/avatar-placeholder.png"} />
										</div>
									</div>
									<div className='flex flex-col'>
										<span className='font-semibold tracking-tight truncate w-28'>
											Hofo
										</span>
										<span className='text-sm text-slate-500'>Teljesítmény:</span>
									</div>
								</div>
								<div>
								<div className="radial-progress text-orange-400 flex items-center " style={{ "--value": 70 }} role="progressbar">	 70%
								</div>
									
								</div>
							</Link>
							<Link
								
								className='flex items-center justify-between gap-4 mt-6'
								
							>
								<div className='flex gap-2 items-center'>
									<div className='avatar'>
										<div className='w-8 rounded-full'>
											<img src={ "/avatar-placeholder.png"} />
										</div>
									</div>
									<div className='flex flex-col'>
										<span className='font-semibold tracking-tight truncate w-28'>
											DAU
										</span>
										<span className='text-sm text-slate-500'>Teljesítmény:</span>
									</div>
								</div>
								<div>
								<div className="radial-progress text-red-400 flex items-center " style={{ "--value": 62 }} role="progressbar">	 62%
								</div>
									
								</div>
								
							</Link>
							<Link
								
								className='flex items-center justify-between gap-4 mt-6'
								
							>
								<div className='flex gap-2 items-center'>
									<div className='avatar'>
										<div className='w-8 rounded-full'>
											<img src={ "/avatar-placeholder.png"} />
										</div>
									</div>
									<div className='flex flex-col'>
										<span className='font-semibold tracking-tight truncate w-28'>
											Inhouse gyártás
										</span>
										<span className='text-sm text-slate-500'>Teljesítmény:</span>
									</div>
								</div>
								<div>
								<div className="radial-progress text-green-400 flex items-center " style={{ "--value": 100 }} role="progressbar">	 100%
								</div>
									
								</div>
							</Link>
			</div>
		</div>
	);
};
export default RightPanel;
