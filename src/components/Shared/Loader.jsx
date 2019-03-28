import React from 'react';
import quick_loader from '../../images/quirky-loader.gif';

const Loader = ({show}) => (
  <div>
    { show &&
      <div id="loader"><img src={quick_loader} alt="Loader"/></div>
    }
  </div>
)

export default Loader;
