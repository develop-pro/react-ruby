import React from 'react';
import Radium from 'radium';
import logo1 from '../../images/logo1.jpg';
import logo2 from '../../images/logo2.jpg';
import logo3 from '../../images/logo3.jpg';
import prev_img from '../../images/prev.png';
import next_img from '../../images/next.png';
import blockSupporter from '../../images/three-block-supporter.jpg';

const styles = {
  clients: {
    textAlign: 'center',
    padding: '100px 0',
    background: '#fff',
    fontFamily: "'Raleway', 'sans-serif'",
    h1: {
      fontSize: 30,
      color: '#0071bc',
      fontWeight: 700,
      textTransform: 'uppercase',
      background: `url(${blockSupporter}) bottom no-repeat`,
      padding: '0 0 13px',
      margin: '0 0 45px'
    },
    h2: {
      fontSize: 30,
      color: '#0071bc',
      fontWeight: 700,
      textTransform: 'uppercase',
      background: `url(${blockSupporter}) bottom no-repeat`,
      padding: '0 0 13px',
      margin: '0 0 45px'
    },
    p: {
      fontSize: 20,
      color: '#636464',
      fontFamily: 'Calibri',
      margin: '0 0 50px',
      padding: 0
    }
  },
  carousel: {
    img: {
      float: 'left',
      padding:' 0 4.6%',
      lineHeight: 10
    }
  },
}

const Clients = () => (
  <div style={styles.clients} className="clients">
    <h2 style={styles.clients.h1}>Companies We've Helped</h2>
    <p style={styles.clients.p}>Some of the companies we've helped recruit excellent applicants over the years.</p>
    <div style={{position: 'initial'}} id="myCarousel" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        <div className="item active">
          <img style={styles.carousel.img} src={logo1} alt=""/>
          <img style={styles.carousel.img} src={logo2} alt=""/>
          <img style={styles.carousel.img} src={logo3} alt=""/>
        </div>
      </div>
      <a className="carousel-control" href="#myCarousel" data-slide="prev"><img src={prev_img} alt=""/></a>
      <a className="carousel-control" href="#myCarousel" data-slide="next"><img src={next_img} alt=""/></a>
    </div>
  </div>
);

export default Radium(Clients);
