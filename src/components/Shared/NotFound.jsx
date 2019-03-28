import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Radium from 'radium';
import Testimonials from '../Shared/Testimonials.jsx'
import headerBg from '../../images/landing-banner-bg.jpg';
import blockSupporter from '../../images/three-block-supporter.jpg';
import { Question, Quote, RecruitmentPlans, Clients } from '../Shared';

const styles = {
  headerBg: {
    background: `url(${headerBg}) top center no-repeat`,
    padding: '230px 0 0',
    textAlign: 'center',
    '@media screen and (maxWidth: 767px)': {
      padding: '0'
    }
  },
  h1: {
    padding: 0,
    fontSize: 60,
    color: '#fff',
    fontWeight: 600,
    fontFamily: "'Raleway', 'sans-serif'"
  },
  container: {
    fontFamily: 'sans-serif'
  },
  green: {
    color: '#39b54a'
  },
  p: {
    margin: 0,
    padding: 0,
    fontSize: 22,
    color: '#39b54a',
    fontWeight: 600,
    fontFamily: "'Raleway', 'sans-serif'"
  },
  h2: {
    fontSize: 20,
    color: '#0071bc',
    textTransform: 'uppercase',
    padding: '0 0 15px',
    background: `url(${blockSupporter}) bottom no-repeat`,
    fontWeight: 700,
    textAlign: 'center'
  },
}

const Header = () => (
  <div>
    <h1 style={styles.h1} className="header">
      <span style={styles.green}>Hire</span> The Best In Tech
    </h1>
    <p style={styles.p}>Put millions of qualified tech candidates at your fingertips</p>
  </div>
)

const quote = {
  message: "I jumped on QuirkyCoders and in two hours, I found the right person",
  name: "Spenser Pryor",
  position: "Talent Acquisition Manager",
  company: "Pier 1 Imports",
}

class NotFound extends Component {
  render() {
    return (
      <Grid style={styles.container} fluid>
        <Row style={styles.headerBg}>
          <Col>
            <Header />
            <RecruitmentPlans />
            <Quote {...quote}/>
            <Clients />
            <Testimonials />
            <Question />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Radium(NotFound);
