import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Projects from '../../api/projects';
import { Row, Col, Card, CardBlock, CardTitle, CardText, CardSubtitle } from 'reactstrap';

import AddProject from '../components/AddProject';

class ProjectsList extends Component {

  render() {
    return (
      <div>
        <AddProject />
        {/* <form onSubmit={this.addProject.bind(this)}>
          <input type="text" ref="title" />
          <input type="text" ref="desc" />
          <button type="submit">Create project</button>
        </form> */}
        {this.props.projects.map((project) => {
          return (
            <Card key={project._id}>
              <CardBlock>
                <CardTitle>{project.title}</CardTitle>
                <CardText>{project.desc}</CardText>
                <CardText>{project.members.length} members</CardText>
              </CardBlock>
            </Card>
          )
        })}
      </div>

    );
  }
}

export default createContainer(() => {
  let subscription = Meteor.subscribe('allProjects');
  return {
    ready: subscription.ready(),
    projects: Projects.find().fetch()
  }
}, ProjectsList);
