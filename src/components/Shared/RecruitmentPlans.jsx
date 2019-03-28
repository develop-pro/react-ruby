import React from 'react';
import Radium from 'radium';
import { Row, Col } from 'react-bootstrap';
import RecruitmentPlan from './RecruitmentPlan';

const styles = {
  recruitmentPlans: {
    greenBg: {
      background: `#39b54a`,
      margin: '430px 0 0'
    },
    block: {
      width: '80%',
      margin: 'auto',
    }
  },
}

const plans = [
  {
    title: 'Job Postings',
    description: 'Buy more and save 30-Day Postings',
    promo: 'Promo: Get Free Resume Views',
    price: '$299',
    info: true,
    link: '/employers/post-job',
    linkTitle: 'Post Now!'
  },
  {
    title: 'Sourcing Concierge',
    description: 'Hiring the perfect tech professional is difficult' +
     'and time-consuming. So let us help. We\'ll source' +
     'and screen, you interview and hire.',
    link: '/employers/post-job',
    linkTitle: 'Learn more!',
  },
  {
    title: 'Recruitment Package',
    description: 'Reusable postings 1.5 million tech resumes Millions of Open Web social profiles',
    link: '/employers/post-job',
    linkTitle: 'Learn More!'
  },
]

const RecruitmentPlans = () => (
  <div style={styles.recruitmentPlans.greenBg} className="recruitment-plans">
    <Row style={styles.recruitmentPlans.block}>
      { plans.map((plan, i) =>
        <Col md={4} key={i}>
          <RecruitmentPlan
            title={plan.title}
            description={plan.description}
            promo={plan.promo}
            info={plan.info}
            price={plan.price}
            link={plan.link}
            linkTitle={plan.linkTitle}
          />
        </Col>
      )}
    </Row>
  </div>
)

export default Radium(RecruitmentPlans);
