import React, { Component } from 'react';
import {VTab, VTabs, ContentGroup} from '../Styles';
import {Switch, Route, Link, Redirect} from 'react-router-dom';
import ProfilesContainer from '../Applicants';
import {VTabJob, VTabAlert, VTabSettings} from '../Shared';
import { NewAlert, EditAlert } from '../Alerts';
import JobService from '../../services/job.service';
import UserService from '../../services/user.service';

export default class Dashboard extends Component {

  state = {};

  componentWillMount() {
    this.getJobs();
    this.getAlerts();
  }

  componentWillReceiveProps() {
    this.getJobs();
    this.getAlerts();
  }

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value
    this.setState({[name]: value})
  }

  getJobs = () => {
    JobService.getJobs(this.props.user)
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

  getAlerts = () => {
    UserService.getUserAlerts(this.props.user)
      .then(response => {
        this.setState({alerts: response.data.alerts});
      })
      .catch(error => {
        console.log(error);
      });
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
    UserService.removeJobApplication(this.props.user, job)
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
    return (
      !jobs
        ? <div>Loading...</div>
        : <div>
            <VTabs className="hidden-xs">
              <VTab className={this.isLocation(`/dashboard/profiles`) && 'active'}><Link to={`/dashboard/profiles`} data-toggle="tab">Profiles</Link></VTab>
              <VTab className={this.isLocation(`/dashboard/jobs`) && 'active'}><Link to={`/dashboard/jobs`} data-toggle="tab">Jobs</Link></VTab>
              {false && <VTab className={this.isLocation(`/dashboard/alerts`) && 'active'}><Link to={`/dashboard/alerts`} data-toggle="tab">Alerts</Link></VTab>}
              {false && <VTab className={this.isLocation(`/dashboard/settings`) && 'active'}><Link to={`/dashboard/settings`} data-toggle="tab">Settings</Link></VTab>}
            </VTabs>
            <ContentGroup>
              <Switch>
                <Route exact path='/dashboard' render={() => <Redirect to="/dashboard/profiles"/>}/>
                <Route path='/dashboard/profiles' render={() => <ProfilesContainer {...this.props}/>}/>
                <Route exact path='/dashboard/jobs' render={() =>
                  <VTabJob {...this.props} jobs={this.state.jobs} remove={this.removeJob}/>
                }/>
                <Route exact path='/dashboard/alerts/new' render={() => <NewAlert {...this.props}/>}/>
                <Route exact path='/dashboard/alerts/:alertId/edit' render={(props) =>
                  <EditAlert
                    {...this.props}
                    alert={this.getAlert(parseInt(props.match.params.alertId, 10))}
                  />
                }/>
                <Route exact path='/dashboard/alerts' render={() =>
                  <VTabAlert {...this.props} alerts={this.state.alerts} delete={this.deleteAlert}/>
                }/>
                <Route exact path='/dashboard/settings' render={() => <VTabSettings {...this.props}/>}/>
              </Switch>
            </ContentGroup>
          </div>
    )
  }

}
