import React, {Component} from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Utils from '../../lib/utils';
import styled from 'styled-components';
import JobService from '../../services/job.service';
import Flash from '../Shared/Flash';

const styles = {
  title: {
    margin: '15px 0 20px',
    fontWeight: 700,
    color: '#39b54a',
    fontSize: 24,
    borderBottom: '1px solid #8da3aa',
    paddingBottom: 15
  },
  icon: {
    color: '#39b54a'
  },
  iconsList: {
    padding: 0
  },
  icons: {
    paddingRight: 10
  },
  description: {
    fontSize: 14,
    color: '#8290a2',
    lineHeight: 1.5
  },
  container: {
    paddingTop: 20
  }
}

const ApplyNow = styled.button`
 margin-top: 20px;
 margin-bottom: 20px;
 @media screen and (max-width: 767px) {
   width: 100%;
   margin-bottom: 40px;
 }
`

export default class Job extends Component {

  componentWillMount = () => {
    this.setState({ messages: [] })
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps = () => {
    this.setState({ messages: [] })
    window.scrollTo(0, 0);
  }

  flashMessage = (message, status) => {
    this.setState({messages: [{message: message, status: status}]});
    setTimeout(this.setState({flash: null}), 2000)
  }

  trim = (message, maxLength) => {
    if (message.length > maxLength) {
      let trimmedString = message && message.substr(0, maxLength); //trim the string to the maximum length
      // re-trim if we are in the middle of a word
      trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
      trimmedString += '...'
      return trimmedString;
    }
    return message;
  }

  handleApply = () => {
    const profileId = 1; // TODO: get real id
    JobService.apply(profileId, this.props.job.slug, this.props.user.id).then(response => {
      this.flashMessage('You have successfully applied to this job.', 'success');
    }).catch((error) => {
      this.flashMessage(error.response.data.message, 'danger');
      console.log(error.message)
    })
  }

  address = (job) => {
    if (!job.city)
      return job.state;
    else
      return job.city && job.city + ', ' + job.state;
  }

  loader() {
    // $(document).ready(function(){
    // $("#loader").hide();
    // });
    // jQuery(document).ready(function () {
    //     jQuery('.post').addClass("hidden").viewportChecker({
    //         classToAdd: 'visible animated flipInX',  Class to add to the elements when they are visible
    //         offset: 100
    //     });
    // });
  }

  render() {
    const {user, job, jobs} = this.props;
    const messages = this.state.messages;
    return (<div>
      {
        job && jobs && <div className="container">
            {messages && <Flash messages={messages} />}
            <Header user={this.props.user} job={job} trim={this.trim} address={this.address} handleApply={this.handleApply}/>
            <div className="row" style={styles.container}>
              <div className="col-md-9">
                <div className="content">
                  <h1 style={styles.title}>Job Description</h1>
                  <div style={styles.description} dangerouslySetInnerHTML={{
                      __html: Utils.stripHtml(job.description)
                  }}/>
                  { Utils.isApplicant(user) &&
                    <ApplyNow className="btn btn-primary btn_apply" onClick={this.handleApply}>Apply now</ApplyNow>
                  }
                </div>
              </div>
              <div className="col-md-3">
                <Sidebar jobs={jobs} address={this.address}/>
              </div>
            </div>
          </div>
      }
    </div>)
  }
}
