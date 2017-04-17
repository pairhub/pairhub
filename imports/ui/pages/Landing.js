import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

class Landing extends Component {

  render() {
    if(!this.props.ready) return <div>Loading!</div>

    return (
      <div>
        <Row style={{marginTop: '50px'}}>
          <Col sm="3">
            <img src="/coder.png" className="img-fluid" />
          </Col>
          <Col sm="9" >
            <div style={{marginLeft:'30px'}}>
              <h1>Find remote pair programming buddies!</h1>
              <p className="landing-jumbo">
                PairHub is the friendly <a href="https://github.com/pairhub/pairhub" target="_blank">open source</a> community where you’ll
                find remote pair programming buddies. Learn together, work
                on open source or your own projects, and become a better developer!
              </p>
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          {this.props.users.map((user) => {
            return (
              <Col sm="2" key={user._id}>
                <Link to={user.services.github.username}>
                  <img src={user.profile.avatar_url} className="img-fluid" />
                  @{user.services.github.username}
                </Link>
              </Col>
            )
          })}
        </Row>
        <Row style={{marginTop:'40px'}}>

        </Row>
      </div>
    );
  }
}
export default createContainer(() => {
  let usersSub = Meteor.subscribe('landingUsers');
  return {
    ready: usersSub.ready(),
    users: Meteor.users.find().fetch()
  }
}, Landing);
