import { ENABLE_ALERT_MESSAGE, SET_LOCATION } from "./types";

const axios = require("axios");

export const getAddress = (data, type) => async (dispatch) => {
  try {
    let res = null;

    if (type === "click") {
      res = await axios.get(
        `${process.env.REACT_APP_MAPS_API_URL}?latlng=${data.lat},${data.lng}`,
        { params: { key: process.env.REACT_APP_MAPS_API } }
      );
    }

    if (type === "search") {
      res = await axios.get(process.env.REACT_APP_MAPS_API_URL, {
        params: {
          address: data,
          key: process.env.REACT_APP_MAPS_API,
          region: process.env.REACT_APP_MAPS_REGION,
        },
      });
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
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const report = await axios.post(
      "https://street-saver.onrender.com/api/report",
      data,
      config
    ).data;

    if (report.success) {
      dispatch({
        type: ENABLE_ALERT_MESSAGE,
        payload: {
          message: report.msg,
          type: "success",
        },
      });
    } else {
      dispatch({
        type: ENABLE_ALERT_MESSAGE,
        payload: {
          message: report.msg,
          type: "error",
        },
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
