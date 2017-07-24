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
 * TEST_API_KLEY
 */
var TEST_API_KEY = "abcdefghi1234567890"

__(function() {
  module.exports = o({
    _type: carbon.carbond.test.ServiceTest,
    name: "SlackAlertServiceTest",
    service: _o('../lib/SlackAlertService'), // path to your Service
    suppressServiceLogging: true,
    setup: function() {
      carbon.carbond.test.ServiceTest.prototype.setup.call(this)
      //this.service.db.getCollection('alerts').drop()
      //this.service.db.getCollection('users').drop()
      //this.service.db.getCollection('users').insert({ "username" : TEST_USERNAME, "password" : TEST_PASSWORD, "role" : "test-role" })
    },
    tests: [
      {
        description : 'Simple schema validation',
        reqSpec: {
          url: addAuthApiKey('/alerts'),
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
        description: 'Schema validation using example trigger.',
        reqSpec: {
          url: addAuthApiKey('/alerts'),
          method: 'POST',
          body: exampleTrigger
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        description: 'Schema validation using example acknowledge.',
        reqSpec: {
          url: addAuthApiKey('/alerts'),
          method: 'POST',
          body: exampleAcknowledge
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        description: 'Schema validation using example unacknowledge.',
        reqSpec: {
          url: addAuthApiKey('/alerts'),
          method: 'POST',
          body: exampleUnacknowledge
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        description: 'Schema validation using example resolve.',
        reqSpec: {
          url: addAuthApiKey('/alerts'),
          method: 'POST',
          body: exampleResolve
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        description: 'Schema validation using example assign.',
        reqSpec: {
          url: addAuthApiKey('/alerts'),
          method: 'POST',
          body: exampleAssign
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        description: 'Schema validation using example delegate.',
        reqSpec: {
          url: addAuthApiKey('/alerts'),
          method: 'POST',
          body: exampleDelegate
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        description: 'Failed alert schema validation - no body',
        reqSpec: {
          url: addAuthApiKey('/alerts'),
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
        description: 'Failed alert schema validation - no creds',
        reqSpec: {
          url: '/alerts',
          method: 'POST',
          body: exampleTrigger
        },
        resSpec: {
          statusCode: 403
        }
      },
      {
        description: 'Failed alert schema validation - bad creds',
        reqSpec: {
          url: addBadAuthApiKey('/alerts'),
          method: 'POST',
          body: exampleTrigger
        },
        resSpec: {
          statusCode: 401
        }
      },
<<<<<<< HEAD
      //ACTION
=======
      // ACTION
>>>>>>> updateAction
      {
        description: 'Schema validation - action acknowledge',
        reqSpec: {
          url: addAuthApiKey('/actions'),
          method: 'POST',
          body: exampleActionAcknowledge
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        description: 'Schema validation - action resolve',
        reqSpec: {
          url: addAuthApiKey('/actions'),
          method: 'POST',
          body: exampleActionResolve
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        description: 'Failed Action schema validation - no body',
        reqSpec: {
          url: addAuthApiKey('/actions'),
          method: 'POST',
          body: {
            "greeting" : "Hello, world!"
          }
        },
        resSpec: {
          statusCode: 400
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
