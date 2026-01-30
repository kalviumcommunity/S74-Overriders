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

## SWR Client-Side Data Fetching

### Overview
SWR (Stale-While-Revalidate) is implemented for client-side data fetching, providing intelligent caching, revalidation, and optimistic UI updates. This implementation demonstrates modern React data fetching patterns with enhanced user experience.

### Key Concepts

#### SWR Keys
Each `useSWR` hook uses a unique key to identify cached data:
```tsx
useSWR("/api/users", fetcher); // "/api/users" = cache key
```

Dynamic keys enable conditional fetching:
```tsx
useSWR(userId ? `/api/users/${userId}` : null, fetcher);
```

#### Cache Strategy
- **Cache-Aside Pattern**: SWR maintains client-side cache separate from server-side Redis
- **Stale-While-Revalidate**: Returns cached data immediately, then revalidates in background
- **Automatic Cache Invalidation**: Cache updates when data changes

### Implementation Details

#### Fetcher Helper
Centralized fetching logic with error handling:
```typescript
// lib/fetcher.ts
export const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};
```

#### Data Fetching with SWR
```typescript
const { data, error, isLoading, mutate } = useSWR("/api/users", fetcher, {
  revalidateOnFocus: true,        // Refetch when tab regains focus
  refreshInterval: 30000,         // Poll every 30 seconds
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    if (retryCount >= 3) return;
    setTimeout(() => revalidate({ retryCount }), 2000);
  },
});
```

### Optimistic UI Updates

#### Mutation Flow
1. **Immediate UI Update**: Show changes instantly using optimistic data
2. **API Call**: Perform actual server request
3. **Revalidation**: Sync cache with server response
4. **Error Handling**: Revert on failure

```typescript
const handleAddUser = async () => {
  // Optimistic update
  mutate("/api/users", [...data, newUser], false);
  
  try {
    await fetch("/api/users", { method: "POST", body: JSON.stringify(userData) });
    mutate("/api/users"); // Revalidate
  } catch (error) {
    mutate("/api/users"); // Revert on error
  }
};
```

### Cache Hit vs Miss Demonstration

#### Client-Side SWR Cache
```typescript
const { cache } = useSWRConfig();
console.log("Cache keys:", Array.from(cache.keys()));
console.log("Cache status:", cache.get("/api/users") ? "Hit ✅" : "Miss ❌");
```

#### Server-Side Redis Cache
- **Cache Hit**: `⚡ Cache Hit` (data from Redis)
- **Cache Miss**: `Cache Miss - Fetching from DB` (data from PostgreSQL)
- **Cache Invalidation**: `🗑️ Cache invalidated after user creation`

### Revalidation Strategies

| Strategy | Trigger | Use Case |
|----------|---------|----------|
| **Focus Revalidation** | Tab regains focus | Keep data fresh when user returns |
| **Interval Revalidation** | Time-based (30s) | Real-time data updates |
| **Manual Revalidation** | User action | On-demand refresh |
| **Error Retry** | Failed requests | Resilient error handling |

### Performance Comparison

| Scenario | Response Time | Cache Status |
|----------|---------------|--------------|
| **First Load** | ~1000ms | Cache Miss (DB + Redis) |
| **Subsequent Load** | ~10-15ms | Cache Hit (Redis) |
| **SWR Client Cache** | ~1-2ms | Client-Side Hit |
| **Optimistic Update** | Instant | UI Update |

### Error Handling & Resilience

#### Automatic Retry Logic
- Exponential backoff with max 3 retries
- 2-second delay between retries
- Graceful fallback to cached data

#### User Experience
- Loading states during fetch
- Error messages with retry options
- Optimistic updates for instant feedback

### Benefits Over Traditional Fetch

| Feature | SWR | Traditional Fetch |
|---------|-----|-------------------|
| **Caching** | ✅ Automatic | ❌ Manual |
| **Revalidation** | ✅ Built-in | ❌ Manual |
| **Optimistic UI** | ✅ Easy | ⚠️ Complex |
| **Error Retries** | ✅ Configurable | ❌ Custom Code |
| **Loading States** | ✅ Built-in | ❌ Manual |
| **Focus Tracking** | ✅ Automatic | ❌ Manual |

### Evidence & Testing

#### Console Logs
```
Cache keys: ["/api/users"]
Cache data for /api/users: {...}
⚡ Cache Hit (Redis)
Cache Miss - Fetching from DB
🗑️ Cache invalidated after user creation
```

#### UI Indicators
- Real-time cache status display
- Manual refresh button
- Optimistic user addition
- Error handling with fallback

### Reflection

#### UX Impact
- **Perceived Performance**: Instant UI updates create responsive experience
- **Data Freshness**: Automatic revalidation ensures current data
- **Error Resilience**: Graceful handling maintains user trust

#### Trade-offs
- **Memory Usage**: Client-side cache increases memory consumption
- **Complexity**: Additional layer requires understanding of caching concepts
- **Data Consistency**: Must manage synchronization between client/server caches

