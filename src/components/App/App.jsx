import React, {Component} from 'react';
import '../../styles/bootstrap-combined.min.css';
import '../../styles/animate.css';
import '../../styles/font-awesome.css';
import '../../styles/RalewayFontcss.css';
import '../../styles/custom.css';
import Radium, {StyleRoot} from 'radium';
import {DefaultLayout, LogInLayout} from '../Layouts';
import {Switch, Route} from 'react-router-dom';
import Alert from 'sweetalert-react';
import {StripeProvider} from 'react-stripe-elements';
import 'sweetalert/dist/sweetalert.css';
import UserService from '../../services/user.service';

class App extends Component {
  componentWillMount = (props) => {
    console.log('App - componentWillMount')
    this.getCurrentUser();
  }

  componentWillReceiveProps = (props) => {
    console.log('App - componentWillReceiveProps')
    this.getCurrentUser();
  }

  getCurrentUser = () => {
    UserService.identify(localStorage.getItem('qcUserToken'))
      .then(response => {
        console.log('set user...')
        this.setState({
          user: response.data.user,
          userLoaded: true,
          guest: true
        });
      })
      .catch(error => {
        this.setState({
          userLoaded: false,
          guest: true
        })
      });
  }

  logout = (history) => {
    const {user} = this.state;
    console.log("Logging user out...")
    this.setState({showLogOutAlert: true})
    setTimeout(() => {
      this.setState({showLogOutAlert: false})
      localStorage.clear();
      if (user && user.role === 'employer') {
        //history.push('/login')
	window.location.href='/login';
      } else {
        //history.push('/')
	window.location.href='/';
      }
    }, 3000)
  }

  render() {
    const styles = {
      container: {
        backgroundColor: '#093949',
        minHeight: '100%',
        minWidth: 375
      }
    }

    const { user, userLoaded } = this.state;

    return (
      !userLoaded
      ? <div>Loading...</div>
      :
      <StripeProvider apiKey="pk_test_qPWXaBKdaJ5ywkTw1aaitpsl">
        <StyleRoot>
          <div className="app" style={styles.container}>
            <Switch>
              <Route path='/login' render={(props) => <LogInLayout user={user} {...props}/>}/>
              <Route path='*' render={(props) => (<DefaultLayout user={user} userLoaded={userLoaded} logout={this.logout} {...props}/>)}/>
            </Switch>
            <Alert
              show={this.state.showLogOutAlert}
              title="Logout"
              text="You are logged out!"
              onConfirm={() => this.setState({ show: false })}
              type='success'
            />
          </div>
        </StyleRoot>
      </StripeProvider>
    );
  }
}

export default Radium(App);
