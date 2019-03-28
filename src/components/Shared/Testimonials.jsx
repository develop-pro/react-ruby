import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import testimonialBg from '../../images/testimonial-bg.jpg'
import testimonialImg from '../../images/testimonial-img.png';
import haddSupporter from '../../images/hadd-supporter.jpg';
import Radium from 'radium';
import Testimonial from './Testimonial';

const styles = {
  testimonial: {
    color: '#fff',
    padding: '100px 0 30px',
    background: `url(${testimonialBg}) top`,
    '@media screen and (minWidth: 992px)': {
      background: `url(${testimonialBg}) top repeat-x`,
    },
    textAlign: 'center',
    p: {
      margin: '0 0 55px',
      padding: 0,
      fontSize: 20,
      fontWeight: 500,
    },
  },
  h2: {
    fontSize: 30,
    fontWeight: 700,
    textTransform: 'uppercase',
    margin: '0 0 40px',
    padding: '0 0 15px',
    background: `url(${haddSupporter}) bottom no-repeat`,
  },
  p: {
    fontSize: 18,
    color: '#fff',
    margin: 0,
    padding: '15px 0 0',
    fontFamily: 'Calibri'
  },
  block: {
    width: '80%',
    margin: 'auto',
  }
}

const message = "Excellent service offering a personal touch, if I had an issue " +
              "they were no longer than a phone call away and were always quick " +
              "to respond.";

const testimonials = [
  {
    name: "Alex Jones",
    message: message,
    image: testimonialImg,
  },
  {
    name: "Jason Stokes",
    message: message,
    image: testimonialImg,
  },
  {
    name: "Ann Kelly",
    message: message,
    image: testimonialImg,
  },
  {
    name: "Spencer Finnell",
    message: message,
    image: testimonialImg,
  }
];

const Header = () => (
  <div>
    <h2 style={styles.h2}>Kind Words From Happy Campers</h2>
    <p style={styles.testimonial.p}>What other people thought about the service provided by QuirkyCoders &trade;!</p>
  </div>
)

const Body = () => (
  <Row>
    {testimonials.map((testimonial, i) =>
      <Col md={12 / testimonials.length} key={i}>
        <Testimonial {...testimonial}/>
      </Col>
    )}
  </Row>
)

class Testimonials extends Component {
  render() {
    return (
      <div style={styles.testimonial} className="testimonials">
        <div style={styles.block}>
          <Header />
          <Body />
        </div>
      </div>
    );
  }
}

export default Radium(Testimonials);
