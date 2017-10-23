var carbon = require('carbon-io')
var o = carbon.atom.o(module)
var _o     = carbon.bond._o(module)
var __ = carbon.fibers.__(module)

__(function() {
  module.exports = o.main({
    _type: carbon.carbond.Service,

    environmentVariables: {
      MONGODB_URI: {
        help: 'MongoDB connection string URI',
        required: true
      },
      SLACK_WEBHOOK_URL: {
        help: 'Webook URL used to post messages to Slack.',
        required: true,
      },
      PAGERDUTY_INTEGRATION_KEY: {
        help: 'Integration Key of the PagerDuty integration.',
        required: true,
      },
      SLACK_ALERT_SERVICE_PORT: {
        help: 'The port on which the SlackAlertService will run.',
        required: false
      },
      SLACK_VERIFICATION_TOKEN: {
        help: 'The verification token used to authenticate actions from Slack.',
        required: true
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
