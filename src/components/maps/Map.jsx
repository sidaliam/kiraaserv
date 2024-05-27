import "leaflet/dist/leaflet.css";
import "./map.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useState, useEffect } from "react";
import { Icon, divIcon, point } from "leaflet";
import useF from "../../Hooks/useF";
import { useNavigate } from "react-router-dom";

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
    const data = await response.json();
    if (data.length > 0) {
      const { lat, lon } = data[0];
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    } else {
      throw new Error("Adresse non trouvée");
    }
  };

  useEffect(() => {
    const updateMarkers = async () => {
      if (data && data.length > 0) {
        const newMarkers = await Promise.all(
          data.map(async (hotel) => {
            try {
              const coords = await fetchCoordinates(hotel.address);
              return {
                geocode: [coords.lat, coords.lng],
                popUp: hotel.name,
                id: hotel._id,
              };
            } catch (error) {
              console.error(
                `Erreur lors du géocodage de l'adresse ${hotel.address}:`,
                error
              );
              return null;
            }
          })
        );
        // Use a Set to filter out duplicates
        const uniqueMarkers = new Set(
          newMarkers
            .filter((marker) => marker !== null)
            .map((marker) => JSON.stringify(marker))
        );
        setMarkers(
          Array.from(uniqueMarkers).map((marker) => JSON.parse(marker))
        );
      }
    };
    updateMarkers();
  }, [data]);

  const handleMarkerClick = (id) => {
    navigate(`/hotels/${id}`);
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
          <Marker key={index} position={marker.geocode} icon={customIcon}>
            <Popup className="popupclass">
              {marker.popUp}{" "}
              <br />
              <br />
              <button
                style={{ backgroundColor: "#007bff",color:"#fff" }}
                onClick={() => handleMarkerClick(marker.id)}
              >
                {" "}
                voir l'agence
              </button>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;
