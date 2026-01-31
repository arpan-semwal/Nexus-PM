"use client";

import { useRouter } from "next/navigation"
import {useEffect , useState} from "react";

export default function Dashboard(){
    const router = useRouter();
    const [userEmail , setUserEmail] = useState("");


    useEffect(() => {
        const token = localStorage.getItem("nexus_token");
        if(!token){
            router.push("/login");
        }
        else{
            setUserEmail("Admin");
        }
    } , []);


    const logout = () => {
        localStorage.removeItem("nexus_token");
        router.push("/login");
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold">Nexus Dashboard</h1>
            <p className="mt-4">Welcome Back , {userEmail}</p>
            <button className="mt-6 bg-red-500 text-white px-4 py-2">
                Logout
            </button>
        </div>
    )
}