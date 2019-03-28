import React, {Component} from 'react';
import styled from 'styled-components';
import {Grid, Row, Col} from 'react-bootstrap';
import bottomBorder from '../../images/hadding-suprt.jpg';
import {CheckoutForm} from '.';
import {Elements} from 'react-stripe-elements';

const Container = styled(Grid)`
  font-family: 'Raleway';
  color: #636464;
  padding: 100px 20px
`
const PageTitle = styled.h1`
  width: 100%;
  float: left;
  text-align: center;
  background: url(${bottomBorder}) bottom center no-repeat;
  padding: 0 0 25px;
  margin: 0 0 25px;
  color: #0071bc;
  font-size: 30px;
  text-transform: uppercase;
  font-weight: 700;
`

const Content = styled.p`
  width: 100%;
  float: left;
  margin: 0 0 10px;
  padding: 0;
  font-size: 20px;
  text-align: center;
  font-family: Calibri;
`

const HorizontalRule = styled.hr`
  width: 100%;
  float: left;
  margin: 30px 0 40px;
  padding: 0;
  background-color: #e0e0e0;
`

export default class Checkout extends Component {
  render() {
    return (
      <Container>
      	<Row>
      		<Col md={12} className="billing_container new_job_bg">
      			<PageTitle>Provide Billing Information</PageTitle>
      			<Content>Get Limited access to our resume database and social recuiting platform with the purchase of one job post!</Content>
      			<HorizontalRule />
            <Elements>
              <CheckoutForm {...this.props}/>
            </Elements>
          </Col>
        </Row>
      </Container>
    );
  }
}
