import React from 'react';
import JobRow from './JobRow';

const JobList = ({jobs}) =>
  <div>
    { jobs.length === 0
      ? <p>No jobs found.</p>
      : jobs.map((job, index) => <JobRow job={job} key={index} />)
    }
  </div>

export default JobList;
