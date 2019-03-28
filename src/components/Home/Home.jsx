import React, {Component} from 'react';
import Radium from 'radium';
import { Grid, Row, Col } from 'react-bootstrap';
import { ResumePlans, Testimonials, SearchBanner, Question, QuoteFront } from '../Shared';
import Utils from '../../lib/utils';

const styles = {
  main: {
      background: '#39b54a'
  },
}

const quote = {
  message: "I jumped on QuirkyCoders and in two hours, I found the right person",
  name: "Spenser Pryor",
  position: "Talent Acquisition Manager",
  company: "Pier 1 Imports",
}

class Home extends Component {
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

    handleSubmit = () => {
      this.props.history.push(Utils.getSearchUrl(this.state.keywords, this.state.location))
    }

    render() {
      return (
        <Grid style={styles.main} fluid className="clearfix">
          <Row>
            <Col>
              <SearchBanner handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
              <QuoteFront {...quote} />
              <ResumePlans />
              <Testimonials />
              <Question />
            </Col>
          </Row>
        </Grid>
      )
    }
}

export default Radium(Home);
