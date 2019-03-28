import React from 'react';
import {SignUp} from '../Users';
import {Loader} from '../Shared';
import './LogInLayout.css';
import loginBackground from '../../images/login-bg.jpg';
import styled from 'styled-components'

const Container = styled.div`
  background: url(${loginBackground}) center 120px no-repeat;
  backgroundColor: #093949;
  zIndex: -0;
`

const LogInLayout = (props) => (
  <Container>
    <SignUp {...props}/>
    <Loader/>
  </Container>
)

export default LogInLayout;
