import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

class Landing extends Component {
  render() {
    return (
      <div>
        <Row style={{marginTop: '50px'}}>
          <Col sm="3">
            <img src="/coder.png" className="img-fluid" />
          </Col>
          <Col sm="9" >
            <div style={{marginLeft:'30px'}}>
              <h1>Find remote pair programming buddies!</h1>
              <p>
                PairHub is the friendly <a href="https://github.com/pairhub/pairhub" target="_blank">open source</a> community where you’ll
                find remote pair programming buddies. Learn together, work
                on open source or your own projects, and become a better developer!
              </p>
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <img src="/user.png" className="img-fluid" />
            @username
          </Col>
          <Col>
            <img src="/user.png" className="img-fluid" />
            @username
          </Col>
          <Col>
            <img src="/user.png" className="img-fluid" />
            @username
          </Col>
          <Col>
            <img src="/user.png" className="img-fluid" />
            @username
          </Col>
          <Col>
            <img src="/user.png" className="img-fluid" />
            @username
          </Col>
          <Col>
            <img src="/user.png" className="img-fluid" />
            @username
          </Col>
          <Col>
            <img src="/user.png" className="img-fluid" />
            @username
          </Col>
        </Row>
        <Row style={{marginTop:'40px'}}>
          <Col>
            <h3>Create your profile</h3>
            <p></p>
          </Col>
          <Col>
            <h3>Join the community and say hi! 👋</h3>
            <p></p>
          </Col>
          <Col>
            <h3>Contribute</h3>
            <p></p>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Landing;
