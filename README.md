![Angular](https://img.shields.io/badge/Angular-Frontend-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Programming_Language-3178C6?logo=typescript&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-Backend-6DB33F?logo=springboot&logoColor=white)
![Java](https://img.shields.io/badge/Java-17-ED8B00?logo=openjdk&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-AI_Service-009688?logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-AI_%26_Machine_Learning-3776AB?logo=python&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-Deep_Learning-FF6F00?logo=tensorflow&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerization-2496ED?logo=docker&logoColor=white)
![Ansible](https://img.shields.io/badge/Ansible-Infrastructure_as_Code-EE0000?logo=ansible&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-Reverse_Proxy-009639?logo=nginx&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?logo=githubactions&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-Monitoring-E6522C?logo=prometheus&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-Observability-F46800?logo=grafana&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-Infrastructure-FCC624?logo=linux&logoColor=black)
![VirtualBox](https://img.shields.io/badge/VirtualBox-Virtualization-183A61?logo=virtualbox&logoColor=white)

# 🌱 AgriLink

### Smart Agriculture Platform for AI-Powered Crop Disease Detection, Farmer Collaboration & Agricultural Commerce

AgriLink is a smart agriculture platform designed to help farmers **detect crop diseases using artificial intelligence, share disease detections with nearby farmers, receive early warnings, and participate in a connected agricultural marketplace.**

The core idea is:

**Detect. Share. Warn. Protect.**

<img src="docs/images/agrilink-banner.png" alt="AgriLink - Smart Agriculture Platform" width="100%">
---

## 📖 Table of Contents

* [🎯 Project Vision](#-project-vision)
* [🚨 Core Concept](#-core-concept)
* [✨ Key Features](#-key-features)
* [🏗️ System Architecture](#️-system-architecture)
* [🧰 Technology Stack](#-technology-stack)
* [🐳 Deployment Architecture](#-deployment-architecture)
* [⚙️ DevOps Architecture](#️-devops-architecture)
* [📊 Monitoring & Observability](#-monitoring--observability)
* [🛡️ Security](#️-security)
* [🧪 Testing Strategy](#-testing-strategy)
* [📁 Project Structure](#-project-structure)
* [🚀 Development Roadmap](#-development-roadmap)
* [🧭 Development Philosophy](#-development-philosophy)
* [📚 Documentation](#-documentation)
* [🎓 Portfolio Objectives](#-portfolio-objectives)
* [🌱 Future Vision](#-future-vision)
* [📌 Project Status](#-project-status)
* [👨‍💻 Author](#-author)

---

# 🎯 Project Vision

Agricultural diseases can spread rapidly while farmers may have limited access to early information about outbreaks in their surrounding areas.

AgriLink aims to create a **connected agricultural ecosystem** where farmers can:

* 🔬 Detect crop diseases using AI
* 📢 Share disease detections with nearby farmers
* 📍 Receive localized disease alerts
* 🗺️ Discover farmers and agricultural activity around them
* 🌾 Manage crops
* 🛒 Buy and sell agricultural products
* 🤝 Communicate with farmers and buyers
* 🌦️ Access weather information and agricultural recommendations
* 🛠️ Discover and offer agricultural services

The long-term objective is to transform individual disease detection into a **community-based agricultural early-warning system**.

---

# 🚨 Core Concept

The most important workflow in AgriLink is the disease detection and sharing system.

```text
                    FARMER
                       │
                       ▼
                Upload Crop Image
                       │
                       ▼
                ┌──────────────┐
                │   AI MODEL   │
                └──────┬───────┘
                       │
                       ▼
                Disease Detection
                       │
              ┌────────┴────────┐
              │                 │
           PRIVATE            SHARE
              │                 │
              ▼                 ▼
        Detection History   Disease Alert
                                │
                                ▼
                       Nearby Farmers
                                │
                                ▼
                         Early Warning
                                │
                                ▼
                         Crop Protection
```

The core value of AgriLink is not simply detecting a disease.

The real objective is to transform a single farmer's detection into **useful localized information for other farmers who may be at risk.**

```text
Individual Detection
        ↓
Disease Identification
        ↓
Farmer Chooses to Share
        ↓
Geographic Filtering
        ↓
Nearby Farmers
        ↓
Disease Alert
        ↓
Early Action
        ↓
Reduced Crop Risk
```

---

# ✨ Key Features

## 🤖 AI Plant Disease Detection

Farmers can submit crop images for AI-powered analysis.

### Detection Workflow

```text
Upload Image
     ↓
Preview Image
     ↓
Select Crop
     ↓
AI Analysis
     ↓
Disease Prediction
     ↓
Confidence Score
     ↓
Symptoms & Recommendations
```

Planned capabilities:

* Image upload and preview
* Image validation
* Crop selection
* AI inference
* Disease classification
* Confidence score
* Disease information
* Recommended actions
* Detection history
* Detection details
* Delete detection history

---

# 📢 Disease Sharing & Early Warning

This is the **core differentiating feature of AgriLink**.

After receiving a detection result, a farmer can choose whether to share it with nearby farmers.

```text
Farmer A
   │
   ▼
Disease Detection
   │
   ▼
Share Detection
   │
   ▼
Find Nearby Farmers
   │
   ├───────────────┐
   ▼               ▼
Farmer B        Farmer C
   │               │
   └───────┬───────┘
           ▼
      Disease Alert
           │
           ▼
      Early Warning
```

Features include:

* Share or keep detections private
* Geographic alert radius
* Nearby farmer detection
* Crop-aware alerts
* Disease severity
* Disease notifications
* Disease map
* Approximate location protection

AgriLink is designed so that the **exact location of the reporting farmer is not unnecessarily exposed**.

---

# 🌾 Farmer Management

Farmers have their own workspace for managing agricultural activities.

## Farmer Dashboard

* Crop statistics
* Product statistics
* Orders
* Disease detections
* Nearby disease alerts
* Notifications
* Recent activity

## Farmer Profile

* Personal information
* Profile image
* Farm information
* Location
* Main crops
* Farm size
* Farming information

## Crop Management

Farmers can:

* Add crops
* View crops
* View crop details
* Update crops
* Delete crops

---

# 🛒 Agricultural Marketplace

AgriLink provides a marketplace where farmers can offer agricultural products and buyers can discover and purchase them.

## Products

Each product can contain:

* Name
* Description
* Price
* Quantity
* Unit
* Category
* Images
* Farmer
* Location
* Availability

## Marketplace Features

* Product browsing
* Search
* Filtering
* Sorting
* Product details
* Farmer information
* Order creation

## Order Lifecycle

```text
PENDING
   │
   ├──────────────► REJECTED
   │
   ▼
ACCEPTED
   │
   ▼
PROCESSING
   │
   ▼
READY
   │
   ▼
COMPLETED
```

---

# 🗺️ Farmer Discovery

Farmers can discover other farmers through both list-based and map-based interfaces.

## List View

Farmer cards can display:

* Profile image
* Farmer name
* Location
* Main crops
* Rating
* Agricultural services

## Map View

Users can:

* Search farmers
* Filter by crop
* Filter by rating
* Filter by distance
* View farmer details
* Discover nearby agricultural activity

This geographic functionality also supports the disease-sharing system.

---

# 💬 Communication

AgriLink will provide direct communication between platform users.

Initial communication model:

```text
Buyer ↔ Farmer
```

Planned capabilities:

* Conversations
* Messages
* Read/unread state
* Message timestamps
* Notifications
* Real-time communication

Future versions may extend communication to:

```text
Farmer ↔ Farmer
Farmer ↔ Buyer
Farmer Groups
```

---

# 🛠️ Agricultural Services

Farmers can offer agricultural services through the platform.

Examples:

* Tractor rental
* Harvesting
* Irrigation
* Agricultural transportation
* Equipment rental
* Agricultural consulting

A service can contain:

* Title
* Description
* Category
* Price
* Location
* Availability
* Farmer

---

# 🌦️ Weather

AgriLink will provide location-aware weather information with an agricultural focus.

Potential information includes:

* Current temperature
* Humidity
* Rain probability
* Wind
* Forecast
* Agricultural recommendations

---

# 🔐 Authentication & Authorization

AgriLink uses role-based authentication and authorization.

## Roles

```text
USER
 │
 ├── FARMER
 │
 └── ADMIN
```

Authentication includes:

* Account registration
* Email/code verification
* Account activation
* Login
* JWT authentication
* Refresh tokens
* Logout
* Protected routes
* Role-based authorization
* Resource ownership validation

---

# 👨‍💼 Administration

Administrators will have access to a dedicated management platform.

```text
Admin Dashboard
│
├── Users
├── Farmers
├── Products
├── Orders
├── Disease Alerts
├── Reviews
├── Services
├── Reports
├── Contact Messages
├── Notifications
└── Audit Logs
```

---

# ⭐ Reviews

Reviews are connected to completed marketplace transactions.

```text
Order
  │
  ▼
COMPLETED
  │
  ▼
Buyer can submit review
  │
  ├── Rating
  └── Comment
```

This prevents arbitrary reviews and keeps the reputation system connected to actual marketplace transactions.

---

# 🏗️ System Architecture

AgriLink follows a service-oriented architecture.

```text
                         USERS
                           │
                           ▼
                    ┌─────────────┐
                    │    NGINX    │
                    │ Reverse     │
                    │ Proxy / TLS │
                    └──────┬──────┘
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
        FRONTEND       SPRING BOOT     FASTAPI
         Angular         Backend       AI Service
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
        PostgreSQL       Redis        Storage
             │
             ▼
      Application Data
             │
       ┌─────┴───────────────┐
       │                     │
       ▼                     ▼
  Farmer Data          Disease Data
                             │
                             ▼
                      Disease Alerts
                             │
                             ▼
                      Nearby Farmers
```

---

# 🧰 Technology Stack

## Frontend

* Angular
* TypeScript
* Responsive UI
* Map integration
* REST API integration

## Backend

* Java 17
* Spring Boot
* Spring Security
* REST API
* JWT
* PostgreSQL

## AI Service

* Python
* FastAPI
* TensorFlow
* Machine Learning / Deep Learning
* Image classification

## Infrastructure

* Linux
* Docker
* Docker Compose
* Ansible
* Nginx
* VirtualBox
* Local Virtual Machines

## CI/CD

* GitHub Actions
* Automated testing
* Docker image builds
* Security scanning
* Automated deployment

## Monitoring

* Prometheus
* Grafana
* Application metrics
* Infrastructure metrics

## Logging

* Centralized logging
* Application logs
* Infrastructure logs
* Security and audit logs

---

# 🐳 Deployment Architecture

AgriLink is designed to run on a self-hosted virtualized environment rather than depending on expensive cloud infrastructure.

```text
Physical Machine
       │
       ▼
   VirtualBox
       │
       ├── VM01 — AgriLink Application
       │      ├── Nginx
       │      ├── Angular
       │      ├── Spring Boot
       │      └── FastAPI
       │
       ├── VM02 — Data Services
       │      ├── PostgreSQL
       │      └── Redis
       │
       └── VM03 — Monitoring
              ├── Prometheus
              ├── Grafana
              └── Logging
```

The final number and distribution of VMs will depend on available hardware resources.

---

# ⚙️ DevOps Architecture

The infrastructure is intended to be reproducible and automated.

```text
                    GitHub
                       │
                       ▼
                GitHub Actions
                       │
              ┌────────┼────────┐
              ▼        ▼        ▼
            Test     Build    Security
              │        │        │
              └────────┼────────┘
                       ▼
                  Docker Images
                       │
                       ▼
                    Ansible
                       │
                       ▼
                 Local VMs
                       │
                       ▼
                    Nginx
                       │
                       ▼
                   AgriLink
```

---

# 📊 Monitoring & Observability

The production-style environment will include monitoring for both the application and infrastructure.

## Infrastructure Metrics

* CPU usage
* Memory usage
* Disk usage
* Network usage
* VM health
* Container health

## Application Metrics

* Request count
* Response time
* HTTP errors
* API availability
* AI service performance
* Database performance

## Visualization

```text
Services
   │
   ▼
Prometheus
   │
   ▼
Grafana
   │
   ├── Infrastructure Dashboard
   ├── Backend Dashboard
   ├── AI Dashboard
   └── Application Health
```

---

# 🛡️ Security

Security is a major component of AgriLink's architecture.

## Application Security

* Password hashing
* JWT security
* Role-based access control
* Input validation
* File upload validation
* CORS configuration
* Rate limiting
* Security headers
* Resource ownership checks

## Infrastructure Security

* HTTPS/TLS
* Firewall configuration
* Network segmentation
* SSH hardening
* Least-privilege principles
* Secrets management
* Container security

## DevSecOps

* Dependency scanning
* Secret scanning
* Static security analysis
* Container vulnerability scanning
* Security testing
* Audit logging

---

# 🧪 Testing Strategy

Testing will be integrated throughout the development lifecycle.

## Backend

* Unit tests
* Service tests
* Controller tests
* Repository tests
* Integration tests
* Security tests

## Frontend

* Component tests
* Form tests
* Authentication tests
* End-to-end tests

## AI

* API tests
* Image validation tests
* Prediction tests
* Model evaluation
* Error handling

## Infrastructure

* Docker health checks
* Deployment verification
* Ansible idempotency testing

---

# 📁 Project Structure

```text
AgriLink/
│
├── frontend/
├── backend/
├── ai-service/
│
├── infrastructure/
│   ├── docker/
│   ├── ansible/
│   ├── nginx/
│   ├── dns/
│   └── monitoring/
│
├── tests/
│
├── docs/
│   ├── architecture/
│   ├── api/
│   ├── database/
│   ├── ai/
│   ├── features/
│   ├── security/
│   ├── deployment/
│   ├── monitoring/
│   └── testing/
│
├── .github/
│   └── workflows/
│
├── docker-compose.yml
├── README.md
├── SECURITY.md
└── .gitignore
```

---

# 🚀 Development Roadmap

## Phase 0 — Foundation

* [ ] Define system architecture
* [ ] Design database
* [ ] Define project structure
* [ ] Define API structure
* [ ] Create documentation structure
* [ ] Define Git workflow

📄 [Architecture Documentation](docs/architecture/README.md)
📄 [Database Documentation](docs/database/README.md)

---

# Phase 1 — Finish Core Application & Authentication

## Authentication

* [x] Registration
* [x] Verification using code
* [x] Account activation
* [x] Location registration
* [x] Login
* [ ] Fix authentication issues
* [ ] JWT implementation/review
* [ ] Refresh tokens
* [ ] Role-based access control

## Farmer Application

* [ ] Farmer dashboard
* [ ] Farmer profile
* [ ] Profile image upload
* [ ] Crop CRUD
* [ ] Detection history interface
* [ ] Product CRUD
* [ ] Order management
* [ ] Notifications
* [ ] Settings

## Visitor / Normal User

* [ ] Home page
* [ ] Disease detection entry point
* [ ] Marketplace
* [ ] Product details
* [ ] Farmer list
* [ ] Farmer map
* [ ] Farmer details
* [ ] Contact

## Admin

* [ ] Admin dashboard
* [ ] User management
* [ ] Farmer management
* [ ] Product management
* [ ] Order management
* [ ] Reports
* [ ] Notifications
* [ ] Settings
* [ ] Admin profile

📄 [Application Architecture](docs/architecture/application.md)
📄 [Authentication Documentation](docs/security/authentication.md)
📄 [API Documentation](docs/api/README.md)

---

# Phase 2 — AI Disease Detection ⭐⭐⭐

This phase comes **before the DevOps phase** because AI disease detection is one of the fundamental capabilities of AgriLink.

## Detection

* [ ] Image upload
* [ ] Image preview
* [ ] Image validation
* [ ] Crop selection
* [ ] AI API
* [ ] Disease prediction
* [ ] Confidence score
* [ ] Disease information
* [ ] Symptoms
* [ ] Recommendations
* [ ] Detection result page
* [ ] Detection history
* [ ] Detection details
* [ ] Delete detection

## AI Service

* [ ] FastAPI service
* [ ] TensorFlow model
* [ ] Model inference pipeline
* [ ] Input preprocessing
* [ ] Output validation
* [ ] Error handling
* [ ] Model evaluation

📄 [AI Architecture](docs/ai/architecture.md)
📄 [AI Model Documentation](docs/ai/model.md)
📄 [Disease Detection Documentation](docs/ai/disease-detection.md)

---

# Phase 3 — Disease Sharing & Early Warning ⭐⭐⭐⭐⭐

This is the **core differentiating feature of AgriLink**.

## Disease Sharing

* [ ] Share detection
* [ ] Keep detection private
* [ ] Sharing permissions
* [ ] Disease severity
* [ ] Geographic sharing radius
* [ ] Privacy protection

## Nearby Farmers

* [ ] Find nearby farmers
* [ ] Geographic filtering
* [ ] Crop filtering
* [ ] Distance filtering
* [ ] Disease-aware filtering

## Alerts

* [ ] Disease alert generation
* [ ] Nearby farmer notifications
* [ ] Disease alert history
* [ ] Disease alert map
* [ ] Crop-specific alerts
* [ ] Alert severity

📄 [Disease Sharing Architecture](docs/ai/disease-sharing.md)
📄 [Early Warning System](docs/ai/early-warning-system.md)
📄 [Location & Privacy](docs/security/location-privacy.md)

---

# Phase 4 — Farmer Network

* [ ] Farmer list
* [ ] Farmer cards
* [ ] Farmer details
* [ ] Interactive farmer map
* [ ] Nearby farmers
* [ ] Search
* [ ] Filters
* [ ] Farmer crops
* [ ] Farmer services
* [ ] Farmer ratings

📄 [Farmer Network Documentation](docs/features/farmer-network.md)

---

# Phase 5 — Marketplace

## Products

* [ ] Product creation
* [ ] Product details
* [ ] Product update
* [ ] Product deletion
* [ ] Product search
* [ ] Product filtering
* [ ] Product categories
* [ ] Product images

## Orders

* [ ] Create order
* [ ] View orders
* [ ] Order details
* [ ] Accept order
* [ ] Reject order
* [ ] Update order status
* [ ] Complete order

## Reviews

* [ ] Review completed orders
* [ ] Rating
* [ ] Comment
* [ ] Farmer rating calculation
* [ ] Review moderation

📄 [Marketplace Documentation](docs/features/marketplace.md)
📄 [Order Management](docs/features/orders.md)
📄 [Reviews Documentation](docs/features/reviews.md)

---

# Phase 6 — Communication & Agricultural Services

## Communication

* [ ] Buyer ↔ Farmer chat
* [ ] Farmer ↔ Farmer chat
* [ ] Conversation list
* [ ] Message history
* [ ] Read/unread status
* [ ] Notifications
* [ ] Real-time messaging

## Agricultural Services

* [ ] Service creation
* [ ] Service listing
* [ ] Service details
* [ ] Service categories
* [ ] Search
* [ ] Filters
* [ ] Farmer service management

📄 [Communication Documentation](docs/features/communication.md)
📄 [Agricultural Services](docs/features/agricultural-services.md)

---

# Phase 7 — Weather & Additional Services

## Weather

* [ ] Current weather
* [ ] Forecast
* [ ] Humidity
* [ ] Rain probability
* [ ] Wind
* [ ] Location-aware weather
* [ ] Agricultural recommendations

## Contact

* [ ] Contact form
* [ ] Admin contact management
* [ ] Contact notifications

📄 [Weather Documentation](docs/features/weather.md)
📄 [Contact System](docs/features/contact.md)

---

# Phase 8 — Administration

* [ ] Admin dashboard
* [ ] User management
* [ ] Farmer management
* [ ] Product management
* [ ] Order management
* [ ] Disease alert management
* [ ] Reports
* [ ] Review moderation
* [ ] Service management
* [ ] Contact management
* [ ] Notifications
* [ ] Audit logs

📄 [Admin Documentation](docs/features/admin.md)
📄 [Audit Logging](docs/security/audit-logging.md)

---

# Phase 9 — Testing & Quality

## Backend

* [ ] Unit tests
* [ ] Service tests
* [ ] Controller tests
* [ ] Repository tests
* [ ] Integration tests
* [ ] Security tests

## Frontend

* [ ] Component tests
* [ ] Form tests
* [ ] Authentication tests
* [ ] E2E tests

## AI

* [ ] API tests
* [ ] Image validation tests
* [ ] Prediction tests
* [ ] Model evaluation
* [ ] Error handling

## Infrastructure

* [ ] Docker health checks
* [ ] Deployment verification
* [ ] Ansible idempotency tests

📄 [Testing Strategy](docs/testing/README.md)

---

# Phase 10 — DevOps & Infrastructure

## Containerization

* [ ] Dockerfiles
* [ ] Frontend container
* [ ] Backend container
* [ ] AI container
* [ ] Nginx container
* [ ] Docker Compose
* [ ] Health checks
* [ ] Container networking
* [ ] Volumes

## Local Infrastructure

* [ ] VirtualBox VMs
* [ ] Linux server configuration
* [ ] Network configuration
* [ ] DNS
* [ ] `AgriLink.local`
* [ ] Firewall

## Automation

* [ ] Ansible inventory
* [ ] Ansible roles
* [ ] Docker installation
* [ ] Application deployment
* [ ] Nginx configuration
* [ ] DNS configuration
* [ ] Automated provisioning

📄 [Docker Documentation](docs/deployment/docker.md)
📄 [Ansible Documentation](docs/deployment/ansible.md)
📄 [Local Infrastructure](docs/deployment/infrastructure.md)
📄 [DNS Documentation](docs/deployment/dns.md)
📄 [Nginx Documentation](docs/deployment/nginx.md)

---

# Phase 11 — CI/CD

* [ ] CI pipeline
* [ ] Frontend testing
* [ ] Backend testing
* [ ] AI testing
* [ ] Docker builds
* [ ] Security scanning
* [ ] Deployment automation
* [ ] Deployment verification

```text
Git Push
   ↓
GitHub Actions
   ↓
Lint → Test → Security Scan
   ↓
Docker Build
   ↓
Deploy
   ↓
Health Check
```

📄 [CI/CD Documentation](docs/deployment/ci-cd.md)

---

# Phase 12 — Monitoring & Logging

## Monitoring

* [ ] Prometheus
* [ ] Node metrics
* [ ] Container metrics
* [ ] Backend metrics
* [ ] AI metrics
* [ ] Database metrics
* [ ] Application health

## Visualization

* [ ] Grafana
* [ ] Infrastructure dashboard
* [ ] Backend dashboard
* [ ] AI dashboard
* [ ] Application dashboard

## Logging

* [ ] Application logs
* [ ] Nginx logs
* [ ] Container logs
* [ ] Security logs
* [ ] Audit logs
* [ ] Centralized logging

📄 [Monitoring Documentation](docs/monitoring/README.md)
📄 [Prometheus Documentation](docs/monitoring/prometheus.md)
📄 [Grafana Documentation](docs/monitoring/grafana.md)
📄 [Logging Documentation](docs/monitoring/logging.md)

---

# Phase 13 — Security & DevSecOps

## Application Security

* [ ] Authentication hardening
* [ ] Authorization review
* [ ] Input validation
* [ ] File upload security
* [ ] API security
* [ ] Rate limiting
* [ ] Security headers

## Infrastructure Security

* [ ] HTTPS/TLS
* [ ] Firewall
* [ ] Network segmentation
* [ ] SSH hardening
* [ ] Secrets management
* [ ] Container security
* [ ] Least privilege

## DevSecOps

* [ ] Dependency scanning
* [ ] Secret scanning
* [ ] SAST
* [ ] Container vulnerability scanning
* [ ] Security testing
* [ ] Audit logging
* [ ] Threat modeling
* [ ] OWASP review

📄 [Security Documentation](docs/security/README.md)
📄 [Threat Model](docs/security/threat-model.md)
📄 [OWASP Security Review](docs/security/owasp-review.md)
📄 [Secrets Management](docs/security/secrets.md)

---

# 🧭 Development Philosophy

Each major feature should follow:

```text
Design
  ↓
Implementation
  ↓
Testing
  ↓
Security Review
  ↓
Documentation
  ↓
Git Commit
```

Documentation should be created alongside implementation rather than being postponed until the end of the project.

---

# 📚 Documentation

## 🏗️ Architecture

* [System Architecture](docs/architecture/README.md)
* [Application Architecture](docs/architecture/application.md)
* [Database Architecture](docs/database/README.md)

## 🔌 API

* [API Documentation](docs/api/README.md)
* [API Endpoints](docs/api/endpoints.md)

## 🤖 AI

* [AI Architecture](docs/ai/architecture.md)
* [AI Model](docs/ai/model.md)
* [Disease Detection](docs/ai/disease-detection.md)
* [Disease Sharing](docs/ai/disease-sharing.md)
* [Early Warning System](docs/ai/early-warning-system.md)

## 🔐 Security

* [Security Documentation](docs/security/README.md)
* [Authentication](docs/security/authentication.md)
* [Location & Privacy](docs/security/location-privacy.md)
* [Threat Model](docs/security/threat-model.md)
* [OWASP Review](docs/security/owasp-review.md)
* [Secrets Management](docs/security/secrets.md)
* [Audit Logging](docs/security/audit-logging.md)

## 🚀 Deployment

* [Deployment Guide](docs/deployment/README.md)
* [Docker](docs/deployment/docker.md)
* [Ansible](docs/deployment/ansible.md)
* [Infrastructure](docs/deployment/infrastructure.md)
* [Nginx](docs/deployment/nginx.md)
* [DNS](docs/deployment/dns.md)
* [CI/CD](docs/deployment/ci-cd.md)

## 📊 Monitoring

* [Monitoring](docs/monitoring/README.md)
* [Prometheus](docs/monitoring/prometheus.md)
* [Grafana](docs/monitoring/grafana.md)
* [Logging](docs/monitoring/logging.md)

## 🧪 Testing

* [Testing Strategy](docs/testing/README.md)
* [Backend Testing](docs/testing/backend.md)
* [Frontend Testing](docs/testing/frontend.md)
* [AI Testing](docs/testing/ai.md)

## 🌾 Features

* [Farmer Network](docs/features/farmer-network.md)
* [Marketplace](docs/features/marketplace.md)
* [Orders](docs/features/orders.md)
* [Reviews](docs/features/reviews.md)
* [Communication](docs/features/communication.md)
* [Agricultural Services](docs/features/agricultural-services.md)
* [Weather](docs/features/weather.md)
* [Contact](docs/features/contact.md)
* [Administration](docs/features/admin.md)

---

# 🎓 Portfolio Objectives

AgriLink is designed as a full-stack engineering, AI, cybersecurity, DevOps, and infrastructure project demonstrating experience across:

```text
                    AGRILINK
                       │
       ┌───────────────┼────────────────┐
       │               │                │
       ▼               ▼                ▼
   Software          Artificial       DevOps
   Engineering      Intelligence
       │               │                │
       ├── Angular     ├── Python       ├── Docker
       ├── Spring      ├── FastAPI      ├── Ansible
       ├── REST API    ├── TensorFlow   ├── CI/CD
       └── PostgreSQL  └── ML           └── Linux
                       │
       ┌───────────────┼────────────────┐
       ▼               ▼                ▼
   Networking       Security        Observability
       │               │                │
       ├── DNS         ├── HTTPS        ├── Prometheus
       ├── Nginx       ├── RBAC         ├── Grafana
       └── VMs         ├── Auditing     └── Logging
                       └── DevSecOps
```

The objective is not simply to create a web application, but to demonstrate the ability to:

* Design a complete software system
* Develop a modern full-stack application
* Integrate artificial intelligence
* Build an AI-powered agricultural workflow
* Design location-aware features
* Implement secure authentication and authorization
* Containerize applications
* Automate infrastructure
* Build CI/CD pipelines
* Monitor applications and infrastructure
* Implement security and DevSecOps practices
* Document a production-style system

---

# 🌱 Future Vision

Potential future improvements include:

* Disease outbreak heatmaps
* Advanced disease prediction
* Historical disease analysis
* Crop-specific risk prediction
* Weather-based disease risk prediction
* IoT sensor integration
* Soil monitoring
* Smart irrigation
* Advanced agricultural recommendations
* Mobile application
* Regional disease trend analysis

---

# 📌 Project Status

**🚧 Active Development**

AgriLink is currently under active development.

Features listed in the roadmap are implemented progressively and may not all be available in the current version.

---

# 👨‍💻 Author

**Wael Balhoudi**

AgriLink is developed as a portfolio project combining:

* Full-Stack Development
* Artificial Intelligence
* Cybersecurity
* DevOps
* Cloud & Infrastructure Concepts
* System Administration
* Networking

---

# ⭐ Vision

> **AgriLink connects farmers, intelligence, and information to help protect crops before problems become outbreaks.**

### Detect. Share. Warn. Protect.
