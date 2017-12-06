var carbon = require('carbon-io')
var _o = carbon.bond._o(module)
var o = carbon.atom.o(module)

var pagerDutyWebhookParser = require('./PagerDutyWebhookParser');
var pagerDutyWebhookParameter = require('./parameters/PagerDutyWebhookParameter');
const SlackClient = require('./SlackClient.js');

var slackClient = new SlackClient(_o('env:SLACK_WEBHOOK_URL') || 'undefined');

module.exports = o({
  _type: carbon.carbond.Endpoint,
  // Post to alerts
  post: {
    description: "An endpoint to accept PagerDuty Webhook events.",
    parameters: {
      body: pagerDutyWebhookParameter
    },
    service: function(req, res) {
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

      res.sendStatus(200)
    }
  }
})
