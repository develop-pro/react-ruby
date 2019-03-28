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

const Content = styled.p`
  width: 100%;
  float: left;
  margin: 0 0 10px;
  padding: 0;
  font-size: 20px;
  text-align: center;
  font-family: Calibri;
`

const ContentLeft = styled(Content)`
  text-align: left;
`

const HorizontalRule = styled.hr`
  width: 100%;
  float: left;
  margin: 30px 0 40px;
  padding: 0;
  background-color: #e0e0e0;
`

const SectionTitle = styled.h3`
  width: 100%;
  float: left;
  text-align: left;
  padding: 0 0 20px;
  margin: 0;
  color: #0071bc;
  font-size: 20px;
  font-weight: 700;
`

export default class PostJob extends Component {

  componentWillMount() {
    window.scrollTo(0,0);
  }
  
  render() {
    return (
      <Container id='NewJob'>
        <Row>
          <Col className="billing_container new_job_bg" md={12}>
            <PageTitle className="billing_title">Create Your job Posting</PageTitle>
            <Content>Get Limited access to our resume database and social recuiting platform with the purchase of one job post!</Content>
            <HorizontalRule/>
            <SectionTitle>Required Fields</SectionTitle>
            <ContentLeft>Get Limited access to our resume database and social recuiting platform with the purchase of one job post!</ContentLeft>
            <JobForm {...this.props}/>
          </Col>
        </Row>
      </Container>
    )
  }
}
