import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {Home, PostJob, Store} from '.';

export default class Employers extends Component {

  jobCredits = () => {
    return this.props.user && this.props.user.job_credits;
  }

  hasJobCredits = () => {
    return this.jobCredits() && this.jobCredits().length > 0;
  }

  render() {
    return (
      <div style={{background: '#fff'}}>
        <Switch>
          <Route exact path='/employers' render={() => <Home />}/>
          <Route exact path='/employers/post-job' render={props =>
            <PostJob {...props} hasJobCredits={this.hasJobCredits}/>
          }/>
          <Route path='/employers/store' render={() => <Store />}/>
        </Switch>
      </div>
    )
  }
}
