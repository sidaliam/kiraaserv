import FeaturedPropertiesx from "../../components/featuredPropertiesx/FeaturedPropertiesx";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../../components/navbar/Navbar";
import { Helmet } from "react-helmet-async";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-date-range";
import Headerx from "../../components/headerx/Headerx";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const Agence = () => {
  localStorage.removeItem("selectedVoiture");
  localStorage.removeItem("selectedmodeles");

  const [openDate, setOpenDate] = useState(true);
  const [selectedDates, setSelectedDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <div>
      <Helmet>
        <title>agences</title>
        <meta name="description" content="voici nos agences disponibles " />
        <link rel='canonical' href='https://kiraadz.com/agences' />
      </Helmet>
      <Navbar />
      <Headerx />
      <br />
      <br />


      <div className="homeContainer">
        <h1 className="homeTitlee" style={{ color: "#0071c2" }}>
          NOS AGENCES
        </h1>
        <FeaturedPropertiesx selectedDates={selectedDates} />
      </div>
      <Footer />
    </div>
  );
};

export default Agence;