#### Production Considerations
- **Cache Size Limits**: Implement cache eviction strategies
- **Network Awareness**: Adjust revalidation based on connection quality
- **Performance Monitoring**: Track cache hit ratios and response times

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


---

## Database Schema Design

### Core Entities

* **User**: Registered user of the application.
* **Project**: Created and owned by a user.
* **Task**: Individual task under a project.

### Prisma Schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  projects  Project[]
}

model Project {
  id      Int     @id @default(autoincrement())
  title   String
  userId  Int
  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  tasks   Task[]

  @@index([userId])
}

model Task {
  id        Int     @id @default(autoincrement())
  title     String
  completed Boolean @default(false)
  projectId Int
  project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)

  @@index([projectId])
}
```

### Relationships & Constraints

* One User → Many Projects
* One Project → Many Tasks
* Foreign keys enforce referential integrity
* `ON DELETE CASCADE` prevents orphan records
* Unique constraint on user email
* Indexed foreign keys improve query performance

### Normalization

The schema follows **3NF**, avoiding redundancy and ensuring all non-key attributes depend only on their primary keys.

### Migrations

Tables were created using Prisma migrations:

```bash
npx prisma migrate dev --name init_schema
```

Seed data was added to validate relationships.

---

# Input Validation with Zod

Zod schemas were implemented for validating POST and PUT API routes to ensure incoming data is correctly typed and complete before processing. Validation logic is centralized inside reusable schema files under lib/schemas, enabling reuse across server routes and client forms.

Invalid requests return structured error responses with field-level messages, improving API reliability and developer experience. This approach prevents malformed data from reaching the database and enforces consistent data contracts across the application.

![success](image-1.png)

![error message](image.png)

---

# Centralized Error Handling

This project uses a centralized error handler to ensure all API errors are handled consistently. Validation and runtime errors are logged in a structured format for easier debugging while returning safe, user-friendly responses to the client. In development mode, detailed error information is available for debugging, whereas in production only generic messages are exposed to avoid leaking sensitive details. This improves reliability, security, and developer efficiency as the application scales.

---

## Role-Based Access Control (RBAC)

### Roles & Permissions

| Role   | Permissions                    |
|------- |--------------------------------|
| Admin  | create, read, update, delete   |
| Editor | read, update                   |
| Viewer | read                            |

### Access Evaluation Logic
- User role is derived from session/JWT (mocked for this task)
- Every API action checks permission before execution
- Unauthorized access returns HTTP 403
- All allow/deny decisions are logged

### Audit Logs
Example:
[RBAC] EDITOR tried CREATE: DENIED  
[RBAC] ADMIN tried DELETE: ALLOWED  

### Reflection
This RBAC system centralizes authorization logic, making it scalable and auditable.
It can evolve into policy-based access control (PBAC) by introducing contextual
rules such as resource ownership, time-based access, or attribute-based policies.

![proof1](rbac-2.png)

![proof2](rbac-3.png)

![ui proof](rbac-4.png)
---

Authentication Flow

User signs up → password hashed with bcrypt

User logs in → password verified → JWT issued

JWT sent in Authorization header to access protected routes

bcrypt Usage
const hash = await bcrypt.hash(password, 10);
const isValid = await bcrypt.compare(password, hash);

JWT Usage
jwt.sign({ id, email }, JWT_SECRET, { expiresIn: "1h" });
jwt.verify(token, JWT_SECRET);

Token Expiry & Refresh

Short-lived tokens reduce attack surface

Refresh tokens can be introduced for long sessions

Token rotation improves security

Token Storage

HTTP-only cookies → safest (XSS-resistant)

localStorage → simple but XSS-prone

Authorization headers → clean API separation

Security Benefits

Passwords never stored in plaintext

Stateless authentication scales horizontally

JWT enables fine-grained access control

---


# Redis Caching Integration (Next.js + Prisma)

## Overview

To improve API performance and reduce unnecessary database queries, Redis was integrated as an in-memory caching layer in this Next.js application. A cache-aside pattern was implemented, allowing frequently accessed data to be served quickly while maintaining consistency with the primary PostgreSQL database.

This approach reduces response latency for repeated requests and optimizes overall backend efficiency.

---

## Redis Setup

Redis is run locally using Docker and connected using the `ioredis` client.

### Redis Client Configuration

```ts
// app/lib/redis.ts
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

export default redis;
```

---

## Caching Strategy (Cache-Aside Pattern)

The cache-aside pattern is implemented as follows:

1. Check Redis for cached data.
2. If cached data exists, return it immediately.
3. If cached data does not exist, fetch data from the database.
4. Store the fetched data in Redis with a defined TTL.
5. Return the response to the client.

This ensures that Redis remains a performance optimization layer rather than a source of truth.

---

## Cached Resource

### Resource Cached

* Endpoint: `GET /api/users`
* Data: List of users

### Rationale

* Frequently accessed endpoint
* Read-heavy workload
* Database queries are more expensive than Redis lookups
* Ideal candidate for caching

---

## API Route with Redis Caching

### Cache Read and Write Logic

```ts
// app/api/users/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import redis from "@/lib/redis";

