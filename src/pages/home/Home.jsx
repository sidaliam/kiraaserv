import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";
import { Helmet } from "react-helmet-async";
import GooglePlay from "../../image/google-play-badge.png";
import AppStore from "../../image/Download_on_the_App_Store_Badge_FR_RGB_blk_100517.svg";
import im from "../../image/435-Car.png";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Kiraa</title>
        <meta
          name="description"
          content="vous allez découvrir nos voitures et agences de location de voitures en algerie,rent cars in algeria  "
        />{" "}
      </Helmet>
      <Navbar />
      <Header />
      <br />
      <br />
      <br />
<br />
<br />

      <div className="homeContainer">


        <h1 className="homeTitlee"  style={{ color: "#0071c2" }}>
          Nos Voitures
        </h1>
        <FeaturedProperties />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
