import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import moment from 'moment';
import styled from 'styled-components';
import Tooltip from 'rc-tooltip';
import Utils from '../../lib/utils';
import 'rc-tooltip/assets/bootstrap.css';

const Container = styled.div `
  background: #f6f7f8;
  border-radius: 4px;
  padding: 20px;
  margin-top: 20px;
`

const Title = styled.div `
  font-weight: 700;
  color: #39b54a;
  font-size: 24px;
  padding-right: 10px;
  padding-bottom: 10px;
`

const Details = styled.div `
  font-size: 14;
  color: #8290a2;
  font-weight: 500;
`

const Button = styled.button `
  width: auto;
  border: 1px solid #8290a2;
  border-radius: 4px;
  color: #8290a2;
  background: #fff;
  font-size: 14;
  padding: 15px 13px 14px;
  font-weight: 400;
  text-align: center;
  transition: all .2s ease-in-out;
  display: inline;
  margin-right: 10px;
`

const ApplyNow = styled.button `
  width: auto;
  border: 1px solid rgb(130, 144, 162);
  border-radius: 4px;
  color: rgb(255, 255, 255);
  background: rgb(0, 113, 188);
  font-size: 14px;
  padding: 15px 13px 14px;
  font-weight: 400;
  text-align: center;
  transition: all 0.2s ease-in-out;
  display: inline;
  margin-right: 10px;
  @media screen and (max-width: 767px) {
    width: 100%;
    margin-top: 20px;
  }
`

const IconList = styled.ul `
  padding: 0;
  list-style: none;
`

const IconItem = styled.li `
  padding-right: 20px;
  float: left;
  i {
    margin-right: 4px;
  }
`

const JobIcons = (props) => (
  <div>
    <IconList>
      {props.company_name && <IconItem>
        <Tooltip placement="top" trigger={['click']} overlay={<span>Company</span>}>
          <div>
            <i className="fa fa-building" alt="company"></i>
            {props.company_name}
          </div>
        </Tooltip>
      </IconItem>}
      {props.keywords && <IconItem>
        <Tooltip placement="top" trigger={['click']} overlay={<span>Keywords</span>}>
          <div>
            <i className="fa fa-wrench" alt="keywords"></i>
            {props.keywords}
          </div>
        </Tooltip>
      </IconItem>}
      {props.position_type && <IconItem>
        <Tooltip placement="top" trigger={['click']} overlay={<span>Position Type</span>}>
          <div>
            <i className="fa fa-calendar" alt="position type"></i>
            {props.position_type}
          </div>
        </Tooltip>
      </IconItem>}
      {props.pay_rate && <IconItem>
        <Tooltip placement="top" trigger={['click']} overlay={<span>Pay Rate</span>}>
          <div>
            <i className="fa fa-money" alt="pay rate"></i>
            ${props.pay_rate}/hr
          </div>
        </Tooltip>
      </IconItem>}
      <IconItem>
        <Tooltip placement="top" trigger={['click']} overlay={<span>Location</span>}>
          <div>
            <i className="fa fa-location-arrow" alt="address"/> {props.address(props)}
          </div>
        </Tooltip>
      </IconItem>
      <IconItem>
        <Tooltip placement="top" trigger={['click']} overlay={<span>Time since posted</span>}>
          <div>
            <i className="fa fa-calendar" alt="calendar"/>
            Posted&nbsp;
            <span>{moment(props.created_at).fromNow()}</span>
          </div>
        </Tooltip>
      </IconItem>
      {props.travel && <IconItem>
        <Tooltip placement="top" trigger={['click']} overlay={<span>Travel</span>}>
          <div>
            <i className="fa fa-plane" alt="travel"></i>
            {props.travel !== 'f'
              ? 'Yes'
              : 'None'}
          </div>
        </Tooltip>
      </IconItem>}
      {props.telecommuting_position && <IconItem>
        <Tooltip placement="top" trigger={['click']} overlay={<span>Remote position</span>}>
          <div>
            <i className="fa fa-desktop" alt="telecomuting position"></i>
            {props.telecommuting_position !== 'f'
              ? 'Yes'
              : 'No'}
          </div>
        </Tooltip>
      </IconItem>}
    </IconList>
  </div>
)

export default class Header extends Component {
  apply = () => {
    this.props.handleApply();
  }

  emailJob = () => {
    console.log('Need to be completed.')
  }

  render() {
    const {job, user} = this.props;
    const getExpirationDate = () => {
      const date = new Date(job.created_at);
      const newdate = new Date(date);
      newdate.setDate(newdate.getDate() + 30);
      return moment(newdate.toISOString()).format('MM/DD/YY');
    }
    return (
      <Container>
        <div className="row">
          <div className="col-md-8 col-sm-10 pull-left">
            <Title>
              <div style={{display: 'inline', marginRight: 20}}>{this.props.trim(job.title, 120)}</div>
              { Utils.isEmployer(user) &&
                <Link to={`/jobs/${job.slug}/edit`}>
                  <span style={{fontSize: '0.6em'}}>Edit</span>
                </Link>
              }
            </Title>
            <Details>
              <JobIcons {...job} address={this.props.address}/>
            </Details>
          </div>
          <div className="col-md-4 col-sm-12 col-xs-12 text-right pull-right">
            { Utils.isApplicant(user) &&
              <div>
                { false &&
                  <Button className="btn_post hidden-xs">Save</Button>
                }
                { false &&
                  <Button className="hidden-xs" onClick={this.emailJob}>Email</Button>
                }
                <Button className="hidden hidden-xs" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Share
                  <span className="caret"></span>
                </Button>
                <ApplyNow type="button" onClick={this.apply}>Apply now</ApplyNow>
              </div>
            }
            { Utils.isEmployer(user) &&
              <div style={{marginTop: 10, fontWeight: 500, color: '#8290a2'}}>
                { false && Utils.isJobOwner(job) &&
                  <Button className="hidden-xs hidden-md">Remove</Button>
                }
                Expires {getExpirationDate()}
              </div>
            }
          </div>
        </div>
      </Container>
    )
  }
}
