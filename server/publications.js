import { Meteor } from 'meteor/meteor';

// publish to null is the same as autopublish, i.e. no need to subscribe to this data
Meteor.publish(null, function() {
  return Meteor.users.find({_id: this.userId},
    {fields: {'services.github.username': 1}});
});

Meteor.publish('landingUsers', function() {
  return Meteor.users.find({}, {
    fields: {
      'profile.name': 1,
      'profile.avatar_url': 1,
      'services.github.username': 1
    },
    limit: 6
  });
});

Meteor.publish('oneUser', function(username) {
  return Meteor.users.find({'services.github.username': username}, {
    fields: {
      'profile.name': 1,
      'profile.bio': 1,
      'profile.avatar_url': 1,
      'services.github.username': 1
    }
  });
})
