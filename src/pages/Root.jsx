import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/authContext"
import { Toaster } from "@/components/ui/toaster"
const Root = () => {
  return (
    <AuthProvider>
      <Toaster />
      <Outlet />
    </AuthProvider>
  )
}

export default Root
