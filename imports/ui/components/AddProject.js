import React, { Component } from 'react';
import { Form, FormGroup, Label, Col, Input, Button } from 'reactstrap';

class AddProject extends Component {
  addProject(event) {
    event.preventDefault();

    const title = this.title.value.trim();
    const desc = this.desc.value.trim();
    if(title !== '' && desc !== '') {
      Meteor.call('createNewProject', title, desc, (err, res) => {
        if (!err) {
          this.title.value = '';
          this.desc.value = '';
        }
      })
    }
  }
  render() {
    return (
      <Form onSubmit={this.addProject.bind(this)}>
        <FormGroup row>
          <Label for="title" sm={2}>Title</Label>
          <Col sm={10}>
            <Input type="text" id="title" getRef={(input) => (this.title = input)} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="desc" sm={2}>Description</Label>
          <Col sm={10}>
            <Input type="textarea" name="text" id="desc" getRef={(input) => (this.desc = input)} />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}
export default AddProject;
