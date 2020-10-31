import { ENABLE_ALERT_MESSAGE, DISABLE_ALERT_MESSAGE } from "../actions/types";

const initialState = {
  show: false,
  message: "",
  type: "",
};

const alert = (state = initialState, { type, payload }) => {
  switch (type) {
    case ENABLE_ALERT_MESSAGE:
      return {
        ...state,
        show: true,
        message: payload.message,
        type: payload.type,
      };
    case DISABLE_ALERT_MESSAGE:
      return {
        ...state,
        show: false,
        message: "",
        type: "",
      };
    default:
      return state;
  }
};
export default alert;
