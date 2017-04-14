import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

class Landing extends Component {
  render() {
    return (
      <Row style={{marginTop: '50px'}}>
        <Col sm="3">
          <img src="/coder.png" className="img-fluid" />
        </Col>
        <Col sm="9" >
          <div >
            <h1>Find remote pair programming buddies!</h1>
            <p>
              PairHub is the friendly <a href="https://github.com/pairhub/pairhub" target="_blank">open source</a> community where you’ll
              find remote pair programming buddies. Learn together, work
              on open source or your own projects, and become a better developer!
            </p>
          </div>
        </Col>
      </Row>
    );
  }
}
export default Landing;
