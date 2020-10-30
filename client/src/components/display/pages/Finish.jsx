import { Button } from "@material-ui/core";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { ReactComponent as MailSentSVG } from "../../../assets/sent.svg";
import { CHANGE_TAB } from "../../../actions/types";

const FinishStyles = styled.div``;

const Finish = ({}) => {
  const dispatch = useDispatch();
  return (
    <FinishStyles>
      <MailSentSVG width={400} />
      <Button
        onClick={() => dispatch({ type: CHANGE_TAB, payload: 0 })}
        size="large"
        variant="outlined"
      >
        WANT TO REPORT ANOTHER ISSUE?
      </Button>
    </FinishStyles>
  );
};
export default memo(Finish);
