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

__(function() {
  module.exports = o({
    _type: carbon.carbond.test.ServiceTest,
    name: "SlackAlertServiceTest",
    service: _o('../lib/SlackAlertService'), // path to your Service
    tests: [
      {
        description : 'Simple schema validation',
        reqSpec: {
          url: '/alerts',
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
          url: '/alerts',
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
          url: '/alerts',
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
          url: '/alerts',
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
          url: '/alerts',
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
          url: '/alerts',
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
          url: '/alerts',
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
          url: '/alerts',
          method: 'POST',
          body: {
            "greeting" : "Hello, world!"
          }
        },
        resSpec: {
          statusCode: 400
        }
      },
      // ACTION
      {
        description: 'Schema validation - action acknowledge',
        reqSpec: {
          url: '/actions',
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
          url: '/actions',
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
          url: '/actions',
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
