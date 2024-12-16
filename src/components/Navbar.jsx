import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className='flex items-center justify-between'>
            <h1>Showarama</h1>

            <div>
                <Link to={"#"}>Home</Link>
                <Link to={"#"}>About</Link>
                <Link to={"#"}>Contact Us</Link>
                <Link to={"#"}>Information</Link>
            </div>
        </div>
    )
}

export default Navbar
