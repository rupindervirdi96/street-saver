import { TextField } from "@material-ui/core";
import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { DETAILS } from "../../../constants";
import { UPDATE_DETAILS } from "../../../actions/types";
import { useEffect } from "react";

const DetailStyles = styled.div`
  padding: 30px;
  width: 95%;
  h1 {
    margin-bottom: 14px;
  }
  p {
    margin-bottom: 45px;
  }
  .fields {
    display: grid;
    grid-gap: 20px;
    width: 100%;
  }
`;

const Detail = ({}) => {
  const [details, setDetails] = useState(DETAILS);

  const dispatch = useDispatch();

  const onChange = ({ target }) => {
    setDetails({ ...details, [target.name]: target.value });
  };

  useEffect(() => {
    dispatch({ type: UPDATE_DETAILS, payload: details });
  }, [details]);

  return (
    <DetailStyles>
      <h1>Tell us about yourself...</h1>
      <div className="fields">
        <TextField
          className="input-fName"
          onChange={onChange}
          name="fName"
          value={details.fname}
          fullWidth
          id="outlined-basic"
          placeholder="First Name"
          variant="outlined"
          required
        />
        <TextField
          className="input-lName"
          onChange={onChange}
          name="lName"
          value={details.lname}
          fullWidth
          id="outlined-basic"
          placeholder="Last Name"
          variant="outlined"
          required
        />
        <TextField
          className="input-email"
          onChange={onChange}
          name="email"
          value={details.email}
          fullWidth
          id="outlined-basic"
          placeholder="Email"
          variant="outlined"
          required
        />

        <TextField
          className="input-description"
          onChange={onChange}
          name="description"
          value={details.desc}
          fullWidth
          id="outlined-basic"
          multiline
          rows={6}
          placeholder="Description"
          variant="outlined"
          required
        />
      </div>
    </DetailStyles>
  );
};

export default memo(Detail);
