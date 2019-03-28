import React, {Component} from 'react';
import styled from 'styled-components';
import {Grid, Row, Col} from 'react-bootstrap';
import bottomBorder from '../../images/hadding-suprt.jpg';

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

export default class OrderComplete extends Component {

  componentWillMount() {
    window.scrollTo(0,0);

    // setTimeout(() => {
    //   this.setState({showLoginAlert: false})
    //   Utils.setUserToken(user, response.data.token)
    //
    //   // Directs user to the appropriate starting page by role
    //   if (user.role === 'employer') {
    //     this.props.history.push('/dashboard/jobs')
    //   } else {
    //     this.props.history.push('/jobs')
    //   }
    // }, 3000)
  }

  render() {
    return (
      <Container>
      	<Row>
      		<Col md={12} className="billing_container new_job_bg">
      			<PageTitle>Order Complete</PageTitle>
      			<Content>Thank you for your purchase. Let us know if we can be of further assistance.</Content>
      			<HorizontalRule />
      			<Content>Your puchase includes limited access to our resume database and social recuiting platform.</Content>
          </Col>
        </Row>
      </Container>
    );
  }
}
