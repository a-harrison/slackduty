module.exports = {
  description: 'A Slack Action event, as described in the documentation: https://api.slack.com/docs/message-buttons',
  location: 'body',
  // schema: {
  //   type: 'object',
  //   properties: {
  //     'payload' : {
  //       type: 'object',
  //       properties: {
  //         'actions': {
  //             type: 'array',
  //             items: [
  //                 {
  //                   type: 'object',
  //                   properties: {
  //                     'name': { type: 'string' },
  //                     'value': { type: 'string' },
  //                     'type' : { type: 'string' }
  //                   }
  //                 }
  //             ]
  //         },
  //         'callback_id' : { type: 'string' },
  //         'team' : {
  //           type: 'object',
  //           properties: {
  //             'id' : { type: 'string' },
  //             'domain' : { type: 'string' }
  //           }
  //         },
  //         'channel' : {
  //           type: 'object',
  //           properties: {
  //             'id' : { type: 'string' },
  //             'name' : { type: 'string' }
  //           }
  //         },
  //         'user' : {
  //           type: 'object',
  //           properties: {
  //             'id' : { type: 'string' },
  //             'name' : { type: 'string' }
  //           }
  //         },
  //         'action_ts' : { type: 'string' },
  //         'message_ts' : { type: 'string' },
  //         'attachment_id' : { type: 'string' },
  //         'token' : { type: 'string' },
  //         'original_message' : { type: 'object' },
  //         'response_url' : { type: 'string' }
  //       }
  //     }
  //   },
  //   required: [ 'payload' ]
  // },
  required: true
}
