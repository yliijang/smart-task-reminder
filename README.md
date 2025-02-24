# Smart Task Reminder Assistant

A modern web application for managing tasks and receiving intelligent reminders based on priority levels.

## Features

- **Task Management**
  - Create, view, edit, and delete tasks
  - Set priority levels (high/medium/low)
  - Schedule reminders
  
- **Smart Reminders**
  - Scheduled notifications
  - Priority-based alert system
  - Customizable sound alerts
  
- **Modern UI**
  - Minimalistic and futuristic design
  - Responsive layout
  - Gradient-based theme
  
- **Customizable Settings**
  - Sound preferences
  - Theme customization
  - Notification preferences

## Tech Stack

- **Backend**
  - FastAPI (Python web framework)
  - SQLAlchemy (ORM)
  - APScheduler (Task scheduling)
  - PostgreSQL (Database)

- **Frontend**
  - React
  - Tailwind CSS
  - Web Notifications API
  - TypeScript

## Live Demo

Visit our live demo at: [https://smart-task-reminder.vercel.app](https://smart-task-reminder.vercel.app)

## Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/smart-task-reminder.git
   cd smart-task-reminder
   ```

2. Set up backend:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Configure database:
   ```bash
   # Create PostgreSQL database
   createdb task_reminder
   
   # Copy environment variables file
   cp .env.example .env
   # Edit .env file with your database settings
   ```

4. Set up frontend:
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   ```

5. Start the services:
   ```bash
   # Start backend (in backend directory)
   uvicorn app.main:app --reload

   # Start frontend (in frontend directory)
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Deployment

### Backend Deployment (Railway)

1. Create a Railway account at https://railway.app
2. Install Railway CLI:
   ```bash
   npm i -g @railway/cli
   ```

3. Login to Railway:
   ```bash
   railway login
   ```

4. Initialize Railway project:
   ```bash
   railway init
   ```

5. Add PostgreSQL:
   ```bash
   railway add postgresql
   ```

6. Deploy:
   ```bash
   railway up
   ```

### Frontend Deployment (Vercel)

1. Create a Vercel account at https://vercel.com
2. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

3. Deploy:
   ```bash
   cd frontend
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/task_reminder
ENVIRONMENT=development
DEBUG=True
FRONTEND_URL=http://localhost:3000
SECRET_KEY=your-secret-key
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 