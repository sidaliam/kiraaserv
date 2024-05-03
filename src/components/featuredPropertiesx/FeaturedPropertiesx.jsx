import "./featuredPropertiesx.css";
import useF from "../../Hooks/useF";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../../Animation/Animation - 1714744423298.json"
import Lottie from "lottie-react";
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
    <div className="fpx">
      {loading ? (
       <Lottie style={{height:120}} animationData={LoadingAnimation} />
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItemx" key={item._id}>
              <div className="cardx">
              {item.photos && item.photos.length > 0 && (
                <img src={item.photos[0]} alt="" className="fpImgx" />
              )}
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpCity">{item.address}</span>

              <span className="fpPrice">0{item.cheapestPrice}</span>
              <button className="btw" style={{marginLeft:'5%',marginBottom:'2%'}} onClick={() => handleButtonClick(item._id)}>
                visiter
              </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedPropertiesx;
