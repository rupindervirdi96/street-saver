import React, { memo } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { DISABLE_ALERT_MESSAGE } from "../../actions/types";

function AlertELE(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& >  + ": {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alert() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const show = useSelector((state) => state.alert.show);
  const type = useSelector((state) => state.alert.type);
  const message = useSelector((state) => state.alert.message);
  return (
    <div className={classes.root}>
      <Snackbar
        key={message}
        open={show}
        autoHideDuration={2000}
        // onClose={() => dispatch({ type: DISABLE_ALERT_MESSAGE })}
      >
        <AlertELE
          onClose={() => dispatch({ type: DISABLE_ALERT_MESSAGE })}
          severity={type}
        >
          {message}
        </AlertELE>
      </Snackbar>
    </div>
  );
}

export default memo(Alert);
