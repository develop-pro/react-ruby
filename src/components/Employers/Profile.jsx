import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { WhiteLinkButton, Title, Bold } from '../Styles';
import ProfileService from '../../services/profile.service';
import FileDownload from 'react-file-download';
import moment from 'moment';
import Utils from '../../lib/utils';

const Container = styled.div`
  color: #8290a2;
  label {
    font-weight: 500;
  }
  input[type=checkbox], input[type=radio] {
    margin: 4px 10px 0 0;
    margin-top: 1px\9;
    line-height: normal;
  }
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

const MainContent = styled.div`
  padding: 0 0 0 20px;
`

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
  font-family: 'Raleway';
  font-weight: 700;
  color: #39b54a;
  font-size: 24px;
  padding: 0;
`

const HeaderDetails = styled.div`
  padding-bottom: 10px;
  font-size: 14px;
  font-family: 'Raleway';
  color: #8290a2;
  font-weight: 500;
  display: inline-block;
`

const UserName = styled.div`
  width: 100%;
  float: left;
  margin: 42px 0 20px;
  font-weight: 700;
  color: #39b54a;
  font-family: 'Raleway';
  font-size: 24px;
  padding-bottom: 15px;
`

const MainSection = styled.div`
  border-bottom: 1px solid #8da3aa;
  height: 85px;
  clear: both;
`

const DownloadLink = styled.div`
  color: #337ab7;
  display: inline-block;
  &:hover {
    text-decoration: underline;
  }
`

const ProfileDetails = styled.div`
  padding: 40px 0;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    float: left;
    margin-right: 20px;
  }
  i {
    margin-right: 8px;
  }
`

const Sections = styled.div`
  margin-bottom: 40px;
`

