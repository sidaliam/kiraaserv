import "./featuredPropertiesx.css";
import useF from "../../Hooks/useF";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const FeaturedPropertiesx = ({ selectedDates }) => {
  const { data, error, loading } = useF("/hotels");
  console.log("Data:", data);
  console.log("Error:", error);
  console.log("Loading:", loading);
  const navigate = useNavigate();

  const handleButtonClick = (hotelId) => {
    localStorage.setItem("selectedDates", JSON.stringify(selectedDates));
    navigate(`/hotels/${hotelId}`);

  };

  return (
    <div className="fp">
      {loading ? (
        "loading ...."
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              {item.photos && item.photos.length > 0 && (
                <img src={item.photos[0]} alt="" className="fpImgx" />
              )}
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpCity">{item.address}</span>

              <span className="fpPrice">0{item.cheapestPrice}</span>
              <button className="btw" onClick={() => handleButtonClick(item._id)}>
                Voir plus
              </button>
              {item.rating && (
                <div className="fpRating">
                  <button>8.9</button>
                  <span>Excellent</span>

                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedPropertiesx;
