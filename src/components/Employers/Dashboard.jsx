import React, { Component } from 'react';
import {VTab, VTabs, ContentGroup} from '../Styles';
import {Switch, Route, Link, Redirect} from 'react-router-dom';
import Profile from '../Employers/Profile';
import {VTabJob, VTabAlert, VTabApplicants} from '../Shared';
import {Settings} from '../Employers';
import { NewAlert, EditAlert } from '../Alerts';
import JobService from '../../services/job.service';
import UserService from '../../services/user.service';

export default class Dashboard extends Component {

  state = {};

  componentWillMount() {
    if (this.props.user) {
      this.getJobs();
      this.getAlerts();
    }
    window.scrollTo(0, 0);
  }

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value
    this.setState({[name]: value})
  }

  getApplicants = (job) => {
    JobService.getApplicants(job)
      .then(response => {
        this.setState({applicants: response.data.applicants});
      })
      .catch(error => {
        console.log(error);
      });
  }

  getJobs = () => {
    JobService.getEmployerJobs(this.props.user)
      .then(response => {
        this.setState({jobs: response.data.jobs});
      })
      .catch(error => {
        console.log(error);
      });
  }

  getAlert = (id) => {
    return this.state.alerts && this.state.alerts.filter(alert => alert.id === id)[0];
  }

  getJob = (slug) => {
    return this.state.jobs && this.state.jobs.filter(job => job.slug === slug)[0];
  }

  getApplicant = (id) => {
    return this.state.applicants && this.state.applicants.filter(applicant => applicant.id === id)[0];
  }

  getAlerts = () => {
    if (this.props.user) {
      UserService.getUserAlerts(this.props.user)
        .then(response => {
          this.setState({alerts: response.data.alerts});
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  deleteAlert = (alert) => {
    UserService.removeUserAlert(alert)
      .then(response => {
        let newArray = this.state.alerts.filter(a => a.id !== alert.id);
        this.setState({ alerts: [...newArray] })
      })
      .catch(error => console.error(error.message));
  }

  removeJob = (job) => {
    JobService.remove(job)
      .then(response => {
        let newArray = this.state.jobs.filter(j => j.slug !== job.slug);
        this.setState({ jobs: [...newArray] })
      })
      .catch(error => console.error(error));
  }

  isLocation = (pathname) => {
    return this.props.location.pathname === pathname;
  }

  render() {
    const { jobs } = this.state;
    const { user } = this.props;
    return (
      !(user && jobs)
        ? <div>Loading...</div>
        : <div>
            <VTabs className="hidden-xs">
              <VTab className={this.isLocation(`/dashboard/jobs`) && 'active'}><Link to={`/dashboard/jobs`} data-toggle="tab">Jobs</Link></VTab>
              {false && <VTab className={this.isLocation(``) && 'active'}><Link to={`/dashboard/jobs`} data-toggle="tab">Candidates</Link></VTab>}
              {false && <VTab className={this.isLocation(``) && 'active'}><Link to={`/dashboard/settings`} data-toggle="tab">Settings</Link></VTab>}
              {/* <VTab className={this.isLocation(`/dashboard/alerts`) && 'active'}><Link to={`/dashboard/alerts`} data-toggle="tab">Alerts</Link></VTab>
              <VTab className={this.isLocation(`/dashboard/settings`) && 'active'}><Link to={`/dashboard/settings`} data-toggle="tab">Settings</Link></VTab> */}
            </VTabs>
            <ContentGroup>
              <Switch>
                <Route exact path='/dashboard' render={() => <Redirect to="/dashboard/jobs"/>}/>
                <Route exact path='/dashboard/applicants/:applicantId' render={(props) => {
                  const user = this.getApplicant(parseInt(props.match.params.applicantId, 10));
                  return (<Profile user={user} profile={user.profiles[0]}/>)
                }}/>
                <Route exact path='/dashboard/jobs' render={() =>
                  <VTabJob {...this.props} jobs={this.state.jobs} remove={this.removeJob}/>
                }/>
                <Route exact path='/dashboard/jobs/:jobId/applicants' render={(props) =>
                  <VTabApplicants
                    {...this.props}
                    job={this.getJob(props.match.params.jobId)}
                    applicants={this.state.applicants}
                    getApplicants={this.getApplicants}
                  />
                }/>
                <Route exact path='/dashboard/alerts/new' render={() => <NewAlert {...this.props}/>}/>
                <Route exact path='/dashboard/alerts/:alertId/edit' render={(props) =>
                  <EditAlert {...this.props} alert={this.getAlert(parseInt(props.match.params.alertId, 10))}/>
                }/>
                <Route exact path='/dashboard/alerts' render={() =>
                  <VTabAlert {...this.props} alerts={this.state.alerts} delete={this.deleteAlert}/>
                }/>
                <Route exact path='/dashboard/settings' render={() => <Settings {...this.props}/>}/>
              </Switch>
            </ContentGroup>
          </div>
    );
  }

}
