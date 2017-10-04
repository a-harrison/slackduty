var carbon = require('carbon-io')
var o  = carbon.atom.o(module)
var __ = carbon.fibers.__(module)
var _o = carbon.bond._o(module)

var exampleTrigger = require('./examples/WebhookTrigger.js');
var exampleAcknowledge = require('./examples/WebhookAcknowledge.js');
var exampleUnacknowledge = require('./examples/WebhookUnacknowledge.js');
var exampleResolve = require('./examples/WebhookResolve.js');
var exampleAssign = require('./examples/WebhookAssign.js');
var exampleDelegate = require('./examples/WebhookDelegate');

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
        name: 'Simple schema validation',
        reqSpec: {
          url: BASE_URL + addAuthApiKey('/alerts'),
          method: 'POST',
          body: {
            "messages" : [
              { "type" : "some string" }
            ]
          }
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        name: 'Trigger schema validation.',
        reqSpec: {
          url: BASE_URL + addAuthApiKey('/alerts'),
          method: 'POST',
          body: exampleTrigger
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        name: 'Acknowledge schema validation.',
        reqSpec: {
          url: BASE_URL + addAuthApiKey('/alerts'),
          method: 'POST',
          body: exampleAcknowledge
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        name: 'Unacknowledge schema validation.',
        reqSpec: {
          url: BASE_URL + addAuthApiKey('/alerts'),
          method: 'POST',
          body: exampleUnacknowledge
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        name: 'Resolve schema validation.',
        reqSpec: {
          url: BASE_URL + addAuthApiKey('/alerts'),
          method: 'POST',
          body: exampleResolve
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        name: 'Assign schema validation.',
        reqSpec: {
          url: BASE_URL + addAuthApiKey('/alerts'),
          method: 'POST',
          body: exampleAssign
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        name: 'Delegate schema validation.',
        reqSpec: {
          url: BASE_URL + addAuthApiKey('/alerts'),
          method: 'POST',
          body: exampleDelegate
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        name: 'Failed schema validation - no body',
        reqSpec: {
          url: BASE_URL + addAuthApiKey('/alerts'),
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
          url: BASE_URL + '/alerts',
          method: 'POST',
          body: exampleTrigger
        },
        resSpec: {
          statusCode: 403
        }
      },
      {
        name: 'Failed schema validation - bad creds',
        reqSpec: {
          url: BASE_URL + addBadAuthApiKey('/alerts'),
          method: 'POST',
          body: exampleTrigger
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
