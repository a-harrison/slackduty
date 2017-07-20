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
 * TEST_EMAIL
 */
var TEST_USERNAME = "test-user"

/***************************************************************************************************
 * TEST_PASSWORD
 */
var TEST_PASSWORD = "rainbow"

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
          url: '/alerts',
          method: 'POST',
          headers: {
            Authorization: authorizationHeader(),
          },
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
          url: '/alerts',
          method: 'POST',
          headers: {
            Authorization: authorizationHeader(),
          },
          body: exampleTrigger
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        description: 'Schema validation using example acknowledge.',
        reqSpec: {
          url: '/alerts',
          method: 'POST',
          headers: {
            Authorization: authorizationHeader(),
          },
          body: exampleAcknowledge
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        description: 'Schema validation using example unacknowledge.',
        reqSpec: {
          url: '/alerts',
          method: 'POST',
          headers: {
            Authorization: authorizationHeader(),
          },
          body: exampleUnacknowledge
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        description: 'Schema validation using example resolve.',
        reqSpec: {
          url: '/alerts',
          method: 'POST',
          headers: {
            Authorization: authorizationHeader(),
          },
          body: exampleResolve
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        description: 'Schema validation using example assign.',
        reqSpec: {
          url: '/alerts',
          method: 'POST',
          headers: {
            Authorization: authorizationHeader(),
          },
          body: exampleAssign
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        description: 'Schema validation using example delegate.',
        reqSpec: {
          url: '/alerts',
          method: 'POST',
          headers: {
            Authorization: authorizationHeader(),
          },
          body: exampleDelegate
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        description: 'Failed alert schema validation - no body',
        reqSpec: {
          url: '/alerts',
          method: 'POST',
          headers: {
            Authorization: authorizationHeader(),
          },
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
          url: '/alerts',
          method: 'POST',
          headers: {
            Authorization: badAuthorizationHeader(),
          },
          body: exampleTrigger
        },
        resSpec: {
          statusCode: 401
        }
      },
      // ACTION
      // {
      //   description: 'Schema validation - action acknowledge',
      //   reqSpec: {
      //     url: '/actions',
      //     method: 'POST',
      //     body: exampleActionAcknowledge
      //   },
      //   resSpec: {
      //     statusCode: 200
      //   }
      // },
      // {
      //   description: 'Schema validation - action resolve',
      //   reqSpec: {
      //     url: '/actions',
      //     method: 'POST',
      //     body: exampleActionResolve
      //   },
      //   resSpec: {
      //     statusCode: 200
      //   }
      // },
      {
        description: 'Failed Action schema validation - no body',
        reqSpec: {
          url: '/actions',
          method: 'POST',
          headers: {
            Authorization: authorizationHeader(),
          },
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
 * makeBasicHeader
 */
function makeBasicHeader(username, password) {
  var s = new Buffer(`${username}:${password}`).toString('base64')
  return `Basic ${s}`
}

/***************************************************************************************************
 * authorizationHeader()
 */
function authorizationHeader() {
  return makeBasicHeader(TEST_USERNAME, TEST_PASSWORD)
}

/***************************************************************************************************
 * badAuthorizationHeader()
 */
function badAuthorizationHeader() {
  return makeBasicHeader('evil-user', 'i-am-a-baddie')
}