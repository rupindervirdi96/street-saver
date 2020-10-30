import React from 'react';
import Navbar from './components/Navbar'
import Display from './components/display/Display'
import './App.css';
import styled from 'styled-components';
import Logo from './assets/logo.png';
import { Provider } from 'react-redux';
import store from './store';
import Snackbar from './components/common/Snackbar';

const AppStyles = styled.div`
  margin: auto;
  dislay: block;
  width: max-content;
  text-align:center;
  img{
    width: 250px;
    margin: 30px 0;
  }

`


const App = () => {
  return (
    <AppStyles>
      <img src={Logo} alt=""/>
      <Navbar />
      <Display />
      <Snackbar/>
    </AppStyles>
  );
}

export default App;
