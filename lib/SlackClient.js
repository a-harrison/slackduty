var IncomingWebhook = require('@slack/client').IncomingWebhook;

function SlackClient(webHookUrl) {
  this.webhook = new IncomingWebhook(webHookUrl);
}

SlackClient.prototype.sendMessage = function(message) {
  this.webhook.send(message, function(err, sentMessage) {
    if(err) {
      console.log('Error: ' + err);

      // What error case do we want?
      // * Create new PagerDuty event for failure?
      // * Completely fail? 
    }
  })
}

module.exports = SlackClient;
