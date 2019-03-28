import React, {Component} from 'react';
import {Search} from '../Shared';
import {Switch, Route} from 'react-router-dom';
import {Job, JobListContainer} from '.';
import JobService from '../../services/job.service';
import { EditJob } from '../Employers';
import Utils from '../../lib/utils';
import _ from 'lodash';

export default class Jobs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      jobsLoaded: false,
      keywords: props.keywords || '',
      location: props.location || ''
    }
  }

  setJob = (slug) => {
    let job = this.findJobBySlug(slug);
    if (job) {
      this.setState({job: job});
    } else {
      this.getJobBySlug(slug);
    }
  }

  getJobBySlug = slug => {
    JobService.getJob(slug).then(response => {
      const job = response.data.job;
      this.setState({job: job})

      // send user back to job details page
      this.props.history.push(`/jobs/${job.slug}`);
    }).catch(error => {
      console.error('Error retrieving job.');
      console.error(error)
    })
  }

  findJobBySlug = slug => {
    let jobs = this.state.jobs;
    if (!jobs) { this.getJobs() }
    let job = jobs && _.find(jobs, {slug})
    return job;
  }

  getJobs = () => {
    JobService.getJobs().then(response => {
      this.setState({
        jobs:       response.data.jobs,
        filters:    response.data.filters,
        jobsLoaded: true,
        totalJobs:  response.data.total
      });
    }).catch((error) => {
      console.log(error);
    })
  }

  getJob = (slug) => {
    return this.findJobBySlug(slug);
  }

  searchAndReset = (keywords, location, options = null) => {
    Utils.resetJobsFilter()
    this.search(keywords, location, options)
  }

  search = (keywords, location, options = null) => {
    keywords = keywords || ''
    location = location || ''
    JobService.searchJobs(keywords, location, options).then((response) => {
      this.setState({
        jobs:       response.data.jobs,
        filters: response.data.filters,
        jobsLoaded: true,
        totalJobs:  response.data.total
      });
      this.props.history.push(Utils.getSearchUrl(keywords, location))
    }).catch((error) => {
      console.log(error);
    })
  }

  createJob = (job) => {
    JobService.createJob({job: job}).then(response => {
      this.setState({job: response.data.job});
      this.props.history.push('/jobs');
    }).catch(error => {
      console.error('There was a problem creating job.')
      console.error(error);
    })
  }

  updateJob = (job) => {
    JobService.updateJob(job).then(response => {
      this.setState({job: response.data.job});
      this.props.history.push('/jobs');
    }).catch(error => {
      console.error('There was a problem updating job.')
      console.error(error);
    })
  }

  render() {
    return (
      <div id="Jobs">
        <div style={{
          background: '#fff'
        }}>
          {this.props.location.pathname !== '/employers/post-job' && <Search search={this.searchAndReset} {...this.state}/>}
          <Switch>
            <Route exact path='/jobs' render={props =>
              <JobListContainer jobsLoaded={this.state.jobsLoaded} search={this.search} {...props} {...this.state}/>
            }/>
            <Route exact path='/jobs/:slug' render={props =>
              <Job
                {...props}
                {...this.state}
                user={this.props.user}
                job={this.state.job || this.getJob(props.match.params.slug)}
                jobs={this.state.jobs}
                slug={props.match.params.slug}
                getJob={this.getJob}
                getJobs={this.getJobs}/>
            }/>
            <Route exact path='/jobs/:slug/edit' render={(props) => <EditJob
              slug={props.match.params.slug}
              getJobBySlug={this.getJobBySlug}
              {...props}/>
            }/>
          </Switch>
        </div>
      </div>
    )
  }
}
