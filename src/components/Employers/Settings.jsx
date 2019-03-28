import React, {Component} from 'react';
import styled from 'styled-components';
import {ButtonStyle, Title, Bold} from '../Styles';
import {CheckBox} from '../Shared/FormHelpers';

const MainContent = styled.div `
  padding: 0 0 0 25px;
  line-height: 18px;
  color: #8290a2;
  font-size: 14p;
  input[type=checkbox] {
    margin-right: 10px;
  }
`

const Section = styled.section`
  margin-bottom: 40px;
`

const Header = styled.div `
  width: 100%;
  float: left;
  padding: 20px 20px 10px;
  background-color: #f6f7f8;
  border-bottom: 1px solid #ccc;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`

const HeaderTitle = styled.div`
  width: 100%;
  float: left;
  margin: 0 0 7px;
  font-family: 'Raleway';
  font-weight: 700;
  color: #39b54a;
  font-size: 24px;
  padding: 0;
`

export default class Settings extends Component {

  constructor(props) {
    super(props)
    this.state = {
      advisor: props.advisor,
      reports: props.reports,
      announcments: props.announcments,
      updates: props.updates,
      offers: props.offers,
      ethnicity: props.ethnicity,
      gender: props.gender,
      veteran: props.veteran,
    }
  }

  handleChange = (e) => {
    let name = e.target.name;
    let value = (e.target.type === 'checkbox') ? e.target.checked : e.target.value;
    this.setState({[name]: value});
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <Header>
          <HeaderTitle>Account Settings</HeaderTitle>
        </Header>
        <MainContent>
          <Section style={{paddingTop: 110}}>
            <Title>Email</Title>
            <div>
              {user.email} &nbsp;
              <ButtonStyle to="/" className="btn btn-primary btn_apply white_bg">Change Email</ButtonStyle>
            </div>
          </Section>
          <Section>
            <Title>Password</Title>
            <div>
              <ButtonStyle to="/" className="btn btn-primary btn_apply white_bg">Change Password</ButtonStyle>
            </div>
          </Section>
          <Section>
            <Title>Email Notifications</Title>
            <div>
              <p>
                <CheckBox name='advisor' checked={this.state.advisor} onChange={this.handleChange}/>
                <Bold>Subscribe to QuirkyCoders free weekly newsletter to receive tech news and career advice.</Bold>
              </p>
              <p>
                <CheckBox name='reports' checked={this.state.reports} onChange={this.handleChange}/>
                <Bold>Subscribe to QuirkyCoders free monthly newsletter on trends in the tech job market, skills and salaries.</Bold>
              </p>
              <p>
                <CheckBox name='announcements' checked={this.state.announcements} onChange={this.handleChange}/>
                <Bold>Subscribe to Announcents about new QuirkyCoders features, member surveys and promotions.</Bold>
              </p>
              <p>
                <CheckBox name='updates' checked={this.state.updates} onChange={this.handleChange}/>
                <Bold>Subscribe to receive custom emails about your resume, job alerts and recommended QuirkyCoders services.</Bold>
              </p>
              <p>
                <CheckBox name='offers' checked={this.state.offers} onChange={this.handleChange}/>
                <Bold>Subscribe to receive special offers from select QuirkyCoders partners.</Bold>
              </p>
            </div>
          </Section>
        </MainContent>
      </div>
    )
  }
}
