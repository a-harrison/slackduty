module.exports = {
  'RED' : '#FF0000',
  'GREEN' : '#36a64f',
  'YELLOW' : '#ffff00',

  // Use the web Message Builder to see how messages are built:
  // https://api.slack.com/docs/messages/builder
  buildMessage: function(
      msgColor,   // 'color' of the alert
      msgTitle,   // 'title'
      msgHeader,  // 'text' - Header of message
      msgContent, // 'fields' - content of message
      alertAssignee, // to whom the alert has been assigned
      msgFooter,  // 'footer', the service triggering the alert
      msgTime,    // 'ts'
      includeButtons, // Whether to include 'Ack' and 'Resolve' buttons
      callbackId   // callback_id of the buttons
    ) {
      var payload = {
        "text" : "",
        "attachments" : [
          {
            "color" :  msgColor,
            "title" :  msgTitle,
            "text" :   msgHeader,
            "fields" : msgContent,
            "footer" : msgFooter + ' - ' + alertAssignee,
            "ts" : msgTime
          }
        ],
        "replace_original" : false
      };

      if (includeButtons) {
        payload.attachments[0].actions = [
          {
            "name" : "alertAction",
            "text" : "Acknowledge",
            "type" : "button",
            "value" : "acknowledge"
          },
          {
            "name" : "alertAction",
            "text" : "Resolve",
            "type" : "button",
            "value" : "resolve"
          }
        ]

        payload.attachments[0].callback_id = callbackId
      }

      return payload;
  }
}
