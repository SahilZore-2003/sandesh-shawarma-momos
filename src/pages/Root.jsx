import { Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/authContext"
const Root = () => {
  const user = useAuth()
  console.log("🚀 ~ Root ~ currentUser:", user)
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}

export default Root
