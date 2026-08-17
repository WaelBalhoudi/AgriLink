# 🌱 AgriLink

### Smart Agriculture Platform for AI-Powered Crop Disease Detection, Farmer Collaboration & Agricultural Commerce

AgriLink is a smart agriculture platform designed to help farmers
**detect crop diseases using artificial intelligence, share disease
detections with nearby farmers, receive early warnings, and participate
in a connected agricultural marketplace.**

The core idea is:

> **Detect → Share → Warn → Protect**

A farmer can upload an image of a potentially diseased crop. AgriLink
uses an AI-powered detection service to analyze the image and identify
the suspected disease. The farmer can then choose to share the detection
with farmers in the surrounding area, allowing AgriLink to generate
localized disease alerts and help other farmers take preventive action.

Alongside disease detection, AgriLink provides a marketplace, farmer
discovery, agricultural services, communication, weather information,
and administrative management.

------------------------------------------------------------------------

## 🎯 Project Vision

Agricultural diseases can spread rapidly while farmers may have limited
access to early information about outbreaks in their surrounding areas.

AgriLink aims to create a **connected agricultural ecosystem** where
farmers can:

-   🔬 Detect crop diseases using AI
-   📢 Share disease detections with nearby farmers
-   📍 Receive localized disease alerts
-   🗺️ Discover farmers and agricultural activity around them
-   🌾 Manage crops
-   🛒 Buy and sell agricultural products
-   🤝 Communicate with farmers and buyers
-   🌦️ Access weather information and agricultural recommendations
-   🛠️ Discover and offer agricultural services

The long-term objective is to transform individual disease detection
into a **community-based agricultural early-warning system**.

------------------------------------------------------------------------

# 🚨 Core Concept

The most important workflow in AgriLink is the disease detection and
sharing system.

``` text
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

------------------------------------------------------------------------

# ✨ Key Features

## 🤖 AI Plant Disease Detection

Farmers can submit crop images for AI-powered analysis.

### Detection workflow

``` text
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

-   Image upload and preview
-   Image validation
-   Crop selection
-   AI inference
-   Disease classification
-   Confidence score
-   Disease information
-   Recommended actions
-   Detection history

------------------------------------------------------------------------

## 📢 Disease Sharing & Early Warning

This is the **core social/agricultural feature** of AgriLink.

After receiving a detection result, a farmer can choose whether to share
it with nearby farmers.

``` text
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
```

Features include:

-   Share or keep detections private
-   Geographic alert radius
-   Nearby farmer detection
-   Crop-aware alerts
-   Disease severity
-   Disease notifications
-   Disease map
-   Approximate location protection

AgriLink is designed so that the **exact location of the reporting
farmer is not unnecessarily exposed**.

------------------------------------------------------------------------

# 🌾 Farmer Management

Farmers have their own workspace for managing agricultural activities.

### Farmer Dashboard

-   Crop statistics
-   Product statistics
-   Orders
-   Disease detections
-   Nearby disease alerts
-   Notifications
-   Recent activity

### Farmer Profile

-   Personal information
-   Profile image
-   Farm information
-   Location
-   Main crops
-   Farm size
-   Farming information

### Crop Management

Farmers can:

-   Add crops
-   View crops
-   View crop details
-   Update crops
-   Delete crops

Crop information can include:

-   Crop name
-   Variety
-   Planting date
-   Expected harvest date
-   Cultivation area
-   Status
-   Images

------------------------------------------------------------------------

# 🛒 Agricultural Marketplace

AgriLink provides a marketplace where farmers can offer agricultural
products and buyers can discover and purchase them.

### Products

Each product can contain:

-   Name
-   Description
-   Price
-   Quantity
-   Unit
-   Category
-   Images
-   Farmer
-   Location
-   Availability

### Marketplace Features

-   Product browsing
-   Search
-   Filtering
-   Sorting
-   Product details
-   Farmer information
-   Order creation

