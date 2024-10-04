#!/bin/sh

docker stack rm pentest
docker stack rm pentest-mysql
sudo service nginx stop

docker system  prune -a --force
cd dvha
git reset --hard
git pull
docker build . -t challenge-one --no-cache
cd ..
docker network create --driver overlay --internal private_network



# Mysql
docker stack deploy -c docker-compose-mysql.yml pentest-mysql

# Sleep
sleep 2

docker stack deploy -c docker-compose.yml pentest
sudo service nginx start