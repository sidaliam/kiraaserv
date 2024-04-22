import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Authcontext";
import "./Login.css";
import { Helmet } from 'react-helmet-async';
import { axiosinstance } from "../../config";


const Login = () => {
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
      navigate("/");
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
    <div>
      <Helmet>
        <title>login</title>
        <meta name="description" content=""/>      </Helmet>
    <div className="login">

      <div className="lContainer">
        <h2 className="lInput"></h2>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span style={{ color: "red" }}>{error.message}</span>}
        <button  className="lButton" style={{backgroundColor : "orange"}}>
          <a href="/signup" style={{textDecoration : "none", color : "white"}}>sign up</a>
        </button>
      </div>
    </div>
    </div>
  );
};

export default Login;
