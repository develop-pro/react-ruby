import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import {Bold, ButtonStyle} from '../Styles';

const Header = styled.div `
  width: 100%;
  float: left;
  padding: 20px 20px 10px;
  background-color: #f6f7f8;
  border-bottom: 1px solid #ccc;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`

const HeaderTitle = styled.div `
  float: left;
  margin: 0 0 7px;
  font-weight: 700;
  color: #39b54a;
  font-size: 24px;
  padding: 0;
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

  @media (max-width: 414px) {
    min-width: 70px;
    margin-left: 0;
  }

  float: right;
  border-radius: 7px;
  -webkit-transition: all .2s ease-in-out;
  -o-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
  margin-left: 20px;
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

const ProfileTable = (props) =>
  <table cellSpacing="0" cellPadding="0" className="table">
    <thead>
      <tr>
        <th className="bdl_radius" width="30%">Title</th>
        <th width="15%">Last Updated</th>
        <th width="1%">Status</th>
        <th width="1%"></th>
      </tr>
    </thead>
    <tbody>
      {props.profiles.map((profile, index) => <tr key={index}>
        <td style={{paddingTop: 15}}>
          <Bold>{profile.title}</Bold>
        </td>
        <td style={{paddingTop: 15}}>
          <i className="fa fa-calendar"></i>&nbsp;{moment(profile.updated_at).format('MM-DD-YYYY')}
        </td>
        <td style={{paddingTop: 15}}>
          {profile.status ? 'Active' : 'Not Active'}
        </td>
        <td>
          <Button className="btn_status" to={`/dashboard/profiles/${profile.id}`}>View</Button>
        </td>
      </tr>)}
    </tbody>
  </table>

export default class Profiles extends Component {
  render() {
    return (
      <div className="TabbedPanelsContent">
        <Header>
          <HeaderTitle>Profiles</HeaderTitle>
          <ButtonStyle
            to="`/dashboard/profiles/new`"
            className="btn btn-primary btn_apply white_bg"
            style={{float: 'right'}}>New Profile</ButtonStyle>
        </Header>
        <div className="tab_padd recent_job">
          <div className="scrobl_div post">
            {this.props.profiles.length > 0
            ? <ProfileTable {...this.props}/>
            : <div style={{padding: 20, paddingTop: 100}}>
                You have no profiles set up.
                Click <Link to="/dashboard/profiles/new">here</Link> to create a profile!
              </div>}
          </div>
        </div>
      </div>
    )
  }
}
