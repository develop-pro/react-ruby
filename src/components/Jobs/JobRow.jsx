import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Row, Col } from 'react-bootstrap';
import Utils from '../../lib/utils';
import styled from 'styled-components';

const JobRow = ({job}) => {

  const Container = styled(Row)`
    font-family: 'Raleway';
    margin-top: 20px;
    border-top: 1px solid #dfe1e4;
    clear: both;
    margin-left: 0;
    margin-right: 0;
  `

  const Button = styled(Link)`
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: none;
    background-color: #8290a2;
    border-color: #8290a2;
    padding: 6px 0;
    text-align: center;
    min-width: 100px;
    float: right;
    border-radius: 7px;
    -webkit-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
    &:hover {
        color: #fff;
        background-color: #39b54a;
        border-color: #39b54a;
        -webkit-transition: all .2s ease-in-out;
        -o-transition: all .2s ease-in-out;
        text-decoration: none;
        transition: all .2s ease-in-out;
    }
  `

  const StyledCol = styled(Col)`
    @media screen and (max-width: 414px) {
      width: 100%;
    }
  `

  const JobTitle = styled.h3`
    font-size: 20px;
    font-weight: 700;
    a {
      color: #337ab7;
      &:hover {
        text-decoration: none;
      }
    }
  `

  const JobDetails = styled.ul`
    list-style: none;
    padding: 0;
  `

  const JobDetail = styled.li`
    padding-right: 10px;
    float: left;
  `

  const address = (job) => {
    let cityState = job.city && job.city + ', ' + job.state
    return cityState || job.state
  }

  const teaser = (message) => {
    let teaser = message && Utils.stripHtmlForTeaser(message);
    let maxLength = 120; // maximum number of characters to extract
    let trimmedString = teaser && teaser.substr(0, maxLength); //trim the string to the maximum length
    //re-trim if we are in the middle of a word
    return trimmedString && trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
  }

  return (
    <Container>
      <StyledCol xs={10} md={10} style={{paddingLeft: 0}}>
        <div>
          <JobTitle>
            <Link to={`/jobs/${job.slug}`}>{job.title}</Link>
          </JobTitle>
          <p>
            <span></span>
            <span>{teaser(job.description)}...</span>
          </p>
          <div className="info">
            <JobDetails>
              <JobDetail><i className="fa fa-building"></i> Plecco Technologies, Inc.</JobDetail>
              <JobDetail><i className="fa fa-location-arrow"></i> {address(job)}</JobDetail>
              <JobDetail><i className="fa fa-calendar"></i> {moment(job.created_at).fromNow()}</JobDetail>
            </JobDetails>
          </div>
        </div>
      </StyledCol>
      <Col md={2} className="hidden-xs" style={{padding: '20px 0 0 10px'}}>
        <Button to={`/jobs/${job.slug}`} className="pull-right">View</Button>
      </Col>
    </Container>
  );
}

export default JobRow;
