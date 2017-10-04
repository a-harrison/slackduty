const carbon = require('carbon-io')
const _o = require('carbon-io').bond._o(module)
const o = carbon.atom.o(module)

const SlackClient = require('./SlackClient.js');
const PagerDutyIncidentHandler = require('./PagerDutyIncidentHandler');
const slackActionParameter = require('./parameters/SlackActionParameter');
const pagerDutyIncidentHandler = new PagerDutyIncidentHandler('https://events.pagerduty.com', 'generic/2010-04-15/create_event.json', _o('env:PAGERDUTY_INTEGRATION_KEY'))
const slackClient = new SlackClient(_o('env:SLACK_WEBHOOK_URL') || 'undefined');

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
      console.log(slackEvent)

      // Example action: '{ actions: [ { name: 'alertAction', type: 'button', value: 'acknowledge' } ]'
      var action = slackEvent.actions[0]

      //console.log('Incident Key from message: ' + slackEvent.callback_id)

      // Check for what event to send
      if( action.name == 'alertAction' && action.type == 'button' && action.value == 'acknowledge') {
        // Send ACK to PD API
        pagerDutyIncidentHandler.acknowledgeIncident(slackEvent.callback_id, function(response) {
          if(response.statusCode == 400) {
            slackClient.sendMessage('SlackAlertService: Error updating PagerDuty!')
            // this.getService().logError('Error updating PagerDuty incident: ' + response)
            console.log('Error acknowledging PagerDuty incident: ' + JSON.stringify(response))
            res.sendStatus(500)
          } else if (response.statusCode == 200) {
            console.log('PagerDuty ACK response: ' + JSON.parse(response))
            // Not sure what correct option is here.
            // return response.statusCode
            res.sendStatus(200)
          } else {
            console.log('Unidentified PagerDuty Response Status: ' + response.statusCode)
            console.log('Message: ' + response.message)
            res.sendStatus(200)
          }
        })
      }
      else if (action.name == 'alertAction' && action.type == 'button' && action.value == 'resolve') {
        // Send Resolve to PD API
        pagerDutyIncidentHandler.resolveIncident(slackEvent.callback_id, function(response) {
          if(response.statusCode == 400) {
            slackClient.sendMessage('SlackAlertService: Error updating PagerDuty!')
            // this.getService().logError('Error updating PagerDuty incident: ' + response)
            console.error('Error resolving PagerDuty incident: ' + JSON.stringify(response))
            res.sendStatus(500)
          } else if (response.statusCode == 200) {
            console.log('PagerDuty RESOLVE response: ' + JSON.parse(response))
            // Not sure what correct option is here.
            res.sendStatus(200)
          } else {
            console.log('Unidentified PagerDuty Response Status: ' + response.statusCode)
            console.log('Message: ' + response.message)
            res.sendStatus(200)
          }
        })
      }
    }
  }
})
