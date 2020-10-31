import React, { memo } from "react";
import styled from "styled-components";
import Issue from "./pages/Issue";
import Location from "./pages/Location";
import Details from "./pages/Details";
import Finish from "./pages/Finish";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_TAB, ENABLE_ALERT_MESSAGE } from "../../actions/types";
import { Button } from "@material-ui/core";
import { reportIssue } from "../../actions/app.action";

const DisplayStyles = styled.div`
  width: 600px;
  margin-bottom: 40px;
  border-radius: 14px;
  border: 1px solid rgba(0, 104, 171, 0.1);
  display: grid;
  grid-template-rows: 1fr max-content;
  justify-items: center;
  .action-wrapper {
    width: max-content;
    margin: 30px;
    & > * {
      margin: 0 10px;
    }
  }
`;

const Display = () => {
  const dispatch = useDispatch();

  const {
    app: { selectedTab, form },
  } = useSelector((state) => ({
    app: state.app,
  }));

  const nextTab = () => {
    const msg =
      selectedTab === 0
        ? "Please select a type of issue"
        : selectedTab === 1
        ? "Please select an address"
        : "Fill the Information";

    const checkData =
      form?.details?.email !== "" &&
      form?.details?.fname !== "" &&
      form?.details?.lname !== "" &&
      form?.details?.description !== "";

    if (
      (form.issue !== null && selectedTab === 0) ||
      (form.location !== null) & (selectedTab === 1) ||
      checkData & (selectedTab === 2)
    ) {
      dispatch({ type: CHANGE_TAB, payload: selectedTab + 1 });

      if (checkData & (selectedTab === 2)) dispatch(reportIssue(form));
    } else {
      // alert(msg);
      dispatch({
        type: ENABLE_ALERT_MESSAGE,
        payload: {
          message: msg,
          type: "error",
        },
      });
    }
  };

  const backTab = () => {
    dispatch({ type: CHANGE_TAB, payload: selectedTab - 1 });
  };

  return (
    <DisplayStyles>
      {selectedTab === 0 ? (
        <Issue />
      ) : selectedTab === 1 ? (
        <Location />
      ) : selectedTab === 2 ? (
        <Details />
      ) : (
        <Finish />
      )}

      <div className="action-wrapper">
        {selectedTab !== 3 ? (
          <>
            {selectedTab !== 0 ? (
              <Button size="large" variant="outlined" onClick={backTab}>
                Back
              </Button>
            ) : null}
            <Button size="large" variant="outlined" onClick={nextTab}>
              {selectedTab === 2 ? "Submit" : "Next"}
            </Button>
          </>
        ) : null}
      </div>
    </DisplayStyles>
  );
};

export default memo(Display);
