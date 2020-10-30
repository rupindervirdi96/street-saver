import React, { memo } from "react";
import styled from "styled-components";
import Issue from "./pages/Issue";
import Location from "./pages/Location";
import Details from "./pages/Details";
import Finish from "./pages/Finish";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_TAB, ENABLE_ALERT_MESSAGE } from "../../actions/types";
import { reportIssue } from "../../actions/app.action";
import { Button } from "@material-ui/core";

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
    } else {
      alert(msg);
    }
  };

  const backTab = () => {
    dispatch({ type: CHANGE_TAB, payload: selectedTab - 1 });
  };

  const submitHandler = () => {
    console.log(form);
    var fName = document.querySelector(".input-fName").value;
    var lName = document.querySelector(".input-lName").value;
    var email = document.querySelector(".input-email").value;
    var description = document.querySelector(".input-description").value;
    if (fName == "" || lName == "" || email == "" || description == "") {
      alert("One or more fields are empty.");
    } else {
      dispatch(reportIssue(form));
    }
    nextTab();
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
            {selectedTab === 2 ? (
              <Button size="large" variant="outlined" onClick={submitHandler}>
                Submit
              </Button>
            ) : (
              <Button size="large" variant="outlined" onClick={nextTab}>
                Next
              </Button>
            )}
          </>
        ) : null}
      </div>
    </DisplayStyles>
  );
};

export default memo(Display);
