const carbon = require('carbon-io')
const _o = require('carbon-io').bond._o(module)
const o = carbon.atom.o(module)

const SlackClient = require('./SlackClient.js');
const PagerDutyIncidentHandler = require('./PagerDutyIncidentHandler');
const slackActionParameter = require('./parameters/SlackActionParameter');
const pagerDutyIncidentHandler = new PagerDutyIncidentHandler('https://events.pagerduty.com', 'generic/2010-04-15/create_event.json', _o('env:PAGERDUTY_INTEGRATION_KEY'))
const slackClient = new SlackClient(_o('env:SLACK_WEBHOOK_URL') || 'undefined');

const verificationToken = _o('env:SLACK_VERIFICATION_TOKEN')

module.exports = o({
  _type: carbon.carbond.Endpoint,
  post: {
    description: "An endpoint to accept Slack Action URL events.",
    parameters: {
      body: slackActionParameter
    },
    service: function(req, res) {
      // Check if service key is defined
      // Slack sends data as application/x-www-form-urlencoded
      //console.log(req.parameters.body.payload)
      var slackEvent = JSON.parse(req.parameters.body.payload);
      var returnValue = null;

      // Validate that verification token is correct. If not, respond with 403
      if(slackEvent.token == verificationToken) {
        // Example action: '{ actions: [ { name: 'alertAction', type: 'button', value: 'acknowledge' } ]'
        var action = slackEvent.actions[0]

        // Check for what event to send
        if( action.name == 'alertAction' && action.type == 'button' && action.value == 'acknowledge') {
        /**********************************************************************
        ********************  ACKNOWLEDGE  ************************************
        **********************************************************************/

          pagerDutyIncidentHandler.acknowledgeIncident(slackEvent.callback_id, function(err, response) {
            if(err) {
              console.log('Error communicating with PagerDuty: ' + err)
              slackClient.sendMessage({
                "response_type": "ephemeral",
                "replace_original": false,
                "text": "Sorry, there were issues updating PagerDuty. Please try again."
              })
            }

            if(response.statusCode == 400) {
              slackClient.sendMessage({
                "response_type": "ephemeral",
                "replace_original": false,
                "text": "Sorry, there were issues updating PagerDuty. Please try again."
              })

              console.log('Error acknowledging PagerDuty incident: ' + JSON.stringify(response))
            } else if (response.statusCode == 200) {
              // do nothing;
              // returns null at bottom
            } else {
              console.log('Unidentified PagerDuty Response Status: ' + response.statusCode)
              console.log('Message: ' + response.message)
            }
          })
        }

        else if (action.name == 'alertAction' && action.type == 'button' && action.value == 'resolve') {
        /**********************************************************************
        ********************  RESOLVE  ****************************************
        **********************************************************************/
          pagerDutyIncidentHandler.resolveIncident(slackEvent.callback_id, function(err, response) {
            if(err) {
              console.log('Error communicating with PagerDuty: ' + err);
              slackClient.sendMessage({
                "response_type": "ephemeral",
                "replace_original": false,
                "text": "Sorry, there were issues updating PagerDuty. Please try again."
              })
            }

            if(response.statusCode == 400) {
              slackClient.sendMessage({
                "response_type": "ephemeral",
                "replace_original": false,
                "text": "Sorry, there were issues updating PagerDuty. Please try again."
              })

              console.error('Error resolving PagerDuty incident: ' + JSON.stringify(response))
            } else if (response.statusCode == 200) {

              // When resolving, we want to remove buttons from the original message.
              var updatedMessage = slackEvent.original_message
              delete updatedMessage.attachments[0].actions

              return updatedMessage
            } else {
              console.log('Unidentified PagerDuty Response Status: ' + response.statusCode)
              console.log('Message: ' + response.message)
            }
          })

          /**********************************************************************
          ********************  REASSIGN?  ****************************************
          **********************************************************************/
          // might need to implement re-assign as that seems to be used more often now
        }
      }

      return returnValue;
    }
  }
})
