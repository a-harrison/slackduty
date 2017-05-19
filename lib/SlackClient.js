var IncomingWebhook = require('@slack/client').IncomingWebhook;
var url = require('../config/slack.js').webhookUrl;
var webhook = new IncomingWebhook(url);

module.exports = {
  sendMessage : function(message) {
    webhook.send(message, function(err, sentMessage) {
      if(err) {
        console.log('Error: ' + err);
      } else {
        // console.log('Message sent.');
      }
    })
  }
}
