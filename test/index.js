var carbon = require('carbon-io')

var __ = carbon.fibers.__(module).main
var _o = carbon.bond._o(module)
var o  = carbon.atom.o(module).main
var testtube = carbon.testtube

/***************************************************************************************************
 * TEST_API_KLEY
 */
var TEST_API_KEY = "abcdefghi1234567890"

__(function() {
  module.exports = o({
    _type: carbon.carbond.test.ServiceTest,
    name: "SlackDuty Testtube Tests",
    description: "Testing SlackAlertService.",
    service: _o('../lib/SlackAlertService'), // path to your Service
    suppressServiceLogging: true,
    tests: [
      _o('./WebhookTests.js'),
      _o('./ActionTests.js')
    ]
  })
})
