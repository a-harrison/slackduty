var carbon = require('carbon-io')
var o = carbon.atom.o(module).main
var _o     = carbon.bond._o(module)
var __ = carbon.fibers.__(module).main

__(function() {
  module.exports = o({
    _type: carbon.carbond.Service,

    environmentVariables: {
      MONGODB_URI: {
        help: 'MongoDB connection string URI',
        required: true
      },
      SLACK_WEBHOOK_URL: {
        help: 'Webook URL used to post messages to Slack.',
        required: true,
        default: 'default'
      },
      PAGERDUTY_INTEGRATION_KEY: {
        help: 'Integration Key of the PagerDuty integration.',
        required: false,
        default: 'default'
      },
      SLACK_ALERT_SERVICE_PORT: {
        help: 'The port on which the SlackAlertService will run.',
        required: false
      }
    },
    port: _o('env:SLACK_ALERT_SERVICE_PORT') || _o('env:PORT') || 5629,
    dbUri: _o('env:MONGODB_URI') || 'mongodb://localhost:27027/slackduty',
    authenticator: o({
      _type: carbon.carbond.security.MongoDBApiKeyAuthenticator,
      apiKeyParameterName: "api_key",
      apiKeyLocation: "query",
      userCollection: "users",
      apiKeyField: "apiKey"
    }),
    endpoints: {
      "alerts": _o('./AlertsEndpoint'),
      "actions" : _o('./ActionsEndpoint')
    }
  })
});
