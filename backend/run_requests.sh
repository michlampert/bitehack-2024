
host=localhost
port=8000

curl -X POST -H "Content-Type: application/json" -d '{"name":"tmek"}' "http://$host:$port/create-user"
curl -X POST -H "Content-Type: application/json" -d '{"name":"wojtek"}' "http://$host:$port/create-user"
curl -X POST -H "Content-Type: application/json" -d '{"name":"mateusz"}' "http://$host:$port/create-user"
curl -X POST -H "Content-Type: application/json" -d '{"name":"michal"}' "http://$host:$port/create-user"

curl -X POST -H "Content-Type: application/json" -d '{  "title": "Sample Challenge", "description": "This is a sample challenge description", "constraints": [{"time_limit": 1, "website": "youtube.com"}], "total_time": 1080000, "start": "2024-01-20T18:11:54" }' "http://$host:$port/create-challenge"
curl -X POST -H "Content-Type: application/json" -d '{  "title": "Another Challenge", "description": "This is different challenge", "constraints": [{"time_limit": 0, "website": "youtube.com"}], "total_time": 360000, "start": "2024-01-20T20:11:54" }' "http://$host:$port/create-challenge"


curl -X POST -H "Content-Type: application/json" -d '{"event_id": 1, "user_id": 1}' "http://$host:$port/add-participant"
curl -X POST -H "Content-Type: application/json" -d '{"event_id": 1, "user_id": 2}' "http://$host:$port/add-participant"
curl -X POST -H "Content-Type: application/json" -d '{"event_id": 1, "user_id": 3}' "http://$host:$port/add-participant"
curl -X POST -H "Content-Type: application/json" -d '{"event_id": 1, "user_id": 4}' "http://$host:$port/add-participant"

curl -X POST -H "Content-Type: application/json" -d '{"event_id": 2, "user_id": 1}' "http://$host:$port/add-participant"

curl -X GET -H "Content-Type: application/json" -d '{"event_id": "1"}' http://$host:$port/get-event-status

curl -X GET -H "Content-Type: application/json" "http://$host:$port/get-user-events?user_id=1"
