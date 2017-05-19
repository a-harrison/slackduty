var carbon = require('carbon-io')
var o = carbon.atom.o(module).main
var __ = carbon.fibers.__(module).main

var slackClient = require('./SlackClient.js');
var pagerDutyAlertParser = require('./PagerDutyWebhookParser');
var pagerDutyIncidentHandler = require('/.PagerDutyIncidentHandler');

// Load Config
var appConfig = require('../config/app.js');

// Load parameters
var pagerDutyAlertParameter = require('./parameters/PagerDutyWebhookParameter');
var slackActionParameter = require('./parameters/SlackActionParameter');

__(function() {
  module.exports = o({
    _type: carbon.carbond.Service,
    port: appConfig.port,
    dbUri: appConfig.dbUri,
    endpoints: {
      "alerts": o({
        _type: carbon.carbond.Endpoint,
        // Post to alerts
        post: {
          description: "An endpoint to accept PagerDuty Webhook events.",
          parameters: {
            body: pagerDutyAlertParameter
          },
          service: function(req) {
            var messages = req.parameters.body.messages;

            // Parse each 'message' in the PagerDuty incident.
            messages.forEach(function(message) {
              // Parse each alert and generate a message to be sent to Slack
              var messagePayload = pagerDutyAlertParser.parseAlert(message);

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
      }),
      "actions" : o({
        _type: carbon.carbond.Endpoint,
        post: {
          description: "An endpoint to accept Slack Action URL events.",
          parameters: {
            body: slackActionParameter
          },
          service: function(req) {
            var slackEvent = req.paramaters.body;

            // Need to parse out the incident ID from the footer
            var footerPieces = action.payload.actions.original_message.attachments[0].footer.split(" - ")

            // Messages are currently formatted as:
            // Service - IncidentID - emailAddress
            var incidentId = footerPieces[1]
            var userEmail = footerPieces[2]
            var action = slackEvent.payload.actions[0]

            // In general, this should only be doing an ack or resolve to PD.
            // The 'callback_id' could be set to random string to ensure that
            // only valid events are processed.
            // ^^ Not sure if this is a valid design pattern.
            if(action.callback_id == appConfig.callbackId) {

              // Check for what event to send
              if( action.name == 'alertAction' && action.type == 'button' && action.value = 'acknowledge') {

                // Send ACK to PD API
                pagerDutyIncidentHandler.acknowledge( incidentId, userEmail )

              } else if (action.name == 'alertAction' && action.type == 'button' && action.value = 'resolve') {

                // Send Resolve to PD API
                pagerDutyIncidentHandler.resolve( incidentId, userEmail )

              }
            }

            // Parse the action event, trigger call to PD API
            return 200
          }
        }
      })
    }
  })
});
