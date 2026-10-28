# Tattva Tech — Ideas into Impact 

A modern, high-performance company website for **Tattva Tech** built using the full **MERN Stack** (MongoDB, Express, React, Node.js + Vite + Tailwind CSS).

---

##  Visual Design & Features

This codebase replicates the 9 key screens of the Tattva Tech web application:

1. **Home (`Home.jsx`)**:
   - 3D sculpted Tattva Tech logo & dynamic ribbon emblem
   - Hero headline: *"We Turn Ambitious Ideas Into Digital Products That Matter."*
   - Floating interactive cards: AI & Automation, SaaS Products, Web & Mobile Apps, Ideas ➔ Strategy ➔ Dev ➔ Growth
   - Real-world impact metrics: 50+ Projects Delivered, 30+ Happy Clients, 5+ SaaS Products, 100% Client Satisfaction
   - Ecosystem tech partners: AWS, Google Cloud, OpenAI, Meta, Microsoft, Vercel

2. **Services (`Services.jsx`)**:
   - Headline: *"End-to-End Technology Solutions for Modern Businesses"*
   - 6 Core Service Cards:
     - Web Development
     - Mobile App Development
     - AI & Automation
     - UI/UX Design
     - SaaS Development
     - Digital Growth
   - Interactive service detail modal with deliverables and tech stacks

3. **Products (`Products.jsx`)**:
   - Headline: *"Innovative Products for a Smarter Future"*
   - Category filtering: `All Products`, `Marketing`, `CRM`, `AI Agents`, `Analytics`
   - In-house SaaS products: **MailPilot**, **LeadFlow CRM**, **AI Agent Hub**, **InsightBoard**
   - Deep dive showcase for **MailPilot**:
     - 10K+ Active Users, 98% Delivery Rate, 3x Better Engagement
     - Interactive laptop preview running the live MailPilot SaaS dashboard

4. **About Us (`About.jsx`)**:
   - Headline: *"More Than Development. A Long-Term Technology Partner."*
   - Interactive office visualization & "Play Video" culture reel modal
   - 4 Pillars: Product-Focused Approach, Transparent Communication, Skilled Team, Long-Term Support

5. **Work / Case Studies (`Work.jsx`)**:
   - Headline: *"Real Solutions. Real Impact."*
   - Filters: Web Apps, Mobile Apps, SaaS Products, AI Solutions
   - Featured case studies: AI-Powered CRM Platform, E-commerce Mobile App, Analytics Dashboard

6. **Insights / Blog (`Insights.jsx`)**:
   - Latest articles on AI Agents, Modern SaaS Architecture, and The Future of Web Development
   - Interactive modal reader with estimated read times and tags

7. **Careers (`Careers.jsx`)**:
   - Headline: *"Build the Future With Us"*
   - Culture perks: Remote Friendly, Flexible Work, Learning & Growth, Great Team Culture
   - Interactive Job Application drawer for open roles

8. **Contact Us (`Contact.jsx`)**:
   - Headline: *"Let's Build Something Amazing Together."*
   - Direct contacts: Email (`hello@tattvatech.com`), Phone (`+91 98765 43210`), Location (`India (Remote Friendly)`)
   - 3D faceted paper plane illustration
   - Contact form with validation that directly saves inquiries into MongoDB via the Express backend API (`/api/contact`)
   - Confetti celebratory animation on message submission

---

## 📁 Project Architecture

```
tattva-tech-website/
│
├── client/                       # React + Vite + Tailwind CSS
│   ├── public/
│   │   ├── images/               # Image assets & design references
│   │   └── favicon.svg           # Tattva Tech folded 'T' favicon
│   ├── src/
│   │   ├── assets/               # Local icons & media
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation bar with active state & Let's Talk CTA
│   │   │   ├── Footer.jsx        # Footer with links & company information
│   │   │   ├── ServiceCard.jsx   # Interactive service cards
│   │   │   └── ProductCard.jsx   # SaaS product cards with mini mockups
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Hero, metrics, floating cards, ecosystem logos
│   │   │   ├── Services.jsx      # 6 services grid & process pipeline
│   │   │   ├── Products.jsx      # SaaS products & MailPilot laptop showcase
│   │   │   ├── About.jsx         # Mission, office visual, video modal, 4 pillars
│   │   │   ├── Work.jsx          # Case studies with impact stats & interactive modal
│   │   │   ├── Insights.jsx      # Articles, read times, interactive article reader
│   │   │   ├── Careers.jsx       # Perks, job openings & apply form
│   │   │   └── Contact.jsx       # Contact details, 3D paper plane, MERN contact form
│   │   ├── services/
│   │   │   └── contactService.js # API client for backend communication
│   │   ├── App.jsx               # Main application controller & DB inquiry inspector
│   │   ├── main.jsx              # React DOM entry point
│   │   └── index.css             # Tailwind base & glassmorphism utilities
│   ├── .env.example              # Client environment template
│   ├── package.json              # Client dependencies
│   ├── tailwind.config.js        # Brand color system & custom animations
│   └── vite.config.js            # Vite configuration with API proxying
│
├── server/                       # Node.js + Express + MongoDB
│   ├── config/
│   │   └── db.js                 # MongoDB connection with Mongoose
│   ├── controllers/
│   │   └── contact.controller.js # Contact submission & query handlers
│   ├── middleware/
│   │   └── errorHandler.js       # 404 & centralized error handler
│   ├── models/
│   │   └── Contact.js            # Mongoose schema for inquiries
│   ├── routes/
│   │   └── contact.routes.js     # Express routes (/api/contact)
│   ├── app.js                    # Express application configuration
│   ├── server.js                 # Server listener on port 5000
│   ├── .env.example              # Server environment template
│   └── package.json              # Server dependencies
│
├── .gitignore
└── README.md
```

---

## ⚡ Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18+ (tested on Node v22)
- **MongoDB**: Local MongoDB instance running on `mongodb://127.0.0.1:27017` (or MongoDB Atlas URI)

### 2. Backend Setup
```bash
cd server
npm install
npm start
```
The server will start at: `http://localhost:5000`
- Health Check: `http://localhost:5000/api/health`
- Contact API: `http://localhost:5000/api/contact`

### 3. Frontend Setup
In a separate terminal:
```bash
cd client
npm install
npm run dev
```
The client will start at: `http://localhost:5173`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status check |
| `POST` | `/api/contact` | Submit contact form `{ name, email, company, message }` |
| `GET` | `/api/contact` | Retrieve all submitted inquiries |
| `GET` | `/api/contact/:id` | Retrieve single inquiry by ID |
| `DELETE` | `/api/contact/:id` | Delete an inquiry |

---

## 🛡️ License
MIT License. Built by the Tattva Tech Engineering Team.
