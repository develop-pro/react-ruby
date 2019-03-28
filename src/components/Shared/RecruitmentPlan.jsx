import React from 'react';
import Radium from 'radium';
import blockSupporter from '../../images/three-block-supporter.jpg';
import { ButtonLg } from '.'

const styles = {
  recruitmentPlan: {
    width: '100%',
    float: 'left',
    padding: '45px 10%',
    backgroundColor: '#fff',
    minHeight: 398,
    position: 'relative',
    bottom: 200,
    height: 200,
    boxShadow: '0 11px 8px -3px #2f963d',
    textAlign: 'center',
    borderRadius: 10,
    marginBottom: 20,
    p: {
      padding: 0,
      color: '#636464',
      fontSize: 19,
      fontFamily: 'Calibri',
    },
    price: {
      fontSize: 30,
      color: '#0071bc',
      fontWeight: 600,
      fontFamily: 'Calibri',
    },
    info: {
      color: '#0071bc',
      fontSize: 16,
      fontFamily: 'Calibri',
    },
    h2: {
      fontSize: 20,
      color: '#0071bc',
      textTransform: 'uppercase',
      padding: '0 0 15px',
      background: `url(${blockSupporter}) bottom no-repeat`,
      fontWeight: 700,
      textAlign: 'center'
    },
  },
}

const Body = ({description, promo, info, price}) => (
  <div>
    <p style={styles.recruitmentPlan.p}>{description}</p>
    { promo && <p>{promo}</p> }
    { info &&
      <i style={styles.recruitmentPlan.info}>{"What's that?"}</i>
    }
    { price &&
      <p><span style={styles.recruitmentPlan.price}>{price}</span> or Less</p>
    }
  </div>
)

const RecruitmentPlan = (props) => (
  <div style={styles.recruitmentPlan} className="recruitment-plan">
    <h2 style={styles.recruitmentPlan.h2}>{props.title}</h2>
    <Body {...props}/>
    <ButtonLg {...props}/>
  </div>
)

export default Radium(RecruitmentPlan);
