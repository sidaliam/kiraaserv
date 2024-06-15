import React, { useState } from "react";
import "./featuredProperties.css";
import { Link } from "react-router-dom";
import useF from "../../Hooks/useF";
import Lottie from "lottie-react";
import LoadingAnimation from "../../Animation/Animation - 1714744423298.json";
import {
  AiFillCar,
  AiFillCalendar,
  AiFillFormatPainter,
  AiFillPhone,
  AiFillDollarCircle,
} from "react-icons/ai";
import { FaCity } from "react-icons/fa";
const FeaturedProperties = () => {
  const { data, error, loading } = useF("/rooms");
  const [visibleVoitures, setVisibleVoitures] = useState(12);

  const handleCarClick = (car) => {
    localStorage.setItem("selectedVoiture", JSON.stringify(car));
    localStorage.removeItem("selectedmodeles");
  };

  return (
    <div>
      <div className="fp">
        {loading ? (
          <Lottie style={{ height: 120 }} animationData={LoadingAnimation} />
        ) : error ? (
          "Error fetching data."
        ) : (
          <>
            {data.slice(0, visibleVoitures).map((car) => (
              <Link
                key={car._id}
                to={`/hotels/${car._id}`}
                className="fpItemLink"
                style={{ textDecoration: "none" }}
              >
                <div className="fpItem" onClick={() => handleCarClick(car)}>
                  <div className="card">
                    {car.photos && car.photos.length > 0 && (
                      <img src={car.photos[0]} alt="" className="fpImg" />
                    )}
                    <div className="card-body">
                      <span className="fpName">
                        <AiFillCar /> {car.modéle}
                      </span>
                      <span className="fpCity">
                        <AiFillCalendar /> Année: {car.année}
                      </span>
                      <span className="fpCity">
                        <AiFillFormatPainter /> Couleur: {car.couleur}
                      </span>
                      <span className="fpCity">
                        <AiFillCar /> Moteur: {car.moteur}
                      </span>
                      <span className="fpCity">
                        <FaCity /> Ville: {car.hotelDetails.city}
                      </span>
                      <span className="fpCity" style={{ color: "green" }}>
                        <AiFillPhone /> Téléphone: 0
                        {car.hotelDetails.cheapestPrice}
                      </span>
                      <span className="fpPrice">
                        {car.price != 0 ? `Prix: ${car.price} DA` : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
      <div className="showMoreButtonContainer">
        {data.length > visibleVoitures && (
          <button
            className="showMoreButton"
            onClick={() => setVisibleVoitures(visibleVoitures + 12)}
          >
            Voir plus
          </button>
        )}
      </div>
    </div>
  );
};

export default FeaturedProperties;
