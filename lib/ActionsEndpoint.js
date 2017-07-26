var carbon = require('carbon-io')
var _o = require('carbon-io').bond._o(module)
var o = carbon.atom.o(module).main

var PagerDutyIncidentHandler = require('./PagerDutyIncidentHandler');
var slackActionParameter = require('./parameters/SlackActionParameter');

if(typeof PAGERDUTY_INTEGRATION_KEY !== 'undefined') {
  var pagerDutyIncidentHandler = new PagerDutyIncidentHandler('https://events.pagerduty.com', 'generic/2010-04-15/create_event.json', _o('env:PAGERDUTY_INTEGRATION_KEY'))
}

module.exports = o({
  _type: carbon.carbond.Endpoint,
  post: {
    description: "An endpoint to accept Slack Action URL events.",
    parameters: {
      body: slackActionParameter
    },
    service: function(req) {
      /*
        1. If PAGERDUTY_INTEGRATION_KEY is undefined, return 200
        2. If defined, perform the corresponding action
      */

      // Check if service key is defined
      if(typeof PAGERDUTY_INTEGRATION_KEY !== 'undefined') {
        // Slack sends data as application/x-www-form-urlencoded
        var slackEvent = JSON.parse(req.parameters.body.payload);

        // Need to parse out the incident ID from the footer
        var footerPieces = slackEvent.payload.original_message.attachments[0].footer.split(" - ")

        // Messages are currently formatted as:
        // Service - IncidentID - emailAddress
        var action = slackEvent.payload.actions[0]

        try {
          // Check for what event to send
          if( action.name == 'alertAction' && action.type == 'button' && action.value == 'acknowledge') {
            // Send ACK to PD API
            pagerDutyIncidentHandler.acknowledgeIncident(action.callback_id)
            return 200
          } else if (action.name == 'alertAction' && action.type == 'button' && action.value == 'resolve') {
            // Send Resolve to PD API
            pagerDutyIncidentHandler.resolveIncident(action.callback_id)
            return 200
          }
        } catch(e) {
          this.getService().logError('Error updating PagerDuty incident: ' + JSON.stringify(e));
          return 500
        }
      } else {
        return 200
      }
    }
  }
})
