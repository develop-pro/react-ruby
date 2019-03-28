import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import {Bold} from '../Styles';
import Utils from '../../lib/utils';
import {ButtonStyle} from '../Styles';

const Header = styled.div`
  width: 100%;
  float: left;
  padding: 20px 20px 10px;
  background-color: #f6f7f8;
  border-bottom: 1px solid #ccc;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`

const HeaderTitle = styled.div`
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


  @media screen and (max-width: 767px) {
    min-width: 70px;
  }

  float: right;
  border-radius: 7px;
  -webkit-transition: all .2s ease-in-out;
  -o-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
  margin-left: 20px;


  @media (max-width: 960px) {
    margin-left: 0;
  }

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

const DeleteButton = Button.withComponent('button');

const PostAJobButton = ButtonStyle.withComponent(Link);


const VTabJob = (props) => {
  const {jobs, user} = props;
  return (
    <div className="TabbedPanelsContent">
        <Header>
          <HeaderTitle>Jobs</HeaderTitle>
          {Utils.isEmployer(user) &&
          <div style={{float: 'right', textAlight: 'right'}}>
            <div style={{width: 120, display: 'inline-block', marginTop: 14}}>
              Job credits: {user.job_credits.length}
            </div>
            <PostAJobButton
              to="/employers/post-job"
              className="btn btn-primary btn_apply white_bg"
              style={{float: 'right'}}>New Job</PostAJobButton>
          </div>}
        </Header>
        <div className="tab_padd recent_job">
            <div className="scrobl_div post">
                { jobs && jobs.length === 0 && Utils.isEmployer(user)
                  ? <div style={{padding: '100px 20px'}}>
                    You have not posted any jobs yet. Click <a href="/employers/post-job">here</a>
                    &nbsp;to post your first job!
                  </div>
                  :  jobs && jobs.length === 0 && Utils.isApplicant(user)
                    ? <div style={{padding: '100px 20px'}}>
                      You have not applied to any jobs yet. Click <a href="/jobs">here</a>
                      &nbsp;to find your next job!
                    </div>
                    :
                  <table cellSpacing="0" cellPadding="0" className="table">
                    <thead>
                      <tr>
                        <th className="bdl_radius" width="30%">Title</th>
                        <th width="26%">Date { Utils.isApplicant(user) ? 'Applied' : 'Created' }</th>
                        <th width="1%">Status</th>
                        <th width="1%"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.jobs.map((job, index) => {
                        const date = Utils.isApplicant(user) ? job.updated_at : job.created_at;
                        return (
                          <tr key={index}>
                            <td style={{paddingTop: 15}}>
                              <Bold>{job.title}</Bold>
                            </td>
                            <td style={{paddingTop: 15}}>
                              <i className="fa fa-calendar"></i>&nbsp;{moment(date).format('MM-DD-YYYY')}
                            </td>
                            <td style={{paddingTop: 15}}>{job.status}</td>
                            <td>
                              <DeleteButton className="btn_status" onClick={() => props.remove(job)}>Remove</DeleteButton>
                              { Utils.isEmployer(user) &&
                                <Button className="btn_status" to={`/dashboard/jobs/${job.slug}/applicants`}>Applicants</Button>
                              }
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

export default VTabJob;
