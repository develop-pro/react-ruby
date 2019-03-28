import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Filter from './Filter';
import JobList from './JobList';
import msg_icon from '../../images/msg-icon.png';
import { Grid, Row, Col } from 'react-bootstrap';
import Radium from 'radium';
import QueryString from 'query-string';

const styles = {
  h1: {
    fontSize: 24,
    fontFamily: 'Raleway',
    color: '#0a3949',
    fontWeight: 700
  },
  button: {
    margin: "15px 0 0 0",
    color: '#fff',
    padding: '12px 25px'
  },
  p: {
    fontFamily: 'Raleway',
    width: '100%',
    float: 'left',
    margin: '0 0 20px 0',
    padding: 0,
    fontSize: 16,
    color: '#8290a2',
    fontWeight: 500,
  }
}

class JobListContainer extends Component {
  componentWillMount() {
    console.log('componentWillMount')
    this.search()
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps')
  }

  search(filters = null) {
    const keywords = QueryString.parse(this.props.location.search).keywords;
    const location = QueryString.parse(this.props.location.search).location;
    this.props.search(keywords, location, filters)
  }

  render() {
    return (
      <div>
        { this.props.jobsLoaded &&
          <Grid>
            <Row>
              <Col md={3}>
                <Filter filters={this.props.filters} search={(filters) => this.search(filters)}/>
              </Col>
              <Col md={9} className="clearfix">
                <Row>
                  <Col xs={5} sm={7} md={8} lg={8} className="clearfix">
                    <div className="animated flipInX">
                      <h1 style={styles.h1} className="">All Jobs</h1>
                      <p style={styles.p} className="hidden-xs">Displaying {this.props.jobs.length} out of {this.props.totalJobs} jobs</p>
                    </div>
                  </Col>
                  <Col xs={7} sm={5} md={4} lg={4} className="text-right clearfix">
                    {false && <Link to="#" style={styles.button} className="btn btn-primary btn-lg pull-right">
                      <img style={{marginRight: 10, fontWeight: 600}} src={msg_icon} alt="Create Job Alert"/> Create Job Alert
                    </Link>}
                  </Col>
                </Row>
                <Row className="clearfix" style={{position: 'relative', top: -10, marginBottom: 60}}>
                  <Col lg={12} className="clearfix">
                    <JobList jobs={this.props.jobs} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        }
      </div>
    )
  }
}

export default Radium(JobListContainer)
