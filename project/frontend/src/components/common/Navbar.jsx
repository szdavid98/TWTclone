import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const navbar = () =>{
    const queryClient = useQueryClient();
	const { mutate: logout } = useMutation({
		mutationFn: async () => {
			try {
				const res = await fetch("/api/auth/logout", {
					method: "POST",
				});
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
		onError: () => {
			toast.error("Logout failed");
		},
	});
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
     
    return(
        <div class="navbar bg-base-200 rounded-box">
        <div class="flex-1">
            <h1><a class="text-4xl font-extrabold text-primary">{"Pepe"}</a></h1>
        </div>
        <div class="flex-none gap-2">
            <div class="form-control">
            <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
            </div>
            <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <ul
                tabindex="0"
                class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><a>Egyenleg: {authUser.egyenleg || "15650"}Ft</a></li>
                <li>
                <a class="justify-between">
                    Profil
                    <span class="badge">New</span>
                </a>
                </li>
                <li><a>Beállítások</a></li>
                
                <li><a onClick={(e) => {
									e.preventDefault();
									logout();}}>Kijelentkezés</a></li>
            </ul>
            </div>
            
        </div>
        </div>
    )
}

export default navbar