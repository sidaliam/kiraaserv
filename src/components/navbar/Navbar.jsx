import { AuthContext } from "../../Context/Authcontext";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../image/logo kiraa w-o original.png"

const Navbar = () => {
  const { dispatch } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleclick = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                <img src={logo} alt="kiraa" id="navbar-logo" />        </Link>
       <div className="us">
        {user ? (
          
          <div className="navItems"></div>
        ) : (
          <div className="navItems">
            <button className="btv"><a href="/signup" style={{textDecoration:"none", color:"white"}}>s'inscrire</a></button>
            
          </div>
        )}
         {user ? (
              <button className="btw" onClick={handleclick}>se déconnecter</button>
            ) : (
              <>
                <Link to="/login">
                  {" "}
                  <button className="btx" >se connecter</button>
                </Link>
              </>
            )}
            </div>
      </div>
    </div>
  );
};

export default Navbar;
