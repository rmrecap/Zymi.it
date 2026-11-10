# ZYMI Global | RMG Hybrid Commerce & B2B Garment Hub

<div align="center">

![ZYMI Global Banner](public/hero_factory_panoramic.svg)

**The Next-Generation Global Apparel Manufacturing Gateway & Multi-Model Commerce Engine**  
*Official Promotion and International B2B Hub for **Apparel Emporium ([aelbd.net](https://aelbd.net))***

[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.16-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)](#)

</div>

---

## 🌍 Platform Overview

**ZYMI Global** is a high-performance, hybrid multi-model platform engineered to seamlessly bridge international fashion brands, wholesale buyers, and everyday consumers with world-class garment manufacturing capabilities in Bangladesh.

The ecosystem integrates four synergistic commercial models into a single unified application:

1. **🏭 Apparel Emporium (Global Sourcing Hub - B2B):** Direct export channel for certified circular knitwear, sweaters, denim, and activewear manufactured by Apparel Emporium ([aelbd.net](https://aelbd.net)). Features interactive RFQ modals, lead time calculators, and spec sheet reviews.
2. **💎 Curated Pro Gear (Industry Top Picks):** High-ticket industrial and fashion equipment showcase powered by the automated Amazon Creators sync engine with localized partner tracking (`harperfinds20-20`).
3. **📦 Direct Global Store (Exclusive Essentials):** Direct-to-consumer and wholesale ready-to-ship apparel collections with instant shopping cart and checkout pipeline.
4. **📁 Digital Assets & Tech Packs:** Instant-access digital repository containing CAD tech pack templates, graded fashion measurement specs, and marketing AI prompt kits.
5. **🧮 Free RMG Engineering Suite:** Proprietary browser-based calculators for fashion merchandising:
   - **Fabric Consumption Calculator:** Mathematical forecasting of kg/dozen usage.
   - **GSM & Costing Estimator:** Weight conversion and yarn optimization.
   - **Yarn Count Converter:** Instant translation between Ne, Nm, Tex, and Denier.

---

## 🛠️ Technology Architecture

- **Framework:** [Next.js 15.5.3](https://nextjs.org/) (App Router, Server Components & Dynamic SSR)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict type-checking across all schemas and API routes)
- **Database & ORM:** MySQL via [Prisma ORM 6.16](https://www.prisma.io/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) with secure JWT session handling and Role-Based Access Control (RBAC)
- **Styling & UI:** Tailwind CSS, DaisyUI 4, and custom glassmorphic Cyber 3D design system
- **Theming:** Full Light / Dark mode toggle powered by `next-themes`
- **Caching Layer:** Upstash Context7 in-memory cache for sub-second rendering of trending collections

---

## 🚀 Key Features

### 1. 100% Viewport Responsive Dashboard
- Fully fluid container design constrained to standard `max-w-7xl` with edge-to-edge padding.
- Cleanly fits standard 1080p, 720p, and 125%/150% Windows scaled laptop screens at 100% zoom without horizontal clipping or scrollbars.

### 2. Skills UI 5-Filter Shop Engine (`/shop`)
The collection shop features instant tab filtering across commerce streams:
- `All Collections` (Full catalog)
- `Digital Assets & Tech Packs` (`type=DIGITAL_DOWNLOAD`)
- `Curated Pro Gear` (`type=AFFILIATE_AMAZON`)
- `Direct Global Store` (`type=DROPSHIP`)
- `B2B Manufacturing Catalog` (`type=B2B_GARMENT`)

### 3. Dedicated Admin Operations Dashboard (`/admin`)
- **B2B RFQ Lead Center (`/admin/b2b-leads`):** Real-time monitoring and export of factory inquiries, target quantities, and sample requests.
- **Amazon Creator Automation Hub (`/admin/amazon-sync`):** Automated cron sync and catalog mapping for affiliate gear.
- **Product & Category Management:** Rich media upload, pricing controls, and MOQ settings.

---

## 📦 Getting Started

### 1. Prerequisites
- Node.js `v20.x` or `v22.x` (LTS recommended)
- MySQL Database (`v8.x` or MariaDB)
- Git

### 2. Installation & Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/rmrecap/Zymi.it.git
cd Zymi.it
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database Connection
DATABASE_URL="mysql://root:your_password@localhost:3306/zymi_db"

# NextAuth Security
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-strong-jwt-secret-key-32-chars-minimum"

# Amazon Partner Configuration
AMAZON_PARTNER_TAG="harperfinds20-20"
AMAZON_CREATORS_API_KEY=""

# Upstash Context7 Cache (Optional - fallback active by default)
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""
```

### 4. Database Setup & Prisma Generation

```bash
# Push Prisma schema to MySQL database
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

### 5. Secure Admin Gateway & Command Center

For military-grade defense against unauthorized bot discovery, the administration console is protected behind the **ZYMI Security Shield Gate**:

- **Stealth / Protected Route:** `/zymi-admin-gate?key=zymi2026admin`
- **Default Master Admin Email:** `admin@zymi.it`
- **Default Master Admin Password:** `ZymiMaster2026@Secure`
- **Security Gate Key:** `zymi2026admin` (Configurable via `ADMIN_SECRET_GATE_KEY`)

Direct `/admin` traffic from unauthenticated visitors is automatically deflected to the public storefront with zero admin footprint.

To create or promote custom database admin users:

```bash
# Create new admin user in database
node server/createAdminUser.js admin@zymi.it YourStrongPassword!

# Promote an existing registered user to admin
node server/makeUserAdmin.js your_email@example.com
```

### 6. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Production Build & Deployment

To verify and produce an optimized production bundle:

```bash
npm run build
npm start
```

### Hostinger Deployment Notes
1. Connect this GitHub repository (`https://github.com/rmrecap/Zymi.it.git`) to your Hostinger VPS or Git deployment dashboard.
2. Ensure environment variables (`DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`) are populated in Hostinger's environment manager.
3. Configure PM2 or Hostinger Node.js daemon to run:
   ```bash
   node ./node_modules/next/dist/bin/next start -p 3000
   ```

---

## 📜 Compliance & Factory Credentials

Manufacturing and export operations are verified and certified under:
- **OEKO-TEX Standard 100:** Confidence in Textiles (Harmful substance testing)
- **BSCI (Business Social Compliance Initiative):** Audited ethical workplace standards
- **Sedex SMETA 4-Pillar:** Verified labor standards, health & safety, environment, and business integrity
- **GOTS (Global Organic Textile Standard):** Certified organic cotton supply chain

---

## 👥 Authors & Acknowledgments

- **Platform Architect & Engineering:** ZYMI Global Technical Team
- **Manufacturing Partner:** **Apparel Emporium ([aelbd.net](https://aelbd.net))**, Dhaka, Bangladesh
- **Repository:** [https://github.com/rmrecap/Zymi.it](https://github.com/rmrecap/Zymi.it)

---

<div align="center">
  <sub>© 2026 ZYMI Global & Apparel Emporium. All rights reserved.</sub>
</div>
