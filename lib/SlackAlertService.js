var carbon = require('carbon-io')
var bcrypt = require('bcrypt')
var o = carbon.atom.o(module)
var _o     = carbon.bond._o(module)
var __ = carbon.fibers.__(module)


__(function() {
  module.exports = o.main({
    _type: carbon.carbond.Service,

    environmentVariables: {
      API_KEY_HASH: {
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
        //console.log('Attempting to authenticate.')
        if(req.query.api_key) {
          //console.log('1. Request contains an api_key.')
          try {
            //console.log('2. Checking if key matches hash value.')
            var does_api_key_match_hash = bcrypt.compare.sync(req.query.api_key, _o('env:API_KEY_HASH'))

            //console.log('3. Checking comparison result: ' + does_api_key_match_hash)
            // true --> hash of api key matches Hash
            // false --> no match
            return does_api_key_match_hash
          } catch(err) {
            return false
          }
        } else {
          return false
        }
      }
    }),
    // Specifies that each post should contain a query parameter named 'api_key'
    post: {
      parameters: {
        api_key: {
          location: 'query',
          required: true,
          schema: { type: 'string' }
        }
      }
    },
    endpoints: {
      "alerts": _o('./AlertsEndpoint'),
      "actions" : _o('./ActionsEndpoint')
    }
  })
});