### Order Lifecycle

``` text
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

------------------------------------------------------------------------

# 🗺️ Farmer Discovery

Farmers can discover other farmers through both list and map-based
interfaces.

### List View

Farmer cards can display:

-   Profile image
-   Farmer name
-   Location
-   Main crops
-   Rating
-   Agricultural services

### Map View

Users can:

-   Search farmers
-   Filter by crop
-   Filter by rating
-   Filter by distance
-   View farmer details
-   Discover nearby agricultural activity

This geographic functionality also supports the disease-sharing system.

------------------------------------------------------------------------

# 💬 Communication

AgriLink will provide direct communication between platform users.

Initial communication model:

``` text
Buyer ↔ Farmer
```

Planned capabilities:

-   Conversations
-   Messages
-   Read/unread state
-   Message timestamps
-   Notifications
-   Real-time communication

Future versions may extend communication to farmer-to-farmer and group
conversations.

------------------------------------------------------------------------

# 🛠️ Agricultural Services

Farmers can offer agricultural services through the platform.

Examples:

-   Tractor rental
-   Harvesting
-   Irrigation
-   Agricultural transportation
-   Equipment rental
-   Agricultural consulting

A service can contain:

-   Title
-   Description
-   Category
-   Price
-   Location
-   Availability
-   Farmer

------------------------------------------------------------------------

# 🌦️ Weather

AgriLink will provide location-aware weather information with an
agricultural focus.

Potential information includes:

-   Current temperature
-   Humidity
-   Rain probability
-   Wind
-   Forecast
-   Agricultural recommendations

The objective is not simply to display weather data, but to connect
environmental conditions with agricultural decision-making.

------------------------------------------------------------------------

# 🔐 Authentication & Authorization

AgriLink uses role-based authentication and authorization.

### Roles

``` text
USER
 │
 ├── FARMER
 │
 └── ADMIN
```

Authentication includes:

-   Account registration
-   Email/code verification
-   Account activation
-   Login
-   JWT authentication
-   Refresh tokens
-   Logout
-   Protected routes
-   Role-based authorization
-   Resource ownership validation

------------------------------------------------------------------------

# 👨‍💼 Administration

Administrators will have access to a dedicated management platform.

``` text
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

Administrators will be able to monitor platform activity, manage users,
moderate content, investigate reports, and review important system
events.

------------------------------------------------------------------------

# ⭐ Reviews

Reviews are connected to completed transactions.

``` text
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

This prevents arbitrary reviews and keeps the reputation system
connected to actual marketplace transactions.

------------------------------------------------------------------------

# 🏗️ System Architecture

AgriLink follows a service-oriented architecture.

``` text
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
        React/Next.js    Backend       AI Service
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

------------------------------------------------------------------------

# 🧰 Technology Stack

## Frontend

-   React / Next.js
-   JavaScript / TypeScript
-   Responsive UI
-   Map integration
-   REST API integration

## Backend

-   Java
-   Spring Boot
-   Spring Security
-   REST API
-   JWT
-   PostgreSQL

## AI Service

-   Python
-   FastAPI
-   TensorFlow
-   Machine Learning / Deep Learning
-   Image classification

## Infrastructure

-   Linux
-   Docker
-   Docker Compose
-   Ansible
-   Nginx
-   VirtualBox
-   Local Virtual Machines

## CI/CD

-   GitHub Actions
-   Automated testing
-   Docker image builds
-   Security scanning
-   Automated deployment

## Monitoring

-   Prometheus
-   Grafana
-   Application metrics
-   Infrastructure metrics

## Logging

-   Centralized logging
-   Application logs
-   Infrastructure logs
-   Security and audit logs

------------------------------------------------------------------------

# 🐳 Deployment Architecture

AgriLink is designed to run on a self-hosted virtualized environment
rather than depending on expensive cloud infrastructure.

