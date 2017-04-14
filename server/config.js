import { Meteor } from 'meteor/meteor';

ServiceConfiguration.configurations.upsert(
  { service: 'github' },
  {
    $set: {
      clientId: Meteor.settings.github_clientId,
      secret: Meteor.settings.github_secret
    }
  }
);
