var carbon = require('carbon-io')
var o  = carbon.atom.o(module)
var __ = carbon.fibers.__(module)
var _o = carbon.bond._o(module)

var exampleActionAcknowledge = require('./examples/ActionAcknowledge.js')
var exampleActionResolve = require('./examples/ActionResolve.js')
var exampleActionAcknowledgeBadToken = require('./examples/ActionAcknowledgeBadToken')
var exampleActionAcknowledgeNoToken = require('./examples/ActionAcknowledgeNoToken')
var newExampleActionAcknowledge = exampleActionAcknowledge
var newExampleActionResolve = exampleActionResolve
/***************************************************************************************************
 * BASE_URL
 */
BASE_URL = 'http://localhost:5629'

/***************************************************************************************************
 * TEST_API_KLEY
 */
TEST_API_KEY = _o('env:SLACK_ALERT_SERVICE_API_KEY')

__(function() {
  module.exports = o({
    _type: carbon.testtube.HttpTest,
    name: "Action Tests",
    description: "Testing the ability of the app to accept Webhook events.",
    baseUrl: BASE_URL,
    tests: [
      {
        name: 'Action - Acknowledge schema validation.',
        // Need to change verification token to match
        // what is set in local environment
        setup: function() {
          let payload = JSON.parse(exampleActionAcknowledge.payload)
          payload.token = _o('env:SLACK_VERIFICATION_TOKEN')

          newExampleActionAcknowledge.payload = JSON.stringify(payload)
        },
        reqSpec: {
          url: BASE_URL + addAuthApiKey('/actions'),
          method: 'POST',
          body: newExampleActionAcknowledge
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        name: 'Action - Resolve schema validation.',
        // Need to change verification token to match
        // what is set in local environment
        setup: function() {
          let payload = JSON.parse(exampleActionResolve.payload)
          payload.token = _o('env:SLACK_VERIFICATION_TOKEN')

          newExampleActionResolve.payload = JSON.stringify(payload)
        },
        reqSpec: {
          url: BASE_URL + addAuthApiKey('/actions'),
          method: 'POST',
          // body: exampleActionResolve
          body: newExampleActionResolve
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        name: 'Action - Failed schema validation - no body',
        reqSpec: {
          url: BASE_URL + addAuthApiKey('/actions'),
          method: 'POST',
          body: {
            "greeting" : "Hello, world!"
          }
        },
        resSpec: {
          statusCode: 400
        }
      },
      {
        name: 'Action - Failed schema validation - no creds',
        reqSpec: {
          url: BASE_URL + '/actions',
          method: 'POST',
          body: {
            "greeting" : "Hello, world!"
          }
        },
        resSpec: {
          statusCode: 400
        }
      },
      {
        name: 'Action - Failed schema validation - bad creds',
        reqSpec: {
          url: BASE_URL + addBadAuthApiKey('/actions'),
          method: 'POST',
          body: {
            "greeting" : "Hello, world!"
          }
        },
        resSpec: {
          statusCode: 400
        }
      },
      {
        name: 'Action - Failed token validation - bad token',
        reqSpec: {
          url: BASE_URL + addAuthApiKey('/actions'),
          method: 'POST',
          body: exampleActionAcknowledgeBadToken
        },
        resSpec: {
          statusCode: 403
        }
      },
      {
        name: 'Action - Failed token validation - no token',
        reqSpec: {
          url: BASE_URL + addAuthApiKey('/actions'),
          method: 'POST',
          body: exampleActionAcknowledgeNoToken
        },
        resSpec: {
          statusCode: 403
        }
      }
    ]
  })
})

/***************************************************************************************************
 * addAuthApiKey
 */
function addAuthApiKey(url) {
  return url + '?api_key=' + TEST_API_KEY
}

/***************************************************************************************************
 * addBadAuthApiKey
 */
function addBadAuthApiKey(url) {
  return url + '?api_key=thisisabadkey'
}
