import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Row, Col, Card, CardBlock, CardTitle, CardText, CardSubtitle } from 'reactstrap';

//TODO: turn into stateless component
class Profile extends Component {
  render() {
    if(!this.props.ready) return <div>Loading..</div>;
    if(!this.props.user) return <div>No user with this username!</div>;
    return (
      <Row>
        <Col sm="3">

          <img src={this.props.user.profile.avatar_url} className="img-fluid" style={{borderRadius:'8px'}} />
          <CardTitle>{this.props.user.profile.name}</CardTitle>
          <CardSubtitle>@{this.props.user.services.github.username}</CardSubtitle>

        </Col>
        <Col sm="9">
          <h3>Member of projects:</h3>
          <Card>
            <CardBlock>
              <CardText>...</CardText>
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
