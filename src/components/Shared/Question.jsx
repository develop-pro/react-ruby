import React from 'react';
import Radium from 'radium';
import blockSupporter from '../../images/three-block-supporter.jpg';

const styles = {
  questionBlock: {
    fontSize: 20,
    color: '#636464',
    fontFamily: 'Calibri',
    padding: '100px 0 0',
    position: 'relative',
    textAlign: 'center',
    background: '#fff',
    height: 420,
    h2: {
      fontSize: 30,
      fontWeight: 700,
      fontFamily: 'sans-serif',
      textTransform: 'uppercase',
      background: `url(${blockSupporter}) bottom no-repeat`,
      color: '#0071bc',
      padding: '0 0 13px',
      margin: '0 0 45px',
    },
    p: {
      fontSize: 20,
      color: '#636464',
      fontFamily: 'Calibri',
      margin: '0 0 50px',
      padding: 0,
    },
    greenBtn: {
      display: 'table',
      margin: '0 auto',
      whiteSpace: 'nowrap',
      borderRadius: 50,
      border: '2px solid #0071bc',
      color: '#0071bc',
      fontSize: 15,
      fontWeight: 700,
      padding: '15px 50px',
      textAlign: 'center',
      fontFamily: 'sans-serif',
      textDecoration: 'none',
    },
  },
}

const Button = ({href, linkTitle}) => (
  <a href={href} style={styles.questionBlock.greenBtn}>{linkTitle}</a>
)

const Question = () => (
  <div className="question" style={styles.questionBlock}>
    <h2 style={styles.questionBlock.h2}>{"Got a Question?"}</h2>
    <p style={styles.questionBlock.p}>{"We're here to help. Check out our FAQs, send us an email or call us at 1 800 555 5555"}</p>
    <Button linkTitle="Contact Us" href="#"/>
  </div>
)

export default Radium(Question);
