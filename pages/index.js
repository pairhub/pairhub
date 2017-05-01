import Layout from '../components/Layout'
import Link from 'next/link'
import { Row, Col } from 'reactstrap'

export default () => (
  <Layout>
    <Row>
      <Col sm="3">
        <img src="/static/coder.png" className="img-fluid" />
      </Col>
      <Col sm="9" >
        <h1>Find remote pair programming buddies!</h1>
        <p>
          PairHub is the friendly <a href="https://github.com/pairhub/pairhub" target="_blank">open source</a> community where you’ll
          find remote pair programming buddies. Learn together, work
          on open source or your own projects, and become a better developer!
        </p>
      </Col>
    </Row>
    <hr />
  </Layout>
)
