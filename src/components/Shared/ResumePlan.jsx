import React from 'react';
import Radium from 'radium';
import blockSupporter from '../../images/three-block-supporter.jpg';
import { ButtonLg } from './index';
import styled from 'styled-components';

const styles = {
  resumePlan: {
    '@media screen and (minWidth: 992px)': {
      height: 1000,
    },
    description: {
      color: '#636464',
      margin: '0 0 30px',
    },
    h3: {
      color: '#0071bc',
      textTransform: 'uppercase',
      fontSize: 20,
      padding: '0 0 15px',
      background: `url(${blockSupporter}) bottom no-repeat`,
      fontWeight: 700,
      fontFamily: 'sans-serif',
    },
    price: {
      textAlign: 'center',
      color: '#0071bc',
      fontSize: 60,
      fontFamily: 'Calibri',
      fontWeight: 700,
      marginBottom: 10,
      display: 'block',
    },
  },
}

const Container = styled.div`
  background: #fff;
  padding: 20px;
  text-align: center;
  font-size: 19px;
  font-family: Calibri;
  color: #000;
  box-shadow: 1px 8px 8px -1px #d2d2d2;
  border-radius: 10px;
  margin: 20px 0;
  height: 420px;
  p {
    margin: 0 0 50px;
  }
`;

const ResumePlan = (props) => (
  <Container>
    <h3 style={styles.resumePlan.h3}>{props.title}</h3>
    <span style={styles.resumePlan.price}>{props.price}</span>
    <p style={styles.resumePlan.description}>{props.description}</p>
    <p style={styles.resumePlan.p}>{props.message}</p>
    <ButtonLg {...props}/>
  </Container>
)

export default Radium(ResumePlan);
