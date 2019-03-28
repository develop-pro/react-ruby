import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Form, FormGroup, ControlLabel} from 'react-bootstrap';
import JobService from '../../services/job.service';
import styled from 'styled-components';
import bottomBorder from '../../images/hadding-suprt.jpg';
import Editor from '../Shared/Editor';
import { ButtonStyle, Label, StyledFormControl, FieldContainer } from '../Styles';
import { TextField, EmailField, NumberField, SelectField } from '../Shared/FormHelpers';
import Utils from '../../lib/utils';

const Container = styled.div`
  .row {
    margin-bottom: 5px;
  }
  @media screen and (max-width: 767px) {
    .row {
      margin-bottom: 0;
    }
  }
`

const SectionTitle = styled.h3`
  width: 100%;
  float: left;
  text-align: left;
  background: url(${bottomBorder}) bottom left no-repeat;
  padding: 0 0 15px;
  margin: 50px 0 45px;
  color: #0071bc;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 700;
`

const DescriptionLabel = styled(Label)`
  width: 100%;
`

const CategoryLabel = styled(Label)`
  width: 40%;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`

const CategoryFieldContainer = styled(FieldContainer)`
`

const EditorWrapper = styled.div`
  float: left;
  width: 100%;
  .cke {
    border-radius: 4px;
  }
`

const LimitedAccess = styled.div`
  margin: -10px 0 40px 16px;
  width: 100%;
`

export default class JobForm extends Component {

  componentWillMount() {
    this.setState({jobLoaded: false});
    if (this.props.slug) {
      this.setState({action: 'edit'});
      this.loadJob(this.props.slug);
    } else {
      this.initializeJob();
    }
  }

  initializeJob = () => {
    this.setState({
      title: '',
      keywords: '',
      description: '',
      email: '',
      url: '',
      city: '',
      state: '',
      country: '',
      area_code: '',
      zipcode: '',
      pay_rate: '',
      job_length: '',
      telecomute: false,
      travel: false,
      positions: '',
      action: 'new',
      jobLoaded: true,
      products: Utils.getProducts(),
    });
  }

  loadJob = (slug) => {
    JobService.getJob(slug).then(response => {
      const job = response.data.job;
      this.setState({...job, applyEmail: job.apply_email, url: job.apply_url, jobLoaded: true});
    }).catch(error => {
      console.error('Error retrieving job.');
      console.error(error)
    })
  }

  isNew = () => {
    return this.state.action === 'new'
  }

  handleCancel = () => {
    this.props.history.push(`/jobs/${this.props.slug}`);
  }

  handleChange = (event) => {
    if (event.editor) {
      var newContent = event.editor.getData();
      this.setState({description: newContent});
    } else {
      let name = event.target.name;
      let value = event.target.value;
      this.setState({[name]: value});
    }
  }

  handleSubmit = (event) => {
    const job = this.getJobParams();

    if (this.props.hasJobCredits()) {
      JobService.createJob(this.getJobParams())
        .then(response => this.props.history.push('/dashboard/jobs'))
        .catch(error => console.error(error));
    } else {
      const quantity = Utils.getProduct(this.state.productId).quantity;

      // save to local storage
      Utils.setCart({cart: {job: job, productId: this.state.productId, quantity: quantity}})

      // send user to checkout
      this.props.history.push('/employers/store/checkout');
    }
  }

  handleUpdate = (event) => {
    const job = this.getJobParams();

    // update job data
    JobService.updateJob(job)
      .then(response => this.props.getJobBySlug(job.slug))
      .catch(error => console.error(error));
  }

  hasJobCredits = () => this.props.hasJobCredits();

  getJobParams = () => {
    return {
      id: this.state.id,
      title: this.state.title,
      keywords: this.state.keywords,
      description: this.state.description,
      apply_email: this.state.applyEmail,
      apply_url: this.state.url,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      area_code: this.state.area_code,
      zipcode: this.state.zipcode,
      pay_rate: this.state.pay_rate,
      job_length: this.state.job_length,
      telecommuting_position: this.state.telecomute,
      travel: this.state.travel,
      positions: this.state.positions,
      slug: this.state.slug,
      name: this.state.name,
      email: this.state.email,
    }
  }

