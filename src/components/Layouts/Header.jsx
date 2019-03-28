import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import logo from '../../images/logo.png';
import avatar from '../../images/user-img.png';
import Radium from 'radium';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Utils from '../../lib/utils';
import styled from 'styled-components';

const styles = {
  container: {
    background: '#0a3949',
    color: '#fff',
    fontWeight: 400,
    fontSize: 16,
    borderRadius: 0,
    border: 0,
    padding: 13
  },
  link: {
  },
  logo: {
    padding: '4px 0',
    marginLeft: '0px'
  },
  toggle: {
    border: '#27a338',
    background: '#27a338'
  }
}

const StyledNavbar = styled(Navbar)`
  @media screen and (max-width: 767px) {
    padding: 13px 4px !important;
  }
`

const Container = styled.div`
  min-width: 375px;
  font-family: 'Raleway';
  text-decoration: none;
    color: #fff;
  .navbar-collapse a, .navbar-collapse span, .navbar-collapse .open {
    text-decoration: none;
    background: transparent !important;
    &:hover {
      color: #39b54a !important;
    }
  }

  .header.navbar-default .navbar-nav > li > a, .header.navbar-default .navbar-nav > li > ul> li > a {
    color: #fff;
  }

  .header.navbar-default .navbar-toggle .icon-bar {
    background: #fff;
  }

  .nav {
    @media screen and (max-width: 767px) {
      width: 54%;
      padding: 10px;
    }
    @media screen and (max-width: 1200px) {
      padding: 0;
      width: auto;
    }

    li {
      @media screen and (max-width: 767px) {
        color: #fff;
        text-decoration: none;
        padding: 0 20px;
        :hover {
          color: #39b54a;
        }
      }
      @media screen and (max-width: 1200px) {
        padding: 0;
        margin: 0 ;
      }
    }
  }
`

const DropdownStyle = styled.span`
  width: 179px;
  display: inline-block;
`

const DropdownButton = (props) => (
  <DropdownStyle>
    {props.user.fname} {props.user.lname}
    <span className="hidden-xs"><img alt= "avatar" style={{float: 'right', position: 'relative', left: -12, top: -14}} src={avatar}/></span>
  </DropdownStyle>
)

const Dropdown = styled(NavDropdown)`
  a {
    height: 0;
    color: #fff;
  }
  ul {
    background: #0a3949;
    position: absolute;
    top: 50px;
  }
  li {
    height: 30px;
  }
  .dropdown-menu > li > a {
    color: #fff;
  }
`

const Logo = styled.div`
  .navbar-header {
    margin-right: 20px;
  }

  @media screen and (max-width: 767px) {
    .navbar-header {
      margin-right: 0px;

      button {
        margin: 10px 0 0 0
      }
    }
  }
`

class Header extends Component {

  logOut = () => {
    this.props.logout(this.props.history);
  }

  isGuest = () => {
    return this.props.user === undefined && this.props.userLoaded;
  }

  show = () => {
    return Utils.isSignedIn() || this.isGuest();
  }

  render() {
    return (
      this.show() &&
      <Container>
        <StyledNavbar style={styles.container} fixedTop className="header">
          <Logo>
            <Navbar.Header>
              <Navbar.Brand>
                <Link style={styles.logo} to="/"><img src={logo} alt="QuirkyCoders"/></Link>
              </Navbar.Brand>
              <Navbar.Toggle id="nav-toggle" style={styles.toggle}/>
            </Navbar.Header>
          </Logo>
          <Navbar.Collapse>
            <Nav>

              { Utils.isSignedIn() &&
                <LinkContainer to='/dashboard'>
                  <NavItem style={styles.link}>Dashboard<div>{ console.log('equals', this.props.user) }</div></NavItem>
                </LinkContainer>
              }
              { (!Utils.isSignedIn() || Utils.isApplicant(this.props.user)) &&
                <LinkContainer to='/jobs'>
                  <NavItem style={styles.link}><i className="fa fa-search" alt="search"/> Search</NavItem>
                </LinkContainer>
              }
            </Nav>
            <Nav pullRight>
              { Utils.isSignedIn() && Utils.isEmployer(this.props.user) &&
                <LinkContainer to='/employers/post-job'>
                  <NavItem style={styles.link}>Post Jobs</NavItem>
                </LinkContainer>
              }
              { !Utils.isSignedIn() &&
                <LinkContainer to='/employers'>
                  <NavItem style={styles.link}>Post Jobs</NavItem>
                </LinkContainer>
              }
              { Utils.isSignedIn() && Utils.isApplicant(this.props.user) &&
                <Dropdown id="dropdown" title={DropdownButton(this.props)}>
                  <MenuItem href={`/dashboard/profiles`}>Profile</MenuItem>
                  <MenuItem href={`/dashboard/jobs`}>Jobs</MenuItem>
                  {false && <MenuItem href={`/dashboard/alerts`}>Alerts</MenuItem>}
                  {false && <MenuItem href={`/dashboard/settings`}>Settings</MenuItem>}
                  <MenuItem onClick={this.logOut}>Logout</MenuItem>
                </Dropdown>
              }
              { Utils.isSignedIn() && Utils.isEmployer(this.props.user) &&
                <Dropdown id="dropdown" title={DropdownButton(this.props)}>
                  <MenuItem href={`/dashboard/jobs`}>Jobs</MenuItem>
                  {false && <MenuItem href={`/dashboard/alerts`}>Alerts</MenuItem>}
                  {false && <MenuItem href={`/dashboard/settings`}>Settings</MenuItem>}
                  <MenuItem onClick={this.logOut}>Logout</MenuItem>
                </Dropdown>
              }
              { !Utils.isSignedIn() &&
                <LinkContainer to='/login'>
                  <NavItem style={styles.link}>Signin / Register</NavItem>
                </LinkContainer>
              }
            </Nav>
          </Navbar.Collapse>
        </StyledNavbar>
      </Container>
    )
  }
}

export default Radium(Header)
