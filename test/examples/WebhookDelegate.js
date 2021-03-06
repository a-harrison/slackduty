module.exports = {
	"messages": [{
		"type": "incident.delegate",
		"data": {
			"incident": {
				"id": "PRORDTY",
				"incident_number": 2126,
				"created_on": "2016-02-22T21:02:55Z",
				"status": "triggered",
				"pending_actions": [{
					"type": "resolve",
					"at": "2016-02-23T01:37:49Z"
				}],
				"html_url": "https://webdemo.pagerduty.com/incidents/PRORDTY",
				"incident_key": "17a02d0d370d4add8e53132199614121",
				"service": {
					"id": "PDS1SN6",
					"name": "Production XDB Cluster",
					"html_url": "https://webdemo.pagerduty.com/services/PDS1SN6",
					"deleted_at": null,
					"description": "Primary production datastore."
				},
				"escalation_policy": {
					"id": "P55N6KH",
					"name": "Default",
					"deleted_at": null
				},
				"assigned_to_user": {
					"id": "PFBSJ2Z",
					"name": "Wiley Jacobson",
					"email": "wiley.jacobson@example.com",
					"html_url": "https://webdemo.pagerduty.com/users/PFBSJ2Z"
				},
				"trigger_summary_data": {
					"subject": "CPU Load High on xdb_production_echo"
				},
				"trigger_details_html_url": "https://webdemo.pagerduty.com/incidents/PRORDTY/log_entries/Q2AIXW2ZIMCI4P",
				"trigger_type": "web_trigger",
				"last_status_change_on": "2016-02-22T21:37:49Z",
				"last_status_change_by": null,
				"number_of_escalations": 4,
				"assigned_to": [{
					"at": "2016-02-22T21:37:49Z",
					"object": {
						"id": "PFBSJ2Z",
						"name": "Wiley Jacobson",
						"email": "wiley.jacobson@example.com",
						"html_url": "https://webdemo.pagerduty.com/users/PFBSJ2Z",
						"type": "user"
					}
				}],
				"urgency": "high"
			}
		},
		"id": "85973630-d9ac-11e5-bbf4-22000ae21df7",
		"created_on": "2016-02-22T21:37:49Z"
	}]
}
