var carbon = require('carbon-io')
var o = carbon.atom.o(module).main

var pagerDutyWebhookParser = require('./PagerDutyWebhookParser');
var pagerDutyWebhookParameter = require('./parameters/PagerDutyWebhookParameter');
var slackClient = require('./SlackClient.js');

module.exports = o({
  _type: carbon.carbond.Endpoint,
  // Post to alerts
  post: {
    description: "An endpoint to accept PagerDuty Webhook events.",
    parameters: {
      body: pagerDutyWebhookParameter
    },
    service: function(req) {
      var messages = req.parameters.body.messages;

      // Parse each 'message' in the PagerDuty incident.
      messages.forEach(function(message) {
        // Parse each alert and generate a message to be sent to Slack
        var messagePayload = pagerDutyWebhookParser.parseAlert(message);

        // Only send if message exists
        if(messagePayload) {
          slackClient.sendMessage(messagePayload);
        }
      });

      // For the time being, we record messages so we can view message formats
      if(this.getService().db.getCollection('alerts').insert(req.parameters.body)) {
        return 200
      } else {
        return 500
      }
    }
  }
})
