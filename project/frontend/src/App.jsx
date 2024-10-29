import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import NotificationPage from "./pages/notification/NotificationPage";
import NotificationPageAdmin from "./pages/notification/NotificationPageAdmin";
import ProfilePage from "./pages/profile/ProfilePage";
import RequestAccount from "./pages/auth/acc/requestAcc";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import TWFA from "./pages/auth/login/ttf";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";
import Navbar from "./components/common/Navbar"

function App() {
	
	const { data: authUser, isLoading } = useQuery({
		// we use queryKey to give a unique name to our query and refer to it later
		queryKey: ["authUser"],
		queryFn: async () => {
			try {
				const res = await fetch("/api/auth/me");
				const data = await res.json();
				if (data.error) return null;
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				
				return data;
				
			} catch (error) {
				throw new Error(error);
			}
			
		},
		retry: false,
	});
	
	const { data: TO2FA, isLoading1} = useQuery({
		// we use queryKey to give a unique name to our query and refer to it later
		queryKey: ["TO2FA"],
		queryFn: async () => {
			
			try {
				const res = await fetch("/api/auth/ttauth");
				const data1 = await res.json();
				
				if (data1.error) return null;
				console.log('ez itt meegggy:', data1)
				if (!res.ok) {
					throw new Error(data1.error || "Something went wrong");
				}
				
				return data1;
			} catch (error) {
				throw new Error(error);
			}
		},
		retry: false,
	});
	
	

	if (isLoading) {
		return (
			<div className='h-screen flex justify-center items-center'>
				<LoadingSpinner size='lg' />
			</div>
		);
	}
	
	
	return (
		<div className=' max-w-6xl mx-auto'>
			{authUser&& <Navbar/>}
			<div className=' flex max-w-6xl mx-auto'>
			{authUser && <Sidebar />}
			<Routes>
				<Route path='/' element={ authUser? <HomePage/> : <Navigate to='/login' />} />
				<Route path='/login' element={ !authUser? <LoginPage/> : <Navigate to='/' />} />
				<Route path='/authkey' element={ TO2FA && !authUser? <TWFA/> : <Navigate to='/' />} />
				<Route path='/acc' element={ !authUser? <RequestAccount/> : <Navigate to='/' />} />
				<Route path="/notifications" element={authUser? <NotificationPageAdmin/> :<Navigate to='/'/> }/>
				
				
			</Routes>
			
			<Toaster />
			</div>
		</div>
	);
}

export default App;