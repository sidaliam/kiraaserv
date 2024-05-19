// ReservationDetailsPage.js
import React, { useContext } from "react";
import "./ReservationDetailsPage.css"; // Importez le fichier CSS
import { GlobalContext } from "../../Context/ReservationContext";
import Navbar from "../../components/navbar/Navbar";
import { Helmet } from 'react-helmet-async';
import Header from "../../components/headerx/Headerx";



const ReservationDetailsPage = () => {
  const { reservationDetails, removeReservationDetails } =
    useContext(GlobalContext);
  const { decreaseReservationCount } = useContext(GlobalContext);
  const handleCancelReservation = (id) => {
    // Assurez-vous que removeReservationDetails est défini
    if (removeReservationDetails) {
      decreaseReservationCount();
      removeReservationDetails(id);
    } else {
      console.error("removeReservationDetails is not defined");
    }
  };
  console.log(reservationDetails); // Placer le console.log ici pour vérifier les données de photos


  return (
    <>
    <Helmet>
        <title>details reservations</title>
        <meta name="description" content="vous allez trouver vos reservations"/>      </Helmet>
    <div>
      <Navbar />
      <Header/>
      <h1 className="h1">Détails de réservations</h1>
      <ul className="ul">
        {reservationDetails.map((details, index) => (
          <li className="li" key={index}>
            <p className="p">modèle : {details.modele}</p>
            <p className="p">dates : {details.dates}</p>
         <br/>
            <button onClick={() => handleCancelReservation(details.id)}>
              Annuler
            </button>

            {/* Ajoutez d'autres détails que vous souhaitez afficher */}
          </li>
        ))}
      </ul>
      
    </div>
    
    </>
  );
};

export default ReservationDetailsPage;