const Profile = (props) => {
  const { user, profile, employmentTypes } = props;
  const profileLink = `/dashboard/profiles/${profile.id}/edit`;
  const lastUpdated = moment(profile.updated_at).format('MM/DD/YYYY');
  const downloadResume = (url, fileName) => {
    ProfileService.downloadResume(url)
      .then(response => {
        FileDownload(response.data, fileName);
      })
      .catch(error => console.error(error.message))
  }
  return (
    <Container className="TabbedPanelsContent TabbedPanelsContentVisible">
      <Header>
        <div>
          <HeaderTitle className="pull-left">Profile</HeaderTitle>
          <div className="pull-right">
            <Button className="hidden-xs hidden-md">Save</Button>
            <Button className="btn_post hidden-xs">Rate Up</Button>
            <Button className="hidden-xs">Rate Down</Button>
            <Button className="hidden-xs hidden-md">Reject</Button>
          </div>
        </div>
        <div style={{clear: 'both'}}>
          <HeaderDetails>
            Last Updated: {lastUpdated}
          </HeaderDetails>
        </div>
      </Header>
      <MainContent>
        <MainSection>
          <Row>
            <Col md={6}><UserName>{user.fname} {user.lname}</UserName></Col>
            <Col md={6}>

            </Col>
          </Row>
        </MainSection>
        <ProfileDetails>
          <Row>
            <Col md={12} xsHidden>
              <ul>
                <li>
                  <label><i className="fa fa-phone"></i> {user.phone_primary}</label>
                </li>
                <li>
                  <label><i className="fa fa-envelope-o"></i> {user.email}</label>
                </li>
                <li>
                  <label><i className="fa fa-location-arrow"></i> {user.city}, {user.state} {user.zip}</label>
                </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col xs={1} smHidden mdHidden lgHidden>
              <Bold><i className="fa fa-phone"></i></Bold>
            </Col>
            <Col xs={11} smHidden mdHidden lgHidden>
              <Bold>{user.phone_primary}</Bold>
            </Col>
          </Row>
          <Row>
            <Col xs={1} smHidden mdHidden lgHidden>
              <Bold><i className="fa fa-envelope-o"></i></Bold>
            </Col>
            <Col xs={11} smHidden mdHidden lgHidden>
              <Bold>{user.email}</Bold>
            </Col>
          </Row>
          <Row>
            <Col xs={1} smHidden mdHidden lgHidden>
              <Bold><i className="fa fa-location-arrow"></i></Bold>
            </Col>
            <Col xs={11} smHidden mdHidden lgHidden>
              <Bold>{user.city}, {user.state} {user.zip}</Bold>
            </Col>
          </Row>
        </ProfileDetails>
        {/* <Title>{profile && profile.title}</Title> */}
        <Sections>
          <Title>{profile.title}</Title>
          <Row className="profile_detail post">
            <Col lg={2}><label>{ employmentTypes && employmentTypes.join(', ') }</label></Col>
          </Row>
          <Row>
            <Col md={3} xs={6}><Bold>{"US Citizen?"}</Bold></Col>
            <Col md={3} xs={6}>{ profile && profile.us_citizen ? 'Yes' : 'No' }</Col>
            <Col md={3} xs={6}><Bold>{"Relocate?"}</Bold></Col>
            <Col md={3} xs={6}>{ profile && profile.relocate ? 'Yes' : 'No' }</Col>
          </Row>
          <Row>
            <Col md={3} xs={6}><Bold>{"Security Clearance?"}</Bold></Col>
            <Col md={3} xs={6}>{ profile && profile.security_clearance ? 'Yes' : 'No' }</Col>
            <Col md={3} xs={6}><Bold>{"Military Veteran?"}</Bold></Col>
            <Col md={3} xs={6}>{ profile && profile.veteran ? 'Yes' : 'No' }</Col>
          </Row>
          <Row>
            <Col md={3} xs={6}><Bold>Annual Salary:</Bold></Col>
            <Col md={3} xs={6}>{ profile && Utils.currencyFormatter(profile.salary) }</Col>
            <Col md={3} xs={6}><Bold>Hourly Rate:</Bold></Col>
            <Col md={3} xs={6}>{ profile && Utils.currencyFormatter(profile.hourly_rate, 2) }</Col>
          </Row>
          <Row>
            <Col md={3} xs={6}>
              <Bold>Resume:</Bold>
            </Col>
            <Col md={3} xs={6}>
              { profile.resumes
                ? profile.resumes.map((resume, i) =>
                  <div key={i}>
                    <DownloadLink onClick={() => downloadResume(resume.attachment.url, resume.name)}>
                      {resume.name}
                    </DownloadLink>
                  </div>
                )
                : <div className="input">
                    { Utils.isApplicant(user) &&
                      <Link to={profileLink}>
                        <i className="fa fa-plus-circle"></i> Add a resume
                      </Link>
                    }
                  </div>
              }
            </Col>
          </Row>
        </Sections>
        <Sections>
          <Title>Skills</Title>
          <Row>
            <Col lg={12}>
              {profile.skill_sets && profile.skill_sets.map((skill_set, i) =>
                <Row key={i}>
                  <Col xs={3}>{skill_set.skill}</Col>
                  <Col xs={3}>{skill_set.years_experience} Years</Col>
                  <Col xs={3}>{skill_set.last_used}</Col>
                </Row>
              )}
            </Col>
          </Row>
          { Utils.isApplicant(user) &&
            <WhiteLinkButton style={{marginTop: 20}} to={`${profileLink}#skills`}>Add skill</WhiteLinkButton>
          }
        </Sections>
        <Sections>
          <Title>Work Experience</Title>
          <Row>
            <Col lg={12}>
              { profile.work_experiences && profile.work_experiences.map((exp, i) =>
                <Row key={i}>
                  <Col lg={3}>{exp.title}</Col>
                  <Col lg={3}>{exp.company}</Col>
                  <Col lg={3}>{moment(exp.start_date).format('MM/DD/YYYY')}</Col>
                  <Col lg={3}>{exp.end_date && moment(exp.end_date).format('MM/DD/YYYY')}</Col>
                </Row>
              )}
            </Col>
          </Row>
          { Utils.isApplicant(user) &&
            <WhiteLinkButton style={{marginTop: 20}} to={`${profileLink}#experiences`}>Add work experience</WhiteLinkButton>
          }
        </Sections>
        <Sections>
          <Title>Education</Title>
          <Row>
            <Col lg={12}>
              { profile.educations && profile.educations.map((education, i) =>
                <Row key={i}>
                  <Col xs={3}>{Utils.uppercase(education.education_type)}</Col>
                  <Col xs={3}>{education.institution}</Col>
                  <Col xs={3}>{education.city_state}</Col>
                  <Col xs={3}>{education.country}</Col>
                </Row>
              )}
            </Col>
          </Row>
          { Utils.isApplicant(user) &&
            <WhiteLinkButton style={{marginTop: 20}} to={`${profileLink}#education`}>Add education</WhiteLinkButton>
          }
        </Sections>
      </MainContent>
    </Container>
  )
}

export default Profile;
