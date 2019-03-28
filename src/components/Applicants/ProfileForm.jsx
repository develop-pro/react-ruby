import React, {Component} from 'react';
import { TextBox, CheckBox } from '../Shared/FormHelpers'
import styled from 'styled-components';
import { ButtonStyle } from '../Styles';
import UserService from '../../services/user.service';
import ProfileService from '../../services/profile.service';
import SkillSetForm from './SkillSetForm';
import WorkExperienceForm from './WorkExperienceForm';
import EducationForm from './EducationForm';

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

export default class ProfileForm extends Component {

  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
      fname: props.user.fname || '',
      lname: props.user.lname || '',
      phone: props.user.phone_primary || '',
      email: props.user.email || '',
      city: props.user.city || '',
      state: props.user.state || '',
      zip: props.user.zip || '',
      country: props.user.country || '',
      profile: {
        id: props.profile && props.profile.id,
        relocate: props.profile ? props.profile.relocate : false,
        veteran: props.profile ? props.profile.veteran : false,
        resumes: props.profile ? props.profile.resumes : [],
        clearance: props.profile ? props.profile.clearance : false,
        citizen: props.profile ? props.profile.citizen : false,
        skill_sets: props.profile ? props.profile.skill_sets : '',
        work_experiences: props.profile ? props.profile.work_experiences : '',
        educations: props.profile ? props.profile.educations : '',
        searchable: props.profile ? props.profile.searchable : true,
        primary: props.profile ? props.profile.primary : true,
        title: props.profile ? props.profile.title : '',
        salary: props.profile ? props.profile.salary || 0 : 0,
        hourly_rate: props.profile ? props.profile.hourly_rate || 0 : 0,
      }
    }
  }

  /** Education **/

  addEducation = (exp) => {
    let newArray;
    if (this.state.profile.educations) {
      newArray = this.state.profile.educations.slice()
    } else {
      newArray = []
    }
    let changeState = Object.assign({}, this.state.profile);
    newArray.push(exp);
    changeState['educations'] = newArray;
    this.setState({profile: changeState})
  }

  deleteEducation = (id) => {
    ProfileService.deleteEducation(id)
      .then(response => console.log(response))
      .catch(error => console.error(error))
  }

  /** Work experiences **/

  addWorkExperience = (exp) => {
    let newArray;
    if (this.state.profile.work_experiences) {
      newArray = this.state.profile.work_experiences.slice()
    } else {
      newArray = []
    }
    let changeState = Object.assign({}, this.state.profile);
    newArray.push(exp);
    changeState['work_experiences'] = newArray;
    this.setState({profile: changeState})
  }

  deleteWorkExperience = (id) => {
    ProfileService.deleteWorkExperience(id)
      .then(response => console.log(response))
      .catch(error => console.error(error.message))
  }

  /** Skill sets **/

  addSkillSet = (skillSet) => {
    let newArray = this.state.profile.skill_sets ? this.state.profile.skill_sets.slice() : [];
    newArray.push(skillSet);
    let changeState = Object.assign({}, this.state.profile);
    changeState['skill_sets'] = newArray;
    this.setState({profile: changeState});
  }

  deleteSkillSet = (id) => {
    ProfileService.deleteSkillSet(id)
      .then(response => console.log(response))
      .catch(error => console.error(error.message));
  }

  createProfile = () => {
    const user = this.getUserParams();
    const profile = this.getProfileParams();
    const resume = this.state.resume;

    ProfileService.create(user, profile)
      .then(response => {
        const rProfile = response.data.profile;
        resume ? this.addResumeAndUserProfile(user, rProfile, resume) : this.addUserProfile(rProfile);
        this.redirectToUserProfile(user, rProfile);
      })
      .catch(error => console.error(error));
  }

  updateProfile = () => {
    const user = this.getUserParams();
    const profile = this.getProfileParams();
    const resume = this.state.resume;

    ProfileService.update(user, profile)
      .then(response => {
        const rProfile = response.data.profile;
        resume && this.addResumeAndUserProfile(user, rProfile, resume);
        this.redirectToUserProfile(user, rProfile);
      })
      .catch(error => console.error(error));
  }

  addResumeAndUserProfile = (user, profile, resume) => {
    let data = new FormData();
    data.append('resume', resume[0]);
    ProfileService.uploadResume(user.id, profile, data)
      .then(response => this.addUserProfile(user, response.data.profile))
      .catch(error => console.error(error));
  }

  redirectToUserProfile = (user, profile) => {
    UserService.refreshUser(user.id)
      .then(userResponse => {
        this.props.history.push(`/dashboard/profiles/${profile.id}`);
      })
      .catch(error => console.error(error.message));
  }

  addUserProfile = (profile) => {
    this.props.addProfile(profile);
    this.props.history.push(`/dashboard/profiles/${profile.id}`);
  }

  getUserParams = () => {
    return {
      id: this.props.user.id,
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      phone_primary: this.state.phone,
      zip: this.state.zip,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
    }
  }

  getProfileParams = () => {
    let profile = {
      salary: this.state.profile.salary,
      hourly_rate: this.state.profile.hourly_rate,
      // salary: Number(this.state.profile.salary.replace(/[^0-9\.-]+/g,"")),
      // hourly_rate: Number(this.state.profile.hourly_rate.replace(/[^0-9\.-]+/g,"")),
      user_id: this.props.user.id,
      title: this.state.profile.title,
      primary: this.state.profile.primary,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      zipcode: this.state.zip,
      searchable: this.state.profile.searchable,
      security_clearance: this.state.profile.clearance,
      us_citizen: this.state.profile.citizen,
      relocate: this.state.profile.relocate,
      veteran: this.state.profile.veteran,
      skill_sets_attributes: this.state.profile.skill_sets || [],
      work_experiences_attributes: this.state.profile.work_experiences || [],
      educations_attributes: this.state.profile.educations || [],
    };

    // if props.profile empty consider new and return profile
    if (!this.props.profile) return profile;

    // set id so that profile is updated
    profile['id'] = this.props.profile.id
    return profile;
  }

  handleChange = (event) => {
    let name = event.target.name;
    let type = event.target.type;
    let value;

    const profileFields = [
      'salary', 'hourly_rate', 'user_id', 'title', 'primary', 'searchable',
      'clearance', 'citizen', 'relocate', 'veteran',
      'skill_sets_attributes', 'work_experiences_attributes',
      'educations_attributes'
    ];

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

    // if name in array save to profile
    if (profileFields.includes(name)) {
      let changeState = Object.assign({}, this.state.profile);
      changeState[name] = value;
      this.setState({profile: changeState});
    } else {
      this.setState({[name]: value});
    }
  }

  delete = (id) => {
    ProfileService.deleteProfile(id)
      .then(response => {
        this.props.history.push(`/dashboard/profiles`);
      })
      .catch(error => console.error("Something went wrong."));
  }

  render() {
    const { profile } = this.state;
    return (
      <Container enctype="multipart/form-data" className="tab_padd new_job_bg">
        <Header>
          <Status className="relative_top">
            { profile.searchable
                ? "Searchable (Editing):"
                : "Not Searchable (Editing):"
            }
          </Status>
          <Button type="button" className="btn btn-primary hidden-xs" onClick={() => this.delete(profile.id)}>Delete Profile</Button>
          <Button type="button" className="btn btn-primary" onClick={this.props.profile ? this.updateProfile : this.createProfile}>Done</Button>
        </Header>
        <div className="profile_detail post">
          <div className="row">
            <div className="col-lg-6">
              <TextBox type="text" className="form-control form-control-lg" name="fname" placeholder="First name" onChange={this.handleChange} value={this.state.fname} required/>
            </div>
            <div className="col-lg-6">
              <TextBox type="text" className="form-control form-control-lg" name="lname" placeholder="Last name" onChange={this.handleChange} value={this.state.lname} required/>
            </div>
            <div className="col-lg-4">
              <TextBox type="text" className="form-control form-control-lg" name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} required/>
            </div>
            <div className="col-lg-3">
              <TextBox type="text" className="form-control form-control-lg" name="phone" placeholder="Primary Phone" onChange={this.handleChange} value={this.state.phone} required/>
            </div>
            <div className="col-lg-3">
              <TextBox type="text" className="form-control form-control-lg" name="zip" placeholder="Zip" onChange={this.handleChange} value={this.state.zip} required/>
            </div>
            <div className="col-lg-2 width_33ip">
              <div className="searchable">
                <CheckBox name="searchable" onChange={this.handleChange} checked={profile.searchable} />
                <label htmlFor="checkbox6" className="css-label">Searchable</label>
              </div>
              <div className="searchable">
                <CheckBox name="primary" onChange={this.handleChange} checked={profile.primary} />
                <label htmlFor="checkbox6" className="css-label">Primary Profile</label>
              </div>
            </div>
            <div className="col-lg-4">
              <TextBox className="form-control form-control-lg" type="text" name="city" placeholder="City" onChange={this.handleChange} value={this.state.city} required/>
            </div>
            <div className="col-lg-4">
              <TextBox className="form-control form-control-lg" type="text" name="state" placeholder="State" onChange={this.handleChange} value={this.state.state} required/>
            </div>
            <div className="col-lg-4">
              <TextBox className="form-control form-control-lg" type="text" name="country" placeholder="Country" onChange={this.handleChange} value={this.state.country} required/>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <div className="row">
            <div className="col-lg-4">
              <div className="form-group">
                <label>Title</label>
                <TextBox type="text" className="form-control form-control-lg" name="title" placeholder="Desired Position" onChange={this.handleChange} value={profile.title} required/>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group">
                <label>Type</label>
                <select className="form-control form-control-lg" name="jobType" onChange={this.handleChange}>
                  <option>Employment type</option>
                  <option>Full-time</option>
                  <option>Contract</option>
                  <option>Part-Time</option>
                </select>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="form-group">
                <label>Annual Salary:</label>
                <TextBox
                  className="form-control form-control-lg"
                  name="salary"
                  placeholder="Salary"
                  onChange={this.handleChange}
                  value={profile.salary}
                  required/>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="form-group">
                <label>Hourly Rate:</label>
                <TextBox
                  className="form-control form-control-lg"
                  name="hourly_rate"
                  placeholder="Hourly Rate"
                  precision="2"
                  onChange={this.handleChange}
                  value={profile.hourly_rate}
                  required/>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-4">
              <div className="form-group">
                <label>Current Resume:</label>
                <TextBox
                  className="form-control form-control-lg"
                  placeholder="my-resume.pdf"
                  value={profile.resumes.map(resume => resume.name)}
                  disabled
                  required/>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group">
                <label>Upload New Resume</label>
                <input type="file" className="form-control form-control-lg form-control-file" name="resume" onChange={this.handleChange} />
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-3">
              <div className="form-check">
                <label>Able to Relocate?</label>
                <div className="searchable">
                  <label className="form-check-label">
                    <CheckBox
                      name="relocate"
                      onChange={this.handleChange}
                      checked={profile.relocate}/>
                    Yes
                  </label>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="form-check">
                <label>US Citizen?</label>
                <div className="searchable">
                  <label className="form-check-label">
                    <CheckBox
                      name="citizen"
                      onChange={this.handleChange}
                      checked={profile.citizen} />
                    Yes
                  </label>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="form-check">
                <label>Security Clearance?</label>
                <div className="searchable">
                  <label className="form-check-label">
                    <CheckBox
                      name="clearance"
                      onChange={this.handleChange}
                      checked={profile.clearance} />
                    Yes
                  </label>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="form-check">
                <label>Military Veteran?</label>
                <div className="searchable">
                  <label className="form-check-label">
                    <CheckBox
                      name="veteran"
                      onChange={this.handleChange}
                      checked={profile.veteran} />
                    Yes
                  </label>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <SkillSetForm profile={profile} add={this.addSkillSet} delete={this.deleteSkillSet}/>
          <hr />
          <WorkExperienceForm profile={profile} add={this.addWorkExperience} delete={this.deleteWorkExperience}/>
          <hr />
          <EducationForm profile={profile} add={this.addEducation} delete={this.deleteEducation}/>
        </div>
      </Container>
    )
  }
}
