module.exports = {
	"messages": [{
		"type": "incident.assign",
		"data": {
			"incident": {
				"id": "PRORDTY",
				"incident_number": 2126,
				"created_on": "2016-02-22T21:02:55Z",
				"status": "acknowledged",
				"pending_actions": [{
					"type": "unacknowledge",
					"at": "2016-02-22T21:13:21Z"
				}, {
					"type": "resolve",
					"at": "2016-02-23T01:02:55Z"
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
				"last_status_change_on": "2016-02-22T21:03:21Z",
				"last_status_change_by": {
					"id": "PFBSJ2Z",
					"name": "Wiley Jacobson",
					"email": "wiley.jacobson@example.com",
					"html_url": "https://webdemo.pagerduty.com/users/PFBSJ2Z"
				},
				"number_of_escalations": 0,
				"assigned_to": [{
					"at": "2016-02-22T21:02:55Z",
					"object": {
						"id": "P553OPV",
						"name": "Laura Haley",
						"email": "laura.haley@example.com",
						"html_url": "https://webdemo.pagerduty.com/users/P553OPV",
						"type": "user"
					}
				}, {
					"at": "2016-02-22T21:03:21Z",
					"object": {
						"id": "PFBSJ2Z",
						"name": "Wiley Jacobson",
						"email": "wiley.jacobson@example.com",
						"html_url": "https://webdemo.pagerduty.com/users/PFBSJ2Z",
						"type": "user"
					}
				}],
				"acknowledgers": [{
					"at": "2016-02-22T21:03:21Z",
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
		"id": "b4dbd5e0-d9a7-11e5-9ad4-22000a1798ef",
		"created_on": "2016-02-22T21:03:21Z"
	}]
}
