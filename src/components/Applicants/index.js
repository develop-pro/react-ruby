import React, { Component } from 'react';
import NewProfile from './NewProfile'
import EditProfile from './EditProfile'
import Profile from './Profile'
import Profiles from './Profiles'
import {Switch, Route} from 'react-router-dom';
import _ from 'lodash';
import ProfileService from '../../services/profile.service';


export default class ProfilesContainer extends Component {

  componentWillMount() {
    this.getProfiles();
  }

  componentWillReceiveProps() {
    this.getProfiles();
  }

  addProfile = (profile) => {
    let newArray = (this.state.profiles) ? this.state.profiles.slice() : [];
    newArray.push(profile);
    this.setState({profiles: newArray})
  }

  getProfiles = () => {
    ProfileService.getProfilesByUser(this.props.user.id)
      .then(response => {
        this.setState({ profiles: response.data.profiles })
      })
      .catch(error => {
        console.error(error)
      })
  }

  getProfile = (id) => {
    return _.find(this.state.profiles, {id: parseInt(id, 10)})
  }

  render() {
    return (
      this.state &&
      <Switch>
        <Route exact path='/dashboard/profiles' render={() => <Profiles {...this.props} {...this.state}/>}/>
        <Route exact path='/dashboard/profiles/new' render={() => <NewProfile {...this.props} {...this.state} addProfile={this.addProfile}/>}/>
        <Route exact path='/dashboard/profiles/:profileId/edit' render={props => <EditProfile {...this.props} {...this.state} profile={this.getProfile(props.match.params.profileId)}/>}/>
        <Route exact path='/dashboard/profiles/:profileId' render={props => <Profile {...this.props} {...this.state} profile={this.getProfile(props.match.params.profileId)}/>}/>
      </Switch>
    )
  }
}
