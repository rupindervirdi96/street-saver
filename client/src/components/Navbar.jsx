import React, { memo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const NavStyles = styled.div`
  width: 600px;
  display: flex;
  margin-bottom: 30px;
  justify-content: space-evenly;
  color: #fff;
  background: rgba(0, 104, 171, 0.1);
  padding: 12px;
  border-radius: 14px;
  border: 1px solid rgba(0, 104, 171, 0.1);
  .selected {
    background: #0168ab;
    color: #fff;
  }
`;
const TabStyles = styled.div`
  width: 120px;
  height: 40px;
  border-radius: 50px;
  text-align: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  letter-spacing: 0.15px;
  color: rgba(0, 53, 87, 0.5);
`;

const Tab = ({ tabText, selectedTab, index }) => {
  return (
    <TabStyles className={selectedTab === index ? "selected" : ""}>
      {tabText}
    </TabStyles>
  );
};

const Navbar = () => {
  const {
    app: { selectedTab },
  } = useSelector((state) => ({
    app: state.app,
  }));

  return (
    <NavStyles>
      {["Issue", "Location", "Details", "Finish"].map((tab, i) => (
        <Tab tabText={tab} key={tab} index={i} selectedTab={selectedTab} />
      ))}
    </NavStyles>
  );
};

export default memo(Navbar);
