import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { SELECT_ISSUE } from "../../../actions/types";
import { ReactComponent as BumpsSVG } from "../../../assets/bump.svg";
import { ReactComponent as PotholeSVG } from "../../../assets/potholes.svg";

const IssueStyles = styled.div`
  padding: 30px;
  h1 {
    margin-bottom: 14px;
  }
  p {
    margin-bottom: 45px;
  }
  .option-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
`;

const Option = styled.div`
  height: 180px;
  background: rgba(0, 104, 171, 0.1);
  border: 5px solid
    ${(props) => (props.selected ? "#0068AB" : "rgba(0, 104, 171, 0.1)")};
  border-radius: 14px;
  text-align: center;
  transition: border 0.3s ease;
  svg {
    display: block;
    margin: 60px auto;
    margin-bottom: 20px;
  }
`;
const Issue = () => {
  const dispatch = useDispatch();

  const {
    app: { form },
  } = useSelector((state) => ({
    app: state.app,
  }));

  const selectHandler = (issue) =>
    dispatch({ type: SELECT_ISSUE, payload: issue });

  return (
    <IssueStyles>
      <h1>What do you want to report?</h1>
      <p>Select one of the below to proceed...</p>
      <div className="option-wrapper">
        <Option
          onClick={() => selectHandler("potholes")}
          selected={form.issue === "potholes"}
        >
          <PotholeSVG />
          <span>Potholes</span>
        </Option>
        <Option
          onClick={() => selectHandler("bumps")}
          selected={form.issue === "bumps"}
        >
          <BumpsSVG />
          <span>Bumps</span>
        </Option>
      </div>
    </IssueStyles>
  );
};

export default memo(Issue);
