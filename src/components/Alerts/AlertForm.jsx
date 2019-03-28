import React, {Component} from 'react';
import { TextBox } from '../Shared/FormHelpers'
import styled from 'styled-components';
import { ButtonStyle } from '../Styles';
import UserService from '../../services/user.service';

const Container = styled.form`
  color: #8290a2;
  padding: 0 0 0 20px;
  label {
    font-weight: 500;
  }
  input[type=checkbox], input[type=radio] {
    margin: 4px 10px 0 0;
    margin-top: 1px\9;
    line-height: normal;
  }
  select {
    height: 48px;
    margin-bottom: 10px;
  }
  input[type=file] {
    height: 48px;
    margin-bottom: 10px;
  }
  @media screen and (max-width: 767px) {
    padding: 0;
  }
`;

const Header = styled.h1`
  width: 100%;
  float: left;
  margin: 15px 0 20px;
  font-weight: 700;
  color: #39b54a;
  font-size: 24px;
  border-bottom: 1px solid #8da3aa;
  padding-bottom: 15px;
`;

const Button = styled(ButtonStyle)`
  float: right;
  @media screen and (max-width: 767px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const Status = styled.div`
  float: left;
  margin-top: 20px;
  @media screen and (max-width: 767px) {
    width: 100%;
    margin-bottom: 10px;
  }
`

export default class AlertForm extends Component {

  constructor(props) {
    super(props);
    console.log('props', props)
    this.state = {
      id: props.alert.id,
      name: props.alert.name,
      query: props.alert.query,
      userId: props.user.id,
      frequency: props.alert.frequency,
    }
  }

  componentWillMount() {
    console.log('in componentWillMount')
  }

  createAlert = () => {

    const alert = {
      name: this.state.name,
      query: this.state.query,
      user_id: this.state.userId,
      frequency: this.state.frequency,
    }

    UserService.createUserAlert(this.props.user, alert)
      .then(response => {
        this.props.history.push(`/dashboard/alerts`);
      })
      .catch(error => {
        console.log(error);
      })
  }

  updateAlert = () => {

    const alert = {
      id: this.state.id,
      name: this.state.name,
      query: this.state.query,
      frequency: this.state.frequency,
      user_id: this.state.userId,
    }

    UserService.updateUserAlert(this.props.user, alert)
      .then(response => {
        this.props.history.push(`/dashboard/alerts`);
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleChange = (event) => {
    let name = event.target.name;
    let type = event.target.type;
    let value;
    switch(type) {
      case 'checkbox':
        value = event.target.checked
        break;
      case 'file':
        const files = event.target.files;
        if (files && files[0]) {
          value = files;
        }
        break;
      default:
        value = event.target.value;
    }
    this.setState({[name]: value});
  }

  render() {
    const { alert } = this.props;
    return (
      <Container enctype="multipart/form-data" className="tab_padd new_job_bg">
        <Header>
          <Status className="relative_top">
            { alert.searchable
                ? "Edit Alert:"
                : "Create Alert:"
            }
          </Status>
          <Button type="button" className="btn btn-primary hidden-xs" to="/#">Delete Alert</Button>
          <Button type="button" className="btn btn-primary" onClick={alert.id ? this.updateAlert : this.createAlert}>Done</Button>
        </Header>
        <div>
          <div className="row">
            <div className="col-lg-4">
              <div className="form-group">
                <label>Name</label>
                <TextBox type="text" className="form-control form-control-lg" name="name" placeholder="Name" onChange={this.handleChange} value={this.state.name} required/>
              </div>
            </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <label>Keyword, Language, Job title</label>
                  <TextBox type="text" className="form-control form-control-lg" name="query" placeholder="i.e. - Java, Java Developer" onChange={this.handleChange} value={this.state.query} required/>
                </div>
              </div>
            <div className="col-lg-4">
              <div className="form-group">
                <label>Frequency</label>
                <select className="form-control form-control-lg" name="frequency" onChange={this.handleChange} value={this.state.frequency}>
                  <option>Select frequency</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </Container>
    )
  }
}
