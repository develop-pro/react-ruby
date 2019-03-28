import React, {Component} from 'react';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom'
import footerBg from '../../images/footer-bg.jpg';
import socialIcons from '../../images/social-icons.png';
import { Grid, Row, Col } from 'react-bootstrap';
import Radium from 'radium';

const styles = {
  container: {
    fontFamily: 'Raleway',
    padding: '40px 0 40px',
    margin: '40px 0 0',
    background: `url(${footerBg}) top center no-repeat #0a3949`,
    color: '#8290a2',
  },
  slogan: {
    color: '#27a338'
  },
  green: {
    margin: '0 0 10px',
    padding: 0,
    color: '#39b54a',
    fontSize: 18,
    fontWeight: 600
  },
  input: {
    height: 47
  },
  p: {
    fontSize: 14,
    color: '#8290a2',
    lineHeight: 1.6
  },
  socialSprite: {
    width: 38,
    height: 38,
    float: 'left',
    margin: '0 11px',
    background: `url(${socialIcons}) 0 0 no-repeat`
  },
  google: {
    background: `url(${socialIcons}) 0 0 no-repeat`
  },
  twitter: {
    background: `url(${socialIcons}) -41px 0 no-repeat`
  },
  facebook: {
    background: `url(${socialIcons}) -82px 0 no-repeat`
  },
  rss: {
    background: `url(${socialIcons}) -124px 0 no-repeat`
  },
  hr: {
    margin: '60px 0 45px',
    backgroundColor: '#8290a2',
    height: 1
  },
  h2: {
    marginBottom: 20
  }
}

class Footer extends Component {
  render() {
    return (
      <footer style={styles.container}>
        <Grid>
          <Row>
            <Col md={4}>
              <h2 style={styles.h2}>
                <Link to="#"><img src={logo} alt="logo"/>&nbsp;</Link>
              </h2>
              <h3 style={styles.green}>Find the job that's right for you.</h3>
              <p style={styles.p}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
            </Col>
            <Col md={5}>
              <h2 style={{...styles.green, margin: '40px 0 20px'}}>Search Jobs</h2>
              <input style={styles.input} type="text" placeholder="Job title, Keywords or Company name" className="form-control"/>
              <Row>
                <Col md={8} style={{marginTop: 10}}>
                  <input style={styles.input} type="text" placeholder="City or State" className="form-control"/>
                </Col>
                <Col md={4} style={{marginTop: 10}}>
                  <Link style={{width: '100%', background: '#0071bc'}} className="btn btn-lg btn-primary" to="/jobs">Search</Link>
                </Col>
              </Row>
            </Col>
            <Col md={3}>
              <h2 style={{...styles.green, margin: '40px 10px 20px'}}>{"Follow Us?"}</h2>
              <div style={{display: 'inline-block'}}>
                <Link style={{...styles.socialSprite, ...styles.google}} to="https://plus.google.com/113793509967046696175/about" target="_blank"></Link>
                <Link style={{...styles.socialSprite, ...styles.twitter}} to="https://twitter.com/quirkycoders" target="_blank"></Link>
                <Link style={{...styles.socialSprite, ...styles.facebook}} to="https://www.facebook.com/quirkycoders" target="_blank"></Link>
                <Link style={{...styles.socialSprite, ...styles.rss}} to="#" target="_blank"></Link>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={styles.hr}></div>
              <div style={{fontSize: 12, textAlign: 'center'}} className="copyright">&copy; 2013-2016 QuirkyCoders. All rights reserved.</div>
            </Col>
          </Row>
        </Grid>
      </footer>
    )
  }
}

export default Radium(Footer);
