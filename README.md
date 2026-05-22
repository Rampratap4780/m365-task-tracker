# M365 Task Tracker

A task management web application inspired by the **Microsoft Power Apps + SharePoint + Power Automate** ecosystem, built with React, TypeScript, and Vite.

## Live Demo
> Deploy to Vercel: `npx vercel` from the project root.

## Architecture

| M365 Concept | Implementation in this project |
|---|---|
| **Power Apps Canvas App** | React UI — form-driven task creation/editing |
| **SharePoint List** | `localStorage` with typed schema mirroring a SharePoint list item |
| **Power Automate Approval Flow** | `submitForApproval()` → `resolveApproval()` hooks simulate the trigger-and-response pattern |
| **Graph API / Teams notification** | Console log + approval log panel (extendable to real API) |

## Features

- ✅ Create, edit, delete tasks (CRUD)
- ✅ Priority & status tagging (Low / Medium / High, Pending / In Progress / Completed)
- ✅ Power Automate-style approval workflow (Submit → Pending → Approved / Rejected)
- ✅ Approval log with full audit trail
- ✅ Filter by status, priority, and search
- ✅ Overdue task detection
- ✅ Persistent state via localStorage
- ✅ Fully typed with TypeScript

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build for Production

```bash
npm run build
npm run preview
```

## Tech Stack

- React 18 + TypeScript
- Vite
- localStorage (simulating SharePoint list backend)

## Resume Bullet

> Developed a Power Apps-inspired canvas task tracker with a SharePoint list schema and an integrated Power Automate approval workflow simulation, built in React + TypeScript and deployed via Vercel.

## Extending to Real M365

To connect this to a real SharePoint list and Power Automate:
1. Replace `useTaskStore` CRUD calls with Microsoft Graph API calls (`/sites/{site}/lists/{list}/items`)
2. Replace `submitForApproval` with a Power Automate HTTP trigger endpoint
3. Add MSAL.js for Microsoft OAuth authentication
