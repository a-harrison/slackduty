var carbon = require('carbon-io')
var o  = carbon.atom.o(module)
var __ = carbon.fibers.__(module)
var _o = carbon.bond._o(module)

var exampleActionAcknowledge = require('./examples/ActionAcknowledge.js')
var exampleActionResolve = require('./examples/ActionResolve.js')
var exampleActionAcknowledgeBadToken = require('./examples/ActionAcknowledgeBadToken')
var exampleActionAcknowledgeNoToken = require('./examples/ActionAcknowledgeNoToken')

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
      },
      {
        name: 'Failed token validation - bad token',
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
        name: 'Failed token validation - no token',
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
