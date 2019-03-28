import React, { Component } from 'react';
import {ButtonStyle, Title} from '../Styles';
import {TextBox} from '../Shared/FormHelpers';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const Button = styled.i`
  color: #0071bc
`

export default class EducationForm extends Component {

  state = {
    profile: {
      ...this.props.profile,
      educations: [
        ...this.props.profile.educations
      ]
    },
    institution: '',
    city_state: '',
    country: '',
    education_type: ''
  };

  addEducation = () => {
    const education = this.getEducation();
    const newArray = [...this.state.profile.educations];
    newArray.push(education);
    this.props.add(education);
    this.setState({
      profile: {
        ...this.state,
        educations: [...newArray]
      },
      institution: '',
      education_type: '',
      city_state: '',
      country: '',
    })
  }

  getEducation = () => {
    return {
      institution: this.state.institution,
      education_type: this.state.education_type,
      city_state: this.state.city_state,
      country: this.state.country,
    }
  }

  delete = (id) => {
    let newArray = this.state.profile.educations.filter(education => education.id !== id);
    this.setState({
      profile: {
        ...this.state,
        educations: [
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
      this.props.add(this.getEducation());
    }
  }

  render() {
    return (
      <div>
        <Title>Education</Title>
        <div className="profile_detail post">
          { this.state.profile.educations.map((education, i) =>
              <Row key={i}>
                <Col lg={4}>
                  <select id="singleSelect" name="education_type" className="form-control form-control-lg" value={education.education_type} onChange={this.handleChange} onBlur={this.handleBlur}>
                    <option value="high school">High School</option>
                    <option value="some college">Some College</option>
                    <option value="associates">Associates Degree</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="masters">Mater's Degree</option>
                    <option value="phd">PHD Degree</option>
                  </select>
                </Col>
                <Col lg={3}>
                  <TextBox type="text" className="form-control form-control-lg" placeholder="Institution" name="institution" value={education.institution} onBlur={this.handleBlur} onChange={this.handleChange} />
                </Col>
                <Col lg={2}>
                  <TextBox type="text" className="form-control form-control-lg" placeholder="City, State" name="city_state" value={education.city_state} onBlur={this.handleBlur} onChange={this.handleChange} />
                </Col>
                <Col lg={2}>
                  <TextBox type="text" placeholder="Country" name="country" value={education.country} onBlur={this.handleBlur} onChange={this.handleChange} />
                </Col>
                <Col lg={1}>
                  <Button className="fa fa-close" onClick={() => this.delete(education.id)}></Button>
                </Col>
              </Row>
          )}
          <Row>
            <Col lg={4}>
              <select id="singleSelect" name="education_type" className="form-control form-control-lg" value={this.state.education_type} onBlur={this.handleBlur} onChange={this.handleChange}>
                <option>Select Education Level</option>
                <option value="high school">High School</option>
                <option value="some college">Some College</option>
                <option value="associates">Associates Degree</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Mater's Degree</option>
                <option value="phd">PHD Degree</option>
              </select>
            </Col>
            <Col lg={3}>
              <TextBox type="text" className="form-control form-control-lg" placeholder="Institution" name="institution" value={this.state.institution} onBlur={this.handleBlur} onChange={this.handleChange} />
            </Col>
            <Col lg={2}>
              <TextBox type="text" className="form-control form-control-lg" placeholder="City, State" name="city_state" value={this.state.city_state} onBlur={this.handleBlur} onChange={this.handleChange} />
            </Col>
            <Col lg={2}>
              <TextBox type="text" placeholder="Country" name="country" value={this.state.country} onBlur={this.handleBlur} onChange={this.handleChange} />
            </Col>
          </Row>
          <ButtonStyle type="button" className="btn btn-primary btn_apply white_bg" onClick={this.addEducation}>Add</ButtonStyle>
        </div>
      </div>
    )
  }
}
