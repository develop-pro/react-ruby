import React from 'react';
import back_to from '../../images/back_to.png';

const styles = {
  backToTop: {
    position: 'fixed',
    bottom: 10,
    right: 15
  }
}

const BackToTop = () => {
  const smoothscroll = () => {
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(smoothscroll);
      window.scrollTo(0, currentScroll - (currentScroll / 20));
    }
  }
  return (
    <div style={styles.backToTop} className="scrollup pull-right"><img alt="Back to Top" src={back_to} onClick={smoothscroll}/></div>
  )
}

export default BackToTop;
