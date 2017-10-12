var _o = require('carbon-io').bond._o(module)
var CarbonClient = require('@carbon-io/carbon-client-node')

// This will need to offer the ability to perform any action offered by the
// buttons displayed in a Slack Channel.
// At this time, those actions are: Acknowledge, Resolve.
// Also offers ability to create incident so we can test it.

function PagerDutyIncidentHandler(api_hostname, api_endpoint, service_key) {
  // if(service_key == undefined)
  //   throw Error('PagerDutyIncidentHandler service_key cannot be undefined!')

  this.service_key = service_key
  this.api_hostname = api_hostname
  this.api_endpoint = api_endpoint

  this.client = new CarbonClient(api_hostname, {
    "headers" : {
      "Content-Type": "application/json"
     }
   })
}

/***********************************************************************************************************************
 * updateIncident
 *
 * @param incident_key The incident_key identifying the incident to update
 * @param updated_status The new status of the incident (e.g. acknowledged, resolved, etc.)
 */

PagerDutyIncidentHandler.prototype.updateIncident = function(incident_key, updated_status, callbackFunc) {
  var post_body = {
    "service_key": this.service_key,
    "event_type": updated_status,
    "incident_key": incident_key,
    "client" : "Testing app."
  };

  this.client.getEndpoint(this.api_endpoint).post(
    // body
    post_body,
    function(err, response) {
      if(err) {
        // do something
        // console.error('Error updating PagerDuty!')
        // console.error(JSON.stringify(err))
        // console.log('')
        // console.log('Body was: ' + JSON.stringify(post_body))
        callbackFunc(err, null)
      }

      // do something with response
      // console.log('PagerDuty response: ' + JSON.stringify(response))
      callbackFunc(null, response)
    }
  )
}

/***********************************************************************************************************************
 * createIncident
 *
 * @param description The description of the incident being created.
 */

PagerDutyIncidentHandler.prototype.createIncident = function(description, client, callbackFunc) {
  var post_body = {
    "service_key": this.service_key,
    "client" : client,
    "event_type": 'trigger',
    "description": description
  };

  this.client.getEndpoint(this.api_endpoint).post(
    // body
    post_body
    ,
    function(err, response) {
      if(err) {
        // do something
        // console.error('Error creating incident: ')
        // console.error(JSON.stringify(err))
        //
        // console.log('')
        // console.log('Body was: ' + post_body)
        callbackFunc(err, null)
      }

      // do something with response
      callbackFunc(null, response)
    }
  )
}

/***********************************************************************************************************************
 * acknowledgeIncident
 *
 * @param incident_key The incident_key of the incident to update
 */

PagerDutyIncidentHandler.prototype.acknowledgeIncident = function(incident_key, callback) {
  return this.updateIncident(incident_key, 'acknowledge', callback)
}

/***********************************************************************************************************************
 * resolveIncident
 *
 * @param incident_key The incident_key of the incident to update
 */

PagerDutyIncidentHandler.prototype.resolveIncident = function(incident_key, callback) {
  return this.updateIncident(incident_key, 'resolve', callback)
}

module.exports = PagerDutyIncidentHandler;
