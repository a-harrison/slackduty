Simple carbon app to listen for PagerDuty <a href="https://v2.developer.pagerduty.com/docs/webhooks-overview">WebHook events</a> and re-broadcast to a designated Slack channel. The app can be configured to receive notifications from Slack button events as a method for acknowledging and resolving events.

#### Table of Contents
1. [Requirements](#Requirements)
2. [Setup](#Setup)
 	1. [Install the app.](#Install)
 	2. [Create the Slack app.](#Slack)
 	3. [Configure PagerDuty.](##PagerDuty)
	4. [Configuration.](#Configuration)
3. [Overview](#Overview)

-----

#### Requirements

* Slack Account
* PagerDuty Account
* MongoDB database.
* Ownership of a TLS-enabled HTTPS URL located on a publicly accessible server with a valid SSL certificate. This is required for interactive messages. (See 'Action URL SSL certificate requirements' requirements <a href="https://api.slack.com/interactive-messages">here</a>. )

-----

#### Setup <a name="Setup"></a>

##### 1. Install the app.<a name="Install"></a>

* `git clone https://nasalspray@gitlab.com/nasalspray/slackduty.git`
* `npm install`

##### 2. Create app auth credentials.<a name="Slack"></a>

Generate an API key and store the credential in your MongoDB database. The credential will be stored in a document in the `users` collection; the API key must be stored in a field named `apiKey`. For example:

```
db.users.insert({
 "apiKey" : "thisismyapikey"
})
```

A quick resource for getting a randomly generated key can be found at <a href="https://randomkeygen.com/">randomkeygen.com</a>.

##### 3. Create a new Slack App.<a name="Slack"></a>

<p>Create a new app for the designated Slack account (https://api.slack.com/apps). The following features will need to be enabled:</P>

* Incoming WebHooks - This will create an endpoint to which messages can be sent. Select the Slack channel to which notifications will be posted and save the WebHook URL. This URL will be set as the value of the *SLACK_WEBHOOK_URL* environment variable.

* Interactive Messages - Required if using <a href="https://api.slack.com/interactive-messages">interactive Slack messages</a>. Specify the 'Request URL' to which button events (acknowledge, resolve, etc) will be sent. The path must point to the `/actions` endpoint of the app and include the API key generated earlier. For example: 'http://example.com/alerts?api_key=thisismyapikey

##### 4. Configure PagerDuty<a name="PagerDuty"></a>

Enable a 'Generic V1 Webhook' integration to be sent from each service being monitored. The Webhook should be sent to the `/alerts` endpoint of the app. This URL must also include the API key.

If your messaging includes interactive messages, a <a href="https://support.pagerduty.com/v1/docs/services-and-integrations">Generic Events API Integration</a> is required to allow this app to update and resolve incidents. The integration key for the integration will be used by the app in the Events API v1; this key will be the value of the *PAGERDUTY_INTEGRATION_KEY* environment variable.

*Note* - The app uses the <a href="https://v2.developer.pagerduty.com/docs/events-api">v1 version</a> of the PagerDuty Events API.


##### 5. Config Variables<a name="Configuration"></a>

The following environment variables handle configuration for the app:

Variable Name | Value | Required
--- | --- | ---
MONGODB_URI | Connection URI to MongoDB Database. | True
SLACK_WEBHOOK_URL | The Webhook URL for the Slack app. | True
PAGERDUTY_INTEGRATION_KEY | The integration key of the PagerDuty integration. | True
SLACK_VERIFICATION_TOKEN | The verification token used to authenticate actions from Slack | True
SLACK_ALERT_SERVICE_PORT | The port on which the SlackAlertService will run | False

----

#### Overview<a name="Overview"></a>

The main class is `./lib/SlackAlertService.js`, which is a Carbon app that with two endpoints:

* `/alerts` - Accepts PagerDuty <a href="https://v2.developer.pagerduty.com/docs/webhooks-overview">WebHook events</a>
* `/actions` - Accepts messages sent as responses to <a href="https://api.slack.com/interactive-messages">Slack interaction messages</a>.

Messages sent to the `/alerts` endpoint are parsed according to the logic defined in `PagerDutyWebHookParser` and will generate custom formatted messages. Messaging formatting must be defined according to the <a href="https://api.slack.com/docs/message-attachments">Slack messaging guidelines</a>. The `MessageBuilder` class is a helper class to generate the formatted messages.

Messages sent to `/actions` should correspond to one either 'Acknowledge' or 'Resolve' button press events on interactive messages sent to Slack. `SlackAlertService` uses the `PagerDutyIncidentHandler` helper class to send API requests to update tickets accordingly.

#### Authentication

Messages sent to either the `/alerts` or `/actions` endpoints are authenticated using an `api_key` parameter present in the URL (e.g. 'http://example.com/alerts?api_key=thisismyapikey'). The API key must correspond to a user in the `users` collection. For example:

```
// users collection
{
 "_id" : .... ,
 "name": "test_user",
 "apiKey" : "thisismyapikey",
 ...
}
```

Messages sent to the `/actions` endpoint will also be validated according to the <a href="https://api.slack.com/docs/token-types#verification">Slack Verification Token</a>. Verification is performed by comparing the token included in every message sent from Slack to the *SLACK_VERIFICATION_TOKEN* environment variable. The value being sent can be customized via the <a href="https://api.slack.com/apps">Slack App</a>.
