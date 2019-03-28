import React from 'react';
import Radium from 'radium';
import quoteBg from '../../images/quote-bg.jpg';

const styles = {
  quote: {
    borderBottom: '1px solid #9cdaa5',
    background: `url(${quoteBg}) bottom center no-repeat #39b54a`,
    paddingBottom: 90,
    width: '52%',
    margin: 'auto',
    position: 'relative',
    top: -110,
    fontFamily: "'Raleway', 'sans-serif'",
    h2: {
      color: '#fff',
      margin: 'auto auto 10',
      fontSize: 20,
      fontWeight: 700,
    },
    headLiner: {
      margin: '0 0 35px',
      color: '#fff',
      fontWeight: 700,
      textTransform: 'uppercase',
      fontSize: 30,
      textAlign: 'center',
    },
    pos: {
      color: '#fff',
      margin: 'auto',
    },
  },
  container: {
    background: '#39b54a',
    height: 154,
    borderBottom: '1px solid #9cdaa5',
  }
}

const Quote = ({message, name, position, company}) => (
  <div className="test" style={styles.container}>
    <div className="quote" style={styles.quote}>
      <h2 style={styles.quote.headLiner}>{message}</h2>
      <h2 className="text-center" style={styles.quote.h2}>{name}</h2>
      <p className="text-center" style={styles.quote.pos}>{position}<br/>{company}</p>
    </div>
  </div>
)

export default Radium(Quote);
