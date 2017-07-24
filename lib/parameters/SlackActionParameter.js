module.exports = {
  description: 'A Slack Action event, as described in the documentation: https://api.slack.com/docs/message-buttons',
  location: 'body',
  schema: {
    type: 'object',
    properties: {
      'payload' : {
        type: 'string'
      }
    },
    required: [ 'payload' ]
  },
  required: true
}
