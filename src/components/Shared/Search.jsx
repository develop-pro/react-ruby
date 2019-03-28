import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { TextBox, Button } from './FormHelpers';
import styled from 'styled-components';

const styles = {
  container: {
    padding: '20px 0',
    backgroundColor: '#f6f7f8',
    borderBottom: '#dfe1e4',
    fontWeight: 600,
    fontFamily: "'Raleway', 'sans-serif'"
  },
  input: {
    padding: '6px 22px'
  }
}

const StyledCol = styled(Col)`
  @media screen and (max-width: 991px) {
    margin-bottom: 10px;
  }
`

class Search extends Component {

  componentWillMount() {
    const urlParams = new URLSearchParams(window.location.search);
    this.setState({
      keywords: urlParams.get('keywords') || '',
      location: urlParams.get('location') || ''
    })
  }

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    this.props.search(this.state.keywords, this.state.location)
  }

  render() {
    return (
      <div style={styles.container} className="search">
        <Grid>
          <Row>
            <Col md={12}>
              <form name="searchForm">
                <Row>
                  <StyledCol md={6}>
                    <TextBox type="text" marginBottom={0} value={this.state.keywords} className="form-control" name="keywords" placeholder="Job title, keywords or company name" onChange={this.handleChange}/>
                  </StyledCol>
                  <StyledCol md={3}>
                    <TextBox type="text" marginBottom={0} value={this.state.location} className="form-control" name="location" placeholder="City or State" onChange={this.handleChange}/>
                  </StyledCol>
                  <Col md={3}>
                    <Button type="button" value="Search" className="btn btn-lg btn-primary" fontWeight="600" handleSubmit={this.handleSubmit}/>
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Search;
