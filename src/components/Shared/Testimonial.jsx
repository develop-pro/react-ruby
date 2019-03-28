import React from 'react';
import Radium from 'radium';

const styles = {
  testimonial: {
    marginBottom: 20,
    width: '85%',
  },
  feedback: {
    padding: '45px 6%',
    borderRadius: 10,
    backgroundColor: '#fbfbfb',
    color: '#636464',
    fontFamily: 'Calibri',
    fontSize: 18,
    position: 'relative',
    border: '1px solid #fbfbfb',
    marginBottom: 25,
    // '@media screen and (min-width: 64em)': {
    //   display: 'none'
    // }
  },
  p: {
    fontSize: 18,
    color: '#fff',
    margin: 0,
    padding: '15px 0 0',
    fontFamily: 'Calibri'
  },
  arrow: {
    position: 'relative',
    backgroundColor: '#fbfbfb',
    border: '1px solid #fbfbfb',
    after: {
      bottom: '-12px',
      left: '50%',
      transform: 'translateX(-50%)',
      // border: '11px solid #fff',
      height: 0,
      width: 0,
      position: 'absolute',
      pointerEvents: 'none',
      borderLeft: '20px solid transparent',
      borderRight: '20px solid transparent',
      borderTop: '20px solid #fff'
    }
  }
}

const Avatar = Radium(({image, name}) => (
  <div style={{clear: 'both'}}>
    <img src={image} alt={`${name}`}/>
    <p style={styles.p}>{name}</p>
  </div>
))

const SpeechBubble = Radium(({message}) => (
  <div style={[styles.feedback, styles.arrow]}>
    {message}
    <div style={styles.arrow.after}>
      &nbsp;
    </div>
  </div>
))

const Testimonial = ({message, name, image}) => (
  <div className="testimonial text-center" style={styles.testimonial}>
    <SpeechBubble message={message}/>
    <Avatar image={image} name={name}/>
  </div>
)

export default Radium(Testimonial);