  render() {
    const { products, productId } = this.state;
    const positionTypes = ['Full Time', 'Part Time', 'Contract', 'Full Time - Remote', 'Part Time - Remote', 'Contract - Remote'];
    const travelTypes = ['none', '0%-25%', '25%-50%', '50%-75%', '75%+'];
    const telecomute = ['No', 'Yes'];
    const total = Utils.getProductTotal(this.state.productId);

    return (
      <Container>
        <SectionTitle>Job Postings</SectionTitle>
        { this.state.jobLoaded &&
          <Form name="jobpostForm">
            <section>
              <Row>
                <Col sm={6}>
                  <TextField placeholder="ex: Ruby on Rails Developer" title="title" name="title" onChange={this.handleChange} value={this.state.title}/>
                </Col>
                <Col sm={6}>
                  <TextField placeholder="ruby, rails, rspec" title="keywords" name="keywords" onChange={this.handleChange} value={this.state.keywords}/>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <DescriptionLabel componentClass={ControlLabel}>Description</DescriptionLabel>
                    <EditorWrapper>
                      <Editor onChange={this.handleChange} value={this.state.description}/>
                    </EditorWrapper>
                  </FormGroup>
                </Col>
              </Row>
            </section>
            <section>
              <Row>
                <Col md={12}>
                  <SectionTitle>Application Method</SectionTitle>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <EmailField placeholder="your@email.com" title="Apply to email" name="applyEmail" onChange={this.handleChange} value={this.state.applyEmail} required/>
                </Col>
                <Col md={6}>
                  <TextField placeholder="http://yourwebsite.com/apply" title="url" name="url" onChange={this.handleChange} value={this.state.url} required/>
                </Col>
              </Row>
            </section>
            <section>
              <Row>
                <Col md={12}>
                  <SectionTitle>Location</SectionTitle>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <TextField placeholder="Charlotte" title="city" name="city" onChange={this.handleChange} value={this.state.city} />
                </Col>
                <Col md={6}>
                  <TextField placeholder="North Carolina" title="state" name="state" onChange={this.handleChange} value={this.state.state} />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <TextField placeholder="USA" title="country" name="country" onChange={this.handleChange} value={this.state.country} />
                </Col>
                <Col md={6}>
                  <NumberField placeholder="12345" title="zipcode" name="zipcode" onChange={this.handleChange} value={this.state.zipcode}  required/>
                </Col>
              </Row>
            </section>
            <section>
              <Row>
                <Col md={12}>
                  <SectionTitle>Compensation & Travel</SectionTitle>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <SelectField options={positionTypes} style={{background: 'initial', height: 54}} name="position_type" onChange={this.handleChange} value={this.state.poisiton_type} label required/>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <CategoryLabel>Pay Rate</CategoryLabel>
                    <CategoryFieldContainer>
                      <StyledFormControl type="number" placeholder="55" className="form-control" name="pay_rate" onChange={this.handleChange} value={this.state.pay_rate} required/>
                      <div className="alert alert-danger hide">
                        Please enter valid value.
                      </div>
                    </CategoryFieldContainer>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <CategoryLabel>Length</CategoryLabel>
                    <CategoryFieldContainer>
                      <StyledFormControl type="number" placeholder="12" className="form-control" name="job_length" onChange={this.handleChange} value={this.state.job_length} required/>
                      <div className="alert alert-danger hide">
                        Please enter valid value.
                      </div>
                    </CategoryFieldContainer>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col md={4}>
                <SelectField options={travelTypes} style={{background: 'initial', height: 54}} name="travel" onChange={this.handleChange} value={this.state.travel} label required/>
              </Col>
              <Col md={4}>
                <SelectField options={telecomute} style={{background: 'initial', height: 54}} name="telecomute" onChange={this.handleChange} value={this.state.telecomute} label required/>
              </Col>
              </Row>
              { this.isNew() && this.hasJobCredits() &&
                <Row style={{marginBottom: 100}}>
                  <Col>
                    <ButtonStyle type='button' style={{marginLeft: 14}} className="btn btn-primary" onClick={this.handleSubmit}>Post Job</ButtonStyle>
                    <ButtonStyle type='button' style={{marginLeft: 14}} className="btn btn-primary" onClick={this.handleCancel}>Cancel</ButtonStyle>
                  </Col>
                </Row>
              }
              { !this.isNew() &&
                <Row style={{marginBottom: 100}}>
                  <Col>
                    <ButtonStyle type='button' style={{marginLeft: 14}} className="btn btn-primary" onClick={this.handleUpdate}>Update</ButtonStyle>
                    <ButtonStyle type='button' style={{marginLeft: 14}} className="btn btn-primary" onClick={this.handleCancel}>Cancel</ButtonStyle>
                  </Col>
                </Row>
              }
            </section>
            <section>
              { this.isNew() && !this.hasJobCredits() &&
                <div>
                  <Row>
                    <Col md={6}>
                      <SectionTitle>Checkout</SectionTitle>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Job Posts</Label>
                        <FieldContainer>
                          <SelectField
                            options={products}
                            style={{background: 'initial', height: 54}}
                            name="productId"
                            onChange={this.handleChange}
                            value={productId}
                            required
                          />
                        </FieldContainer>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <Label>Order Total:</Label>
                      <FieldContainer style={{position: 'relative', top: 14, marginBottom: 40}}>
                        {total}
                      </FieldContainer>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <LimitedAccess className="clearfix">+Includes LIMITED access to our resume database!</LimitedAccess>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <ButtonStyle type='button' style={{marginLeft: 14}} className="btn btn-primary" onClick={this.handleSubmit}>Checkout</ButtonStyle>
                      <ButtonStyle type='button' style={{marginLeft: 14}} className="btn btn-primary">Cancel</ButtonStyle>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <SectionTitle>Pricing Information</SectionTitle>
                      <div className="main_div">
                        <div className="price_table">
                          { products.map((option, i) =>
                            <p key={i}>{option.display}</p>
                          ) }
                        </div>
                        <div className="price_table big">
                          <p>
                            <strong>Need More Jobs?</strong>
                            &nbsp;
                            <Link className="green_btn" to="/#">Contact Us</Link>
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <SectionTitle>Special Offer:</SectionTitle>
                      <p className="left">Get Free Limited Access to QuirkyCoders's resume and social profile database with each job post!
                        <br/>
                        <span>(Access is restricted to 10 candidate profile views)</span>
                      </p>
                    </Col>
                  </Row>
                </div>
              }
            </section>
          </Form>
        }
      </Container>
    )
  }
}
