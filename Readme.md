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

