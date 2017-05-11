import Layout from '../components/Layout'
import Link from 'next/link'
import { Row, Col } from 'reactstrap'
import RecentSignups from '../components/RecentSignups'

const Landing = () => (
  <Layout>
    <Row>
      <Col sm={{ size: 3, offset: 0 }}>
        <img src="/static/coder.png" className="img-fluid" />
      </Col>
      <Col sm={{ size: 9, offset: 0 }} >
        <h1>Find remote pair programming buddies!</h1>
        <p>
          PairHub is the friendly <a href="https://github.com/pairhub/pairhub" target="_blank">open source</a> community where you’ll
          find remote pair programming buddies. Learn together, work
          on open source or your own projects, and become a better developer!
        </p>
      </Col>
    </Row>
    <hr />
    <h4 style={{marginBottom:'20px'}}>Latest signups 👋</h4>
    <RecentSignups />
  </Layout>
)

export default Landing
