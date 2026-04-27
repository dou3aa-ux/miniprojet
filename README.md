# EduPortal - Student Portal Frontend

A modern, responsive student portal built with React and Vite. This application provides students with a centralized dashboard to manage their academic life, including grades, schedules, assignments, and more.

## Features

- **Authentication**: Secure login and registration with JWT tokens
- **Dashboard**: Overview of GPA, courses, assignments, and today's schedule
- **Grades**: View and track academic performance across all subjects
- **Weekly Calendar**: Interactive weekly schedule view
- **Exam Calendar**: Track upcoming exams
- **Courses**: Browse enrolled courses with progress tracking
- **Assignments**: Manage and track pending assignments
- **Groups**: View and manage study groups
- **Profile**: Manage account information

## Tech Stack

- **React 19** - UI framework
- **React Router DOM 6** - Client-side routing
- **Vite** - Build tool and development server
- **CSS3** - Styling with CSS variables for theming

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running at `http://localhost:3000` (see [Student Portal API](https://github.com/dou3aa-ux/student-portal-api))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dou3aa-ux/miniprojet.git
   cd miniprojet
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── services/
│   └── api.js          # API service layer with all backend endpoints
├── context/
│   └── AuthContext.jsx # Authentication context and provider
├── components/
│   ├── Sidebar.jsx     # Navigation sidebar
│   ├── Topbar.jsx      # Top navigation bar
│   └── ProtectedRoute.jsx  # Route protection wrapper
├── pages/
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Registration page
│   ├── Dashboard.jsx   # Main dashboard
│   ├── Courses.jsx     # Courses list
│   ├── Assignments.jsx # Assignments/tasks
│   ├── Grades.jsx      # Grades view
│   ├── WeeklyCalendar.jsx  # Weekly schedule
│   ├── ExamCalendar.jsx    # Exam schedule
│   ├── Groups.jsx      # Group management
│   ├── Profile.jsx     # User profile
│   └── Auth.css        # Auth pages styling
├── App.jsx             # Main app component with routing
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## API Integration

The application integrates with a NestJS backend API. Key endpoints:

### Authentication
- `POST /auth/register` - Register a new student
- `POST /auth/login` - Login student

### Classes
- `GET /classes` - Get all classes
- `GET /classes/:id` - Get class details

### Dashboard
- `GET /students/me/dashboard` - Get student dashboard data

### Grades (CRUD)
- `GET /grades` - Get all grades
- `POST /grades` - Create a grade
- `PATCH /grades/:id` - Update a grade
- `DELETE /grades/:id` - Delete a grade

### Schedules (CRUD)
- `GET /schedules` - Get all schedules
- `POST /schedules` - Create a schedule
- `PATCH /schedules/:id` - Update a schedule
- `DELETE /schedules/:id` - Delete a schedule

### Announcements (CRUD)
- `GET /announcements` - Get all announcements
- `POST /announcements` - Create an announcement
- `PATCH /announcements/:id` - Update an announcement
- `DELETE /announcements/:id` - Delete an announcement

## Environment Variables

Create a `.env` file in the root directory to configure:

```
VITE_API_BASE_URL=http://localhost:3000
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Design System

The application uses a consistent design system with CSS variables:

```css
:root {
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --color-background-primary: #ffffff;
  --color-background-secondary: #f8f9fc;
  --color-background-tertiary: #f4f4f7;
  --color-text-primary: #1f2937;
  --color-text-secondary: #64748b;
  --color-text-tertiary: #94a3b8;
  --color-border-tertiary: #e2e8f0;
  --border-radius-md: 10px;
  --border-radius-lg: 14px;
}
```

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Purple | #534AB7 | Primary actions, accents |
| Light Purple | #EEEDFE | Hover states, highlights |
| Green | #3B6D11 | Success, positive indicators |
| Blue | #185FA5 | Information, secondary actions |
| Amber | #854F0B | Warnings |
| Coral | #D85A30 | Errors, urgent items |
| Red | #A32D2D | Critical errors |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Icons from Material Design Icons
- Design inspired by modern dashboard UI patterns