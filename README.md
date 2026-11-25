# PulseVitals

Web platform for performance auditing, Core Web Vitals analysis, and technical report generation with database persistence and PDF export.

## Overview

**PulseVitals** enables users to audit any public URL, inspect detailed performance metrics on a dedicated report page (`/audit/[id]`), browse past audits from the home dashboard, and export styled PDF reports directly from the browser.

### Key Features

* **URL Performance Auditing:** Run performance audits with automatic result persistence in PostgreSQL.
* **Audit Report Dashboard (`/audit/[id]`):** Clear visualization of performance metrics and normalized scores (`0%` to `100%`).
* **Audit History:** Real-time list of recent audits displayed on the home page.
* **PDF Export:** Print-ready, styled report export directly from the browser.
* **Automated CI/CD Pipeline:** GitHub Actions workflow running linting, unit tests, production build, and Playwright E2E tests on pull requests and pushes to `main`.

## Tech Stack

* **Web Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Runtime:** [Node.js 24](https://nodejs.org/)
* **Language:** TypeScript
* **Styling & Animations:** Tailwind CSS & Framer Motion
* **ORM & Database:** Prisma ORM (`^5.19`) & PostgreSQL 15
* **Unit Testing:** Vitest
* **End-to-End (E2E) Testing:** Playwright
* **Containerization:** Docker & Docker Compose
* **CI/CD:** GitHub Actions

## Prerequisites

Depending on how you choose to run the application, ensure you have:

* **Docker** and **Docker Compose** (recommended)
* **Node.js 24+** and **npm** (if running the Next.js app locally outside Docker)

## Environment Variables

Create a `.env` or copy and rename `.env.example` file in the project root with the required variables:

```env
# Local database connection (used when running Next.js locally with Postgres in Docker)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pulsevitals?schema=public"

# Optional Google PageSpeed Insights API key (if used by the audit endpoint)
PAGESPEED_API_KEY="your_api_key_here"
```

> **Note:** When running the full stack via `docker compose up`, the `app` service loads variables from `.env` (such as `PAGESPEED_API_KEY`) and automatically overrides `DATABASE_URL` to use the internal Docker service host `postgres` (`postgresql://postgres:postgres@postgres:5432/pulsevitals?schema=public`).

## Running the Project

### Option 1: Full Docker Setup (PostgreSQL + Next.js App)

Recommended for running the complete production-like containerized environment without installing Node.js or PostgreSQL locally.

1. **Build the images and start all containers:**

   ```bash
   docker compose up --build
   ```

   *(To run in detached mode in the background, add `-d`: `docker compose up --build -d`)*

2. **Apply Prisma database migrations (first-time setup):**

   ```bash
   docker compose exec app npx prisma migrate deploy
   ```

3. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Stop the containers:**

   ```bash
   docker compose down
   ```

### Option 2: Hybrid Development Setup (PostgreSQL in Docker + Local Next.js)

Recommended during active development to take advantage of Next.js Fast Refresh (`next dev`).

1. **Start only the PostgreSQL container:**

   ```bash
   docker compose up -d postgres
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Generate the Prisma Client and run migrations:**

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000).

## Running Tests

### Unit Tests (Vitest)

Run tests in interactive watch mode:

```bash
npm test
```

Run the entire unit test suite once (same command used in CI):

```bash
npx vitest run
```

### End-to-End Tests (Playwright)

Install Playwright browser binaries on first setup:

```bash
npx playwright install --with-deps chromium
```

Run the E2E test suite:

```bash
npm run test:e2e
```

*(E2E tests intercept `/api/audit` requests with mocked payloads for fast, deterministic execution without relying on external APIs.)*

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server |
| `npm run build` | Creates an optimized production build |
| `npm start` | Starts the Next.js production server |
| `npm run lint` | Runs ESLint across the codebase |
| `npm test` | Runs unit tests in watch mode with Vitest |
| `npm run test:e2e` | Runs end-to-end tests with Playwright |