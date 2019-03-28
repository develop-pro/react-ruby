import React, {Component} from 'react';
import {Row, Col, Form} from 'react-bootstrap';
import JobService from '../../services/job.service';
import StoreService from '../../services/store.service';
import styled from 'styled-components';
import bottomBorder from '../../images/hadding-suprt.jpg';
import {ButtonStyle} from '../Styles';
import {TextField, SelectField, PasswordField, CardNumberField, CardExpiryField,
        CardCVCField, PostalCodeField} from '../Shared/FormHelpers';
import Utils from '../../lib/utils';
import cardsImg from '../../images/cards_img.jpg';
import {injectStripe} from 'react-stripe-elements';

const Container = styled.div `
  .row {
    margin-bottom: 5px;
  }
  @media screen and (max-width: 767px) {
    .row {
      margin-bottom: 0;
    }
  }
`

const Bold = styled.p`
  font-weight: 700;
  font-size: 20px;
`

const Title = styled.h3 `
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

class CheckoutForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cardNumber: props.cardNumber,
      cvc: props.cvc,
      exp: props.exp,
      fname: props.fname,
      lname: props.lname,
      street1: props.street1,
      city: props.city,
      state: props.state,
      zip: props.zip,
      amount: props.amount,
      name: props.companyName,
      headquartersCity: props.headquartersCity,
      headquartersState: props.headquartersState,
      country: props.companyCountry,
      password: props.password,
      password_confirmation: props.passwordConfirmation,
      email: props.email
    };
  }

  componentWillMount() {
    window.scrollTo(0, 0);

    // Set state
    this.setState({jobLoaded: false});
    if (this.props.slug) {
      this.setState({action: 'edit'});
      this.loadJob(this.props.slug);
    }

    // Set cart from local storage
    const cart = Utils.getCart();
    this.setState({cart});
  }

  loadJob = (slug) => {
    JobService.getJob(slug).then(response => {
      const job = response.data.job;
      this.setState({
        ...job,
        email: job.apply_email,
        url: job.apply_url,
        jobLoaded: true
      });
    }).catch(error => {
      console.error('Error retrieving job.');
      console.error(error)
    })
  }

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === 'quantity') {
      this.setState({
        cart: {
          cart: {
            job: this.state.cart.cart.job,
            quantity: value,
            productId: Utils.getProductByQuantity(value).id
        }},
        [name]: value})
    } else {
      this.setState({[name]: value});
    }
  }

  isNew = () => {
    return this.state.action === 'new'
  }

  handleSubmit = (event) => {
    // process transaction
    this.processTransaction();
  }

  processTransaction = () => {
    const user = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.passwordConfirmation,
    }
    const company = {
      name: this.state.companyName,
      street_address_1: this.state.street1,
      street_address_2: this.state.street2,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      zip: this.state.zipcode,
      contact_phone: this.state.contact,
      billing_email: this.state.billingEmail,
      contact_email: null,
      contact_name: null,
    }
    const order = {
      product_id: this.state.cart.cart.productId,
      quantity: parseInt(this.state.cart.cart.quantity, 10),
    }
    const job = this.state.cart.cart.job;

    // create stripe token
    this.props.stripe.createToken({name: this.state.cardHolder, currency: 'usd'})
      .then(token => {
          // send stripe and transaction data to api server
          StoreService.processTransaction(user, company, order, job, token.token.id)
            .then(response => {
              if (response.data.auth_token) {
                localStorage.setItem('qcUserToken', JSON.stringify(response.data.auth_token))
              }
              localStorage.setItem('qcUser', JSON.stringify(response.data.user))
              this.props.history.push('/employers/store/order-complete');
            })
            .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  }

  render() {
    const countries = ['Country 1', 'Country 2'];
    const { quantity, productId } = this.state.cart.cart;
    const product = Utils.getProduct(productId);
    return (<Container>
      <Form>
        <Row>
          <Col sm={8}>
            <section>
              <Title>Shopping Cart</Title>
              <Row style={{ margin: '40px 0px', borderBottom: '2px solid #afafaf' }}>
                <Col sm={12}>
                  <Bold>30 Days Job Postings</Bold>
                </Col>
              </Row>
              <Row style={{ margin: '20px 0px', borderBottom: '2px solid #afafaf' }}>
                <Col sm={2}>
                  <SelectField name="quantity" options={[1,2,3,4,5,6,7,8,9,10]} onChange={this.handleChange} value={quantity}/>
                </Col>
                <Col sm={6}>
                  <Bold>Job Posting @ {Utils.currencyFormatter(product.value)} each</Bold>
                  <p>Posts are good for the next 12 months</p>
                </Col>
                <Col sm={4} style={{textAlign: 'right'}}>
                  <p>{Utils.getProductTotal(productId, quantity)}</p>
                </Col>
              </Row>
              <Row style={{ margin: '20px 0px', borderBottom: '2px solid #afafaf' }}>
                <Col sm={12}>
                  <Bold style={{textAlign: 'right'}}>Total: {Utils.getProductTotal(productId, quantity)}</Bold>
                </Col>
              </Row>
            </section>
                { Utils.isSignedIn()
                  ? <section>
                      <Title>User Information</Title>
                      <Row>
                        <Col sm={12}>
                          <div className="frm_caption">Email Address</div>
                          <div className="form-group">
                            <TextField name="email" value={this.state.email} onChange={this.handleChange} label required/>
                          </div>
                        </Col>
                        <Col sm={12}>
                          <div className="frm_caption">Password</div>
                          <div className="form-group small">
                            <PasswordField name="password" value={this.state.password} onChange={this.handleChange} required/>
                          </div>
                        </Col>
                      </Row>
                    </section>
                  : <section>
                      <Title>Company Information</Title>
                      <Row>
                        <Col sm={12}>
                          <div className="frm_caption">First Name</div>
                          <div className="form-group">
                            <TextField name="fname" value={this.state.fname} onChange={this.handleChange} label required/>
                          </div>
                        </Col>
                        <Col sm={12}>
                          <div className="frm_caption">Last Name</div>
                          <div className="form-group">
                            <TextField name="lname" value={this.state.lname} onChange={this.handleChange} label required/>
                          </div>
                        </Col>
                        <Col sm={12}>
                          <div className="frm_caption">Email Address</div>
                          <div className="form-group">
                            <TextField name="email" value={this.state.email} onChange={this.handleChange} label required/>
                          </div>
                        </Col>
                        <Col sm={12}>
                          <div className="frm_caption">Password</div>
                          <div className="form-group small">
                            <PasswordField name="password" value={this.state.password} onChange={this.handleChange} required/>
                          </div>
                        </Col>
                        <Col sm={12}>
                          <div className="frm_caption">Verify Password</div>
                          <div className="form-group">
                            <PasswordField name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleChange} required/>
                          </div>
                        </Col>
                        <Col sm={12}>
                          <div className="frm_caption">Company Name</div>
                          <div className="form-group">
                            <TextField type="text" name="companyName" value={this.state.companyName} onChange={this.handleChange} required/>
                          </div>
                        </Col>
                      </Row>
                    </section>}
            <section>
              <Title>Billing Information</Title>
              <Row>
                <Col sm={12}>
                  <div className="cards" style={{marginBottom: '20px'}}><img src={cardsImg} alt=""/></div>
                </Col>
                <Col sm={12}>
                  <div className="frm_caption" style={{padding: '15px 0'}}>Card Number</div>
                  <div className="form-group small">
                    <CardNumberField />
                  </div>
                  {/* <div className="alert alert-danger" ng-show="submitted && jobpostForm.number.$invalid" role="alert"> Please enter valid value. </div> */}
                </Col>
                <Col sm={12}>
                  <div className="frm_caption" style={{padding: '15px 0'}}>Expiration Date</div>
                  <div className="form-group small">
                    <CardExpiryField placeholder="mm/yyyy"/>
                  </div>
                </Col>
                <Col sm={12}>
                  <div className="frm_caption" style={{padding: '15px 0'}}>CVC</div>
                  <div className="form-group">
                    <CardCVCField placeholder="123"/>
                  </div>
                </Col>
                <Col sm={12}>
                  <div className="frm_caption" style={{paddingTop: 20}}>Cardholder Name</div>
                  <div className="form-group small">
                    <TextField name="cardHolder" placeholder="" value={this.state.cardHolder} onChange={this.handleChange} required/>
                  </div>
                </Col>
                <Col sm={12}>
                  <div className="frm_caption">Address 1</div>
                  <div className="form-group">
                    <TextField name="street1" value={this.state.street1} onChange={this.handleChange} required/>
                  </div>
                </Col>
                <Col sm={12}>
                  <div className="frm_caption">Address 2</div>
                  <div className="form-group">
                    <TextField name="street2" value={this.state.street2} onChange={this.handleChange} required/>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <div className="frm_caption">City</div>
                  <div className="form-group small">
                    <TextField name="city" value={this.state.city} onChange={this.handleChange} required/>
                  </div>
                </Col>
                <Col sm={12}>
                  <div className="frm_caption">State</div>
                  <div className="select_field">
                    <SelectField options={countries} style={{
                        background: 'initial',
                        height: 54
                      }} name="state" onChange={this.handleChange} value={this.state.state} required/>
                  </div>
                </Col>
                <Col sm={12}>
                  <div className="frm_caption">Country</div>
                  <div className="select_field">
                    <SelectField options={countries} style={{
                        background: 'initial',
                        height: 54
                      }} name="country" onChange={this.handleChange} value={this.state.country} required/>
                  </div>
                </Col>
                <Col sm={12}>
                  <div className="frm_caption" style={{padding: '5px 0'}}>Postal Code</div>
                  <div className="form-group small">
                    <PostalCodeField/>
                  </div>
                </Col>
                <Col sm={12}>
                  <div className="frm_caption" style={{paddingTop: 20}}>Contact Phone Number</div>
                  <div className="form-group small">
                    <TextField name="contactPhone" value={this.state.contactPhone} onChange={this.handleChange} required/>
                  </div>
                </Col>
                <Col sm={12}>
                  <div className="frm_caption">Email Address</div>
                  <div className="form-group small">
                    <TextField name="billingEmail" value={this.state.billingEmail} onChange={this.handleChange} required/>
                  </div>
                </Col>
              </Row>
              <Row style={{
                  margin: '40px 0px'
                }}>
                <Col>
                  <ButtonStyle className="btn btn-primary btn_apply" type="button" onClick={this.handleSubmit}>Confirm Purchase</ButtonStyle>
                  <ButtonStyle className="btn btn-primary btn_apply cancel" style={{marginLeft: 14}} type="button">Cancel</ButtonStyle>
                </Col>
              </Row>
            </section>
          </Col>
        </Row>
      </Form>
      <p className="left">Get Free Limited Access to QuirkyCoders's resume and social profile database with each job post!
        <br/>
        <span>( Access is restricted to 10 candidate profile views)</span>
      </p>
    </Container>);
  }
}

export default injectStripe(CheckoutForm);
