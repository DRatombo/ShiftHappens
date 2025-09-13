# 💰 Budget Buddy - Personal Finance Management App

A comprehensive, gamified budget management application built with Node.js, Express, and modern web technologies. Track your income, set savings goals, manage expenses, and earn XP rewards for staying on budget!

## 🚀 Features

### 📊 **Core Functionality**
- **Income Tracking** - Multiple income sources with ZAR currency support
- **Savings Goals** - Set 3, 6, 9, or 12-month savings targets with enhanced multi-goal support
- **Expense Management** - Categorize expenses (Essential, Entertainment, Miscellaneous)
- **Real-time Calculations** - Live budget updates and savings rate tracking
- **Progress Visualization** - Visual progress bars and charts
- **Monthly Reflections** - AI-generated insights and recommendations

### 🎮 **Gamification System**
- **XP Rewards** - Earn points for completing budget setup and staying on track
- **Level System** - Progress through levels based on XP earned
- **Voucher Conversion** - Convert XP to real rewards (20 XP = 1 voucher)
- **Achievement Tracking** - Visual progress indicators

### 📱 **User Experience**
- **Responsive Design** - Works perfectly on desktop and mobile
- **Multi-page Application** - Guided setup process with step-by-step navigation
- **User Authentication** - Secure signup/login with session management
- **Smart Navigation** - Intelligent routing between setup flow and direct access
- **Error Handling** - Comprehensive error management and user feedback

## 🛠️ Technology Stack

### **Backend Technologies**
- **Node.js** (v22.19.0) - JavaScript runtime environment
- **Express.js** (v4.21.2) - Web application framework
- **Express Session** (v1.18.2) - Session management middleware
- **CORS** (v2.8.5) - Cross-origin resource sharing
- **Body Parser** (v1.20.3) - HTTP request parsing middleware

### **Frontend Technologies**
- **HTML5** - Semantic markup with modern standards
- **CSS3** - Custom styling with Tailwind CSS framework
- **Vanilla JavaScript** - Client-side functionality with ES6+ features
- **Responsive Design** - Mobile-first approach with CSS Grid and Flexbox

### **Styling Framework**
- **Tailwind CSS** (v4.1.13) - Utility-first CSS framework
- **PostCSS** (v8.5.6) - CSS post-processor
- **Autoprefixer** (v10.4.21) - CSS vendor prefix automation
- **Tailwind Forms** (v0.5.10) - Form styling plugin

### **Development Tools**
- **Nodemon** (v3.1.10) - Development server with auto-restart
- **npm** (v10.9.3) - Package manager

### **Data Storage**
- **In-Memory Storage** - Session-based data persistence
- **User Sessions** - Secure authentication state management
- **Session Storage** - Client-side temporary data storage

## 📁 Project Structure & Framework

```
Budget Buddy/
├── 📄 Configuration Files
│   ├── package.json              # Dependencies and scripts
│   ├── package-lock.json        # Dependency lock file
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   └── README.md                # Project documentation
│
├── 🚀 Deployment Files
│   ├── deploy.bat               # Windows deployment script
│   ├── deploy.sh                # Unix/Linux deployment script
│   └── DEPLOYMENT_GUIDE.md      # Deployment instructions
│
├── 🖥️ Server Files
│   └── server.js                # Express server with API routes
│
├── 📁 Source Files
│   └── src/
│       └── input.css            # Tailwind CSS input file
│
└── 📁 Public Assets
    └── public/
        ├── 🏠 Pages
        │   ├── homepage.html         # Landing page
        │   ├── signup.html           # User registration/login
        │   ├── income.html           # Income setup page
        │   ├── savings-goals.html    # Basic savings goals
        │   ├── savings-goals-enhanced.html # Advanced multi-goal setup
        │   ├── expenses.html         # Expense tracking
        │   ├── dashboard.html        # Main financial dashboard
        │   ├── rewards-center.html   # XP and rewards management
        │   └── profile.html          # User profile management
        │
        ├── 🎨 Styling
        │   └── styles.css            # Compiled Tailwind CSS
        │
        └── 📜 Scripts
            └── script.js             # Legacy single-page script
```

## 🏗️ Application Architecture

### **MVC Pattern Implementation**
- **Model**: Data structures for users, budgets, and XP
- **View**: HTML templates with embedded JavaScript
- **Controller**: Express.js routes and middleware

### **Client-Server Architecture**
- **Frontend**: Multi-page application with vanilla JavaScript
- **Backend**: RESTful API with Express.js
- **Communication**: JSON over HTTP

### **Session-Based Authentication**
- **Session Management**: Express-session middleware
- **Route Protection**: Authentication middleware
- **User State**: Server-side session storage

## 🚀 Quick Start

### **Prerequisites**
- Node.js (v14 or higher)
- npm (Node Package Manager)

### **Installation**

1. **Clone or download the project**
   ```bash
   cd "Budget Buddy"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build CSS (if needed)**
   ```bash
   npm run build-css
   ```

4. **Start the server**
   ```bash
   npm start
   # or
   node server.js
   ```

5. **Open your browser**
   - Go to `http://localhost:3000`
   - Start your financial journey!

### **Development Mode**
```bash
npm run dev  # Starts with nodemon for auto-restart
```

## 🌐 Application Routes

### **Public Routes**
- `GET /` - Homepage with app introduction
- `GET /signup` - User registration and login

### **Protected Routes** (Require Authentication)
- `GET /income` - Income setup page
- `GET /savings-goals` - Savings goals configuration (enhanced version)
- `GET /expenses` - Expense tracking setup
- `GET /dashboard` - Main financial dashboard
- `GET /rewards-center` - XP and rewards management
- `GET /profile` - User profile management

