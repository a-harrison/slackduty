module.exports = {
  description: 'A PagerDuty Webhook event, as described in the documentation: https://v2.developer.pagerduty.com/docs/webhooks-overview',
  location: 'body',
  schema: {
    type: 'object',
    properties: {
      'messages': {
          type: 'array',
          items: [
              {
                type: 'object',
                properties: {
                  type: { type: 'string' },
                  data: {
                    type: 'object',
                    properties: {
                      incident: {
                        type: 'object',
                        properties: {
                          // Properties that will be present are dependent
                          // on incident type (e.g. trigger, ack, unack, etc.)
                        }
                      }
                    }
                  },
                id: { type: 'string' },
                created_on: { type: 'string' }
                }
              }
          ]
      }
    },
    required: [ 'messages']
  },
  required: true
}
