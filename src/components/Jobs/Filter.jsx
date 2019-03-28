import React, { Component } from 'react';
import filter_img from '../../images/filter.png';
import plush_icon from '../../images/plush-icon.png';
import { Grid, Row, Col, PanelGroup, Panel } from 'react-bootstrap';
import Radium from 'radium';
import styled from 'styled-components';
import Utils from '../../lib/utils';

const styles = {
  container: {
    border: '1px solid #dfe1e4',
    borderRadius: 5,
    margin: '20px 0'
  },
  menu: {
    borderTop: '1px solid #dfe1e4',
    margin: 0,
    padding: 0,
    listStyle: 'none',
    fontWeight: 'normal',
    textDecoration: 'none',
    lineHeight: 1,
    position: 'relative'
  },
  menuList: {
    margin: 0,
    padding: 0,
    border: 0,
    listStyle: 'none',
    fontWeight: 'normal',
    textDecoration: 'none',
    lineHeight: 1,
    position: 'relative'
  },
}

const PageTitle = styled.h2`
  width: 100%;
  float: left;
  padding: 17px 6%;
  color: #0a3949;
  font-weight: 700;
  font-size: 16px;
  background-color: #dfe1e4;
  margin: 0;
  border-radius: 5px 5px 0 0;
`

const Filters = styled(PanelGroup)`
  padding-top: 52px;
  margin: 0;
  border: 0;
  .panel-heading {
    background-color: transparent;
    border: 0 !important;
    margin: 0 !important;
    border-radius: 0;
  }
  .panel {
    margin: 0 !important;
    border: 0;
    border-radius: 0;
    box-shadow: none;
  }
  .panel-default {
    margin: 0 !important;
    border-bottom: 1px solid #ddd;
    &:last-child {
      border: 0;
      border-radius: 4px;
    }
  }
  .panel-body {
    margin: 0 !important;
  }
  .panel-footer {
    border: 0 !important;
    margin: 0 !important;
  }
  a {
    text-decoration: none;
    cursor: pointer;
  }
`

const Header = styled.div`
  font-weight: 500;
  display: block;
  color: #184453;
  font-size: 16;
  outline: none;
  line-height: 1.3;
`

const SubMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  input {
    margin-right: 8px;
  };
`

class Filter extends Component {

  componentWillMount() {
    console.log('componentWillMount')
    this.initFilters()
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps')
    this.initFilters()
  }

  formatHeader(str) {
    return str.toLowerCase().replace(' ', '-');
  }

  initFilters() {
    var filters = JSON.parse(localStorage.getItem('jobFilters')) || {};
    var checkboxes = Array.from(document.getElementsByTagName('Input'));

    checkboxes.forEach(cb => {
      for (var attrs in filters) {
        if (filters[attrs][0] === cb.value) {
          cb.checked = true;
        }
      }
    })
  }

  filterResults = () => {
    var titlePanel = document.getElementById('job-title')
    var cityPanel = document.getElementById('job-city')
    var statePanel = document.getElementById('job-state')
    var countryPanel = document.getElementById('job-country')
    var employmentTypePanel = document.getElementById('job-employment-type')

    var filters = {
      title_in: titlePanel && this.getCheckedInputs(titlePanel),
      city_in: cityPanel && this.getCheckedInputs(cityPanel),
      state_in: statePanel && this.getCheckedInputs(statePanel),
      country_in: countryPanel && this.getCheckedInputs(countryPanel),
      employment_type_in: employmentTypePanel && this.getCheckedInputs(employmentTypePanel),
    }

    this.persistFilters(filters);

    this.props.search(filters);
  }

  persistFilters(filters) {
    filters = Utils.clean(filters);
    localStorage.setItem("jobFilters", JSON.stringify(filters));
  }

  getCheckedInputs(obj) {
    return obj && Array.from(obj.getElementsByTagName('Input'))
      .filter(input => input.checked).map(input => input.value)
  }

  filters() {
      var filters = [{
        header: 'Title',
        values: this.props.filters.titles.values,
        link: '/jobs/#',
      },
      {
        header: 'City',
        values: this.props.filters.cities.values,
        link: '/jobs/#',
      },
      {
        header: 'State',
        values: this.props.filters.states.values,
        link: '/jobs/#',
      },
      {
        header: 'Country',
        values: this.props.filters.countries.values,
        link: '/jobs/#',
      },
      {
        header: 'Employment Type',
        values: this.props.filters.employmentTypes.values,
        link: '/jobs/#',
      }];
      return filters.filter(e => e.values.length > 0);
  }

  render() {
    return (
      <Grid style={styles.container} fluid={true} className="hidden-xs" id="jobs-filter">
        <Row>
          <Col>
            <PageTitle><img src={filter_img} alt="Filter Results"/>&nbsp;&nbsp;Filter Results</PageTitle>
            <Filters>
              { this.filters().map((filter, i) =>
                <Panel id={"job-" + this.formatHeader(filter.header)} collapsible header={<Header>{filter.header}<span><img className="pull-right" src={plush_icon} alt=""/></span></Header>} key={i} eventKey={i}>
                  <SubMenu>
                    { filter.values.map((v, j) =>
                      <li key={j}>
                        <span>
                          <input className="css-checkbox" type="checkbox" value={filter.header === 'State' ? v.abbr : v} onClick={() => this.filterResults()}/>
                          <span className="css-label" style={{color: '#999'}}>{filter.header === 'State' ? v.name : v}</span>
                        </span>
                      </li>
                    )}
                  </SubMenu>
                </Panel>
              )}
            </Filters>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Radium(Filter);
