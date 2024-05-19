import React from "react";
import "./about.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Helmet } from "react-helmet-async";
import GooglePlay from "../../image/google-play-badge.png";
import AppStore from "../../image/Download_on_the_App_Store_Badge_FR_RGB_blk_100517.svg";
import im from "../../image/435-Car.png";

function ContactPage() {
  return (
    <>
      <Helmet>
        <title>qui sommes nous ?</title>
        <meta
          name="description"
          content="Nous sommes une équipe de développeurs web passionnés,
         unis par notre engagement à créer des solutions innovantes. Notre première création est une
          application web pour les locations de voitures, conçue avec soin pour offrir une expérience 
          fluide et intuitive à nos utilisateurs. Forts de cette réussite,
         nous sommes animés par une ambition débordante ..."
        />{" "}
      </Helmet>
      <Navbar />
      <Header />
      <div class="containerg">
        <div class="contentLeft">
          <div class="row">
            <div class="imgWrapper">
              <img
                src="https://images.pexels.com/photos/9553909/pexels-photo-9553909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />{" "}
            </div>
            <div class="imgWrapper">
              <img
                src="https://images.pexels.com/photos/7988123/pexels-photo-7988123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </div>
            <div class="imgWrapper">
              <img
                src="https://images.pexels.com/photos/6325991/pexels-photo-6325991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </div>
            <div class="imgWrapper">
              <img
                src="https://images.pexels.com/photos/7869312/pexels-photo-7869312.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </div>
          </div>
        </div>
        <section id="heroSection" className="hero--section">
          <div className="hero--section--content--box">
            <div className="hero--section--content">
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
      </div>
      <Footer />
    </>
  );
}

export default ContactPage;
