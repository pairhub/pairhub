import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Projects from '../../api/projects';
import { Row, Col, Card, CardBlock, CardTitle, CardText, CardSubtitle } from 'reactstrap';

//TODO: separate out create new project into new component
class ProjectsList extends Component {
  addProject(event) {
    event.preventDefault();
    const title = this.refs.title.value.trim();
    const desc = this.refs.desc.value.trim();
    if(title !== '' && desc !== '') {
      console.log('hello');
      Meteor.call('createNewProject', title, desc, (err, res) => {
        console.log('hullo');
        console.log(err);
        if (!err) {
          this.refs.title.value = '';
          this.refs.desc.value = '';
        }
      })
    }
  }
  render() {
    return (
      <div>
        <div>Projects page! Woop!</div>
        <form onSubmit={this.addProject.bind(this)}>
          <input type="text" ref="title" />
          <input type="text" ref="desc" />
          <button type="submit">Create project</button>
        </form>
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
