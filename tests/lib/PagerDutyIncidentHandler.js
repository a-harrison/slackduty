var https = require('https');
var pagerDutyConfig = require('../config/pagerDutyConfig.js');

module.exports = {
  'acknowledge': function(incidentId, userEmailAddress) {

    // Create body of message
    var ack_body = JSON.stringify({
      "incident" : {
        "type" : "incident_reference",
        "status" : "acknowledged"
      }
    })

    // Create options
    var ack_options = {
      hostname: 'api.pagerduty.com',
      path: '/incidents/' + incidentId,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.pagerduty+json;version=2',
        'From' : userEmailAddress,
        'Authorization': 'Token token=' + pagerDutyConfig.token,
      }
    }

    const ackRequest = https.request(ack_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        console.log('Response: ' + chunk);
      });

      res.on('error', function(e) {
        console.log('Error updating PagerDuty!')
        console.log('Error: ' + e);
      });
    });

    ackRequest.write(ack_body);
    ackRequest.end();
  },


  'resolve': function( incidentId, userEmailAddress ) {
    // Create body of message
    var res_body = JSON.stringify({
      "incident" : {
        "type" : "incident_reference",
        "status" : "resolved"
      }
    })

    // Create options
    var res_options = {
      hostname: 'api.pagerduty.com',
      path: '/incidents/' + incidentId,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.pagerduty+json;version=2',
        'From' : userEmailAddress,
        'Authorization': 'Token token=' + pagerDutyConfig.token,
      }
    }

    const resRequest = https.request(res_options, function(res) {
      res.setEncoding('utf8');

      res.on('data', function(chunk) {
        console.log('Response: ' + chunk);
      });

      res.on('error', function(e) {
        console.log('Error updating PagerDuty!')
        console.log('Error: ' + e);
      })

    });

    resRequest.write(res_body);
    resRequest.end();
  }
}
