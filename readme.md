# IntelliPay AI — AI-Based Invoice Query Agent

> An intelligent chat-based assistant that lets company owners instantly query invoice and payment data using natural language — no more calling managers or searching spreadsheets manually.

---

## 📌 Project Overview

**IntelliPay AI** is an AI-powered Invoice Query Agent built as a web application. Company owners can log in to a secure dashboard and ask questions about invoices, payments, and team expenses in plain English. The AI agent reads from the company's invoice database and returns accurate, instant answers through a clean chat interface.

This project is the first phase of a larger vision: a fully autonomous AI-powered company management platform that will eventually automate payroll processing, invoice collection, expense approvals, and financial reporting.

---

## 🚀 Live Features (Current Version)

- 🔐 **Secure Admin Login** — Firebase-based authentication so only authorized owners can access the dashboard
- 💬 **Natural Language Chat Interface** — Ask questions in plain English, get structured answers instantly
- 📊 **Invoice Database Querying** — AI reads from a connected invoice database and answers questions about payments, teams, and workers
- 🤖 **Gemini AI Integration** — Google's Gemini 1.5 Flash model powers the question-answering engine
- 📁 **Google Sheets / CSV Database** — Invoice records stored and managed in Google Sheets or CSV format
- 📱 **Responsive UI** — Clean, modern dark-themed interface that works on desktop and mobile

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), Tailwind CSS |
| Backend | Node.js, Express.js |
| AI Model | Google Gemini 1.5 Flash API |
| Authentication | Firebase Auth |
| Database | Google Sheets / CSV |
| Icons | Lucide React |
| Dev Tools | VS Code / Cursor, Nodemon |

---

## 💬 Example Questions You Can Ask

```
"What is the total payment made this month?"
"Show me all invoices for the marketing team"
"How much did we pay John Smith?"
"List all unpaid invoices"
"What is the total amount paid to the engineering team?"
"Show all payments made in January 2025"
"Which team has the highest expenses this month?"
```

---

## 🗂️ Project Structure

```
IntelliPay_AI/
│
├── frontend/                   # Next.js application
│   ├── app/
│   │   ├── page.js             # Main chat dashboard (protected)
│   │   ├── login/page.jsx      # Login page
│   │   └── layout.js
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── ChatWindow.jsx
│   │   ├── MessageBubble.jsx
│   │   ├── InputBar.jsx
│   │   ├── EmptyState.jsx
│   │   └── TypingIndicator.jsx
│   └── lib/
│       ├── api.js              # Backend API calls
│       └── firebase.js         # Firebase config
│
├── backend/                    # Express.js server
│   ├── server.js               # Main server entry
│   ├── routes/
│   │   └── invoice.js          # /api/query route
│   ├── services/
│   │   ├── sheetsService.js    # Reads invoice data
│   │   └── aiService.js        # Gemini AI integration
│   ├── data/
│   │   └── invoice_DB.csv      # Invoice database
│   ├── .env                    # API keys (never committed)
│   └── credentials.json        # Google credentials (never committed)
│
└── README.md
```

---

## ⚙️ How It Works

```
Owner types a question in the chat
            ↓
Next.js frontend sends request to Express backend
            ↓
Backend reads invoice data from Google Sheets / CSV
            ↓
Invoice data + question sent to Gemini AI
            ↓
Gemini processes and generates a natural language answer
            ↓
Answer displayed in the chat interface
```

---

## 🔧 Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/JobairIslam/IntelliPay_AI.git
cd IntelliPay_AI
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside `/backend`:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
SHEET_ID=your_google_sheet_id_here
```

> Get your free Gemini API key at: [aistudio.google.com](https://aistudio.google.com)

Add your `credentials.json` (Google Service Account) to the `/backend` folder.

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

### 4. Open the app

```
http://localhost:3000
```

Log in with your Firebase account and start querying invoices.

---

## 🗃️ Invoice Database Schema

The invoice database uses the following columns:

| Column | Description | Example |
|--------|-------------|---------|
| `invoice_id` | Unique record ID | 1 |
| `worker_name` | Employee full name | John Smith |
| `role` | Job title | Developer |
| `team` | Department | Engineering |
| `invoice_number` | Invoice reference | INV-001 |
| `amount` | Payment amount ($) | 2500 |
| `payment_date` | Date of payment | January 15, 2025 |
| `status` | Paid / Unpaid | Paid |
| `description` | Work description | Website module |

---

## 🔮 Future Roadmap

This project is the foundation for a fully autonomous AI company management platform. Planned future features include:

### Phase 2 — Automated Invoice Collection
- AI agent monitors the company email inbox (Gmail API)
- Automatically detects and reads invoice-related emails from employees
- Extracts payroll data using NLP (hours worked, amount, employee details)
- Updates the invoice database automatically without manual input

### Phase 3 — Autonomous Payroll Processing
- Automatically calculates monthly salaries based on extracted data
- Generates professional PDF payroll summary invoices
- Sends invoice summaries directly to the company owner via email
- Flags incomplete or suspicious submissions for human review

### Phase 4 — Full Company AI Platform (Multi-Agent System)
- **HR Agent** — Manages employee records, attendance, and contracts
- **Sales Agent** — Tracks leads, deals, and revenue pipelines
- **Finance Agent** — Handles invoices, expenses, and budget tracking
- **Inventory Agent** — Monitors stock levels and purchase orders
- **Delivery Agent** — Tracks project milestones and work delivery
- **Central Dashboard** — Owner can ask cross-department questions like:
  > *"What was the total cost of all marketing projects delivered this month?"*

### Phase 5 — Advanced Automation
- Automatic salary transfers via bank APIs
- Fraud detection and anomaly alerts
- Multi-user roles (Owner, Finance Manager, HR Manager)
- WhatsApp / Telegram bot integration for on-the-go queries

---

## 🔐 Security Notes

- `credentials.json` and `.env` are never committed to GitHub
- Firebase Authentication ensures only authorized users can access the dashboard
- All API keys are stored as environment variables

---

## 👨‍💻 Author

**Jubair Islam**
AI Invoice Query Agent — Lab Project
[GitHub](https://github.com/JobairIslam/IntelliPay_AI)

---

## 📄 License

This project is built for academic and demonstration purposes.
