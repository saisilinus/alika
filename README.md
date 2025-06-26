# 🚀 Alika Platform

A comprehensive campaign banner generation platform built with Next.js and Express.js.

## ✨ Features

- **🎨 Banner Generation** - Create stunning campaign banners with templates
- **👥 User Management** - Role-based access control (Admin, Moderator, User)
- **📊 Admin Dashboard** - Complete analytics and management interface
- **🔐 Authentication** - Secure JWT-based authentication with refresh tokens
- **📁 File Upload** - Advanced file handling with Sharp image processing
- **💬 Comments System** - Interactive campaign feedback and collaboration
- **📱 Responsive Design** - Mobile-first design with Tailwind CSS
- **🗄️ Database Integration** - PostgreSQL with Supabase

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI components
- **Lucide React** - Beautiful icons

### Backend
- **Express.js** - Node.js web framework
- **PostgreSQL** - Relational database
- **Supabase** - Database hosting and authentication
- **JWT** - JSON Web Tokens for authentication
- **Sharp** - High-performance image processing
- **Multer** - File upload handling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### 1. Clone Repository
\`\`\`bash
git clone https://github.com/your-username/alika.git
cd alika
\`\`\`

### 2. Automated Setup
\`\`\`bash
npm run setup
\`\`\`

This will:
- Install all dependencies (frontend & backend)
- Create environment files from templates
- Set up necessary directories
- Provide next steps guidance

### 3. Configure Environment

#### Frontend (`.env.local`)
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

#### Backend (`server/.env`)
\`\`\`env
DATABASE_URL=your_supabase_database_url
JWT_ACCESS_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
\`\`\`

### 4. Database Setup
\`\`\`bash
npm run setup:db
\`\`\`

### 5. Start Development
\`\`\`bash
# Start both frontend and backend
npm run dev:full

# Or start separately
npm run dev              # Frontend (port 3000)
npm run dev:backend      # Backend (port 5000)
\`\`\`

## 📁 Project Structure

\`\`\`
alika/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard
│   ├── campaign/          # Campaign pages
│   ├── api/               # API routes
│   └── terminal/          # Web terminal
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── auth-modal.tsx    # Authentication modal
│   ├── banner-preview.tsx # Banner preview
│   └── photo-upload.tsx  # File upload
├── server/               # Express.js backend
│   ├── routes/          # API routes
│   ├── config/          # Configuration
│   ├── middleware/      # Express middleware
│   └── uploads/         # File storage
├── scripts/             # Setup and utility scripts
└── lib/                 # Utility functions
\`\`\`

## 🔧 Available Scripts

### Frontend
\`\`\`bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
\`\`\`

### Backend
\`\`\`bash
npm run dev:backend      # Start backend development
npm run setup:backend    # Install backend dependencies
npm run setup:db         # Initialize database
\`\`\`

### Full Stack
\`\`\`bash
npm run setup            # Complete project setup
npm run dev:full         # Start both servers
npm run build:all        # Build entire project
\`\`\`

## 🗄️ Database Schema

### Users Table
- `id` - Primary key
- `email` - Unique email address
- `password` - Hashed password
- `role` - User role (admin, moderator, user)
- `created_at` - Registration timestamp

### Campaigns Table
- `id` - Primary key
- `title` - Campaign title
- `description` - Campaign description
- `user_id` - Foreign key to users
- `status` - Campaign status
- `created_at` - Creation timestamp

### Comments Table
- `id` - Primary key
- `content` - Comment text
- `user_id` - Foreign key to users
- `campaign_id` - Foreign key to campaigns
- `created_at` - Comment timestamp

## 🔐 Authentication

### Default Admin Account
\`\`\`
Email: admin@alika.com
Password: admin123
\`\`\`
⚠️ **Change this password in production!**

### JWT Configuration
- **Access Token**: 15 minutes expiry
- **Refresh Token**: 7 days expiry
- **Automatic refresh** on API calls

## 📊 Admin Features

- **Dashboard Analytics** - User stats, campaign metrics
- **User Management** - View, edit, delete users
- **Campaign Management** - Moderate and manage campaigns
- **File Management** - Upload statistics and storage
- **System Settings** - Platform configuration

## 🔒 Security Features

- **JWT Authentication** with refresh tokens
- **Password hashing** with bcrypt
- **Rate limiting** on API endpoints
- **File validation** and sanitization
- **CORS protection**
- **Helmet security headers**

## 🌐 Deployment

### Environment Variables
Ensure all production environment variables are set:
- Database URLs
- JWT secrets (generate with `openssl rand -base64 32`)
- File storage credentials
- External API keys

### Build Commands
\`\`\`bash
npm run build:all        # Build frontend and backend
npm start                # Start production server
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

- **Documentation**: Check this README
- **Issues**: Open GitHub issues
- **Web Terminal**: Visit `/terminal` for database management
- **Admin Panel**: Visit `/admin` for administration

---

Built with ❤️ by the Alika Team
