import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Authcontext";
import "./Login.css";
import { Helmet } from "react-helmet-async";
import { axiosinstance } from "../../config";
import logo from "../../image/logo kiraa w-o original.png";

const Login = () => {
  const modeles = localStorage.getItem("selectedmodeles");
  const voitures = localStorage.getItem("selectedVoiture");
  const chemin = localStorage.getItem("commandesauvgarder");
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axiosinstance.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      if (voitures || modeles) {
        navigate(chemin);
      } else {
        navigate("/");
      }
    } catch (err) {
      if (err.response.status === 401) {
        if (err.response.data === "Invalid username") {
          dispatch({
            type: "LOGIN_FAILURE",
            payload: { message: "Erreur : Nom d'utilisateur incorrect" },
          });
        } else if (err.response.data === "Invalid password") {
          dispatch({
            type: "LOGIN_FAILURE",
            payload: { message: "Erreur : Mot De Passe incorrect" },
          });
        }
      } else {
        // Handle other error scenarios
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "An error occurred during login" },
        });
      }
    }
  };

  return (
    <div className="login-container">
      <Helmet>
        <title>Login</title>
        <meta name="description" content="" />
        <link rel="canonical" href="https://kiraadz.com/login" />
      </Helmet>
      <div className="login">
        <div className="login-formx">
          <div
            className="img-log"
            style={{ backgroundColor: "rgb(0,0,0,0.038)" }}
          >
            <img src={logo} alt="kiraa" className="logo" />
          </div>

          <h2 className="title">connexion</h2>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            id="username"
            onChange={handleChange}
            className="input"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            id="password"
            onChange={handleChange}
            className="input"
          />
          <button
            disabled={loading}
            onClick={handleClick}
            className="signup-button"
            style={{ backgroundColor: "#0071c2", color: "#fff" }}
          >
            {loading ? "Connexion.." : "se connecter"}
          </button>
          {error && <span className="error">{error.message}</span>}
          <button className="signup-button">
            <a href="/signup" className="signup-link">
              s'inscrire
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
