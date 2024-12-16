import { Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/authContext"
import { Toaster } from "@/components/ui/toaster"
const Root = () => {
  const user = useAuth()
  console.log("🚀 ~ Root ~ currentUser:", user)
  return (
    <AuthProvider>
        <Toaster />
        <Outlet />
    </AuthProvider>
  )
}

export default Root