### **API Endpoints**

#### **Authentication**
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

#### **Budget Management**
- `POST /api/budget` - Save budget data
- `GET /api/budget` - Retrieve user budgets
- `POST /api/xp/convert` - Convert XP to vouchers
- `GET /api/reflection` - Get monthly reflection

## 💡 Usage Guide

### **1. Getting Started**
1. Visit the homepage at `http://localhost:3000`
2. Click "Get Started" to create an account
3. Fill in your personal details (name, email, password)

### **2. Setting Up Your Budget**
1. **Income Setup** - Enter your monthly income in ZAR
2. **Savings Goals** - Choose your target duration and amount (enhanced multi-goal support)
3. **Expenses** - Categorize your spending habits
4. **Dashboard** - View your complete financial overview

### **3. Tracking Progress**
- Monitor your savings goal progress
- Earn XP points for staying on budget
- Convert XP to vouchers for rewards
- Read monthly reflections for insights

## 🎯 Key Features Explained

### **XP Rewards System**
- **Base XP**: 10 points for creating a budget
- **Duration Bonus**: +2 XP per month of savings goal
- **Savings Rate Bonus**: 
  - 20%+ savings rate: +15 XP
  - 10%+ savings rate: +10 XP
  - Any savings: +5 XP

### **Budget Categories**
- **Essential Expenses**: Rent, utilities, groceries, transport, insurance
- **Entertainment**: Dining out, streaming services, hobbies, movies
- **Miscellaneous**: Shopping, gifts, healthcare, unexpected costs

### **Currency Support**
- All monetary values displayed in **South African Rand (ZAR)**
- Proper currency formatting with "R" symbol
- Localized number formatting

### **Smart Navigation System**
- **Setup Flow**: Guided process for new users
- **Direct Access**: Existing users can navigate directly to any page
- **Data Compatibility**: Handles multiple data formats seamlessly
- **Error Recovery**: Graceful handling of missing data

## 🔧 Development

### **Available Scripts**
```bash
npm start          # Start the server
npm run dev        # Start with nodemon (auto-restart)
npm run build-css  # Build Tailwind CSS
```

### **Environment Variables**
- `PORT` - Server port (default: 3000)

### **Data Models**

#### **User**
```javascript
{
  id: Number,
  name: String,
  email: String,
  password: String,
  createdAt: String
}
```

#### **Budget**
```javascript
{
  id: Number,
  userId: Number,
  income: {
    primaryIncome: Number,
    secondaryIncome: Number,
    otherIncome: Number,
    incomeFrequency: String
  },
  savings: {
    category: String,
    targetAmount: Number,
    duration: Number,
    monthlySavings: Number
  },
  expenses: {
    essential: Object,
    entertainment: Object,
    miscellaneous: Object
  },
  totals: {
    essential: Number,
    entertainment: Number,
    miscellaneous: Number,
    total: Number
  },
  createdAt: String
}
```

## 🎨 Styling Framework

### **Tailwind CSS Configuration**
- **Custom Color Palette**: Primary (blue), Secondary (purple), Accent (gold)
- **Custom Components**: Buttons, forms, cards, progress bars
- **Responsive Design**: Mobile-first breakpoints
- **Custom Animations**: Float, glow, shimmer effects
- **Typography**: Inter font family integration

### **CSS Architecture**
- **Utility-First**: Small, reusable classes
- **Component-Based**: Custom component classes
- **Responsive**: Mobile-first approach
- **Modern**: CSS Grid and Flexbox layouts

## 🔒 Security Features

- **Session-based authentication** - Secure user sessions
- **Route protection** - Middleware for protected pages
- **Input validation** - Client and server-side validation
- **CORS enabled** - Cross-origin request handling
- **Error handling** - Comprehensive error management

## 📱 Browser Compatibility

- **Chrome** (recommended)
- **Firefox**
- **Safari**
- **Edge**
- **Mobile browsers**

## 🚀 Deployment

The application is ready for deployment to platforms like:
- **Heroku**
- **Vercel**
- **Netlify**
- **DigitalOcean**
- **AWS**

### **Production Considerations**
- Replace in-memory storage with a database (MongoDB, PostgreSQL)
- Add password hashing (bcrypt)
- Implement HTTPS
- Add environment variable configuration
- Set up proper logging
- Add database migrations

## 🐛 Known Issues & Fixes

### **Recently Fixed Issues**
- ✅ **Expenses Tab Navigation**: Fixed redirect issues after savings goals setup
- ✅ **Data Format Compatibility**: Resolved mismatch between savings data formats
- ✅ **Port Conflicts**: Added proper process management
- ✅ **Missing Files**: Created missing profile.html page
- ✅ **Smart Navigation**: Implemented intelligent routing system

### **Error Handling**
- Comprehensive error messages for users
- Console logging for debugging
- Graceful fallbacks for missing data
- Session storage validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues:
1. Check the browser console for errors
2. Ensure all dependencies are installed (`npm install`)
3. Verify the server is running on port 3000
4. Check that all files are in the correct directories
5. Use the deployment scripts (`deploy.bat` or `deploy.sh`)

## 🎉 Acknowledgments

- Built with modern web technologies
- Inspired by gamification principles
- Designed for South African users (ZAR currency)
- Focused on user experience and accessibility
- Comprehensive error handling and edge case management

---

**Budget Buddy** - Take control of your finances, one budget at a time! 💰✨

*Last Updated: September 2024*