"use client";

import { signOutWithApi } from "../../../lib/authService";

interface LogoutButtonProps{
    children: React.ReactNode;
}

export const LogoutButton=({
    children,
}: LogoutButtonProps)=>{
   const onClick = ()=>{
    signOutWithApi();
   }
   return (
    <span onClick={onClick} className="cursor-pointer">
        {children}
    </span>
   )

}