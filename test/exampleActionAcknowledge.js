module.exports = {
  "payload": {
    "actions": [
      {
        "name": "alertAction",
        "type":"button",
        "value":"acknowledge"
      }
    ],
    "callback_id":"test_value",
    "team": {
      "id":"T3MLM5F4P",
      "domain":"test-domain"
    },
    "channel": {
      "id":"C4ZT51PP0",
      "name":"slack-duty-dev"
    },
    "user": {
      "id":"ABCDEFGHI",
      "name":"John Doe"
    },
    "action_ts":"1492927037.804574",
    "message_ts":"1492927035.812771",
    "attachment_id":"1",
    "token":"gVqOlthfHbZ0m0soSQfW4ADN",
    "is_app_unfurl":false,
    "original_message": {
      "text":"",
      "bot_id":"B52HQJQEM",
      "attachments": [
        {
          "callback_id":"17a02d0d370d4add8e53132199614121",
          "text":"An incident has been triggered.",
          "title":"Incident Triggered",
          "footer":"Production XDB Cluster - Laura Haley",
          "id":1,
          "ts":2016,
          "color":"FF0000",
          "actions":[
            {"id":"1", "name":"alertAction", "text":"Acknowledge", "type":"button", "value":"acknowledge", "style":""},
            {"id":"2", "name":"alertAction", "text":"Resolve", "type":"button", "value":"resolve", "style":"" }
          ],
          "fallback": "Incident Triggered"
        }
      ],
      "type":"message",
      "subtype":"bot_message",
      "ts":"1492927035.812771"},
    "response_url": "https:\/\/hooks.slack.com\/actions\/T3MLM5F4P\/173982032934ß\/N4kfiRA5yGl1J3yHbRhknZ6O"}
  }
