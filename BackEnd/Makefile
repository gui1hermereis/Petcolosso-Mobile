up:
	docker-compose --compatibility up -d

down: 
	docker-compose down

get-in:
	docker exec -it app-csi-api bash

logs:
	docker-compose logs
	
restart:
	yarn prisma generate ; yarn build ; docker-compose down -v --rmi all ; docker-compose up -d
