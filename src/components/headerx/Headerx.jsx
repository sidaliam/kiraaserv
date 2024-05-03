import {
  faCar,
  faPhone,
  faHome,
  faHotel,
  faUser,
  faShoppingCart,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./headerx.css";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../Context/Searchcontext";
import { AuthContext } from "../../Context/Authcontext";
import useF from "../../Hooks/useF";
import { Helmet } from "react-helmet";
import { GlobalContext } from "../../Context/ReservationContext";

const Header = ({ type }) => {
  const { reservationCount } = useContext(GlobalContext);
  const [notification, setNotification] = useState(false); // État pour contrôler l'affichage de la notification

  const handleShopIconClick = () => {
    navigate("/reservation-details");
    setNotification(true); // Afficher la notification
    setTimeout(() => {
      setNotification(false); // Masquer la notification après quelques secondes
    }, 3000); // 3000 millisecondes = 3 secondes, vous pouvez ajuster ce temps selon vos besoins
  };

  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    if (destination && !modéle) {
      // Recherche en fonction de la destination uniquement
      navigate("/hotels", { state: { destination, dates, options } });
      dispatch({
        type: "NEW_SEARCH",
        payload: { destination, dates, options },
      });
    } else if (modéle && !destination) {
      // Recherche en fonction du modéle uniquement
      navigate("/hotels", { state: { modéle, dates, options } });
      dispatch({ type: "NEW_SEARCH", payload: { modéle, dates, options } });
    } else {
      navigate("/hotels", { state: { modéle, destination, dates, options } });
      dispatch({
        type: "NEW_SEARCH",
        payload: { modéle, destination, dates, options },
      });
    }
  };

  const { dispatch } = useContext(SearchContext, AuthContext);
  const { user } = useContext(AuthContext);
  const handleclick = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
    navigate("/login");
  };
  const { data, loading, error } = useF("/rooms");

  const [modéle, setmodéle] = useState("");
  const handleselect = (e) => {
    setmodéle(e.target.value);
  };

  return (
    <div className="headerx">
      <div>
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        </Helmet>
        {/* ... Autres éléments de votre composant ... */}
      </div>
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        {type !== "list" && (
          <>
            <h1 className="headerTitle"></h1>
            <p className="headerDesc">
              <div class="profile">
                {/* Nom du profil */}
                {user ? user.username : <div className="navItems"></div>}
              </div>
              <div onClick={handleShopIconClick}>
                <span className="cc">{reservationCount}</span>
                <img
                  className="cc1"
                  src="https://img.icons8.com/fluency/48/indoor-parking-06.png"
                  alt="indoor-parking-06"
                />
              </div>

              {/* Condition pour afficher la notification */}
              {notification && (
                <div className="notification">
                  {/* Contenu de la notification */}
                  Votre compteur a été incrémenté!
                </div>
              )}

              <div class="icon-sliderb">
                <a href="/">
                  <div class="icon-containerc">
                    <img
                      width="42"
                      height="42"
                      src="https://img.icons8.com/fluency/48/000000/car-rental.png"
                      alt="car-rental"
                    />{" "}
                  </div>
                </a>
                <a href="/agences">
                  <div class="icon-containerc">
                    <img
                      width="42"
                      height="42"
                      src="https://img.icons8.com/fluency/48/add-contact-to-company.png"
                      alt="add-contact-to-company"
                    />
                  </div>
                </a>
                <div class="icon-containerc" style={{ display: "none" }}>
                  <FontAwesomeIcon
                    icon={faHotel}
                    className="icon"
                    style={{ display: "none" }}
                  />
                </div>
                <a href="/contact">
                  <div class="icon-containerc">
                    <img
                      width="42"
                      height="42"
                      src="https://img.icons8.com/fluency/48/outgoing-call.png"
                      alt="outgoing-call"
                    />{" "}
                  </div>
                </a>
                <a href="/about">
                  <div class="icon-containerc">
                    <img
                      width="42"
                      height="42"
                      src="https://img.icons8.com/fluency/48/conference-call.png"
                      alt="conference-call"
                    />{" "}
                  </div>
                </a>
              </div>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
