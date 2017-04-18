import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Projects = new Mongo.Collection('Projects');

const ProjectsSchema = new SimpleSchema({
  title: String,
  desc: String,
  posts: Array,
  'posts.$': String,
  members: Array,
  'members.$': String,
  owners: Array,
  'owners.$': String,
  lastUpdated: Date
});

// attachSchema is from Meteor package collection2
Projects.attachSchema(ProjectsSchema);

export default Projects;

if (Meteor.isServer) {

  Meteor.publish('allProjects', function() {
    return Projects.find({});
  });


  Meteor.methods({
    createNewProject(title, desc) {
      let members = [], owners = [], posts = [], lastUpdated = new Date();
      members.push(this.userId);
      owners.push(this.userId);
      Projects.insert({
        title,
        desc,
        posts,
        members,
        owners,
        lastUpdated
      }, (err, _id) => {
        if (!err) {
          Meteor.users.update(this.userId, {$push: {memberOfProjects: _id, ownerOfProjects: _id }})
        }
      });
    }
  });

}
