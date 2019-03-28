import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Radium from 'radium';
import Main from '../../Main';
import './DefaultLayout.css';
import BackToTop from './BackToTop';
import {Loader} from '../Shared';

const DefaultLayout = (props) => (
  <div>
    <Header {...props}/>
    <Main {...props}/>
    <Footer {...props}/>
    <BackToTop/>
    <Loader/>
  </div>
)

export default Radium(DefaultLayout);
