host=localhost
port=8000

curl -X POST -H "Content-Type: application/json" -d '{"name":"tmek"}' "http://$host:$port/create-user"
curl -X POST -H "Content-Type: application/json" -d '{"name":"wojtek"}' "http://$host:$port/create-user"
curl -X POST -H "Content-Type: application/json" -d '{"name":"mateusz"}' "http://$host:$port/create-user"
curl -X POST -H "Content-Type: application/json" -d '{"name":"michal"}' "http://$host:$port/create-user"

curl -X POST -H "Content-Type: application/json" -d '{  "name": "Sample Challenge", "description": "This is a sample challenge description", "total_time": 108000, "start": "2024-01-20T23:11:54", "free_time": 600, "blacklist": ["youtube.com", "facebook.com"] }' "http://$host:$port/create-event"
curl -X POST -H "Content-Type: application/json" -d '{  "name": "Second Challenge", "description": "This is another event description", "total_time": 120000, "start": "2024-01-20T22:11:54", "free_time": 600, "blacklist": ["instagram.com", "facebook.com"] }' "http://$host:$port/create-event"


curl -X POST -H "Content-Type: application/json" -d '{"event_id": 1, "user_id": 1}' "http://$host:$port/add-participant"
curl -X POST -H "Content-Type: application/json" -d '{"event_id": 1, "user_id": 2}' "http://$host:$port/add-participant"
curl -X POST -H "Content-Type: application/json" -d '{"event_id": 1, "user_id": 3}' "http://$host:$port/add-participant"
curl -X POST -H "Content-Type: application/json" -d '{"event_id": 1, "user_id": 4}' "http://$host:$port/add-participant"

curl -X POST -H "Content-Type: application/json" -d '{"event_id": 2, "user_id": 1}' "http://$host:$port/add-participant"

curl -X GET -H "Content-Type: application/json" -d '{"event_id": "1"}' http://$host:$port/get-event-status

curl -X GET -H "Content-Type: application/json" "http://$host:$port/get-user-events?user_id=1"