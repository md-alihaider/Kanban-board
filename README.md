# TaskFlow — Kanban Task Manager

A responsive, dark-themed Kanban task management application built with React and Tailwind CSS. Organize your work, manage priorities, track deadlines, and monitor progress through a simple three-column board.

## ✨ Features

- **Task Management (CRUD)** — Create, view, edit, and delete tasks.
- **Three Status Columns** — Organize tasks into Todo, In Progress, and Completed.
- **Task Priorities** — Categorize tasks as Low, Medium, or High.
- **Due Dates** — Set deadlines and identify overdue tasks.
- **Search** — Find tasks by title.
- **Filters** — Filter tasks by priority and status.
- **LocalStorage Persistence** — Keep your tasks saved across page refreshes.
- **Responsive Design** — Adapt to desktop, tablet, and mobile screens.
- **Dark Theme** — Clean interface with a dark background and indigo accents.
- **Task Statistics** — Track total tasks, tasks in progress, completed tasks, and overall completion.
- **User Feedback** — Modal forms, empty states, validation, and success notifications.

## 🛠️ Tech Stack

- **React** — Component-based UI development
- **Vite** — Development server and build tooling
- **Tailwind CSS v4** — Utility-first styling
- **Lucide React** — Icons
- **JavaScript (ES6+)** — Application logic
- **LocalStorage** — Client-side data persistence

## 📂 Project Structure

```text
taskflow/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── StatsCards.jsx
│   │   ├── TaskFilters.jsx
│   │   ├── BoardColumn.jsx
│   │   ├── TaskCard.jsx
│   │   └── TaskModal.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- Git (optional, for version control)

### 1. Clone the repository

```bash
git clone https://github.com/md-alihaider/Kanban-board
```

### 2. Navigate to the project directory

```bash
cd taskflow
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal to view the application.

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint checks, if configured |

## 💡 How to Use

1. Click **Add new task** to create a task.
2. Enter its title, description, priority, due date, and status.
3. Use the edit icon to update a task or the delete icon to remove it.
4. Change a task's status using the dropdown on its card.
5. Search by task title or apply priority and status filters.
6. Refresh the page to verify that tasks persist in LocalStorage.

## 🧠 Key Implementation Decisions

- **Reusable components:** The interface is divided into focused components to improve readability and maintainability.
- **Centralized state:** The main `App.jsx` component manages task data and passes props and callbacks to child components.
- **Derived filtering:** Search and filters operate on the existing task list without maintaining duplicate filtered state.
- **Persistent storage:** LocalStorage stores task data in the browser, allowing tasks to survive page refreshes.
- **Responsive layout:** Tailwind CSS breakpoints adapt the board to different screen sizes.

## ⚠️ Limitations

- Tasks are stored locally in the current browser and are not synchronized across devices.
- Clearing browser storage can remove saved tasks.
- Authentication, backend storage, and multi-user collaboration are not included.

## 🔮 Future Improvements

- Drag-and-drop task management
- Task sorting by due date and priority
- Dark/light theme toggle
- Backend integration with Node.js, Express, and MongoDB
- User authentication and cloud synchronization
- Task completion progress indicators

## 👨‍💻 Author

**Ali Haider**

- GitHub: [@md-alihaider](https://github.com/md-alihaider)
- Portfolio: [View Portfolio](https://mdalihaider.vercel.app/)

## 📄 License

This project is open source and available for learning and personal use. Add a license file if you intend to distribute it under a specific open-source license.

---

Built with ❤️ using React and Tailwind CSS.

