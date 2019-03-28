import React from 'react';
import { Link } from 'react-router-dom'
import profile_thumb from '../../images/profile-thumb.jpg'
import SimilarPositions from './SimilarPositions'

const Sidebar = ({jobs, address}) => {

  const styles = {
      container: {
        border: '1px solid #dfe1e4',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20,
      },
      profileThumb: {
        padding: 40,
        margin: 'auto',
        textAlign: 'center',
      },
      haveJobBlock: {
        textAlign:'center',
      }
  }

  return (
    <div style={styles.container} className="filter_block sidebar_job">
      <div style={styles.profileThumb}>
        <img src={profile_thumb} alt='profile thumb'/>
      </div>
      <div style={styles.haveJobBlock}>
        <span>{"Have a Job?"}</span>&nbsp;
        <Link to="/employers" className="btn_post">Post IT</Link>
      </div>
      <SimilarPositions jobs={jobs} address={address} />
    </div>
  )
}

export default Sidebar;
