import React, { memo, useState } from "react";
import styled from "styled-components";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { TextField, CircularProgress } from "@material-ui/core";
import axios from "axios";
import markerImg from "../../../assets/marker.png";
import { useDebugValue } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocation, getAddress } from "../../../actions/app.action";
import { SET_LOCATION } from "../../../actions/types";
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

  const [address, setAddress] = useState("");

  const [markers, setMarkers] = useState([]);

  const [currMarker, setCurrMarker] = useState({
    lat: 45.4972159,
    lng: -73.6103642,
  });

  const [viewport, setViewport] = useState({
    latitude: 45.4972159,
    longitude: -73.6103642,
    zoom: 10,
    height: "400px",
    width: "100%",
  });

  // const [longitude, setLongitude] = useState(-73.6103642);
  // const [latitude, setLatitude] = useState(45.4972159);

  const onClick = async (e) => {
    const data = await dispatch(
      getAddress({ lat: e.lngLat[1], lng: e.lngLat[0] })
    );
    document.querySelector(".search-bar").value = data.address;
    dispatch({ type: SET_LOCATION, payload: data });
  };

  const onChange = async (e) => {
    setAddress(e.target.value);

    if (e.key === "Enter") {
      const mapValues = await dispatch(getLocation(address));
      dispatch({ type: SET_LOCATION, payload: mapValues });

      // setLongitude(mapValues.coordinates.lng);

      // setLatitude(mapValues.coordinates.lat);

      setCurrMarker(mapValues.coordinates);

      setAddress(mapValues.address);

      console.log(mapValues);
    }
  };

  return (
    <LocationStyles>
      <h1>Where is the issue?</h1>
      <p>Enter the address where you saw the problem..</p>
      <ReactMapGL
        style={{ textAlign: "left" }}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        mapStyle="mapbox://styles/rupindervirdi/ckgrijmq10cgt19lkq0lqh8ww"
        onClick={onClick}
      >
        <SearchBar
          className="search-bar"
          onKeyDown={onChange}
          placeholder="Address here"
        />
        {/* {markers.map((marker, i) => {
          return (
            <Marker latitude={marker.lat} currMarker={marker.lng}>
              <BtnStyles>
                <img src={markerImg} alt="marker" />
              </BtnStyles>
            </Marker>
          );
        })} */}
        <Marker latitude={currMarker.lat} longitude={currMarker.lng}>
          {/* <BtnStyles> */}
          <img src={markerImg} height="20px" width="20px" alt="marker" />
          {/* </BtnStyles> */}
        </Marker>
      </ReactMapGL>
    </LocationStyles>
  );
};

export default memo(Location);
