module.exports = {
    "messages": [{
        "type": "incident.trigger",
        "data": {
            "incident": {
                "id": "PRORDTY",
                "incident_number": 2126,
                "created_on": "2016-02-22T21:02:55Z",
                "status": "triggered",
                "pending_actions": [{
                    "type": "escalate",
                    "at": "2016-02-22T13:07:55-08:00"
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
                    "id": "P553OPV",
                    "name": "Laura Haley",
                    "email": "laura.haley@example.com",
                    "html_url": "https://webdemo.pagerduty.com/users/P553OPV"
                },
                "trigger_summary_data": {
                    "subject": "CPU Load High on xdb_production_echo"
                },
                "trigger_details_html_url": "https://webdemo.pagerduty.com/incidents/PRORDTY/log_entries/Q2AIXW2ZIMCI4P",
                "trigger_type": "web_trigger",
                "last_status_change_on": "2016-02-22T21:02:55Z",
                "last_status_change_by": null,
                "number_of_escalations": 0,
                "assigned_to": [{
                    "at": "2016-02-22T21:02:55Z",
                    "object": {
                        "id": "P553OPV",
                        "name": "LauraHaley",
                        "email": "laura.haley@example.com",
                        "html_url": "https://webdemo.pagerduty.com/users/P553OPV",
                        "type": "user"
                    }
                }],
                "urgency": "high"
            }
        },
        "id": "a52d3f80-d9a7-11e5-8db3-22000ad5aec9",
        "created_on": "2016-02-22T21:02:55Z"
    }]
}
