
# 🌐 **MeetGrid**

### *Distributed, Cloud-Native Real-Time Video & Chat Platform Built for DevOps / SRE / Cloud Engineering Portfolio*

---

## 🚀 Overview

**MeetGrid** is a fully distributed, microservices-based real-time communication platform inspired by Omegle.
It demonstrates modern cloud architecture with **WebRTC video calling**, **WebSocket chat**, **matchmaking**, and **horizontal scalability**—all orchestrated through a production-grade DevOps and SRE stack.

This project is designed to showcase **real-world engineering skills** across:

* **DevOps** (Docker, CI/CD, IaC, automation)
* **Cloud Engineering** (AWS, VPC, ECS/EKS, CloudFront, DynamoDB)
* **SRE** (Observability, SLOs, metrics, dashboards)
* **Platform Engineering** (Kubernetes, service deployments, scaling strategies)
* **Distributed Systems** (Signaling, matchmaking, WebRTC flows)

MeetGrid is not just a demo — it’s a complete *cloud-native system design portfolio project*.

---

# 🧩 Features

### 🎥 Real-Time Video via WebRTC

Peer-to-peer connection with signaling relayed via microservices.

### 💬 Real-Time Chat

WebSocket-based text chat between matched peers.

### 🔀 Matchmaking System

Microservice uses Redis queue to pair active users efficiently.

### 🧱 Microservices Architecture

Independent services:

* Signaling Service
* Matchmaking Service
* Chat Service
* Identity/Session Service (optional)

### 🛠️ Full DevOps + Platform Pipeline

* Docker + Compose
* Kubernetes deployments
* Terraform for AWS infra
* Ansible for provisioning
* GitHub Actions CI/CD

### 📊 SRE Observability

* Prometheus metrics
* Grafana dashboards
* Alertmanager
* CloudWatch logs
* SLO/SLI/Error budget docs

---

# 🏗️ Architecture (High Level)

```
Browser (WebRTC + WebSocket)
        |
   CloudFront (CDN)
        |
      S3 (Frontend Hosting)
        |
   API Gateway / ALB  
        |
  ---------------------------
  |    |     |      |       |
Signaling  Matchmaking  Chat  Identity
  (WS)        (REST)       (WS)     (auth)
  |            |            |        |
  |         Redis Queue     |     DynamoDB
  |            |            |
  |------- Prometheus -------|
              |
            Grafana
              |
        Alertmanager
```

Full architecture diagrams are stored in:
`/docs/architecture/`

---

# 📦 Repository Structure

```
meetgrid/
│
├── frontend/         # Next.js UI (video, chat, sessions)
├── services/         # Microservices: signaling, chat, matchmaking, identity
├── infra/            # IaC: Terraform, Ansible, Kubernetes, scripts
├── monitoring/       # Prometheus, Grafana, Alertmanager
├── docs/             # System design, SRE docs, diagrams
└── ci/               # GitHub Actions CI/CD pipelines
```

---

# 🛠️ Tech Stack

### **Frontend**

* Next.js 14
* TypeScript
* Tailwind CSS
* WebRTC
* WebSocket API

### **Backend Microservices**

* Node.js (TypeScript)
* Express / Fastify
* WebSocket servers
* Redis (queue)
* DynamoDB (state)

### **DevOps / Platform**

* Docker / Docker Compose
* Kubernetes (k3s / Minikube / EKS-ready)
* Terraform (AWS provisioning)
* Ansible (provisioning automation)
* GitHub Actions (CI/CD)

### **Cloud**

* AWS S3
* CloudFront
* API Gateway / ALB
* ECS Fargate (optional)
* DynamoDB
* ElastiCache (optional)
* CloudWatch

### **SRE**

* Prometheus
* Grafana
* Alertmanager
* SLO/SLI/Error Budgets
* Centralized Logging

---

# 🧪 Running Locally (Dev Mode)

## **Prerequisites**

* Docker
* Node.js (via nvm)
* Redis (`sudo apt install redis-server` or via Docker)
* k3s or minikube (optional for Kubernetes mode)

## **Start all services (Docker Compose)**

```bash
docker-compose up --build
```

Frontend:
`http://localhost:3000`

Signaling:
`ws://localhost:8080`

---

# ☁️ Deployment

### AWS Deployment Options

* **Low Cost**: Lambda + API Gateway + S3 + CloudFront
* **Fully Containerized**: ECS + Fargate
* **Kubernetes**: EKS (with Terraform)

See full steps in:
`docs/deployment-guide.md`

---

# 🔭 Monitoring

### Launch local Prometheus + Grafana:

```bash
docker-compose -f monitoring/docker-compose.yml up
```

Dashboards:
`http://localhost:3001`

---

# 📈 SRE Documentation

Located at:

```
docs/sre/
  ├── slos.md
  ├── slis.md
  └── error-budgets.md
```

Each service exposes `/metrics` for Prometheus scraping.

---

# 🗺️ Roadmap

### **Week 1**

* Repo structure
* Landing page
* Signaling service skeleton

### **Week 2**

* Matchmaking + Redis queue
* Docker Compose setup
* Basic WebRTC offer/answer

### **Week 3**

* Chat microservice
* Kubernetes manifests
* Prometheus & Grafana

### **Week 4**

* Terraform AWS infra
* Final CI/CD pipelines
* Demo video & documentation

Full roadmap inside:
`ROADMAP.md` (optional, create if you want)

---

# 🎥 Demo (Coming Soon)

A 2–3 minute video showing:

* Architecture
* Real-time pairing
* Video + chat working
* Metrics dashboard
* Logs, scaling, health checks
