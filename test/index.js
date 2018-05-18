var carbon = require('carbon-io')

var __ = carbon.fibers.__(module)
var _o = carbon.bond._o(module)
var o  = carbon.atom.o(module)
var testtube = carbon.testtube

/***************************************************************************************************
 * TEST_API_KLEY
 */
__(function() {
  module.exports = o.main({
    _type: carbon.carbond.test.ServiceTest,
    name: "SlackDuty Testtube Tests",
    description: "Testing SlackAlertService.",
    service: _o('../lib/SlackAlertService'), // path to your Service
    suppressServiceLogging: true,
    setup: function() {
      carbon.carbond.test.ServiceTest.prototype.setup.call(this)

      // Check that all required environment variables are defined
      if(_o('env:SLACK_VERIFICATION_TOKEN') === undefined)
        throw Error('Required environment variable SLACK_VERIFICATION_TOKEN not defined.')

      if(_o('env:SLACK_WEBHOOK_URL') === undefined)
        throw Error('Required environment variable SLACK_WEBHOOK_URL not defined.')

      if(_o('env:PAGERDUTY_INTEGRATION_KEY') === undefined)
        throw Error('Required environment variable PAGERDUTY_INTEGRATION_KEY not defined.')

      if(_o('env:SLACK_ALERT_SERVICE_API_KEY_HASH') === undefined)
        throw Error('Required environment variable API_KEY_HASH not defined.')

    },
    teardown: function() {
      carbon.carbond.test.ServiceTest.prototype.teardown.call(this)
    },
    tests: [
      _o('./AlertTests.js'),
      _o('./ActionTests.js'),
      // _o('./PagerDutyIncidentHandlerTests.js')
    ]
  })
})
