# 🗳️ Voting App (Docker Swarm)

This is a **containerized voting system** built with multiple microservices and deployed on **Docker Swarm**. The stack includes a **Frontend Voting App**, a **Results Dashboard**, a **Background Worker**, a **Redis Cache**, and a **PostgreSQL** **Database**.

---

## ⚙️ Architecture
- **Vote** → Frontend App (Python/Flask) for casting votes
- **Result** → Frontend App (Node.js) for showing results
- **Worker** → Background Processor to consume votes and update DB
- **Redis** → In-Memory Cache / message broker
- **DB** → PostgreSQL Database for storing votes

---

## 🚀 Deployment Steps

### 1. Build and Push Images
```bash
# build local images
docker-compose build

# tag and push to Docker Hub
docker tag voting-app_vote:latest <your-dockerhub-username>/vote:latest
docker tag voting-app_result:latest <your-dockerhub-username>/result:latest
docker tag voting-app_worker:latest <your-dockerhub-username>/worker:latest

docker push <your-dockerhub-username>/vote:latest
docker push <your-dockerhub-username>/result:latest
docker push <your-dockerhub-username>/worker:latest
```

---

### 2. Update docker-compose.yml
- Replace image: with your Docker Hub repo names:

---

### 3. Deploy to Docker Swarm
```bash
# init swarm (only once)
docker swarm init

# deploy the stack
docker stack deploy -c docker-compose.yml voting-app
```

---

### 4. Verify Deployment
```bash
docker stack services voting-app
docker stack ps voting-app
```

---

### 5. Access
- Vote UI → http://<SERVER_IP>:5000
- Result UI → http://<SERVER_IP>:5001

---

### 📌 Scaling Services
- Example: scale frontend to 3 replicas
```bash
docker service scale voting-app_vote=3
```

---

### ✅ Cleanu
```bash
docker stack rm voting-app
docker swarm leave --force
```

---

### 🔥 Highlights
- Full microservices-based architecture
- Uses Redis as cache, Postgres as DB
- Deployable on a single node or multi-node Swarm cluster
- Easy to scale horizontally

---


