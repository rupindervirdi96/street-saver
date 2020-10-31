import React, { memo, useState } from "react";
import styled from "styled-components";
import ReactMapGL, { Marker } from "react-map-gl";
import markerImg from "../../../assets/marker.png";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../../actions/app.action";
import { useEffect } from "react";

const LocationStyles = styled.div`
  padding: 30px;
  width: 95%;
  h1 {
    margin-bottom: 14px;
  }
  p {
    margin-bottom: 45px;
  }
`;

const SearchBar = styled.input`
  padding: 14px 16px;
  width: 50%;
  font-size: 14px;
  color: #777;
  margin: 10px;
  border-radius: 4px;
  border: none;
  outline: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

const BtnStyles = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;

  img {
    height: 20px;
    width: 20px;
  }
`;

const Location = () => {
  const dispatch = useDispatch();

  const {
    app: {
      form: { location },
    },
  } = useSelector((state) => ({
    app: state.app,
  }));

  const [address, setAddress] = useState("");

  const [currMarker, setCurrMarker] = useState({ lat: 0, lng: 0 });

  const [viewport, setViewport] = useState({
    latitude: 45.4972159,
    longitude: -73.6103642,
    zoom: 10,
    height: "400px",
    width: "100%",
  });

  const onMapClickHanler = (e) => {
    dispatch(getAddress({ lat: e.lngLat[1], lng: e.lngLat[0] }, "click"));
  };

  const onSearchHandler = (e) => setAddress(e.target.value);

  const onSearchEnter = (e) => {
    if (e.code === "Enter") dispatch(getAddress(address, "search"));
  };

  useEffect(() => {
    if (location?.coordinates) {
      setCurrMarker(location?.coordinates);
      setViewport({
        ...viewport,
        latitude: location?.coordinates.lat,
        longitude: location?.coordinates.lng,
      });
    }
    if (location?.address) setAddress(location?.address);
  }, [location]);

  return (
    <LocationStyles>
      <h1>Where is the issue?</h1>
      <p>Enter the address where you saw the problem..</p>
      <div>
        <SearchBar
          className="search-bar"
          onChange={onSearchHandler}
          onKeyPress={onSearchEnter}
          placeholder="Address here"
          value={address || ""}
        />
        <ReactMapGL
          {...viewport}
          style={{ textAlign: "left" }}
          onViewportChange={setViewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}
          mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
          onClick={onMapClickHanler}
        >
          {currMarker.lat !== 0 && currMarker.lng !== 0 ? (
            <Marker latitude={currMarker.lat} longitude={currMarker.lng}>
              <BtnStyles>
                <img src={markerImg} height="20px" width="20px" alt="marker" />
              </BtnStyles>
            </Marker>
          ) : null}
        </ReactMapGL>
      </div>
    </LocationStyles>
  );
};

export default memo(Location);
