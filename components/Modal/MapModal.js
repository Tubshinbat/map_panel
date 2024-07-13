import { Button, Modal } from "antd";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 47.918873,
  lng: 106.91748,
};

const MapModal = ({ handleCancel, handleMap, open, markerPosition }) => {
  const [place, setPlace] = useState(null);

  const handleMapClick = (event) => {
    const newMarkerPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setPlace(newMarkerPosition);
  };

  useEffect(() => {
    setPlace(null);
    return () => {
      setPlace(null);
    };
  }, []);

  return (
    <Modal
      open={open}
      title="Газрын зураг"
      onCancel={() => handleCancel()}
      footer={[
        <Button key="back" onClick={() => handleCancel()}>
          Буцах
        </Button>,
        <Button
          key="submit"
          htmlType="submit"
          type="primary"
          onClick={() => handleMap(place)}
        >
          {" "}
          Хадгалах
        </Button>,
      ]}
    >
      <div className="modal-google-map-body">
        <LoadScript googleMapsApiKey="AIzaSyDXBfW8YSBnVy03efS9xXW3gEM_BI5qPWs">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={14}
            onClick={(event) => handleMapClick(event)}
          >
            {place ? (
              <Marker position={place} />
            ) : (
              markerPosition && <Marker position={markerPosition} />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </Modal>
  );
};

export default MapModal;
