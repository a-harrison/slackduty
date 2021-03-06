module.exports = {
	"messages": [{
		"type": "incident.acknowledge",
		"data": {
			"incident": {
				"id": "PRORDTY",
				"incident_number": 2126,
				"created_on": "2016-02-22T21:02:55Z",
				"status": "acknowledged",
				"pending_actions": [{
					"type": "unacknowledge",
					"at": "2016-02-22T13:23:44-08:00"
				}, {
					"type": "resolve",
					"at": "2016-02-22T17:02:55-08:00"
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
					"id": "P5ARF12",
					"name": "Database Team",
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
				"last_status_change_on": "2016-02-22T21:13:44Z",
				"last_status_change_by": {
					"id": "PFBSJ2Z",
					"name": "Wiley Jacobson",
					"email": "wiley.jacobson@example.com",
					"html_url": "https://webdemo.pagerduty.com/users/PFBSJ2Z"
				},
				"number_of_escalations": 0,
				"assigned_to": [{
					"at": "2016-02-22T21:03:21Z",
					"object": {
						"id": "PFBSJ2Z",
						"name": "Wiley Jacobson",
						"email": "wiley.jacobson@example.com",
						"html_url": "https://webdemo.pagerduty.com/users/PFBSJ2Z",
						"type": "user"
					}
				}, {
					"at": "2016-02-22T21:13:21Z",
					"object": {
						"id": "P553OPV",
						"name": "Laura Haley",
						"email": "laura.haley@example.com",
						"html_url": "https://webdemo.pagerduty.com/users/P553OPV",
						"type": "user"
					}
				}],
				"acknowledgers": [{
					"at": "2016-02-22T21:13:44Z",
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
		"id": "286890b0-d9a9-11e5-bbf4-22000ae21df7",
		"created_on": "2016-02-22T21:13:44Z"
	}]
}
