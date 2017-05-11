import Layout from '../components/Layout'
import Link from 'next/link'
import { Row, Col, Alert } from 'reactstrap'
import RecentSignups from '../components/RecentSignups'

const Landing = () => (
  <Layout>
    <Row>

      <Col sm={{ size: 7, offset: 0 }} >
        <h1>Find remote pair programming buddies!</h1>
        <p>
          PairHub is the friendly <a href="https://github.com/pairhub/pairhub" target="_blank">open source</a> community where you’ll
          find remote pair programming buddies. Learn together, work
          on open source or your own projects, and become a better developer!
        </p>
        <Alert color="warning">
          Currently in <strong>development</strong> mode, database may be resetted before launch!
        </Alert>
      </Col>
      <Col sm={{ size: 5, offset: 0 }}>
        <img src="/static/pair-bw.png" className="img-fluid" />
      </Col>
    </Row>
    <hr />
    <h4 style={{marginBottom:'20px'}}>Latest signups 👊</h4>
    <RecentSignups />
  </Layout>
)

export default Landing
