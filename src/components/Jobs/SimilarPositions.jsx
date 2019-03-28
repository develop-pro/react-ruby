import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const SimilarPositions = ({jobs, address}) => {

  const DISPLAY_NUMBER = 5;

  const JobList = styled.ul`
    padding: 0;
    padding-bottom: 500px;
    list-style: none;
  `

  const JobTitle = styled.h4`
    font-size: 1.2em,
  `

  const JobContainer = styled.li`
    padding-bottom: 15px;
    @media screen and (max-width: 991px) {
      padding: 0;
      margin: 0;
      border-bottom: 1px solid #efefef;
      width: 100%;
    }
  `

  const Details = styled.ul`
    padding-left: 0;
    padding-bottom: 15;
    list-style: none;
  `

  const DetailItem = styled.li`
    padding-left: 0;
    padding-bottom: 15px;
    list-style: none;
    @media screen and (max-width: 812px) {
      float: left;
      margin-right: 10px;
    }
  `

  const getRandom = (array, n) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }

  return (
    <div className="clearfix">
      <h3>Similar Positions</h3>
      <JobList>
        { getRandom(jobs, DISPLAY_NUMBER).map((job, i) =>
          <JobContainer key={i} className='pull-left'>
            <JobTitle>
              <Link to={`/jobs/${job.slug}`}>{job.title}</Link>
            </JobTitle>
            <Details>
              { true &&
                <DetailItem><i className="fa fa-building"></i> {"Plecco Technologies, Inc."}</DetailItem>
              }
              <DetailItem><i className="fa fa-location-arrow"></i> {address(job)}</DetailItem>
            </Details>
          </JobContainer>
        )}
      </JobList>
    </div>
  )
}

export default SimilarPositions;
