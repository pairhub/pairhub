import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
import { User } from './models';

function setupGitHubLogin(app) {
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, NODE_ENV } = process.env;

  if (!GITHUB_CLIENT_ID) {
    console.warn("GitHub client ID not passed; login won't work."); // eslint-disable-line no-console
    return;
  }

  const githubOptions = {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL:
      NODE_ENV !== 'production'
        ? 'http://localhost:3000/login/github/callback'
        : 'https://pairhub.io/login/github/callback',
  };

  passport.use(new GitHubStrategy(githubOptions, (accessToken, refreshToken, profile, done) => {
    User.findOne({ userId: profile.id }).then((res) => {
      // Found a user
      if (res) {
        // TODO: Add updating of GitHub details here?
        return done(null, res);
      }
      // Found no user, add new user
      return new User({
        userId: profile.id,
        username: profile.username,
        name: profile.displayName,
        avatar_url: profile.photos[0].value,
        github_url: profile.profileUrl,
        email: (profile.emails && profile.emails[0].value) || null,
      })
        .save()
        .then(result => done(null, result));
    });
  }));

  passport.serializeUser((user, done) => done(null, user._id));

  passport.deserializeUser((_id, done) => User.findOne({ _id }).then(user => done(null, user)));

  const MongoStore = connectMongo(session);

  app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true,
    saveUninitialized: true,
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/login/github', passport.authenticate('github'));

  app.get(
    '/login/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect(`/@${req.user.username}`);
    },
  );

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
}

export default setupGitHubLogin;
