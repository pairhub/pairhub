import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Row, Col, Card, CardBlock, CardTitle, CardText } from 'reactstrap';

class Profile extends Component {
  render() {
    if(!this.props.ready) return <div>Loading..</div>;
    console.log(this.props.user);
    return (
      <Row>
        <Col sm="3">
          <Card>
            <CardBlock>
              <img src={this.props.user.profile.avatar_url} className="img-fluid" />
              <CardTitle>@{this.props.match.params.username}</CardTitle>


              <p>{this.props.user.profile.name}</p>
            </CardBlock>

          </Card>

        </Col>
        <Col sm="9">
          <Card>
            <CardBlock>
              <CardText>Some shit</CardText>
            </CardBlock>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default createContainer(({match}) => {
  let subscription = Meteor.subscribe('oneUser', match.params.username);
  return {
    ready: subscription.ready(),
    user: Meteor.users.findOne({'services.github.username': match.params.username})
  }
}, Profile);
