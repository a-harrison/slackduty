var _o = require('carbon-io').bond._o(module)

// This will need to offer the ability to perform any action offered by the
// buttons displayed in a Slack Channel.
// At this time, those actions are: Acknowledge, Resolve

function PagerDutyIncidentHandler(apiHostname, apiToken) {
  this.client = new CarbonClient(apiHostname, {
    "headers" : {
      "Content-Type": "application/json",
      "Accept": "application/vnd.pagerduty+json;version=2",
      "Authorization": "Token token=" + apiToken
     }
   })
}

/***********************************************************************************************************************
 * updateIncident
 *
 * @param incidentId The ID of the incident to update
 * @param updatedStatus The new status of the incident (e.g. acknowledged, resolved, etc.)
 * @param userEmailAddress The email address of the user updating the event.
 */

PagerDutyIncidentHandler.prototype.updateIncident = function(incidentId, updatedStatus, userEmailAddress) {
  // PUT is put( body, options )
  this.client.getEndpoint("incidents/" + incidentId).put(
    // body
    {
      "incident": {
        "type": "incident_reference",
        "status": updatedStatus
      }
    },
    // options
    {
      "headers": {
        "From" : userEmailAddress
      }
    },
    function(e, response) {
      if(e) {
        // do something
        console.error('Error updating PagerDuty!')
        console.error(e)
        return e
      }

      // do something with response
      console.log('PagerDuty response: ' + response)
      return response;
    }
  )
}

/***********************************************************************************************************************
 * acknowledgeIncident
 *
 * @param incidentId The ID of the incident to update
 * @param userEmailAddress The email address of the user updating the event.
 */

PagerDutyIncidentHandler.prototype.acknowledgeIncident = function(incidentId, userEmailAddress) {
  return this.updateIncident(incidentId, 'acknowledged', userEmailAddress)
}

/***********************************************************************************************************************
 * resolveIncident
 *
 * @param incidentId The ID of the incident to update
 * @param userEmailAddress The email address of the user updating the event.
 */

PagerDutyIncidentHandler.prototype.resolveIncident = function(incidentId, userEmailAddress) {
  return this.updateIncident(incidentId, 'resolved', userEmailAddress)
}

module.exports = PagerDutyIncidentHandler;
