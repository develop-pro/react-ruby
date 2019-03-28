
import React, {Component} from 'react';
import testimonial_img from '../../images/testimonial-img.png';
import captcha_img from '../../images/captcha-img.png';
import prev_img from '../../images/prev.png';
import next_img from '../../images/next.png';
import app_store_img from '../../images/app-store-btn.png';
import google_play_btn from '../../images/google-paly-btn.png';
import mobile_app_img from '../../images/mobile-app-img.png';
import banner from '../../images/js_register_banner.jpg';
import jobIcon from '../../images/job-icon-sprite.png';
import bullet from '../../images/right_tab_bullet.jpg';
import blueGreenBg from '../../images/blue_green_bg.jpg';
import mobileAppBg from '../../images/mobile-app-bg.jpg';
import { Link } from 'react-router-dom';
import UserService from '../../services/user.service';

const styles = {
  banner: {
    fontFamily: 'Raleway, sans-serif',
    width: '100%',
    float: 'left',
    background: `url(${banner}) top center no-repeat`,
    backgroundSize: 'cover',
    margin: 0,
    padding: '80px 0 0',
    color: '#fff',
    h1: {
      width: '100%',
      float: 'left',
      margin: '20px 0',
      padding: 0,
      fontSize: 24,
      color: '#fff',
      fontWeight: 400,
      textTransform: 'uppercase',
    },
    h2: {
      margin: '5px 0 8px',
      width: '100%',
      float: 'left',
      color: '#fff',
      fontSize: 21,
      fontWeight: 500,
      padding: 0,
    },
    p: {
      width: '100%',
      float: 'left',
      color: '#fff',
      fontSize: 16,
      margin: 0,
      padding: 0,
    },
    processText: {
      width: 335,
      float: 'left'
    },
    process: {
      width: '100%',
      float: 'left',
      margin: '0 0 30px',
    },
    applicationIcon: {
      width: 74,
      height: 74,
      float: 'left',
      margin: '0 15px 0 auto',
      background: `url(${jobIcon}) top center no-repeat`,
      backgroundPosition: '-592px -2px'
    },
    profileIcon: {
      width: 74,
      height: 74,
      float: 'left',
      margin: '0 15px 0 auto',
      background: `url(${jobIcon}) top center no-repeat`,
      backgroundPosition: '-674px -2px'
    },
    searchIcon: {
      width: 74,
      height: 74,
      float: 'left',
      margin: '0 15px 0 auto',
      background: `url(${jobIcon}) top center no-repeat`,
      backgroundPosition: '-755px -2px'
    },
    rightTab: {
      width: '100%',
      float: 'left',
      background: 'rgba(0, 0, 0, 0.4)',
      marginBottom: 10,
      ul: {
        width: '100%',
        float: 'left',
        margin: 0,
        padding: 0,
        textAlign: 'center',
        listStyle: 'none'
      },
      li: {
        adding: '12px 2%',
        fontSize: 13,
        width: 'auto',
        display: 'inline-block',
        padding: '12px 5%',
        listStyle: 'none',
        background: `url(${bullet}) right 17px no-repeat`,
        color: '#fff',
        textTransform: 'uppercase',
      },
      liLast: {
        adding: '12px 2%',
        fontSize: 13,
        width: 'auto',
        display: 'inline-block',
        padding: '12px 5%',
        listStyle: 'none',
        color: '#fff',
        textTransform: 'uppercase',
      }
    },
    registerBlock: {
      width: '100%',
      float: 'left',
      background: 'rgba(0, 0, 0, 0.4)',
      padding: '20px 5%',
      h1: {
        width: '100%',
        float: 'left',
        color: '#fff',
        fontWeight: 300,
        margin: '0 0 15px',
        fontSize: 24
      },
      input: {
        width: '100%',
        float: 'left',
        margin: '0 0 10px',
        padding: '10px 4%',
        backgroundColor: '#f4f4f4',
        fontSize: 15,
        color: '#000000',
        fontWeight: 'bold',
        fontFamily: 'Arial',
        border: 0,
      },
      suggestion: {
        width: '100%',
        float: 'left',
        color: '#b5b5b5',
        fontSize: 14,
        fontWeight: 300,
        marginBottom: 15,
      }
    }
  },
  blueGreenBlock: {
    width: '100%',
    float: 'left',
    background: `url(${blueGreenBg}) top center repeat-y`,
  },
  hireBlock: {
    width: '48%',
    float: 'left',
    padding: '80px 0',
    color: '#fff',
    h1: {
      width: '100%',
      float: 'left',
      fontWeight: 700,
      textTransform: 'uppercase',
      fontSize: 30,
      margin: '0 0 10px',
    },
    p: {
      width: '100%',
      float: 'left',
      fontSize: 20,
      margin: 0,
      padding: 0,
    }
  },
  buttonBlock: {
    width: '50%',
    float: 'left',
    padding: '35px 0 25px',
    textAlign: 'center',
    a: {
      width: '65%',
      display: 'inline-block',
      fontSize: 16,
      color: '#cdebff',
      fontWeight: 500,
      textTransform: 'uppercase',
      padding: '20px 0',
      textAlign: 'center',
      margin: '0 auto 8px',
      border: '1px solid #8ccaf3',
    }
  },
  greyBlock: {
    width: '100%',
    float: 'left',
    backgroundColor: '#f5f5f5',
    padding: '70px 0',
    box: {
      width: '32.6%',
      margin: '0 0.5%',
      float: 'left',
      minHeight: 368,
      border: '1px solid #c2c2c2',
      borderRadius: 8,
      textAlign: 'center',
      padding: 30,
    },
    boxLeft: {
      width: '32.6%',
      margin: '0 0.5% 0 0',
      float: 'left',
      minHeight: 368,
      border: '1px solid #c2c2c2',
      borderRadius: 8,
      textAlign: 'center',
      padding: 30,
    },
    boxRight: {
      width: '32.6%',
      margin: '0 0 0 0.5%',
      float: 'left',
      minHeight: 368,
      border: '1px solid #c2c2c2',
      borderRadius: 8,
      textAlign: 'center',
      padding: 30,
    },
    applicationIcon: {
      width: 94,
      height: 94,
      margin: '0 auto',
      background: `url(${jobIcon}) top center no-repeat`,
      backgroundPosition: '-290px -1px',
    },
    searchIcon: {
      width: 94,
      height: 94,
      margin: '0 auto',
      background: `url(${jobIcon}) top center no-repeat`,
      backgroundPosition: '-389px -1px',
    },
    hiredIcon: {
      width: 94,
      height: 94,
      margin: '0 auto',
      background: `url(${jobIcon}) top center no-repeat`,
      backgroundPosition: '-489px -1px',
    }
  },
  testimonialBlock: {
    width: '100%',
    float: 'left',
    backgroundColor: '#fff',
    padding: '50px 0',
    textAlign: 'center',
    testimonialQuote: {
      width: '100%',
      float: 'left',
      padding: '40px 0',
      color: '#6a7177',
      fontSize: 24,
      fontWeight: 400,
    },
    name: {
      width: '100%',
      float: 'left',
      textAlign: 'center',
      color: '#3a3c41',
      fontSize: 24,
      fontWeight: 700,
      margin: '0 0 5px',
    },
    p: {
      width: '100%',
      float: 'left',
      textAlign: 'center',
      color: '#6a7177',
    }
  },
  mobileApp: {
    width: '100%',
    float: 'left',
    background: `url(${mobileAppBg}) top center no-repeat`,
    padding: '45px 0 0',
    backgroundSize: 'cover',
    mobileAppLeft: {
      width: 600,
      float: 'left',
      color: '#fff',
      h1: {
        width: '100%',
        float: 'left',
        margin: '0 0 10px',
        textTransform: 'uppercase',
        fontSize: 30,
        fontWeight: 600,
      },
      p: {
        fontSize: 15,
        margin: '0 0 20px',
        width: '100%',
        float: 'left',
      },
      button: {
        width: '100%',
        float: 'left',
        marginTop: 30,
      }
    }
  },
  downloadBlock: {
    width: '100%',
    float: 'left',
    padding: '100px 0 110px',
    backgroundColor: '#f3f5f5',
    textAlign: 'center',
    h1: {
      width: '100%',
      float: 'left',
      textAlign: 'center',
      color: '#8c9494',
      fontSize: 30,
      fontWeight: 700,
      margin: '0 0 30px',
    },
    input: {
      width: 520,
      display: 'inline-block',
      border: '2px solid #bbc3c2',
      borderRadius: 50,
      fontSize: 18,
      position: 'relative',
      left: 30,
      backgroundColor: '#fff',
      color: '#8c9494',
      fontFamily: 'Arial',
      padding: 17,
    },
    submitBtn: {
      display: 'inline-block',
      backgroundColor: '#39b54a',
      color: '#fff',
      textTransform: 'uppercase',
      position: 'relative',
      right: 35,
      fontWeight: 600,
      fontSize: 20,
      padding: '17px 45px 18px',
      borderRadius: 50,
    }
  }
}

