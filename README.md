<div align="center">

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

**Detect. Share. Warn. Protect.**

<img src="docs/images/agrilink-banner.png" alt="AgriLink - Smart Agriculture Platform" width="100%">

</div>

---

## 📖 Table of Contents

- [🎯 Project Vision](#-project-vision)
- [🚨 Core Concept](#-core-concept)
- [✨ Key Features](#-key-features)
  - [🤖 AI Plant Disease Detection](#-ai-plant-disease-detection)
  - [📢 Disease Sharing & Early Warning](#-disease-sharing--early-warning)
  - [🌾 Farmer Management](#-farmer-management)
  - [🛒 Agricultural Marketplace](#-agricultural-marketplace)
  - [🗺️ Farmer Discovery](#️-farmer-discovery)
  - [💬 Communication](#-communication)
  - [🛠️ Agricultural Services](#️-agricultural-services)
  - [🌦️ Weather](#️-weather)
  - [🔐 Authentication & Authorization](#-authentication--authorization)
  - [👨‍💼 Administration](#-administration)
  - [⭐ Reviews](#-reviews)
- [🏗️ System Architecture](#️-system-architecture)
- [🧰 Technology Stack](#-technology-stack)
- [🐳 Deployment Architecture](#-deployment-architecture)
- [⚙️ DevOps Architecture](#️-devops-architecture)
- [📊 Monitoring & Observability](#-monitoring--observability)
- [🛡️ Security](#️-security)
- [🧪 Testing Strategy](#-testing-strategy)
- [📁 Project Structure](#-project-structure)
- [🚀 Development Roadmap](#-development-roadmap)
- [🧭 Development Philosophy](#-development-philosophy)
- [📚 Documentation](#-documentation)
- [🎓 Portfolio Objectives](#-portfolio-objectives)
- [🌱 Future Vision](#-future-vision)
- [📌 Project Status](#-project-status)
- [👨‍💻 Author](#-author)

---

# 🎯 Project Vision

Agricultural diseases can spread rapidly while farmers may have limited
access to early information about outbreaks in their surrounding areas.

AgriLink aims to create a **connected agricultural ecosystem** where
farmers can:

- 🔬 Detect crop diseases using AI
- 📢 Share disease detections with nearby farmers
- 📍 Receive localized disease alerts
- 🗺️ Discover farmers and agricultural activity around them
- 🌾 Manage crops
- 🛒 Buy and sell agricultural products
- 🤝 Communicate with farmers and buyers
- 🌦️ Access weather information and agricultural recommendations
- 🛠️ Discover and offer agricultural services

The long-term objective is to transform individual disease detection
into a **community-based agricultural early-warning system**.

---

# 🚨 Core Concept

The most important workflow in AgriLink is the disease detection and
sharing system.

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
