var carbon = require('carbon-io')
var o  = carbon.atom.o(module)
var __ = carbon.fibers.__(module)
var _o = carbon.bond._o(module)
var assert = require('assert')
var PagerDutyIncidentHandler = require('../lib/PagerDutyIncidentHandler')
var pdih = new PagerDutyIncidentHandler('https://events.pagerduty.com', 'generic/2010-04-15/create_event.json', _o('env:PAGERDUTY_INTEGRATION_KEY'))

__(function() {
  module.exports = o.main({
    _type: carbon.testtube.Test,
    name: "PagerDutyIncidentHandler Tests",
    description: "Testing ability to interact with PagerDuty API.",
    tests: [
      o({
        _type: carbon.testtube.Test,
        name: 'Create, Acknowledge, Resolve incident.',
        // --------------------------------------------------------------------
        setup: function(context, done) {
          var e;
          assert(typeof context.local.testName === 'undefined')
          context.local.testName = this.name

          pdih.createIncident('PagerDutyIncidentHandler tests for Create/Ack/Resolve incident.', 'Unit Test Client', function(error, createResponse) {
            try {
              if(error) {
                console.log('Error creating incident: ')
                console.log(JSON.stringify(createResponse))
                throw Error('Could not create incident.')
              }

              context.local.incident_key = createResponse.body.incident_key;
              assert.equal(createResponse.statusCode, 200)

            } catch (err) {
              e = err;
              console.log(err)
              console.log('Error during incident creation: ' + err)

            } finally {
              done(e)
            }
          })
        },
        // --------------------------------------------------------------------
        doTest: function(context, done) {
          var e;
          assert.equal(context.local.testName, this.name)

          pdih.acknowledgeIncident(context.local.incident_key, function(error, ackResponse) {
            try {
                if(error) {
                  console.log("Error acknowledging incident: ")
                  console.log(JSON.stringify(ackResponse))
                  throw Error('Could not acknowledge.')
                }

                assert.equal(ackResponse.statusCode, 200)
            } catch (err) {
              e = err;
              console.log(err)
              console.log('Error acknowledging incident: ' + JSON.stringify(ackResponse))

            } finally {
              done(e)
            }
          })
        },
        // --------------------------------------------------------------------
        teardown: function(context, done) {
          var e;
          assert.equal(context.local.testName, this.name)

          pdih.resolveIncident(context.local.incident_key, function(error, resolveResponse) {
            try {
                if(error) {
                    console.log("Error resolving incident: ")
                    console.log(JSON.stringify(resolveResponse))
                    throw Error('Could not resolve.')
                }

                assert.equal(resolveResponse.statusCode, 200)
            } catch (err) {
              e = err;
              console.log(err)
              console.log('Error resolving incident: ' + JSON.stringify(resolveResponse))

            } finally {
              done(e)
            }
          })
        }
      })
    ]
  })
})
