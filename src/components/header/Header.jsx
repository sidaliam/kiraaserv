import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPhone,
  faTaxi,
  faHome,
  faHotel,
  faUser,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { IoLogoModelS } from "react-icons/io";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // Importez l'icône de fermeture

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../Context/Searchcontext";
import { AuthContext } from "../../Context/Authcontext";
import useF from "../../Hooks/useF";
import { Helmet } from "react-helmet";
import { GlobalContext } from "../../Context/ReservationContext";
import { FiX } from "react-icons/fi"; // Importer l'icône X de react-icons/fi

const Header = ({ type }) => {
  const { reservationCount } = useContext(GlobalContext);
  const { reservationDetails } = useContext(GlobalContext);
  const [notification, setNotification] = useState(false); // État pour contrôler l'affichage de la notification

  const handleShopIconClick = () => {
    navigate("/reservation-details");
    setNotification(true); // Afficher la notification
    setTimeout(() => {
      setNotification(false); // Masquer la notification après quelques secondes
    }, 3000); // 3000 millisecondes = 3 secondes, vous pouvez ajuster ce temps selon vos besoins
  };

  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/hotels", { state: { modéle, ville, dates } });
    dispatch({
      type: "NEW_SEARCH",
      payload: { modéle, ville, dates },
    });

    localStorage.setItem("selectedDates", JSON.stringify(dates));
    localStorage.setItem("selectedmodeles", JSON.stringify(modéle));
  };

  const { dispatch } = useContext(SearchContext, AuthContext);
  const { user } = useContext(AuthContext);

  const { data, loading, error } = useF("/rooms");
  const {
    data: hoteldata,
    loading: hoteloading,
    error: hotelerror,
  } = useF("/hotels");
  const [ville, setville] = useState("");
  const [modéle, setmodéle] = useState("");
  const handleselect = (e) => {
    setmodéle(e.target.value);
  };

  const handleselect2 = (e) => {
    setville(e.target.value);
  };

  const isButtonDisabled =
    (modéle === "" && ville == "") ||
    (modéle === "Voiture" && ville == "Ville");

  return (
    <div className="header">
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
                <div
                  style={{ cursor: "pointer" }}
                  class="shop"
                  onClick={handleShopIconClick}
                >
                  {/* Icône du shop */}

                  {/* Afficher la liste des produits si showCart est vrai */}
                </div>
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
                <a href="/" style={{ textDecoration: "none" }}>
                  <div class="icon-containerb">
                    <img
                      width="38"
                      height="38"
                      src="https://img.icons8.com/fluency/48/000000/car-rental.png"
                      alt="car-rental"
                    />{" "}
                  </div>
                  <div className="trt">voitures</div>
                </a>
                <a href="/localisation" style={{ textDecoration: "none" }}>
                  <div class="icon-containerb">
                    <img
                      width="38"
                      height="38"
                      src="https://img.icons8.com/cotton/64/shipping-location--v1.png"
                      alt="car-rental"
                    />{" "}
                  </div>
                  <div className="trt">Localiser</div>
                </a>

                <div class="icon-containerb" style={{ display: "none" }}>
                  <FontAwesomeIcon
                    icon={faHotel}
                    className="icon"
                    style={{ display: "none" }}
                  />
                </div>
                <a href="/contact" style={{ textDecoration: "none" }}>
                  <div class="icon-containerb">
                    <img
                      width="38"
                      height="38"
                      src="https://img.icons8.com/fluency/48/outgoing-call.png"
                      alt="outgoing-call"
                    />{" "}
                  </div>
                  <div className="trt">contact</div>
                </a>
                <a href="/about" style={{ textDecoration: "none" }}>
                  <div class="icon-containerb">
                    <img
                      width="38"
                      height="38"
                      src="https://img.icons8.com/fluency/48/conference-call.png"
                      alt="conference-call"
                    />{" "}
                  </div>
                  <div className="trt">nous?</div>
                </a>
              </div>
            </p>

            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >
                  {`${format(dates[0].startDate, "dd/MM/yyyy")} au ${format(
                    dates[0].endDate,
                    "dd/MM/yyyy"
                  )}`}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <select className="headerSearchInput" onChange={handleselect2}>
                  <option value="Ville">Ville</option>
                  {hoteloading
                    ? "loading .."
                    : hoteldata &&
                      Array.from(
                        new Set(hoteldata.map((hotel) => hotel.city))
                      ).map((city) => <option key={city}>{city}</option>)}
                </select>
              </div>
              <div className="headerSearchItem">
                <select className="headerSearchInput" onChange={handleselect}>
                  {loading ? (
                    "loading .."
                  ) : (
                    <>
                      <option value="Voiture">Voiture</option>
                      {data &&
                        Array.from(
                          new Set(
                            data
                              .map((room) => room.modéle)
                              .filter((model) => model !== "voiture")
                          )
                        ).map((model) => <option key={model}>{model}</option>)}
                    </>
                  )}
                </select>
              </div>
              <div className="headerSearchItem">
                <button
                  className="headerBtn"
                  onClick={handleSearch}
                  disabled={isButtonDisabled}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
            {openDate && (
              <div className="datePickerContainer">
                <div className="datePicker">
                  <div className="sicon" onClick={() => setOpenDate(false)}>
                    <FontAwesomeIcon
                      icon={faTimes}
                      style={{
                        color: "red",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                  <br />
                  <br />
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