export async function GET() {
  const cacheKey = "users:list";

  const cached = await redis.get(cacheKey);
  if (cached) {
    console.log("Cache Hit");
    return NextResponse.json(JSON.parse(cached));
  }

  console.log("Cache Miss - Fetching from DB");
  const users = await prisma.user.findMany();

  await redis.set(cacheKey, JSON.stringify(users), "EX", 60);

  return NextResponse.json(users);
}
```

---

## Cache Invalidation Strategy

To prevent stale data, the cache is invalidated whenever user data is modified.

### Example Invalidation Logic

```ts
await redis.del("users:list");
```

This ensures that subsequent requests fetch fresh data from the database before repopulating the cache.

---

## TTL (Time-To-Live) Policy

* TTL Duration: 60 seconds
* Reasoning:

  * Balances performance and data freshness
  * Prevents stale data from persisting indefinitely
  * Suitable for moderately changing datasets

Redis automatically removes expired entries, reducing manual cache maintenance.

---

## Performance Comparison

### Cache Miss (Cold Request)

Command:

```bash
Invoke-RestMethod http://localhost:3000/api/users
```

Log Output:

```
Cache Miss - Fetching from DB
Response time: ~1000 ms
```

---

### Cache Hit (Warm Request)

Command:

```bash
Invoke-RestMethod http://localhost:3000/api/users
```

Log Output:

```
Cache Hit
Response time: ~10–15 ms
```

This demonstrates a significant reduction in response time for repeated requests.

---

## Cache Coherence and Data Consistency

Cache coherence is maintained through:

* Explicit cache invalidation on write operations
* Short TTL values to enforce automatic refresh
* Database-level constraints enforced by Prisma and PostgreSQL

This combination ensures consistency between cached data and persistent storage.

---

## Risks of Stale Data and Mitigation

### Potential Risks

* Cached data becoming outdated after write operations
* Multiple updates occurring within the TTL window

### Mitigation Measures

* Cache invalidation on create, update, and delete operations
* Conservative TTL duration
* Cache-aside pattern to ensure database remains the source of truth

These measures minimize the likelihood of serving stale data.

---

## Conclusion

By integrating Redis as a caching layer, the application achieves:

* Reduced API response times
* Lower database load
* Improved scalability for read-heavy workloads

This implementation reflects a production-oriented caching strategy aligned with real-world backend system design.

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
## Authorization Middleware

All protected API routes are secured using a centralized middleware.

### Flow
Client → Middleware → JWT Validation → Role Check → API Route

### Role Rules
- `/api/users` → Any authenticated user
- `/api/admin` → Admin only

### Security Principles
- JWT verified on every request
- Least privilege enforced
- Unauthorized access returns 401/403
# 📄 README – Features & Functionality Added

This project demonstrates routing features implemented using the **Next.js 13+ App Router**, focusing on scalability, authentication, and user experience.

---

## ✅ Features Added

### 🧭 File-Based Routing
- Routing implemented using the `app/` directory
- Each folder represents a route
- `page.tsx` files define route entry points

---

### 🌐 Public Routes
The following routes are accessible without authentication:
- `/` – Home page
- `/login` – Login page

---

### 🔒 Protected Routes
The following routes require authentication:
- `/dashboard`
- `/users`
- `/users/[id]`

Access is restricted using middleware-based authentication.

---

### 🔐 Middleware Authentication
- Added `middleware.ts` to protect private routes
- JWT token is read from cookies
- Unauthorized users are redirected to `/login`
- Valid tokens allow access to protected pages

---

### 🔄 Dynamic Routing
- Implemented dynamic routing using `[id]` folder syntax
- `/users/[id]` renders user-specific content dynamically
- Single template supports multiple user profiles

**Example URLs:**
- `/users/1`
- `/users/2`

---

### 🧱 Global Layout & Navigation
- Added `layout.tsx` for shared UI
- Persistent navigation bar across pages
- Improves consistency and usability

---

### 🧭 Breadcrumb Navigation
- Added breadcrumbs on dynamic user pages
- Helps users understand page hierarchy
- Enhances navigation and SEO

**Example:**
# 🔐 JWT Authentication with Access & Refresh Tokens (Next.js)

This project implements a **secure authentication system** using **JSON Web Tokens (JWT)** in a **Next.js 13+ App Router** application.  
It follows modern security best practices including **short-lived access tokens**, **HTTP-only refresh tokens**, and **token rotation**.

---

## 📌 Tech Stack

- Next.js 13+ (App Router)
- TypeScript
- jsonwebtoken
- HTTP-only Cookies
- Middleware-based Route Protection

---

## 🧩 JWT Structure

A JSON Web Token (JWT) consists of **three parts**, separated by dots (`.`):
import Button from "./Button";

export default {
  title: "UI/Button",
  component: Button,
};

export const Primary = () => <Button label="Click Me" />;
export const Secondary = () => <Button label="Cancel" variant="secondary" />;
