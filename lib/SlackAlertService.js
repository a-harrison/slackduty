var carbon = require('carbon-io')
var o = carbon.atom.o(module).main
var _o     = carbon.bond._o(module)
var __ = carbon.fibers.__(module).main

// Load Config
var appConfig = require('../config/app.js');

__(function() {
  module.exports = o({
    _type: carbon.carbond.Service,

    environmentVariables: {
      MONGODB_URI: {
        help: 'MongoDB connection string URI',
        required: false
      },
      SLACK_WEBHOOK_URL: {
        help: 'Webook URL used to post messages to Slack.',
        required: false
      },
      CALLBACK_ID: {
        help: 'An ID passed in the callback from Slack Action events.',
        required: false
      },
      PAGERDUTY_TOKEN: {
        help: 'PagerDuty API token.',
        required: false
      }
    },
    port: appConfig.port,
    dbUri: _o('env:MONGODB_URI') || 'mongodb://localhost:27027/slackduty',

    authenticator: o({
      _type: carbon.carbond.security.MongoDBHttpBasicAuthenticator,
      userCollection: "users",
      usernameField: "username",
      passwordField: "password"
    }),
    endpoints: {
      "alerts": _o('./AlertsEndpoint'),
      "actions" : _o('./ActionsEndpoint')
    }
  })
});
