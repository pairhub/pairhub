import { Meteor } from 'meteor/meteor';

Meteor.publish('userData', function() {
  return Meteor.users.find({_id: this.userId},
    {fields: {'services': 1}});
});

Meteor.publish('landingUsers', function() {
  return Meteor.users.find({}, {
    fields: {
      'profile.name': 1,
      'profile.avatar_url': 1,
      'services.github.username': 1
    }
  });
});
