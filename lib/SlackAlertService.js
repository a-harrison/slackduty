var carbon = require('carbon-io')
var bcrypt = require('bcrypt')
var o = carbon.atom.o(module)
var _o     = carbon.bond._o(module)
var __ = carbon.fibers.__(module)


__(function() {
  module.exports = o.main({
    _type: carbon.carbond.Service,

    environmentVariables: {
      SLACK_ALERT_SERVICE_API_KEY_HASH: {
        help: 'A hash of the API key used to verify requests.',
        required: true
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
      },
      SLACK_WEBHOOK_URL: {
        help: 'Webook URL used to post messages to Slack.',
        required: true,
      }
    },
    port: _o('env:SLACK_ALERT_SERVICE_PORT') || _o('env:PORT') || 5629,
    verbosity: 'info',
    authenticator: o({
      _type: carbon.carbond.security.Authenticator,
      authenticate: function(req) {
        if(req.query.api_key) {
          var does_api_key_match_hash = bcrypt.compare.sync(req.query.api_key, _o('env:SLACK_ALERT_SERVICE_API_KEY_HASH'))

          // true --> Return empty user object
          // false --> return null
          if(does_api_key_match_hash) {
            return {}
          }
        }
      }
    }),
    // Specifies that each post should contain a query parameter named 'api_key'
    parameters: {
      api_key: {
        location: 'query',
        required: false,
        schema: {
          type: 'string',
          minLenth: 25,
          maxLength:40
        }
      }
    },
    endpoints: {
      "alerts": _o('./AlertsEndpoint'),
      "actions" : _o('./ActionsEndpoint')
    }
  })
});
