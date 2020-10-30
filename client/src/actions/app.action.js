import { SET_LOCATION } from "./types";

const axios = require("axios");

export const getAddress = (data, type) => async (dispatch) => {
  try {
    let res = null;

    if (type === "click") {
      res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.lat},${data.lng}`,
        { params: { key: "AIzaSyA81QSQg_O_MsAxRcW5u3rIagKmtO1jZuQ" } }
      );
    }

    if (type === "search") {
      res = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            address: data,
            key: "AIzaSyA81QSQg_O_MsAxRcW5u3rIagKmtO1jZuQ",
            region: "CA",
          },
        }
      );
    }

    const properAddress = res.data.results[0].formatted_address;
    const coordinates = res.data.results[0].geometry.location;

    dispatch({
      type: SET_LOCATION,
      payload: { address: properAddress, coordinates },
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const reportIssue = (data) => async (dispatch) => {
  try {
    const report = await axios.post(
      "http://localhost:1000/api/report/new",
      data
    );
    if (!report.success) return false;
    else return true;
  } catch (error) {
    console.log(error.message);
  }
};
