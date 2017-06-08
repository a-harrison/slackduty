var _o = require('carbon-io').bond._o(module)
var IncomingWebhook = require('@slack/client').IncomingWebhook;
var url = _o('env:SLACK_WEBHOOK_URL') || 'TESTING'

var webhook = new IncomingWebhook(url);

module.exports = {
  sendMessage : function(message) {
    if(url != 'TESTING') {
      // Only send if not testing.
      webhook.send(message, function(err, sentMessage) {
        if(err) {
          console.log('Error: ' + err);
        } else {
          // console.log('Message sent.');
        }
      })
    }
  }
}
