import React from 'react';
import Radium from 'radium';
import employee_banner_bg from '../../images/employee_banner_bg.jpg';
import { Row, Col } from 'react-bootstrap';
import { Button, TextBox } from '../Shared/FormHelpers'
import styled from 'styled-components'

const Container = styled.div`
  font-family: 'Raleway';
  background: url(${employee_banner_bg}) top center repeat-x;
  margin: 0;
  padding: 220px 0 305px;
  @media screen and (max-width: 768px) {
    padding: 100px 0px 130px;
  }
  @media screen and (max-width: 414px) {
    padding: 100px 0px 130px;
  }
`

const styles = {
  employee_banner: {
    h1: {
      width: '100%',
      textAlign: 'center',
      margin: '0 0 30px',
      color: '#39b54a',
      fontWeight: 400,
      fontSize: 40,
      '@media screen and (minWidth: 992px)': {
        fontSize: 40,
      }
    },
    p: {
      color: '#fff',
      textAlign: 'center',
      width: '45%',
      margin: '20px auto 0'
    },
    noGutter: {
      marginRight: 0,
      marginLeft: 0,
    },
  },
}

const Header = () => (
  <h1 style={styles.employee_banner.h1}>Search Across Our Tech Jobs!</h1>
)

const Body = (props) => (
  <Row style={styles.employee_banner.noGutter}>
    <Col xs={12} md={4} mdOffset={2}>
      <TextBox height={58} {...props}  type="text" name="keywords" placeholder="Job title, keywords or company name" onChange={props.handleChange}/>
    </Col>
    <Col xs={12} md={2}>
      <TextBox height={58} {...props}  type="text" name="location" placeholder="City or State" onChange={props.handleChange}/>
    </Col>
    <Col xs={12} md={2}>
      <Button height={58} fontWeight={700} {...props} type="button" value="Search"/>
    </Col>
  </Row>
)

const Footer = () => (
  <p style={styles.employee_banner.p}>
    Looking for that big career move? Your in the right place. Find the job that you've been always been dreaming of.
  </p>
)

const SearchBanner = (props) => (
  <Container style={styles.employee_banner}>
    <div className="search-banner animated flipInX">
      <Header />
      <Body {...props}/>
      <Footer />
    </div>
  </Container>
)

export default Radium(SearchBanner);
