import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useF from "../../Hooks/useF";
import React, { useState } from "react";
import { useContext } from "react";
import "./Reserv.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Authcontext";
import { GlobalContext } from "../../Context/ReservationContext";
import { useEffect } from "react";
import { axiosinstance } from "../../config";
const Reserv = ({ setopen, hotelid, searchcar,datess }) => {

  const reservationContext = useContext(GlobalContext);
  const { increaseReservationCount } = reservationContext;
  const { addReservationDetails } = useContext(GlobalContext);
  const { data } = useF(`/hotels/room/${hotelid}`);
  const [selectedrooms, setselectedrooms] = useState([]);
  const [selectedidrooms, setselectedidrooms] = useState([]);
  const [selectedmodele, setselectedmodele] = useState([]);
  const [selectedpicture, setselectedpicture] = useState([]);
  const [selectedprice, setselectedprice] = useState([]);
  const handleSelect = (e, roomId, itemId, modele, photos, price) => {
    const checked = e.target.checked;
    if (checked) {
      // Ajouter un objet { roomId, itemId } à selectedRooms
      setselectedrooms([...selectedrooms, roomId]);
      // Ajouter l'ID de l'élément sélectionné à la variable selectedidrooms
      setselectedidrooms([...selectedidrooms, itemId]);
      //Ajout du modéle
      setselectedmodele([...selectedmodele, modele]);

      setselectedpicture([...selectedpicture, photos]);

      setselectedprice([...selectedprice, price]);
    } else {
      //Retirer le modéle
      setselectedmodele(selectedmodele.filter((mod) => mod !== modele));
      // Retirer l'objet { roomId, itemId } de selectedRooms
      setselectedrooms(selectedrooms.filter((item) => item !== roomId));
      // Retirer l'ID de l'élément désélectionné de selectedidrooms
      setselectedidrooms(selectedidrooms.filter((id) => id !== itemId));
      // Retirer la photo de l'élément désélectionné de selectedidrooms
      setselectedpicture(selectedpicture.filter((id) => id !== photos));

      setselectedprice(selectedprice.filter((id) => id !== price));
    }
  };

  const [dates, setDates] = useState(null); // State pour stocker les dates sélectionnées localement
  // Effet pour récupérer les dates depuis le stockage local lors du chargement du composant
  useEffect(() => {
    const storedDates = localStorage.getItem("selectedDates");
    if (storedDates) {
      setDates(JSON.parse(storedDates));
    }
  }, []);
  const { user } = useContext(AuthContext);
  const getdateesinrange = (startdate, enddate) => {
    const start = new Date(startdate);
    const end = new Date(enddate);
    const date = new Date(start.getTime());
    let list = [];
    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  };

  const alldates =
    dates && dates[0]
      ? getdateesinrange(dates[0].startDate, dates[0].endDate)
      : [];

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const navigate = useNavigate();
  const handleclick = async () => {
    const formattedDates = alldates.map((date) =>
      new Date(date).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    );

    try {
      increaseReservationCount();
      // Ajouter les détails de la réservation au contexte
      addReservationDetails({
        id: selectedidrooms, // ou un autre identifiant unique
        modele: selectedmodele,
        dates: formattedDates.join(" ,"),
        photos: selectedpicture,
        // Ajoutez d'autres détails que vous souhaitez afficher
      });

      setopen(false);

      const addOrdersPromises = selectedidrooms.map(async (idroom, index) => {
        const model = selectedmodele[index];
        const price = selectedprice[index];
        const idroomnumbeurr = selectedrooms[index];
        return await axiosinstance.post(`/orders/neworder/${user._id}/${idroom}`, {
          unavailable: alldates,
          username: user.username,
          télephone: user.phone,
          modéle: model,
          totale: price * alldates.length,
          idroomnumber: idroomnumbeurr,
        });
      });

      await Promise.all(addOrdersPromises);

      alert("Commande envoyée");
    } catch (err) {
      // Gestion des erreurs ici
      console.error("Une erreur s'est produite :", err);
    }

    console.log("idselectionner", selectedrooms);
    console.log("dates selectionner", alldates);
  };

  return (
    <div className="reserve">
      <div className="Container">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rclose"
          onClick={() => setopen(false)}
        />
        <span>Nos voitures disponibles :</span>

        {searchcar && searchcar.length > 0
          ? // If searchcar exists, display its information
            searchcar.map((item) => (
              <div key={item._id} className="ritem">
                <div className="rinfo">
                  <br />
                  <br />
                  <div className="rdesc">{item.modéle}</div>
                  <div className="rdesc">{item.année}</div>
                  <div className="rdesc">{item.couleur}</div>
                  <div className="rdesc">{item.price} Da</div>
                  <img
                    src={
                      item.photos && item.photos.length > 0
                        ? item.photos[0]
                        : "placeholder.jpg"
                    }
                    alt={item.modéle}
                    className="room-image"
                    style={{ width: "300px", height: "200px" }}
                  />

                  <div className="rSelectRooms">
                    {item.roomNumbers.map((roomNumber) => (
                      <div key={roomNumber._id} className="room">
                        <input
                          type="checkbox"
                          value={roomNumber._id}
                          onChange={(e) =>
                            handleSelect(
                              e,
                              roomNumber._id,
                              item._id,
                              item.modéle,
                              item.photos,
                              item.price
                            )
                          }
                          disabled={!isAvailable(roomNumber)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          : // If searchcar doesn't exist, display data information
            data.map((item) => (
              <div key={item._id} className="ritem">
                {item !== null ? (
                  <div className="rinfo">
                    <div className="rdesc">{item.modéle}</div>
                    <div className="rdesc">{item.année}</div>
                    <div className="rdesc">{item.couleur}</div>
                    <div className="rdesc">{item.price} Da</div>
                    <img
                      src={
                        item.photos && item.photos.length > 0
                          ? item.photos[0]
                          : "placeholder.jpg"
                      }
                      alt={item.modéle}
                      className="room-image"
                      style={{ width: "300px", height: "200px" }}
                    />

                    <div className="rSelectRooms">
                      {item.roomNumbers.map((roomNumber) => (
                        <div key={roomNumber._id} className="room">
                          <input
                            type="checkbox"
                            value={roomNumber._id}
                            onChange={(e) =>
                              handleSelect(
                                e,
                                roomNumber._id,
                                item._id,
                                item.modéle,
                                item.photos,
                                item.price
                              )
                            }
                            disabled={!isAvailable(roomNumber)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="rtitle">not available</div>
                )}
              </div>
            ))}

        <button className="rbutton" onClick={handleclick}>
          Réserver maintenant !
        </button>
      </div>
    </div>
  );
};

export default Reserv;
