var carbon = require('carbon-io')
var o  = carbon.atom.o(module).main
var __ = carbon.fibers.__(module).main
var _o = carbon.bond._o(module)

var exampleTrigger = require('./exampleWebhookTrigger.js');
var exampleAcknowledge = require('./exampleWebhookAcknowledge.js');
var exampleUnacknowledge = require('./exampleWebhookUnacknowledge.js');
var exampleResolve = require('./exampleWebhookResolve.js');
var exampleAssign = require('./exampleWebhookAssign.js');
var exampleDelegate = require('./exampleWebhookDelegate');
var exampleActionAcknowledge = require('./exampleActionAcknowledge.js')
var exampleActionResolve = require('./exampleActionResolve.js')

/***************************************************************************************************
 * BASE_URL
 */
BASE_URL = 'http://localhost:5629'

/***************************************************************************************************
 * TEST_API_KLEY
 */
TEST_API_KEY = "abcdefghi1234567890"

__(function() {
  module.exports = o({
    _type: carbon.testtube.HttpTest,
    name: "Webhook Tests",
    description: "Testing the ability of the app to accept Webhook events.",
    baseUrl: BASE_URL,
    tests: [
      {
        name: 'Acknowledge schema validation.',
        reqSpec: {
          url: BASE_URL + addAuthApiKey('/actions'),
          method: 'POST',
          body: exampleActionAcknowledge
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        name: 'Resolve schema validation.',
        reqSpec: {
          url: BASE_URL + addAuthApiKey('/actions'),
          method: 'POST',
          body: exampleActionResolve
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        name: 'Failed schema validation - no body',
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
        name: 'Failed schema validation - no creds',
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
        name: 'Failed schema validation - bad creds',
        reqSpec: {
          url: BASE_URL + addBadAuthApiKey('/actions'),
          method: 'POST',
          body: {
            "greeting" : "Hello, world!"
          }
        },
        resSpec: {
          statusCode: 401
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
