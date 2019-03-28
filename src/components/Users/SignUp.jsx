import React, {Component} from 'react';
import loginLogo from '../../images/login-logo.png'
import { Link } from 'react-router-dom'
import signupBackground from '../../images/signup-bg.jpg'
import UserService from '../../services/user.service';
import Alert from 'sweetalert-react';
import Utils from '../../lib/utils'

export default class SignUp extends Component {

    constructor(props) {
      super(props)
      this.state = {
        email: ''
      }
    }

    onKeyDown = (event) => {
      if (event.key === 'Enter') {
        this.handleSignIn();
      }
    }

    handleSignIn = () => {
      UserService.signIn(this.state.email, this.state.password)
        .then((response) => {
          const user = response.data.user;
          Utils.setUserToken(response.data.token)
          this.setState({
            user: user,
            showLoginAlert: true,
            alertType: 'success',
            alertMessage: 'Welcome back!'
          });
          console.log('Settings user\'s token...')

          var promise = new Promise(resolve => setTimeout(resolve, 3000));

          promise.then(response => {
            console.log('Routing users...')
            this.setState({showLoginAlert: false})
            if (user.role === 'employer') {
              //this.props.history.push('/dashboard/jobs')
		window.location.href='/dashboard/jobs';
            } else {
              //this.props.history.push('/jobs')
		window.location.href='/jobs';
            }
          })
        })
        .catch((error) => {
          this.setState({
            showLoginAlert: true,
            alertType: 'error',
            alertMessage: error.response.data.message,
          });
        })
    }

    handleChange = (event) => {
      let name = event.target.name;
      let value = event.target.value
      this.setState({ [name]: value })
    }

    render() {
        const styles = {
          container: {
            width: 1020,
            margin: '0 auto'
          },

          logo: {
            width: 238,
            margin: '62px auto 100px',
            padding: 0
          },

          login: {
            width: 515,
            padding: '85px 80px',
            float: 'left',
            backgroundColor: '#fff',
            h1: {
              width: '100%',
              float: 'left',
              margin: '0 0 10px',
              padding: 0,
              fontSize: 28,
              color: '#39b54a',
              fontWeight: 400
            },
            formControl: {
              borderColor: '#8290a2',
              height: 45,
              color: '#8290a2',
              marginBottom: 10
            },
            p: {
              width: '100%',
              float: 'left',
              margin: 0,
              padding:0,
              color: '#8290a2',
              fontSize: 14
            },
            btn: {
              width: '100%',
              float: 'left',
              margin: '0 0 10px',
              backgroundColor: '#39b54a',
              color: '#fff',
              padding: '12px 0',
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 700,
              borderRadius: 4,
              WebkitTransition: 'all .2s ease-in-out',
              OTransition: 'all .2s ease-in-out',
              transition: 'all .2s ease-in-out'
            },
            social: {
              width: 160,
              float: 'left',
              margin: 0,
              backgroundColor: '#243580',
              color: '#fff',
              padding: '15px 0',
              textAlign: 'center',
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 4,
            },
            socialGoogle: {
              width: 160,
              margin: 0,
              backgroundColor: '#f20733',
              color: '#fff',
              float: 'right',
              padding: '15px 0',
              textAlign: 'center',
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 4,
            }
          },

          signup: {
            width: 505,
            padding: '120px 65px',
            float: 'left',
            background: `url(${signupBackground}) top left repeat-y #39b54a`,
            marginTop: 30,
            h1: {
              width: '100%',
              float: 'left',
              margin: 0,
              padding: 0,
              color: '#fff',
              fontSize: 28,
              fontWeight: 400
            },
            p: {
              width: '100%',
              float: 'left',
              margin: '20px 0',
              padding: 0,
              color: '#fff',
              fontSize: 14,
              fontWeight: 400
            },
            button: {
              width: 145,
              float: 'left',
              margin: 0,
              backgroundColor: '#0071bc',
              color: '#fff',
              padding: '12px 0',
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 700,
              borderRadius: 4,
              transition: 'all .2s ease-in-out',
            }
          }
        }

        return (
            <div className="login_container clearfix" style={styles.container} >
              <div className="login_logo" style={styles.logo}>
                <a href="/"><img src={loginLogo} alt=""/></a>
              </div>
              <div className="login_main clearfix" style={styles.login}>
                <h1 style={styles.login.h1}>Sign in</h1>
                <form name="usersignin">
                  <input
                    type="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    onKeyDown={this.onKeyDown}
                    style={styles.login.formControl}
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    required
                  />
                  <input
                    type="password"
                    onChange={this.handleChange}
                    style={styles.login.formControl}
                    onKeyDown={this.onKeyDown}
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <input type="button" style={styles.login.btn} onClick={this.handleSignIn} className="btn_signin" value="Sign In"/>
                </form>
                <p style={styles.login.p}>Forgot your password?</p>
                <div style={{margin: '10px 0'}}><center>OR</center></div>
                <Link style={styles.login.social} to="#">Linkedin</Link>
                <Link style={styles.login.socialGoogle} to="#">Google Mail</Link>
              </div>
              <div className="signup_main" style={styles.signup}>
                <h1 style={styles.signup.h1}>Sign up</h1>
                <p style={styles.signup.p}>Looking for a new career move. Look no further. Sign up now and engage with the employers using our platform.</p>
                <Link style={styles.signup.button} to="/register">Sign Up</Link>
                <div style={{position: 'relative', left: 20, top: 15}}><Link to="/employers/post-job" style={{color: '#fff'}}>Employers Sign Up</Link></div>
              </div>
              <Alert
                show={this.state.showLoginAlert}
                title="Login"
                text={this.state.alertMessage}
                // text="Welcome aboard!"
                type={this.state.alertType}
                onConfirm={() => this.setState({ showLoginAlert: false })}
              />
            </div>
        )
    }
}
