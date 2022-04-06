import React from "react";
import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapComponent = () => {
  const iconPerson = new L.Icon({
    iconUrl: require("../images/cupcake.jpg"),
    iconRetinaUrl: require("../images/cupcake.jpg"),
    iconAnchor: null,
    popupAnchor: [4, -30],
    iconSize: new L.Point(25, 25),
    className: "leaflet-div-icon",
  });
  return (
    <Wrapper>
      <div className="info-map">
        HomeChef,
        <br />
        Ada Ciganlija,
        <br />
        Belgrade, <br />
        Serbia
        <br />
      </div>
      <div className="map-wrap">
        <MapContainer
          center={[44.78920238500794, 20.394321895694482]}
          zoom={13}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            icon={iconPerson}
            position={[44.78920238500794, 20.394321895694482]}
          >
            <Popup>
              <p>Let's make some cakes! ;)</p>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 60vh;
  background-color: rgba(0, 0, 0, 0.8);
  width: 40vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 20px;

  .map-wrap {
    background: rgba(8, 253, 216, 0.1);
    float: right;
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }

  .leaflet-container {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }

  .info-map {
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    bottom: 20px;
    right: 0%;
    z-index: 999999;
    width: 167px;
    padding: 10px;
    color: #fff;
    font-family: "Helvetica";
    font-size: 17px;
    font-weight: 300;

    span {
      font-size: 16px;

      span {
        color: #ffd700;
      }
    }
  }
`;
export default MapComponent;
