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
    // Currently doing basic formatting.
    // Trigger
    if(alert.type == 'incident.trigger') {
      payload = messageBuilder.buildMessage(
        messageBuilder.RED,
        'Incident Triggered - ' + "#" + alert.data.incident.incident_number,
        'An incident has been triggered.',
        null,
        alert.data.incident.assigned_to_user.email,
        alert.data.incident.service.name + " - " + alert.data.incident.id,
        alert.created_on,
        true,
        'pagerDutyIncidentAction'
      )
      // Acknowlege
    } else if (alert.type == 'incident.acknowledge') {
      payload = messageBuilder.buildMessage(
        messageBuilder.YELLOW,
        'Acknowledged - ' + "#" + alert.data.incident.incident_number,
        null,
        null,
        alert.data.incident.assigned_to_user.email,
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
        alert.data.incident.resolved_by_user.email,
        alert.data.incident.service.name + " - " + alert.data.incident.id,
        alert.created_on,
        false
      )
    }

    return payload;
  }
}
