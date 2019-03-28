import React from 'react';
import Radium from 'radium';
import { Row, Col } from 'react-bootstrap';
import ResumePlan from './ResumePlan';
import haddSupporter from '../../images/hadd-supporter.jpg';

const styles = {
  resumePlans: {
    borderBottom: '1px solid #9cdaa5',
    margin: '40px 0 0',
    color: '#fff',
    height: 350,
    '@media screen and (minWidth: 992px)': {
      height: 490,
    },
    h2: {
      fontSize: 30,
      fontWeight: 700,
      textTransform: 'uppercase',
      margin: '0 0 40px',
      padding: '0 0 15px',
      background: `url(${haddSupporter}) bottom no-repeat`,
      color: '#fff',
      textAlign: 'center',
    },
    p: {
      margin: '0',
      padding: 0,
      fontSize: 20,
      fontWeight: 500,
      textAlign: 'center',
    },
  },
  block: {
    width: '80%',
    margin: 'auto',
  },
  noGutter: {
    marginRight: 0,
    marginLeft: 0,
  },
  footer: {
    background: '#fff',
    height: 320
  },
}

const addToCart = "Add to cart";
const addToCartLink = "#";

const plans = [
  {
    description: "$39 for 1 job listed for 60 days",
    price: "$35",
    title: "Intern Package",
    message: "One Time Fee Allows 1 Resume Posting Non-Highlighted Post",
    linkTitle: addToCart,
    link: addToCartLink,
  },
  {
    description: "$79 for 1 job listed for 190 days",
    price: "$79",
    title: "Professional Package",
    message: "One Time Fee Posted For One Year Allows 1 Resume Posting Featured Highlighted Resume Visible",
    linkTitle: addToCart,
    link: addToCartLink,
  },
  {
    description: "$199 for 1 job listed for 365 days",
    price: "$199",
    title: "Elite Package",
    message: "One Time Fee Posted For One Year Allows 1 Resume Posting Featured Highlighted Resume Visible",
    linkTitle: addToCart,
    link: addToCartLink,
  },
];

const Header = () => (
  <Row style={styles.noGutter}>
    <Col md={12}>
      <h2 style={styles.resumePlans.h2}>Resume Plans & Pricing</h2>
      <p style={styles.resumePlans.p}>Post your resume on our site and get maximum exposure for your resume.</p>
    </Col>
  </Row>
)

const Body = () => (
  <div style={styles.block}>
    <Row style={styles.resumePlans}>
      { plans.map((plan, i) =>
        <Col xs={12} md={4} key={i}>
          <ResumePlan {...plan}/>
        </Col>
      )}
    </Row>
  </div>
)

const Footer = () => (
  <div style={styles.footer}></div>
)

const ResumePlans = () => (
  <div>
    <div className="resume-plans" style={styles.resumePlans}>
      <Header />
      <Body />
    </div>
    <Footer />
  </div>
)

export default Radium(ResumePlans);
