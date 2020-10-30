import {
  CHANGE_TAB,
  SELECT_ISSUE,
  SUBMIT_REPORT,
  UPDATE_DETAILS,
  SET_LOCATION,
} from "../actions/types";
import { DETAILS } from "../constants";

const initialState = {
  selectedTab: 0,
  form: {
    issue: null,
    location: null,
    details: DETAILS,
  },
};

const app = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_TAB:
      return {
        ...state,
        selectedTab: payload,
      };
    case SELECT_ISSUE: {
      return {
        ...state,
        form: { ...state.form, issue: payload },
      };
    }
    case UPDATE_DETAILS: {
      return {
        ...state,
        form: { ...state.form, details: payload },
      };
    }
    case SUBMIT_REPORT: {
      return {
        ...state,
        form: { ...state.form, details: payload },
      };
    }
    case SET_LOCATION: {
      return {
        ...state,
        form: { ...state.form, location: payload },
      };
    }
    default:
      return state;
  }
};

export default app;
