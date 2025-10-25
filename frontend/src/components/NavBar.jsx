import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const NavBar = ({ setSideBarOpen }) => {
  const {accessToken,refreshToken,setAccessToken,setRefreshToken} = useAuth()
  const axiosPrivateInstance = useAxiosPrivate()
  const navigate = useNavigate();

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      setSideBarOpen(false); 
    }
  };

async function handleLogout() {
       

  try {
    const response = await axiosPrivateInstance.post('/auth/logout', { refresh: refreshToken })
    if (response.status === 200) {
      setSideBarOpen(false)
      setAccessToken('')
      setRefreshToken('')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      console.log('Logged out successfully!')
      navigate('/user/signin') 
    }
  } catch (error) {
    console.error("Logout failed:", error)
  }
}


  return (
    <nav className="flex flex-row gap-3">
      <Link to="/" onClick={handleNavClick} className="hover:text-blue-400">
        Home
      </Link>
      {accessToken ?
      <>
        <Link to="/user/dashboard" onClick={handleNavClick} className="hover:text-blue-400">
        Dashboard
      </Link>
       <button  onClick={handleLogout} className="hover:text-blue-400 cursor-pointer">
        Logout
      </button>
      </>
      :(
       <>
        <Link to="/user/signin" onClick={handleNavClick} className="hover:text-blue-400">
        Sign In
      </Link>
      <Link to="/user/signup" onClick={handleNavClick} className="hover:text-blue-400">
        Sign Up
      </Link>
       </>
      )}
    </nav>
  );
};

export default NavBar;