``` text
Physical Machine
       │
       ▼
   VirtualBox
       │
       ├── VM01 — AgriLink Application
       │      ├── Nginx
       │      ├── Frontend
       │      ├── Backend
       │      └── AI Service
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

The final number of VMs will depend on available hardware resources.

------------------------------------------------------------------------

# ⚙️ DevOps Architecture

The infrastructure is intended to be reproducible and automated.

``` text
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

------------------------------------------------------------------------

# 📊 Monitoring & Observability

The production-style environment will include monitoring for both the
application and infrastructure.

### Infrastructure Metrics

-   CPU usage
-   Memory usage
-   Disk usage
-   Network usage
-   VM health
-   Container health

### Application Metrics

-   Request count
-   Response time
-   HTTP errors
-   API availability
-   AI service performance
-   Database performance

### Visualization

``` text
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

------------------------------------------------------------------------

# 🛡️ Security

Security is a major component of AgriLink's architecture.

### Application Security

-   Password hashing
-   JWT security
-   Role-based access control
-   Input validation
-   File upload validation
-   CORS configuration
-   Rate limiting
-   Security headers
-   Resource ownership checks

### Infrastructure Security

-   HTTPS/TLS
-   Firewall configuration
-   Network segmentation
-   SSH hardening
-   Least-privilege principles
-   Secrets management
-   Container security

### DevSecOps

-   Dependency scanning
-   Secret scanning
-   Static security analysis
-   Container vulnerability scanning
-   Security testing
-   Audit logging

------------------------------------------------------------------------

# 🧪 Testing Strategy

Testing will be integrated throughout the development lifecycle.

## Backend

-   Unit tests
-   Service tests
-   Controller tests
-   Repository tests
-   Integration tests
-   Security tests

## Frontend

-   Component tests
-   Form tests
-   Authentication tests
-   End-to-end tests

## AI

-   API tests
-   Image validation tests
-   Prediction tests
-   Model evaluation
-   Error handling

## Infrastructure

-   Docker health checks
-   Deployment verification
-   Ansible idempotency testing

------------------------------------------------------------------------

# 📁 Project Structure

``` text
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
│   ├── ai/
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

------------------------------------------------------------------------

# 🚀 Development Roadmap

## Phase 0 --- Foundation

-   [ ] Architecture
-   [ ] Database design
-   [ ] Project structure
-   [ ] API structure
-   [ ] Documentation foundation

## Phase 1 --- Authentication

-   [x] Registration
-   [x] Verification
-   [x] Account activation
-   [x] Location registration
-   [x] Login
-   [ ] Fix authentication issues
-   [ ] JWT
-   [ ] Refresh tokens
-   [ ] RBAC

## Phase 2 --- AI Disease Detection ⭐

-   [ ] Image upload
-   [ ] Image preview
-   [ ] Crop selection
-   [ ] AI API
-   [ ] Disease prediction
-   [ ] Confidence score
-   [ ] Recommendations
-   [ ] Detection history

## Phase 3 --- Disease Sharing & Early Warning ⭐⭐⭐

-   [ ] Share detection
-   [ ] Privacy controls
-   [ ] Geographic radius
-   [ ] Nearby farmers
-   [ ] Disease alerts
-   [ ] Disease map
-   [ ] Crop-aware alerts
-   [ ] Notifications

## Phase 4 --- Farmer Management

-   [ ] Dashboard
-   [ ] Profile
-   [ ] Profile image
-   [ ] Crops CRUD
-   [ ] Settings

## Phase 5 --- Marketplace

-   [ ] Products
-   [ ] Search
-   [ ] Filters
-   [ ] Product details
-   [ ] Orders
-   [ ] Order lifecycle
-   [ ] Reviews

## Phase 6 --- Farmer Discovery

-   [ ] Farmer list
-   [ ] Farmer details
-   [ ] Farmer map
-   [ ] Nearby farmers
-   [ ] Search
-   [ ] Filters

## Phase 7 --- Communication & Services

