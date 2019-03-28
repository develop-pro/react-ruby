import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components'

const Button = styled(Link)`
  width: 130px;
  display: table;
  margin: 0 auto;
  white-space: nowrap;
  border-radius: 50px;
  border: 2px solid #0071bc;
  color: #0071bc;
  font-size: 15px;
  font-weight: 700;
  padding: 15px 0;
  text-align: center;
  font-family: sans-serif;
  text-decoration: none;
  box-shadow: 1px 6px 10px 2px #d6d6d6;
  position: absolute;
  bottom: 45px;
  left: 50%;
  transform: translateX(-50%);
  &:hover {
    text-decoration: none;
  }
`

const ButtonLg = ({link, linkTitle}) => (
  <Button to={link}>{linkTitle}</Button>
)

export default ButtonLg;
