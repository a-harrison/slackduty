var carbon = require('carbon-io')

var __ = carbon.fibers.__(module)
var _o = carbon.bond._o(module)
var o  = carbon.atom.o(module)
var testtube = carbon.testtube

/***************************************************************************************************
 * TEST_API_KLEY
 */
var TEST_API_KEY = "abcdefghi1234567890"

__(function() {
  module.exports = o.main({
    _type: carbon.carbond.test.ServiceTest,
    name: "SlackDuty Testtube Tests",
    description: "Testing SlackAlertService.",
    service: _o('../lib/SlackAlertService'), // path to your Service
    suppressServiceLogging: true,
    setup: function() {
      carbon.carbond.test.ServiceTest.prototype.setup.call(this)
      this.service.db.getCollection("users").createIndex({apiKey: 1}, {unique: true})

      // Insert test API Key
      this.service.db.getCollection("users").findOneAndUpdate(
        { "apiKey" : "abcdefghi1234567890" },
        { "$set" : { "apiKey" : "abcdefghi1234567890" } },
        { "upsert" : true }
      )
    },
    teardown: function() {
      // Drop collection
      this.service.db.getCollection("users").drop()
      this.service.db.getCollection("alerts").drop()
      carbon.carbond.test.ServiceTest.prototype.teardown.call(this)
    },
    tests: [
      _o('./WebhookTests.js'),
      _o('./ActionTests.js'),
      _o('./PagerDutyIncidentHandlerTests.js')
    ]
  })
})