export default class UserRegistration extends Component {

  state = {};

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value
    this.setState({[name]: value})
  }

  handleSubmit = () => {
    console.log('handleSubmit')
    // package data
    const data = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.passwordConfirmation
    }

    // send data
    UserService.applicantSignUp(data)
      .then(response => {
        localStorage.setItem('qcUserToken', JSON.stringify(response.data.auth_token));
        localStorage.setItem('qcUser', JSON.stringify(response.data.user));
        this.props.history.push('/dashboard/profiles/new');
      })
      .catch(error => {
        console.error('error', error)
      });
  }

  render() {
      return (
          <div>
              <div style={styles.banner}>
                  <div className="container">
                      <div className="row">
                          <div style={{width: '58%', float: 'left'}}>
                              <h1 style={styles.banner.h1}>Register on QuirkyCoders and search thousands of programming jobs</h1>
                              <div style={styles.banner.process} className="post">
                                  <div style={styles.banner.applicationIcon}></div>
                                  <div style={styles.banner.processText}>
                                      <h2 style={styles.banner.h2}>Register</h2>
                                      <p style={styles.banner.p}>Signing up is easy. QuirkyCoders is always free for coding professionals.</p>
                                  </div>
                              </div>
                              <div style={styles.banner.process} className="post">
                                  <div style={styles.banner.profileIcon}></div>
                                  <div style={styles.banner.processText}>
                                      <h2 style={styles.banner.h2}>Create a profile and upload your resume</h2>
                                      <p style={styles.banner.p}>Showcase your skills and let employers and recruiters find you.</p>
                                  </div>
                              </div>
                              <div style={styles.banner.process} className="post">
                                  <div style={styles.banner.searchIcon}></div>
                                  <div style={styles.banner.processText}>
                                      <h2 style={styles.banner.h2}>Search and apply to thousands of tech jobs</h2>
                                      <p style={styles.banner.p}>Apply with just the touch of a button!</p>
                                  </div>
                              </div>
                          </div>
                          <div style={{width: '42%', float: 'left'}}>
                              <div style={styles.banner.rightTab}>
                                  <ul style={styles.banner.rightTab.ul}>
                                      <li style={styles.banner.rightTab.li}>
                                          <Link to="/" style={{color: '#fff', textDecoration: 'none'}}>Post a Job</Link>
                                      </li>
                                      <li style={styles.banner.rightTab.li}>
                                          <Link to="/" style={{color: '#fff', textDecoration: 'none'}}>Recruiting</Link>
                                      </li>
                                      <li style={styles.banner.rightTab.liLast}>
                                          <Link to="/" style={{color: '#fff', textDecoration: 'none'}}>Contact Sales</Link>
                                      </li>
                                  </ul>
                              </div>
                              <div style={styles.banner.registerBlock} className="post">
                                  <h1 style={styles.banner.registerBlock.h1}>Register to Search Jobs</h1>
                                  <form name="register" noValidate>
                                      <input
                                        style={styles.banner.registerBlock.input}
                                        type="text"
                                        name="fname"
                                        placeholder="First Name"
                                        value={this.state.fname}
                                        onChange={this.handleChange}
                                        required/>
                                      <div className="alert alert-danger hide" role="alert">
                                          This field is required.
                                      </div>

                                      <input
                                        style={styles.banner.registerBlock.input}
                                        type="text"
                                        name="lname"
                                        placeholder="Last Name"
                                        value={this.state.lname}
                                        onChange={this.handleChange}
                                        required/>
                                      <div className="alert alert-danger hide" role="alert">
                                          This field is required.
                                      </div>

                                      <input
                                        style={styles.banner.registerBlock.input}
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        onChange={this.handleChange}
                                        required/>
                                      <div className="alert alert-danger hide" role="alert">
                                          This field is required.
                                      </div>

                                      <input
                                        style={styles.banner.registerBlock.input}
                                        type="password"
                                        name="password"
                                        placeholder="New Password"
                                        onChange={this.handleChange}
                                        required/>
                                      <div className="alert alert-danger hide" role="alert">
                                          This field is required.
                                      </div>

                                      <input
                                        style={styles.banner.registerBlock.input}
                                        type="password"
                                        name="passwordConfirmation"
                                        placeholder="Confirm Password"
                                        onChange={this.handleChange}
                                        required/>
                                      <div className="alert alert-danger hide" role="alert">
                                          This field is required.
                                      </div>

                                      <span style={styles.banner.registerBlock.suggestion}>8 character minimum with at least 1 number and 1 letter.</span>

                                      <div className="captcha_img"><img src={captcha_img} alt=""/></div>
                                      <button
                                        style={styles.banner.registerBlock.input}
                                        type="button"
                                        onClick={this.handleSubmit}
                                        className="btn_start">
                                        Start Searching
                                      </button>
                                  </form>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div style={styles.blueGreenBlock}>
                  <div className="container">
                      <div style={styles.hireBlock}>
                          <h1 style={styles.hireBlock.h1} className="post">Looking to hire ?</h1>
                          <p style={styles.hireBlock.p}>Browse our resume database and learn about our
                              <br/>Open Web social recruiting tools.</p>
                      </div>
                      <div style={styles.buttonBlock}>
                          <Link style={styles.buttonBlock.a} to="/">Post a Job</Link>
                          <Link style={styles.buttonBlock.a} to="/">Employer Login</Link>
                          <Link style={styles.buttonBlock.a} to="/">Contact sales</Link>
                      </div>
                  </div>
              </div>
              <div style={styles.greyBlock}>
                  <div className="container">
                      <div style={styles.greyBlock.boxLeft}>
                          <div style={styles.greyBlock.applicationIcon}></div>
                          <h3>Get Notified</h3>
                          <p>Sign up for job alerts and get the newest job postings you want delivered right to your email.</p>
                      </div>
                      <div style={styles.greyBlock.box}>
                          <div style={styles.greyBlock.searchIcon}></div>
                          <h3>Get Found</h3>
                          <p>Employers and recruiters use QuirkyCoders to find candidates like you. Make your resume searchable and allow recruiters to contact you. Your job search just got easier!</p>
                      </div>
                      <div style={styles.greyBlock.boxRight}>
                          <div style={styles.greyBlock.hiredIcon}></div>
                          <h3>Get Hired</h3>
                          <p>QuirkyCoders connects the best tech talent with jobs around the world. Whether you're a developer, engineer, or QA tester, QuirkyCoders has what you need to keep your career on track.</p>
                      </div>
                  </div>
              </div>
              <div style={styles.testimonialBlock}>
                  <div className="container">
                      <div id="myCarousel" className="carousel slide" data-ride="carousel">
                          <div className="carousel-inner">
                              <div className="item active">
                                  <img src={testimonial_img} alt="" width="130" height="130" className="post"/>
                                  <div style={styles.testimonialBlock.testimonialQuote}>Etiam pretium quam sed lectus mollis, sed element cursus. Phasellus vitae mollis sem. Mauris vestibu ac placerat mollis, Fully Recommonded !....</div>
                                  <div className="testimonial_name">
                                      <h2 style={styles.testimonialBlock.name}>Cole Rowden</h2>
                                      <p style={styles.testimonialBlock.p}>Firewall Engineer (www.testdemo.com)</p>
                                  </div>
                              </div>
                              <div className="item">
                                  <img src={testimonial_img} alt="" width="130" height="130" className="post"/>
                                  <div style={styles.testimonialBlock.testimonialQuote}>Etiam pretium quam sed lectus mollis, sed element cursus. Phasellus vitae mollis sem. Mauris vestibu ac placerat mollis, Fully Recommonded !....</div>
                                  <div className="testimonial_name">
                                      <h2 style={styles.testimonialBlock.name}>Cole Rowden</h2>
                                      <p style={styles.testimonialBlock.p}>Firewall Engineer (www.testdemo.com)</p>
                                  </div>
                              </div>
                              <div className="item">
                                  <img src={testimonial_img} alt="" width="130" height="130" className="post"/>
                                  <div style={styles.testimonialBlock.testimonialQuote}>Etiam pretium quam sed lectus mollis, sed element cursus. Phasellus vitae mollis sem. Mauris vestibu ac placerat mollis, Fully Recommonded !....</div>
                                  <div className="testimonial_name">
                                      <h2 style={styles.testimonialBlock.name}>Cole Rowden</h2>
                                      <p style={styles.testimonialBlock.p}>Firewall Engineer (www.testdemo.com)</p>
                                  </div>
                              </div>
                          </div>
                          <Link className="carousel-control left" to="#myCarousel" data-slide="prev"><img src={prev_img} alt=""/></Link>
                          <Link className="carousel-control right" to="#myCarousel" data-slide="next"><img src={next_img} alt=""/></Link>
                      </div>
                  </div>
              </div>
              <div style={styles.mobileApp}>
                  <div className="container">
                      <div style={styles.mobileApp.mobileAppLeft}>
                          <h1 style={styles.mobileApp.mobileAppLeft.h1}>Get the QuirkyCoders Mobile App</h1>
                          <p style={styles.mobileApp.mobileAppLeft.p}>Get the edge you need to find and apply for the right technology jobs fast. Browse thousands of open positions: Java, project manager, business analyst, . net, SAP, start-ups, systems administrator, DBA, Hadoop, SQL, programming, VMware, software engineer, Ruby, and so many more.</p>
                          <p style={styles.mobileApp.mobileAppLeft.p}>{"Browse thousands of tech jobs. Apply with a few taps. It's seriously that fast."}</p>
                          <div style={styles.mobileApp.mobileAppLeft.button} className="post">
                              <Link to="/"><img src={app_store_img} alt=""/></Link>
                              &nbsp; &nbsp;
                              <Link to="/"><img src={google_play_btn} alt=""/></Link>
                          </div>
                      </div>
                      <div className="mobile_app_right">
                          <img src={mobile_app_img} className="post" alt=""/>
                      </div>
                  </div>
              </div>
              <div style={styles.downloadBlock}>
                  <div className="container">
                      <h1 style={styles.downloadBlock.h1}>{"Want a link to download? We'll email you one."}</h1>
                      <div className="main_div">
                          <input style={styles.downloadBlock.input} type="text" className="download_input" placeholder="your email address"/>
                          <Link style={styles.downloadBlock.submitBtn} to="/" className="btn_submit">Submit</Link>
                      </div>
                  </div>
              </div>
          </div>
      )
  }
}
