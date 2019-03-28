import React, {Component} from 'react';
import {Search} from '../Shared';
import styled from 'styled-components';
import Utils from '../../lib/utils';
import ApplicantDashboard from '../Applicants/Dashboard';
import EmployerDashboard from '../Employers/Dashboard';

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keywords: '',
      location: ''
    }
  }

  handleSubmit = (keywords, location) => {
    let url = Utils.getSearchUrl(keywords, location)
    Utils.resetJobsFilter()
    this.props.history.push(url)
  }

  render() {
    const { user, location } = this.props;
    return (
      <Container>
        { location.pathname.indexOf('edit') <= -1 &&
          <Search search={this.handleSubmit} keywords={this.state.keywords} location={this.state.location}/>
        }
        <InnerContainer>
          <div className="container">
            { user && Utils.isApplicant(user) ? <ApplicantDashboard {...this.props}/> : <EmployerDashboard {...this.props}/> }
          </div>
        </InnerContainer>
      </Container>
    )
  }
}

const Container = styled.div `
  background: #fff;
  font-family: 'Raleway', 'sans-serif';
`

const InnerContainer = styled.div `
  padding: 30px 0 50px 20px !important;
  @media screen and (max-width: 767px) {
    padding: 30px 0 50px 0 !important;
  }
`
