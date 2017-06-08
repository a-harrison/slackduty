var https = require('https');
var _o = require('carbon-io').bond._o(module)
var token = _o('env:PAGERDUTY_TOKEN') || 'TESTING'

module.exports = {
  'acknowledge': function(incidentId, userEmailAddress) {

    // Create body of message
    var ack_body = JSON.stringify({
      "incident" : {
        "type" : "incident_reference",
        "status" : "acknowledged"
      }
    })

    if(token != 'TESTING') {
      // Create options
      var ack_options = {
        hostname: 'api.pagerduty.com',
        path: '/incidents/' + incidentId,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.pagerduty+json;version=2',
          'From' : userEmailAddress,
          'Authorization': 'Token token=' + token,
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
    }
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

    if(token != 'TESTING') {
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
}
