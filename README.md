# M365 Task Tracker

A task management web application inspired by the **Microsoft Power Apps + SharePoint + Power Automate** ecosystem — built with React, TypeScript, and Vite.

![Tech Stack](https://img.shields.io/badge/React-18-blue?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite) ![License](https://img.shields.io/badge/license-MIT-green)

---

## Live Demo

🔗 [View Live](https://your-deployment-link.vercel.app) <!-- Replace after deploying to Vercel -->

---

## Screenshots

> Add screenshots here after running locally — `npm run dev` → screenshot → drag into README on GitHub

---

## Features

- ✅ Create, edit, and delete tasks (full CRUD)
- ✅ Priority tagging — Low / Medium / High
- ✅ Status tracking — Pending / In Progress / Completed
- ✅ **Power Automate-style approval workflow** — Submit → Pending Approval → Approved / Rejected
- ✅ Full approval audit log with timestamps
- ✅ Filter by status, priority, and keyword search
- ✅ Overdue task detection
- ✅ Persistent state via localStorage (mirrors SharePoint list backend)
- ✅ Fully typed with TypeScript

---

## Architecture

This project simulates the Microsoft 365 low-code ecosystem:

| M365 Concept | Implementation |
|---|---|
| **Power Apps Canvas App** | React UI — form-driven task creation and editing |
| **SharePoint List** | `localStorage` with a typed schema mirroring a SharePoint list item |
| **Power Automate Approval Flow** | `submitForApproval()` → `resolveApproval()` hooks simulate the trigger-and-response pattern |
| **Teams Notification** | Approval log panel (extendable to real Graph API / Teams webhook) |

---

## Tech Stack

- **React 18** — component-based UI
- **TypeScript** — fully typed codebase
- **Vite** — fast dev server and build tool
- **localStorage** — persistent state simulating a SharePoint list backend
- **lucide-react** — icons

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18 or above
- [Git](https://git-scm.com)

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/m365-task-tracker.git

# Move into the project
cd m365-task-tracker

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── ApprovalLogPanel.tsx   # Audit trail of all approval actions
│   ├── ApprovalModal.tsx      # Approve / Reject decision modal
│   ├── Badge.tsx              # Priority, status, approval badges
│   ├── TaskCard.tsx           # Individual task display card
│   └── TaskForm.tsx           # Add / edit task form
├── data/
│   └── seed.ts                # Initial demo data (mirrors SharePoint list rows)
├── hooks/
│   └── useTaskStore.ts        # CRUD + approval logic with localStorage persistence
├── types/
│   └── index.ts               # TypeScript interfaces (Task, ApprovalLog, etc.)
├── App.tsx                    # Main layout, routing, filter logic
└── main.tsx                   # Entry point
```

---

## Extending to Real Microsoft 365

To connect this app to a real SharePoint list and Power Automate:

1. **Authentication** — Add [MSAL.js](https://github.com/AzureAD/microsoft-authentication-library-for-js) for Microsoft OAuth
2. **SharePoint backend** — Replace `useTaskStore` CRUD with Microsoft Graph API calls:
   ```
   GET  /sites/{site-id}/lists/{list-id}/items
   POST /sites/{site-id}/lists/{list-id}/items
   ```
3. **Power Automate trigger** — Replace `submitForApproval()` with an HTTP POST to a Power Automate flow endpoint
4. **Teams notification** — Use Graph API to send adaptive cards to a Teams channel on approval

---

## Resume Bullet

> Developed a Power Apps-inspired task tracker in React + TypeScript with a SharePoint list schema and an integrated Power Automate approval workflow simulation; deployed via Vercel.

---

## License

MIT — free to use and modify.

---

## Author

**Rampratap Singh Rajpoot**
[GitHub](https://github.com/YOUR_USERNAME) · [LinkedIn](https://linkedin.com/in/YOUR_PROFILE) · [Portfolio](https://your-portfolio.com)
