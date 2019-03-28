import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import {Bold} from '../Styles';

const Header = styled.div`
  width: 100%;
  float: left;
  padding: 20px 20px 10px;
  background-color: #f6f7f8;
  border-bottom: 1px solid #ccc;
`

const HeaderTitle = styled.div`
  width: 100%;
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

const DeleteButton = styled.button`
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

const AlertTable = (props) =>
  <table cellSpacing="0" cellPadding="0" className="table">
      <thead>
          <tr>
              <th className="bdl_radius" width="30%">Alert Title</th>
              <th width="20%">Date Updated</th>
              <th width="20%">Notification</th>
              <th width="30%" className="bdr_radius"></th>
          </tr>
      </thead>
      <tbody>
        { props.alerts.map((alert, index) =>
          <tr key={index}>
            <td><Bold>{alert.name}</Bold></td>
            <td>
              <i className="fa fa-calendar"></i>&nbsp;
              {moment(alert.updated_at).format('MM-DD-YYYY')}
            </td>
            <td>
              <i className="fa fa-envelope-o"></i>&nbsp;
              {alert.frequency}
            </td>
            <td>
              <DeleteButton onClick={() => props.delete(alert)} className="btn_status ml_5">Delete</DeleteButton>
              <Button className="btn_status" to={`/dashboard/alerts/${alert.id}/edit`}>Modify</Button>
            </td>
          </tr>
        )}
      </tbody>
    </table>

const VTabAlert = (props) =>
  <div className="TabbedPanelsContent">
      <Header>
        <HeaderTitle>Job Alerts</HeaderTitle>
      </Header>
      <div className="tab_padd recent_job">
        <div className="scrobl_div post">
          { props.alerts && <AlertTable {...props}/> }
        </div>
      </div>
  </div>

export default VTabAlert;
