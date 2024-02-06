//import React from 'react'
import { useLocation, useNavigate } from "react-router"

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const homeClass = pathMatchRoute("/") ? "text-black border-b-red-500" : "text-gray-400 border-b-transparent";
    const offersClass = pathMatchRoute("/offers") ? "text-black border-b-red-500" : "text-gray-400 border-b-transparent";
    const signInClass = pathMatchRoute("/sign-in") ? "text-black border-b-red-500" : "text-gray-400 border-b-transparent";

    // console.log(location.pathname)
  
    function pathMatchRoute(route) {
        if (route === location.pathname) {
          return true;
        }
        return false;
    
      }
  return (
   <div className="bg-white border-b shadow-sm sticky top-0 z-40">
    <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
            <img src="../../public/cello.png" alt="logo" 
            className="h-9 cursor-pointer"
            onClick={()=>navigate("/")}/>    
        </div>
        <div>
            <ul className="flex space-x-10">
            <li className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px] ${homeClass}`} onClick={() => navigate("/")}>
  Home
</li>
<li className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px] ${offersClass}`} onClick={() => navigate("/offers")}>
  Offers
</li>
<li className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px] ${signInClass}`} onClick={() => navigate("/sign-in")}>
  Sign In
</li>
            </ul>
        </div>
    </header>
   </div>
  )
}
