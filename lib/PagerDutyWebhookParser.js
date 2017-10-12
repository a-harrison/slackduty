var slackClient = require('./SlackClient');
var messageBuilder = require('./MessageBuilder');

/*
  Parses PagerDuty Webhook events and generates JSON payloads formatted according
  to Slack message guidelines.

  PagerDuty Webhook formats:
  https://v2.developer.pagerduty.com/docs/webhooks-overview

  Slack Messaging format:
  https://api.slack.com/docs/message-attachments
  https://api.slack.com/docs/messages/builder
*/
module.exports = {
  parseAlert : function(alert) {
    var payload = null;
    var email = ''

    try {
      email = alert.data.incident.assigned_to_user.email
    } catch(err) {
      // If email address is undefined
      email = 'User'
    }

    // Currently doing basic formatting.
    // Trigger
    if(alert.type == 'incident.trigger') {
      payload = messageBuilder.buildMessage(
        messageBuilder.RED,
        'Incident Triggered - ' + "#" + alert.data.incident.incident_number,
        'An incident has been triggered.',
        null,
        email,
        alert.data.incident.service.name + " - " + alert.data.incident.id,
        alert.created_on,
        true,
        // incident key used to resolve the alert
        alert.data.incident.incident_key
      )
      // Acknowlege
    } else if (alert.type == 'incident.acknowledge') {
      payload = messageBuilder.buildMessage(
        messageBuilder.YELLOW,
        'Acknowledged - ' + "#" + alert.data.incident.incident_number,
        null,
        null,
        email,
        alert.data.incident.service.name + " - " + alert.data.incident.id,
        alert.created_on,
        false
      )
      // Resolve
    } else if (alert.type == 'incident.resolve') {
      payload = messageBuilder.buildMessage(
        messageBuilder.GREEN,
        'Resolved - ' + "#" + alert.data.incident.incident_number,
        null,
        null,
        email,
        alert.data.incident.service.name + " - " + alert.data.incident.id,
        alert.created_on,
        false
      )
    }

    return payload;
  }
}
