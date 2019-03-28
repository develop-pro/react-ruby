import React, {Component} from 'react';
import JobForm from './JobForm';
import {Grid, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
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

const HorizontalRule = styled.hr`
  width: 100%;
  float: left;
  margin: 30px 0 40px;
  padding: 0;
  background-color: #e0e0e0;
`

export default class PostJob extends Component {

  componentWillMount() {
    window.scrollTo(0,0);
  }

  render() {
    return (
      <Container id='EditJob'>
        <Row>
          <Col className="billing_container new_job_bg" md={12}>
            <PageTitle className="billing_title">Edit Job Posting</PageTitle>
            <HorizontalRule/>
            <JobForm {...this.props}/>
          </Col>
        </Row>
      </Container>
    )
  }
}
