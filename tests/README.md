Simple carbon app to listen for PagerDuty <a href="https://v2.developer.pagerduty.com/docs/webhooks-overview">WebHook events</a> and re-broadcast to a designated Slack channel. The app can be configured to receive notifications from Slack button events as a method for acknowledging / resolving events.

-----

#### Requirements

* Slack Account
* PagerDuty Account
* Ownership of a TLS-enabled HTTPS URL located on a publically accessible server with a valid SSL certificate. (See 'Action URL SSL certificate requirements
' requirements <a href="https://api.slack.com/interactive-messages">here</a>. )

-----

##### Setup

###### 1. Install the app.

* `git clone https://nasalspray@gitlab.com/nasalspray/slackduty.git`
* `npm install`

###### 2. Create a new Slack App.

<p>Create a new app for the designated Slack account (https://api.slack.com/apps). The following features will need to be enabled:</P>

* Incoming WebHooks - Select the channel to which notifications will be posted and save the WebHook URL. This URL will be specified in the `slack.js` configuration file.

* Interactive Messages - Specify the 'Request URL' to which button events (acknowledge / resolve) will be sent. The path must point to the '/actions' endpoint of the app.

###### 3. Configure PagerDuty

Enable WebHook events to be sent from the services being monitored. Each service will need to be supplied a WebHook URL pointing to the "/alerts" endpoint of the app.

*Note* - The app uses the <a href="https://v2.developer.pagerduty.com/v2/">v2 version</a> of the PagerDuty API.

###### 4. Create Config Files

The app requires the following configuration files:

* `./config/app.js` - Specifies:
	* Port number on which the service will be running
	* MongoDB connection string to where events will be saved (_Optional_)
	* A unique callback ID that will be used to determine that action events are valid. This value is included in each message sent to Slack and will be included in action events that are sent back

```
module.exports = {
  'port' : 'XXX_PORT_XXX',
  'dbUri' : 'XXX_MONGODBURI_XXX',
  'callbackId' : 'XXX_CALLBACKID_XXX'
}
```
----
* `./config/slack.js` - The WebHook URL to which slack messages will be sent:

```
module.exports = {
  'webhookUrl' : 'XXX_WEBHOOK_URL_XXX'
}
```
----
* `./config/pagerDutyConfig.js` - The API token used to acknowledge / resolve PagerDuty alerts:

```
module.exports = {
  'token' : 'XXX_API_TOKEN_XXX'
}
```

----

##### Overview

The main class is `./lib/SlackAlertService.js`, which is a Carbon app that with two endpoints:

* `/alerts` - Accepts PagerDuty <a href="https://v2.developer.pagerduty.com/docs/webhooks-overview">WebHook events</a>
* `/actions` - Accepts messages sent as responses to <a href="https://api.slack.com/interactive-messages">Slack interaction messages</a>.

Messages sent to the `/alerts` endpoint are parsed according to the logic defined in `PagerDutyWebHookParser` and will generate custom formatted messages. Messaging formatting must be defined according to the <a href="https://api.slack.com/docs/message-attachments">Slack messaging guidelines</a>. The `MessageBuilder` class is a helper class to generate the formatted messages.

Messages sent to `/actions` should correspond to one either 'Acknowledge' or 'Resolve' button press events on interactive messages sent to Slack. `SlackAlertService` uses the `PagerDutyIncidentHandler` helper class to send API requests to update tickets accordingly.
