module.exports = {
  "payload": {
    "actions": [
      {
        "name": "alertAction",
        "type":"button",
        "value":"resolve"
      }
    ],
    "callback_id":"test_value",
    "team": {
      "id":"T3MLM5F4P",
      "domain":"ham-bone-jones"
    },
    "channel": {
      "id":"C4ZT51PP0",
      "name":"slack-duty-dev"
    },
    "user": {
      "id":"U3L9RHXJM",
      "name":"adamaharrison"
    },
    "action_ts": "1492976840.240975",
    "message_ts": "1492976831.341493",
    "attachment_id":"1",
    "token":"gVqOlthfHbZ0m0soSQfW4ADN",
    "is_app_unfurl": false,
    "original_message": {
      "text":"",
      "bot_id":"B52HQJQEM",
      "attachments": [
        {
          "callback_id":"test_value",
          "text":"An incident has been triggered.",
          "title":"Incident Triggered",
          "footer":"Production XDB Cluster - Laura Haley",
          "id":1,
          "ts":2016,
          "color":"FF0000",
          "actions": [
            {"id":"1", "name":"alertAction", "text":"Acknowledge", "type":"button", "value":"acknowledge", "style":""},
            {"id":"2", "name":"alertAction", "text":"Resolve", "type":"button", "value":"resolve", "style":"" }
          ],
          "fallback":"Incident Triggered"}
      ],
      "type":"message",
      "subtype":"bot_message",
      "ts":"1492976831.341493"
    },
    "response_url": "https:\/\/hooks.slack.com\/actions\/T3MLM5F4P\/172694893281\/8dGkyZSZI6vcoKYchZxaKMc2"}
}
