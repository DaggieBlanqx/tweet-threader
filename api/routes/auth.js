'use strict';

/**
 * Authenticate using Twitter account
 */

module.exports = (app) => {

  const passport = require('passport');
  const TwitterStrategy = require('passport-twitter').Strategy;
  const Config = process.env;
  const Host = (Config.NODE_ENV === 'development') ? `${Config.HOST_NAME}:${Config.DEV_PORT}` : Config.HOST_NAME;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new TwitterStrategy({
      consumerKey: Config.TWITTER_CONSUMER_KEY,
      consumerSecret: Config.TWITTER_CONSUMER_SECRET,
      callbackURL: Host + '/auth/twitter/callback'
    },
    (token, tokenSecret, profile, cb) => {
      app.set('access_token_key', token);
      app.set('access_token_secret', tokenSecret);
      cb(null, profile);
    }
  ));

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });

  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }),
    (req, res) => {

      let buffer = new Buffer(encodeURI(JSON.stringify({
        photos: req.user.photos,
        displayName: req.user.displayName,
        username: req.user.username
      })));

      app.set('twitter-user', buffer.toString('base64'));

      res.redirect('/tweet');

    });

};
