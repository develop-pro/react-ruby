import React, { Component } from 'react';
import '../../styles/bootstrap-combined.min.css'
import '../../styles/animate.css'
import '../../styles/font-awesome.css'
import '../../styles/RalewayFontcss.css'
import '../../styles/custom.css'
import '../../styles/bootstrap.min.css'
import '../../styles/tab.css'
// import back_to from '../../images/back_to.png'
// import quick_loader from '../../images/quirky-loader.gif'
import ProfileForm from './ProfileForm'
import styled from 'styled-components'

const Container = styled.div`
  font-family: 'Raleway';
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
  width: 100%;
  float: left;
  margin: 0 0 7px;
  font-weight: 700;
  color: #39b54a;
  font-size: 24px;
  padding: 0;
`

export default class EditProfile extends Component {
  constructor(props) {
      super(props)
      this.state = {
          keywords: '',
          location: ''
      }
  }

  handleChange = (event) => {
      let name = event.target.name;
      let value = event.target.value
      this.setState({[name]: value})
  }

  handleSubmit = (keywords, location) => {
      let url = this.props.getSearchUrl(keywords, location)
      this.props.history.push(url)
  }

  render() {
    if (false) {
      return null;
    } else {
      // console.log('user', user);
      return (
        <Container className="TabbedPanelsContent TabbedPanelsContentVisible">
          <Header>
            <HeaderTitle>Edit Profile</HeaderTitle>
          </Header>
          <ProfileForm {...this.props} profile={this.props.profile}/>
        </Container>
      );
    }
  }
}
