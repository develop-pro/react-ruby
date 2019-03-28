import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
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

export default class VTabApplicants extends Component {

  state = {};

  componentWillMount() {
    this.props.getApplicants(this.props.job);
  }

  render() {
    const {applicants} = this.props;
    return (
      !applicants
        ? <div>Loading...</div>
        : <div className="TabbedPanelsContent">
              <Header>
                <HeaderTitle>Applicants</HeaderTitle>
              </Header>
              <div className="tab_padd recent_job">
                  <div className="scrobl_div post">
                      { applicants &&
                        <table cellSpacing="0" cellPadding="0" className="table">
                          <thead>
                            <tr>
                              <th width="30%">Name</th>
                              <th width="20%">Date Applied</th>
                              <th width="20%">Rating</th>
                              <th width="20%">Active</th>
                              <th width="20%"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {applicants.map((applicant, index) => {
                              // const date = Utils.isApplicant() ? job.updated_at : job.created_at;
                              return (
                                <tr key={index}>
                                  <td>
                                    <Bold>{`${applicant.fname} ${applicant.lname}`}</Bold>
                                  </td>
                                  <td>
                                    <i className="fa fa-calendar"></i>&nbsp;{"02/28/2018"/**"moment(date).format('MM-DD-YYYY')"**/}
                                  </td>
                                  <td>
                                    <i className="fa fa-calendar"></i>&nbsp;{"Not Rated"}
                                  </td>
                                  <td>
                                    <i className="fa fa-calendar"></i>&nbsp;{"Active"}
                                  </td>
                                  <td>
                                    {/* <DeleteButton className="btn_status" onClick={() => this.props.remove(applicant)}>Remove</DeleteButton> */}
                                    <Button to={`/dashboard/applicants/${applicant.id}`}>View</Button>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>}
                  </div>
              </div>
          </div>
    )
  }
}
