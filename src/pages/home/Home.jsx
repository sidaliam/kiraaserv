import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";
import { Helmet } from 'react-helmet-async';


const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Kiraa</title>
        <meta name="description" content="vous allez découvrir nos voitures et agences de location de voitures en algerie,rent cars in algeria  "/>      </Helmet>
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <Featured/>
        
        <h1 className="homeTitlee" style={{color : "orange"}}>nos voitures</h1>
        <FeaturedProperties/>
        
        
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
