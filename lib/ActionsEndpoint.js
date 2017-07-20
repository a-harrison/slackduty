var carbon = require('carbon-io')
var _o = require('carbon-io').bond._o(module)
var o = carbon.atom.o(module).main

var PagerDutyIncidentHandler = require('./PagerDutyIncidentHandler');
var slackActionParameter = require('./parameters/SlackActionParameter');

var pagerDutyIncidentHandler = new PagerDutyIncidentHandler('https://api.pagerduty.com', _o('env:PAGERDUTY_TOKEN'))

module.exports = o({
  _type: carbon.carbond.Endpoint,
  post: {
    description: "An endpoint to accept Slack Action URL events.",
    parameters: {
      body: slackActionParameter
    },
    service: function(req) {
      var slackEvent = req.parameters.body;

      // Need to parse out the incident ID from the footer
      var footerPieces = slackEvent.payload.original_message.attachments[0].footer.split(" - ")

      // Messages are currently formatted as:
      // Service - IncidentID - emailAddress
      var incidentId = footerPieces[1]
      var userEmail = footerPieces[2]
      var action = slackEvent.payload.actions[0]

      // In general, this should only be doing an ack or resolve to PD.
      // The 'callback_id' could be set to random string to ensure that
      // only valid events are processed.
      // ^^ Not sure if this is a valid design pattern.
      if(action.callback_id == _o('env:CALLBACK_ID')) {

        // Check for what event to send
        if( action.name == 'alertAction' && action.type == 'button' && action.value == 'acknowledge') {

          // Send ACK to PD API
          pagerDutyIncidentHandler.acknowledgeIncident( incidentId, userEmail )

        } else if (action.name == 'alertAction' && action.type == 'button' && action.value == 'resolve') {

          // Send Resolve to PD API
          pagerDutyIncidentHandler.resolveIncident( incidentId, userEmail )

        }
      }

      // Parse the action event, trigger call to PD API
      return 200
    }
  }
})
