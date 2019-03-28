import React from 'react';
import {Label, StyledFormControl, FieldContainer} from '../Styles';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import CurrencyInput from 'react-currency-input';
import {CardNumberElement,CardExpiryElement,CardCVCElement,PostalCodeElement} from 'react-stripe-elements'

const CardNumberField = StyledFormControl.withComponent(CardNumberElement);
const CardExpiryField = StyledFormControl.withComponent(CardExpiryElement);
const CardCVCField = StyledFormControl.withComponent(CardCVCElement);
const PostalCodeField = StyledFormControl.withComponent(PostalCodeElement);

const styles = {
  input: {
    width: '100%',
    submitBtn: {
      fontWeight: 'bold',
      background: '#0071BA'
    },
    padding: '6px 22px'
  }
}

const TextBox = (props) => {
  styles.input.height = props.height || 48
  styles.input.marginBottom = props.marginBottom !== undefined
    ? props.marginBottom
    : 10
  return (<input style={styles.input} type="text" value={props.value} className="form-control form-control-lg"  name={props.name} placeholder={props.placeholder} onChange={props.onChange} onBlur={props.onBlur} disabled={props.disabled}/>)
}

const NumberBox = (props) => {
  styles.input.height = props.height || 48
  styles.input.marginBottom = props.marginBottom !== undefined
    ? props.marginBottom
    : 10
  return (<CurrencyInput  prefix="$" style={styles.input} value={`${props.value}`} className="form-control" name={props.name} placeholder={props.placeholder} precision={props.precision || 2} onChangeEvent={props.onChange}/>)
}

const TextField = (props) => (
  <FormGroup>
    <Label componentClass={ControlLabel} sm={2}>{props.title}</Label>
    <FieldContainer>
      <StyledFormControl type="text" placeholder={props.placeholder} name={props.name} id={props.id} onChange={props.onChange} value={props.value} required/>
      <div className="alert alert-danger hide">
        Please enter valid value.
      </div>
    </FieldContainer>
  </FormGroup>
)

const PasswordField = (props) => (
  <FormGroup>
    <Label componentClass={ControlLabel} sm={2}>{props.title}</Label>
    <FieldContainer>
      <StyledFormControl type="password" placeholder={props.placeholder} name={props.name} id={props.id} onChange={props.onChange} value={props.value} required/>
      <div className="alert alert-danger hide">
        Please enter valid value.
      </div>
    </FieldContainer>
  </FormGroup>
)

const CheckBox = (props) => {
  return (
    <input type="checkbox" style={{display: 'inline'}} name={props.name} className="form-check-input" onChange={props.onChange} checked={props.checked} />
  )
}

const EmailField = (props) => (
  <FormGroup>
    <Label componentClass={ControlLabel}>{props.name}</Label>
    <FieldContainer>
      <StyledFormControl type="email" placeholder={props.placeholder} name={props.name} id={props.name} onChange={props.onChange} value={props.value} required/>
      <div className="alert alert-danger hide">
        Please enter valid value.
      </div>
    </FieldContainer>
  </FormGroup>
)

const NumberField = (props) => (
  <FormGroup>
    <Label componentClass={ControlLabel}>{props.name}</Label>
    <FieldContainer>
      <StyledFormControl type="number" placeholder={props.placeholder} name={props.name} id={props.id} onChange={props.onChange} value={props.value} required/>
      <div className="alert alert-danger hide">
        Please enter valid value.
      </div>
    </FieldContainer>
  </FormGroup>
)

const SelectField = (props) => (
  <FormGroup>
    { props.label &&
      <Label componentClass={ControlLabel}>{props.name}</Label>
    }
    <FieldContainer>
      { typeof props.options[0] === "string" || typeof props.options[0] === "number"
        ? <select className="form-control" style={props.style} name={props.name} id={props.name} onChange={props.onChange} value={props.value} required>
            {props.options.map((option, i) => <option value={option} key={i}>{option}</option>)}
          </select>
        : <select className="form-control" style={props.style} name={props.name} id={props.name} onChange={props.onChange} value={props.value} required>
            {props.options.map((option, i) => <option value={option.id} key={i}>{option.display}</option>)}
          </select>
      }
      <div className="alert alert-danger hide">
        Please enter valid value.
      </div>
    </FieldContainer>
  </FormGroup>
)

const Button = (props) => {
  const inputStyle = {
    width: '100%'
  }
  inputStyle['height'] = props.height || 48
  inputStyle['fontWeight'] = props.fontWeight
  return (<input style={inputStyle} type={props.type} value={props.value} onClick={props.handleSubmit} className="btn btn-lg btn-primary"/>)
}

const Input = (props) => {
  switch (props.type) {
    case 'button':
      return <Button {...props}/>
    default:
      return <TextBox {...props}/>
  }
}

export {
  Input,
  Button,
  TextBox,
  NumberBox,
  TextField,
  EmailField,
  NumberField,
  SelectField,
  CheckBox,
  PasswordField,
  CardNumberField,
  CardExpiryField,
  CardCVCField,
  PostalCodeField,
};
