import "leaflet/dist/leaflet.css";
import "./map.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useState, useEffect } from "react";
import { Icon, divIcon, point } from "leaflet";
import useF from "../../Hooks/useF";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer"; // Assurez-vous que ce module est installé

const Map = () => {
  localStorage.removeItem("selectedVoiture");
  localStorage.removeItem("selectedmodeles");
  const { data } = useF("/hotels");
  const [markers, setMarkers] = useState([]);
  const navigate = useNavigate();

  const customIcon = new Icon({
    iconUrl: require("../../image/placeholder.png"),
    iconSize: [38, 38], // size of the icon
  });

  // Custom cluster icon
  const createClusterCustomIcon = (cluster) => {
    return new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };

  const fetchCoordinates = async (address) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`
    );
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    if (data.length > 0) {
      const { lat, lon } = data[0];
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    } else {
      throw new Error("Adresse non trouvée");
    }
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const updateMarkers = async () => {
      if (data && data.length > 0) {
        console.log("Données reçues:", data); // Ajout de log
        const limitedData = data.slice(0, 20); // Limiter à 20 marqueurs pour le test
        const newMarkers = [];
        for (const hotel of limitedData) {
          try {
            const coords = await fetchCoordinates(hotel.address);
            console.log(`Coordonnées pour ${hotel.name}:`, coords); // Ajout de log
            newMarkers.push({
              geocode: [coords.lat, coords.lng],
              popUp: hotel.name,
              id: hotel._id,
            });
            await sleep(1000); // Ajouter un délai d'une seconde entre les requêtes
          } catch (error) {
            console.error(
              `Erreur lors du géocodage de l'adresse ${hotel.address}:`,
              error
            );
          }
        }
        const uniqueMarkers = new Set(
          newMarkers.map((marker) => JSON.stringify(marker))
        );
        const finalMarkers = Array.from(uniqueMarkers).map((marker) =>
          JSON.parse(marker)
        );
        console.log("Marqueurs finaux:", finalMarkers); // Ajout de log
        setMarkers(finalMarkers);
      }
    };
    updateMarkers();
  }, [data]);

  const handleMarkerClick = (id) => {
    navigate(`/hotels/${id}`);
  };

  const LazyMarker = ({ position, icon, children }) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      rootMargin: '200px',
    });

    return inView ? (
      <Marker position={position} icon={icon}>
        {children}
      </Marker>
    ) : (
      <div ref={ref}></div>
    );
  };

  return (
    <MapContainer center={[36.737232, 3.086472]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {markers.map((marker, index) => (
          <LazyMarker key={index} position={marker.geocode} icon={customIcon}>
            <Popup className="popupclass">
              {marker.popUp}{" "}
              <br />
              <br />
              <button
                style={{ backgroundColor: "#007bff", color: "#fff" }}
                onClick={() => handleMarkerClick(marker.id)}
              >
                {" "}
                voir l'agence
              </button>
            </Popup>
          </LazyMarker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;
