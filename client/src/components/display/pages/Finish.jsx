import { Button } from "@material-ui/core";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as MailSentSVG } from "../../../assets/sent.svg";
import { RESET } from "../../../actions/types";

const Finish = ({}) => {
  const dispatch = useDispatch();

  return (
    <>
      <MailSentSVG width={400} />
      <Button
        onClick={() => dispatch({ type: RESET })}
        size="large"
        variant="outlined"
      >
        WANT TO REPORT ANOTHER ISSUE?
      </Button>
    </>
  );
};
export default memo(Finish);
