import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";
import { axiosinstance } from "../../config";
import { AuthContext } from "../../Context/Authcontext";
import "./Signup.css";
import logo from "../../image/logo kiraa w-o original.png";
const Signup = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    country: "",
    city: "",
    phone: "",
    confirmPassword: "",
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [error2, setError2] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    if (e.target.id === "confirmPassword") {
      setCredentials((prev) => ({
        ...prev,
        confirmPassword: e.target.value,
      }));
    } else {
      setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
  };

  const navigate = useNavigate();
  const { loading, error, dispatch } = useContext(AuthContext);
  const handleClick = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      setPasswordsMatch(false);
      setError2("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      const res = await axiosinstance.post("/auth/register", credentials);
      navigate("/login");
    } catch (err) {
      if (err.response.status === 401) {
        if (err.response.data === "Invalid username") {
          dispatch({
            type: "LOGIN_FAILURE",
            payload: { message: "Invalid username" },
          });
        } else if (err.response.data === "Invalid password") {
          dispatch({
            type: "LOGIN_FAILURE",
            payload: { message: "Invalid password" },
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
    <div className="login-containerx">
      <Helmet>
        <title>Inscription</title>
        <meta
          name="description"
          content="registrez-vous avant de commander la voitures"
        />
      </Helmet>
      <div className="login">
        <div className="login-form">
          <div
            className="img-log"
            style={{ backgroundColor: "rgb(0,0,0,0.038)" }}
          >
            <img src={logo} alt="kiraa" className="logo" />
          </div>
          <h2 className="title">S'inscrire</h2>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            id="username"
            onChange={handleChange}
            className="input"
          />

          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              id="password"
              onChange={handleChange}
              className="input" // Removed "password-input" class
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle-btn"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          <input
            type="password"
            placeholder="Confirmer mot de passe"
            id="confirmPassword"
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            placeholder="Email"
            id="email"
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            placeholder="Pays"
            id="country"
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            placeholder="Ville"
            id="city"
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            placeholder="Téléphone"
            id="phone"
            onChange={handleChange}
            className="input"
          />
          {!passwordsMatch && <p className="error">{error2}</p>}
          <button
            className="signup-button"
            onClick={handleClick}
            style={{ backgroundColor: "rgba(0, 113, 194)", color: "white" }}
          >
            S'inscrire
          </button>

          <button className="signup-button">
            <a href="/login" className="signup-link">
              Se Connecter
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;