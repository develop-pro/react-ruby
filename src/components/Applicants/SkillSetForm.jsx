import React, { Component } from 'react';
import {ButtonStyle, Title} from '../Styles';
import {TextBox} from '../Shared/FormHelpers';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const Button = styled.i`
  color: #0071bc
`

export default class SkillSetForm extends Component {

  state = {
    profile: {
      ...this.props.profile,
      skill_sets: [
        ...this.props.profile.skill_sets
      ]
    },
    name: '',
    experience: '',
    last_used: ''
  };

  addSkillSet = () => {
    const skillSetApi = this.getSkillSet();

    const skillSet = {
      profile_id: this.props.profile.id,
      skill: this.state.name,
      last_used: this.state.last_used,
      years_experience: this.state.experience,
    }

    const newArray = [...this.state.profile.skill_sets];
    newArray.push(skillSet);
    this.props.add(skillSetApi);
    this.setState({
      profile: {
        skill_sets: [...newArray]
      },
      name: '',
      last_used: '',
      experience: ''
    })
  }

  getSkillSet = () => {
    return {
      profile_id: this.props.profile.id,
      skill_attributes: { name: this.state.name },
      last_used: this.state.last_used,
      years_experience: this.state.experience,
    };
  }

  delete = (id) => {
    let newArray = this.state.profile.skill_sets.filter(skillSet => skillSet.id !== id);
    this.setState({
      profile: {
        ...this.state,
        skill_sets: [...newArray]
      },
    })
    this.props.delete(id);
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
      this.props.add(this.getSkillSet());
    }
  }

  render() {
    return (
      <div>
        <Title>Skills</Title>
        <div className="profile_detail post">
          {this.state.profile.skill_sets.map((skill_set, i) =>
            <Row key={i}>
              <Col lg={5}>
                <TextBox type="text" className="form-control form-control-lg" name="name" placeholder="Skill" value={skill_set.skill} onBlur={this.handleBlur} onChange={this.handleChange} required="required"/>
              </Col>
              <Col lg={3}>
                <TextBox type="text" className="form-control form-control-lg" name="experience" placeholder="Years experience" value={skill_set.years_experience} onBlur={this.handleBlur} onChange={this.handleChange} required="required"/>
              </Col>
              <Col lg={3}>
                <TextBox type="text" className="form-control form-control-lg" name="last_used" placeholder="Last Used" value={skill_set.last_used || ''} onBlur={this.handleBlur} onChange={this.handleChange} required="required"/>
              </Col>
              <Col lg={1}>
                <Button className="fa fa-close" onClick={() => this.delete(skill_set.id)}></Button>
              </Col>
            </Row>
          )}
          <Row>
            <Col lg={5}>
              <TextBox type="text" className="form-control form-control-lg" name="name" placeholder="Skill" value={this.state.name} onBlur={this.handleBlur} onChange={this.handleChange} required="required"/>
            </Col>
            <Col lg={3}>
              <TextBox type="text" placeholder="Yrs Exp." className="form-control form-control-lg" name="experience" value={this.state.experience} onBlur={this.handleBlur} onChange={this.handleChange}/>
            </Col>
            <Col lg={3}>
              <TextBox type="text" placeholder="Last Used (YYYY)" className="form-control form-control-lg" name="last_used" value={this.state.last_used} onBlur={this.handleBlur} onChange={this.handleChange}/>
            </Col>
          </Row>
          <ButtonStyle type="button" className="btn btn-primary btn_apply white_bg" onClick={this.addSkillSet}>Add</ButtonStyle>
        </div>
      </div>
    )
  }
}