-   [ ] Chat
-   [ ] Agricultural services
-   [ ] Service marketplace
-   [ ] Weather
-   [ ] Contact

## Phase 8 --- Admin

-   [ ] Dashboard
-   [ ] Users
-   [ ] Farmers
-   [ ] Products
-   [ ] Orders
-   [ ] Disease alerts
-   [ ] Reports
-   [ ] Reviews
-   [ ] Services
-   [ ] Audit logs

## Phase 9 --- Testing & Quality

-   [ ] Unit tests
-   [ ] Integration tests
-   [ ] E2E tests
-   [ ] AI tests
-   [ ] Security tests
-   [ ] Code quality

## Phase 10 --- DevOps

-   [ ] Docker
-   [ ] Docker Compose
-   [ ] Local VMs
-   [ ] Ansible
-   [ ] Nginx
-   [ ] DNS
-   [ ] HTTPS
-   [ ] GitHub Actions
-   [ ] Automated deployment

## Phase 11 --- Observability

-   [ ] Prometheus
-   [ ] Grafana
-   [ ] Application metrics
-   [ ] Infrastructure monitoring
-   [ ] Centralized logging
-   [ ] Alerts

## Phase 12 --- Security & Documentation

-   [ ] Threat model
-   [ ] OWASP review
-   [ ] Dependency scanning
-   [ ] Container scanning
-   [ ] Secrets management
-   [ ] Firewall
-   [ ] Network segmentation
-   [ ] Audit
-   [ ] Complete documentation

------------------------------------------------------------------------

# 🧭 Development Philosophy

Each major feature should follow:

``` text
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

Infrastructure will be progressively automated rather than added only at
the end of development.

------------------------------------------------------------------------

# 📚 Documentation

Detailed documentation will be maintained under `/docs`.

Planned documentation:

-   System Architecture
-   Database Architecture
-   API Documentation
-   AI Model Documentation
-   Disease Detection Architecture
-   Disease Alert Architecture
-   Security Documentation
-   Docker Documentation
-   Ansible Documentation
-   CI/CD Documentation
-   Deployment Guide
-   Monitoring Guide
-   Testing Strategy

------------------------------------------------------------------------

# 🎓 Portfolio Objectives

AgriLink is designed as a full-stack engineering, AI, cybersecurity, and
DevOps project demonstrating experience across:

``` text
                    AGRILINK
                       │
       ┌───────────────┼────────────────┐
       │               │                │
       ▼               ▼                ▼
   Software          Artificial       DevOps
   Engineering      Intelligence
       │               │                │
       ├── React       ├── Python       ├── Docker
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

The objective is not simply to create a web application, but to
demonstrate the ability to **design, develop, secure, test, deploy,
automate, and monitor a complete software system.**

------------------------------------------------------------------------

# 🌱 Future Vision

Potential future improvements include:

-   Disease outbreak heatmaps
-   Advanced disease prediction
-   Historical disease analysis
-   Crop-specific risk prediction
-   Weather-based disease risk prediction
-   IoT sensor integration
-   Soil monitoring
-   Smart irrigation
-   Advanced agricultural recommendations
-   Mobile application
-   Regional disease trend analysis

------------------------------------------------------------------------

# 📌 Project Status

**🚧 Active Development**

AgriLink is currently under active development. Features listed in the
roadmap are implemented progressively and may not all be available in
the current version.

------------------------------------------------------------------------

# 👨‍💻 Author

**Wael Balhoudi**

AgriLink is developed as a portfolio project combining:

-   Full-Stack Development
-   Artificial Intelligence
-   Cybersecurity
-   DevOps
-   Cloud & Infrastructure Concepts
-   System Administration
-   Networking

------------------------------------------------------------------------

# ⭐ Vision

> **AgriLink connects farmers, intelligence, and information to help
> protect crops before problems become outbreaks.**

### Detect. Share. Warn. Protect.
