
host=$1

curl -X POST -H "Content-Type: application/json" -d '{"name":"tmek"}' "http://$host:5000/create-user"
curl -X POST -H "Content-Type: application/json" -d '{"name":"wojtek"}' "http://$host:5000/create-user"
curl -X POST -H "Content-Type: application/json" -d '{"name":"mateusz"}' "http://$host:5000/create-user"
curl -X POST -H "Content-Type: application/json" -d '{"name":"michal"}' "http://$host:5000/create-user"

curl -X POST -H "Content-Type: application/json" -d '{  "title": "Sample Challenge", "description": "This is a sample challenge description", "constraints": [{"time_limit": 1, "website": "yotube.com"}], "total_time": 10800, "start": "2024-01-20T18:11:54" }' "http://$host:5000/create-challenge"


curl -X POST -H "Content-Type: application/json" -d '{"challenge_id": 1, "user_id": 1}' "http://$host:5000/add-participant"
curl -X POST -H "Content-Type: application/json" -d '{"challenge_id": 1, "user_id": 2}' "http://$host:5000/add-participant"
curl -X POST -H "Content-Type: application/json" -d '{"challenge_id": 1, "user_id": 3}' "http://$host:5000/add-participant"
curl -X POST -H "Content-Type: application/json" -d '{"challenge_id": 1, "user_id": 4}' "http://$host:5000/add-participant"

curl -X GET -H "Content-Type: application/json" -d '{"challenge_id": "1"}' http://$host:5000/get-challenge-status
