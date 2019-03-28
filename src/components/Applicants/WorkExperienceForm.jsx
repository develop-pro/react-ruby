import React, { Component } from 'react';
import {ButtonStyle, Title} from '../Styles';
import {TextBox} from '../Shared/FormHelpers';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const Button = styled.i`
  color: #0071bc
`

export default class WorkExperienceForm extends Component {

  state = {
    profile: {
      ...this.props.profile,
      work_experiences: [
        ...this.props.profile.work_experiences
      ]
    },
    title: '',
    company: '',
    start_date: '',
    end_date: ''
  };

  addWorkExperience = () => {
    const exp = this.getWorkExperience();
    const newArray = [...this.state.profile.work_experiences];
    newArray.push(exp);
    this.props.add(exp);
    this.setState({
      profile: {
        ...this.state.profile,
        work_experiences: [...newArray]
      },
      title: '',
      company: '',
      start_date: '',
      end_date: '',
    })
  }

  getWorkExperience = () => {
    return {
      profile_id: this.props.profile.id,
      title: this.state.title,
      company: this.state.company,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    }
  }

  delete = (id) => {
    let newArray = this.state.profile.work_experiences.filter(exp => exp.id !== id);
    this.setState({
      profile: {
        ...this.state,
        work_experiences: [
          ...newArray
        ]
      },
    })
    this.props.delete(id)
  }

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]: value});
  }

  notEmpty = (key) => {
    return this.state[key] !== '';
  }

  handleBlur = (event) => {
    // determine if all fields filled out and if so submit to form
    if (Object.keys(this.state).every(this.notEmpty)) {
      this.props.add(this.getWorkExperience());
    }
  }

  render() {
    return (
      <div>
        <Title>Work Experience</Title>
        <div className="profile_detail post">
          { this.state.profile.work_experiences.map((exp, i) =>
              <Row key={i}>
                <Col lg={3}>
                  <TextBox type="text" placeholder="Job Title" className="form-control form-control-lg" name="title" value={exp.title} onBlur={this.handleBlur} onChange={this.handleChange} />
                </Col>
                <Col lg={3}>
                  <TextBox type="text" placeholder="Company" name="company" className="form-control form-control-lg" value={exp.company} onBlur={this.handleBlur} onChange={this.handleChange} />
                </Col>
                <Col lg={2}>
                  <TextBox type="text" placeholder="Start Date" name="start_date" className="form-control form-control-lg" value={exp.start_date || ''} onBlur={this.handleBlur} onChange={this.handleChange} />
                </Col>
                <Col lg={2}>
                  <TextBox type="text" placeholder="End Date" name="end_date" className="form-control form-control-lg" value={exp.end_date || ''} onBlur={this.handleBlur} onChange={this.handleChange} />
                </Col>
                <Col lg={1}>
                  <div className="searchable form-check">
                    <label htmlFor="checkbox7" className="form-check-label">
                        <input type="checkbox" id="checkbox7" className="form-check-input" />
                        Current
                      </label>
                  </div>
                </Col>
                <Col lg={1}>
                  <Button className="fa fa-close" onClick={() => this.delete(exp.id)}></Button>
                </Col>
              </Row>
          )}
          <Row>
            <Col lg={3}>
              <TextBox type="text" placeholder="Job Title" className="form-control form-control-lg" name="title" value={this.state.title} onBlur={this.handleBlur} onChange={this.handleChange} />
            </Col>
            <Col lg={3}>
              <TextBox type="text" placeholder="Company" name="company" className="form-control form-control-lg" value={this.state.company} onBlur={this.handleBlur} onChange={this.handleChange} />
            </Col>
            <Col lg={2}>
              <TextBox type="text" placeholder="Start Date" name="start_date" className="form-control form-control-lg" value={this.state.start_date} onBlur={this.handleBlur} onChange={this.handleChange} />
            </Col>
            <Col lg={2}>
              <TextBox type="text" placeholder="End Date" name="end_date" className="form-control form-control-lg" value={this.state.end_date} onBlur={this.handleBlur} onChange={this.handleChange} />
            </Col>
            <Col lg={1}>
              <div className="searchable form-check">
                <label htmlFor="checkbox7" className="form-check-label">
                    <input type="checkbox" id="checkbox7" className="form-check-input" />
                    Current
                  </label>
              </div>
            </Col>
          </Row>
          <ButtonStyle type="button" className="btn btn-primary btn_apply white_bg" onClick={this.addWorkExperience}>Add</ButtonStyle>
        </div>
      </div>
    )
  }
}
