# CraftsfromRoots 

A fair-trade digital marketplace that connects **tribal and rural artists directly with global buyers**, eliminating middlemen while preserving authenticity, culture, and fair pricing.

---

##  Project Goal

To build a working online platform that enables tribal and rural artists to:

* Sell their artwork directly to buyers worldwide
* Receive fair compensation for their craft
* Preserve cultural authenticity through verified artist profiles

And enables buyers to:

* Discover authentic handmade art
* Purchase directly from the creator
* Learn the story and roots behind each artwork

---

## 4-Week Development Roadmap

### Week 1 – Planning & Foundation

**Focus:** Understanding requirements and setting a strong base.

**Activities:**

* Identify needs of artists and buyers
* Finalize MVP features
* Create GitHub repository and project structure
* Design wireframes and database schema
* Decide artwork categories
* Distribute tasks among team members

**Outcome:**
A fully initialized project with a clear technical and design plan.

---

###  Week 2 – Core Development

**Focus:** Building the core system.

**Activities:**

* User authentication (signup & login)
* Artist profile creation
* Backend APIs for artwork management
* Frontend pages (landing page, dashboards, forms)
* Upload sample artworks for testing

**Outcome:**
Artists can register and list artworks on the platform.

---

###  Week 3 – Integration & Testing

**Focus:** Connecting components and ensuring reliability.

**Activities:**

* Frontend–backend API integration
* Validation and error handling
* API testing using Bruno/Postman
* CI/CD pipeline setup
* Deployment environment preparation

**Outcome:**
Smooth user flow from login to artwork browsing.

---

###  Week 4 – Finalization & Deployment

**Focus:** Polishing and releasing the MVP.

**Activities:**

* Freeze MVP features
* Fix remaining bugs
* Improve UI and performance
* End-to-end testing
* Write documentation (README & API docs)
* Deploy frontend and backend

**Outcome:**
A demo-ready marketplace live on the internet.

---

##  Measures of Success

By the end of 4 weeks:

* Verified artist accounts are active
* Artworks are uploaded and browsable
* Buyers can place orders directly
* Application is securely deployed
* All planned MVP features are completed

---

##  Technical Insight

###  How does choosing between static, dynamic, and hybrid rendering affect performance, scalability, and data freshness in a Next.js application?

Next.js provides **three rendering strategies**, each with trade-offs:

####  Static Rendering (SSG – Static Site Generation)

* Pages are generated at build time
* Extremely fast load times (served via CDN)
* Highly scalable with minimal server cost
* Data does **not update** unless the site is rebuilt

**Best for:**

* Landing pages
* About pages
* Static content like platform vision

---

####  Dynamic Rendering (SSR – Server-Side Rendering)

* Pages are generated on every request
* Always shows the **latest data**
* Slower than static pages
* Higher server load, less scalable

**Best for:**

* User dashboards
* Order history
* Personalized content

---

####  Hybrid Rendering (SSG + SSR + ISR)

* Combines static and dynamic approaches
* Uses **Incremental Static Regeneration (ISR)** to update data periodically
* Balances performance and freshness
* More flexible and scalable

**Best for:**

* Artwork listings
* Artist profile pages
* Marketplaces like CraftsfromRoots

---

###  Why Hybrid Rendering is Ideal for CraftsfromRoots

* Static pages ensure fast global access
* Dynamic rendering keeps user-specific data fresh
* ISR allows artwork updates without rebuilding the entire site
* Results in **better performance, scalability, and real-time accuracy**

---

## Redis Caching Integration

Redis is used as a caching layer to improve API performance.

### Cached Endpoint
- GET /api/users

### Strategy
- Cache-aside pattern
- Redis checked before database
- TTL set to 60 seconds

### Cache Invalidation
- Cache key `users:list` is deleted on POST
- Ensures data freshness

### Performance Results
- Cold request (DB): ~120ms
- Warm request (Redis): ~10ms

### Reflection
A stale cache is worse than no cache because it can mislead users. By using TTLs and explicit invalidation on write operations, the application maintains both performance and data accuracy.


### Why is environment segregation (development, staging, production) essential in modern deployments, and how does secure secret management improve the safety and reliability of your CI/CD pipelines?

Modern applications like CraftsfromRoots, deployed using Docker, cloud platforms (AWS/Azure), and GitHub Actions, require strict separation of environments and secure handling of secrets to remain safe, stable, and scalable.

**Environment Segregation**
Environment segregation means maintaining separate development, staging, and production environments, each with its own configuration, database, and resources.
Development Environment
Used by developers for daily coding and testing
Allows experimentation and debugging
Failures here do not impact users
Staging Environment
Mirrors production as closely as possible
Used for final testing, QA, and client/demo validation
Catches bugs before real users are affected
Production Environment
Live system used by real users
Must be stable, secure, and monitored
Changes are deployed only after validation
 Why It Is Essential
Prevents unfinished or broken features from reaching users
Protects production data from accidental corruption
Enables safe testing of new releases
Improves reliability and confidence in deployments

**Secure Secret Management in CI/CD Pipelines**

Secrets include:
Database credentials
API keys
JWT secrets
Redis passwords
Cloud access tokens
Risks Without Secure Management
Secrets hardcoded in repositories can be leaked
Compromised credentials can expose databases and servers
Builds may fail or behave unpredictably across environments
Secure Practices Used
Secrets stored in GitHub Actions Secrets or cloud secret managers
Different secrets for dev, staging, and production
Environment variables injected at runtime
Secrets never committed to version control

**Benefits to CI/CD Pipelines**

Prevents unauthorized access even if code is exposed
Ensures consistent and reproducible builds
Allows safe automation of deployments
Enables quick secret rotation without code changes

##  Tech Stack

**Frontend:** Next.js (TypeScript)

**Backend:** Next.js API Routes / Server Actions

**Database:** PostgreSQL

**ORM:** Prisma

**Caching & Sessions:** Redis

**Authentication:** JWT / Session-based Authentication

**Containerization:** Docker

**CI/CD:** GitHub Actions

**Cloud Deployment:** AWS / Azure

**Version Control:** Git & GitHub

---

##  Vision

CraftsfromRoots aims to be more than a marketplace — it is a bridge between **hands that create** and **hearts that value authenticity**.

> *From the roots of the land, to homes across the world.* 

---

## 👥 Contributors

* Team Members: *(Rithik Kumar, Mithun Krishna, Amulya B)*
* Project Duration: 4 Weeks

---