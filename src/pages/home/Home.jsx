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

      <div className="homeContainer">
        <section id="heroSection" className="hero--section">
          <div className="hero--section--content--box">
            <div className="hero--section--content">
              <br />
              <br />
              <h3 className="hero--section--title" style={{ color: "#0071c2" }}>
                KIRAA
              </h3>
              <h1 style={{ color: "#0071c2" }}>pour location de voitures</h1>
              <p className="hero--section-description">
                Bienvenue sur notre plateforme dédiée à la location de voitures,
                une solution polyvalente pour répondre à vos besoins de
                déplacement,Grâce à notre système de réservation en ligne
                intuitif, vous pouvez facilement sélectionner la date de début
                et de fin de votre location ainsi que la wilaya de votre choix,
                vous offrant ainsi un accès instantané à un large éventail de
                véhicules disponibles dans la région désirée. Notre réseau
                étendu de partenaires locaux garantit que vous trouverez
                toujours le véhicule idéal, où que vous soyez dans le pays. Prêt
                à partir à l'aventure ? Réservez dès maintenant votre voiture
                sur notre plateforme et préparez-vous à vivre une expérience
                inoubliable .
              </p>
              <p className="hero--section-descriptionx">
                Découvrez notre plateforme de location de voitures, flexible et
                intuitive. Réservez dès maintenant pour une expérience de voyage
                inoubliable.{" "}
              </p>
            </div>

            <a
              href="lien_vers_google_play_store"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="store-button"
                style={{ backgroundColor: "#f7f7f7" }}
              >
                <img
                  src={GooglePlay}
                  alt="Google Play Store"
                  style={{ width: "160px", height: "60px" }} // Ajustez les dimensions selon vos besoins
                />
              </button>
            </a>
            <a
              href="lien_vers_app_store"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="store-button"
                style={{ backgroundColor: "#f7f7f7" }}
              >
                <img
                  src={AppStore}
                  alt="App Store"
                  style={{ width: "160px", height: "60px" }} // Ajustez les dimensions selon vos besoins
                />
              </button>
            </a>

            <br />
          </div>
          <div className="hero--section--img">
            <img src={im} alt="Hero Section" />
          </div>
        </section>

        <h1 className="homeTitlee" style={{ color: "orange" }}>
          nos voitures
        </h1>
        <FeaturedProperties />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
