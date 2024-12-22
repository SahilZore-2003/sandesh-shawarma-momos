import { useNavigate } from "react-router-dom"

const Profile = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.setItem('user', null)
        navigate("/login")
    }
    return (
        <div className='h-[calc(100vh-92px)] grid place-items-center text-xl '>
            <button onClick={handleLogout} className="bg-primary rounded-md text-white p-4 px-8">
                Logout
            </button>
        </div>
    )
}

export default Profile