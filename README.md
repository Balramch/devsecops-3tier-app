# Hardened Three-Tier CRUD Application (Security-First Architecture)

A production-grade full-stack CRUD system designed with **defense-in-depth principles** and **strict network segmentation (DMZ architecture)**. Built to simulate real-world enterprise deployment patterns where compromise isolation and attack surface minimization are primary objectives.

---

## 🏗️ Architecture Overview: Zero-Trust Network Segmentation

This system enforces a **strictly isolated three-tier DMZ model**, ensuring that no layer has unnecessary visibility into another.

### 🌐 Public Layer (Nginx Reverse Proxy)

- Sole public-facing entry point (Port 80 only)
- Fully isolated on `frontend-network`
- Enforces:
    - HTTP method restriction
    - Disabled version exposure (`server_tokens off`)
    - Reverse proxy rules with minimal attack surface
- No direct access to backend or database layers

---

### 🔁 Application Bridge Layer (Next.js)

- Acts as a **controlled API gateway**
- Dual-network interface:
    - Public-facing communication via Nginx
    - Private backend communication via internal Docker network
- Implements:
    - API request proxying
    - Backend abstraction (hides Node.js service from exposure surface)

---

### 🔐 Private Layer (Node.js + MySQL)

- Fully isolated on `backend-network`
- No public exposure (zero published ports)
- Direct access restricted to application layer only
- Database completely hidden from external access paths

---

## 🛡️ Security Engineering & Hardening Pipeline

This project was systematically hardened using industry-standard DevSecOps tooling.

---

### 1. 🔎 Secret Detection — TruffleHog

**Issue Identified:**

- Risk of leaked credentials in source control and commit history

**Remediation:**

- Enforced `.env` based configuration strategy
- Sanitized repository history using `git-filter-repo`

**Result:**  
✔ Zero secrets detected across repository lifecycle

---

### 2. 🐳 Container Vulnerability Analysis — Trivy

**Issue Identified:**

- Critical CVEs in legacy Debian-based base images

**Remediation:**

- Migrated to minimal Alpine-based images:
    - `node:20-alpine`
    - `nginx:alpine`
- Patched OpenSSL and dependency vulnerabilities (including CVE-2024-6119 class issues)

**Result:**  
✔ Significant reduction in CVE exposure  
✔ No critical vulnerabilities in final scan baseline

---

### 3. 📐 Docker Security Linting — Hadolint

**Issue Identified:**

- Containers running as root
- Non-optimized Docker layering
- Build artifacts leaking into runtime images

**Remediation:**

- Implemented multi-stage Docker builds
- Enforced non-root runtime execution
- Used Next.js `standalone` output for minimal production footprint

**Result:**  
✔ Hardened, minimal, production-ready container images

---

## 🧰 Tech Stack & Security Tooling

|Tool|Purpose|
|---|---|
|**TruffleHog**|Secret detection in code & Git history|
|**Trivy**|Container image CVE scanning|
|**Hadolint**|Dockerfile security linting|
|**Nginx**|Hardened reverse proxy layer|
|**Next.js**|API proxy layer with backend abstraction|
|**Node.js**|Private API service|
|**MySQL**|Isolated database layer|

---

## 🚦 Deployment Guide

### Prerequisites

- Docker
- Docker Compose
- (Optional) Trivy for local scanning validation

### 🚀 Run the Stack

git clone https://github.com/Balramch/devsecops-3tier-app.git &&
cd devsecops-3tier-app/infrra  
docker compose up -d --build

---

### 🔍 Validate Network Isolation

docker exec -it nginx-proxy curl http://backend:5001/health

Expected result:

curl: (6) Could not resolve host: backend

✔ Confirms backend is fully unreachable from public layer

---
## Run the tools
trivy image nginx:alpine

trufflehog filesystem .


## 🔒 Security Hardening Checklist

✔ No exposed backend/database ports  
✔ Strict Docker network segmentation (DMZ model)  
✔ Minimal Alpine-based base images  
✔ Rootless container execution  
✔ Clean Git history (no leaked secrets)  
✔ Reverse proxy hardening via Nginx  
✔ Backend abstraction via API gateway layer  
✔ Reduced container attack surface (multi-stage builds)

---

## 👤 Author

**Balram Chaudhary**  
Bug Hunter|CTF player | DevSecOps & Application Security Enthusiast

