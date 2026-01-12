# 🗂️ TasksManager App

A modular, scalable task‑management application built with **React**, **MUI**, and a fully validated backend architecture. Designed for multi‑board workflows, drag‑and‑drop interactions, and future‑proof extensibility.

---

## 🚀 Features

### 🧩 Modular Architecture

-   Every component is isolated, testable, and designed for long‑term maintainability.
-   Clear separation between **presentation**, **state**, and **backend validation**.

### 📋 Multiple Boards

-   Create, rename, and manage independent boards.
-   Each board contains its own columns, tasks, and trash system.

### ↕️ Drag & Drop

-   Drag tasks between columns.
-   Drag tasks between boards.
-   Fully server‑validated to ensure data integrity.
-   Smooth, predictable UX with no regressions.

### 🗑️ Soft‑Delete / Trash System

-   Drag a task to the trash icon or delete it from the modal.
-   Each board has its own recoverable trash.
-   Restore tasks to their original column with full state integrity.

### 🧭 Clean Routing

-   URL‑driven board navigation.
-   Router logic fully aligned with real backend data structures.

### 🎨 Premium UI

-   Built with **MUI**, **Framer Motion**, and a consistent design system.
-   Responsive layout with elegant spacing, typography, and transitions.

---

## 🏗️ Tech Stack

| Layer    | Technology                                        |
| -------- | ------------------------------------------------- |
| Frontend | React, MUI, Framer Motion                         |
| State    | Custom hooks, modular stores                      |
| Backend  | Go (or your backend of choice), strict validation |
| DnD      | @hello-pangea/dnd                                 |
| Routing  | React Router                                      |

---

## 📁 Project Structure

```plaintext
src/
├── components/
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── modals/
│   │   ├── NewBoardModalController.jsx
│   │   └── TaskModalController.jsx
│   └── providers/
│   │   └── AppDndProvider.jsx
│   ├── BoardColumn.jsx
│   ├── BoardView.jsx
│   ├── NewBoardModal.jsx
│   ├── SideBarBoards.jsx
│   ├── SideBoardItem.jsx
│   ├── TaskCard.jsx
│   ├── TaskModal.jsx
│   └── TrashView.jsx
├── data/
│   └── initialBoards.js
├── App.css
├── App.jsx
└── index.css
```

Each folder contains self‑contained, reusable modules with clear API contracts.

---

## 🧪 Validation & Data Integrity

-   All critical operations are validated server‑side.
-   No client‑side assumptions about boardId, columnId, or task state.
-   Designed to prevent race conditions and inconsistent UI states.

---

## 🛣️ Roadmap

-   Multi‑camera support for attachments
-   Metrics dashboard
-   Offline mode
-   Real‑time collaboration
-   Board templates
-   Advanced filtering & search

---
