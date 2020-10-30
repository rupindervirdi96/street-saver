const axios = require("axios");

export const getAddress = (data) => async (dispatch) => {
  const addressInfo = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.lat},${data.lng}`,
    {
      params: {
        key: "AIzaSyA81QSQg_O_MsAxRcW5u3rIagKmtO1jZuQ",
      },
    }
  );
  const properAddress = addressInfo.data.results[0].formatted_address;
  const coordinates = addressInfo.data.results[0].geometry.location;
  return { address: properAddress, coordinates };
};

export const getLocation = (data) => async (dispatch) => {
  try {
    const locationInfo = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: data,
          key: "AIzaSyA81QSQg_O_MsAxRcW5u3rIagKmtO1jZuQ",
          region: "CA",
        },
      }
    );
    const properAddress = locationInfo.data.results[0].formatted_address;
    const coordinates = locationInfo.data.results[0].geometry.location;
    return { address: properAddress, coordinates };
  } catch (error) {}
};

export const reportIssue = (data) => async (dispatch) => {
  try {
    const report = await axios.post(
      "http://localhost:1000/api/report/new",
      data
    );
    if (report.success == false) {
      return false;
    }
    console.log("Report submitted");
    return true;
  } catch (error) {
    console.log(error.message);
  }
};
