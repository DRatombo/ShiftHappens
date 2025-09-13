> *This document serves as a template for you to write **setup** instructions for your project.* 

> Depending on the scale/complexity of your project, it may prove beneficial to have a **Python/Batch/Bash** script in the `scripts/` directory which *automatically sets-up* the project.

# Setup Instructions

Follow the steps below to set up and run the project. (Example)

---

## 📦 Requirements
``` c
// TODO: List software, runtimes, frameworks, and or dependencies
// along with instructions on how to set each up.
```

- **Node.js v14+** - JavaScript runtime environment
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`
- **npm** - Package manager (comes with Node.js)
  - Verify installation: `npm --version`
- **Git** - Version control system
  - Download from: https://git-scm.com/
  - Verify installation: `git --version`
- **Modern Web Browser** - Chrome, Firefox, Safari, or Edge
  - For testing and using the application


---

## ⚙️ Installation
``` bash
# Clone the repository
git clone <your-repo-url>
cd budget-buddy

# Install dependencies
npm install
```

## ▶️ Running the Project
``` bash
# Start the server
npm start

# OR for development with auto-restart
npm run dev

# OR use deployment scripts
# Windows:
deploy.bat

# Unix/Linux/Mac:
./deploy.sh
```

---

## 🚀 Quick Start (Alternative Methods)

### Method 1: Using Deployment Scripts
``` bash
# Windows users - double-click or run:
deploy.bat

# Unix/Linux/Mac users - run:
chmod +x deploy.sh
./deploy.sh
```

### Method 2: Manual Setup
``` bash
# 1. Install dependencies
npm install

# 2. Build CSS (if needed)
npm run build-css

# 3. Start the server
node server.js
```

### Method 3: Development Mode
``` bash
# Install dependencies
npm install

# Start with nodemon for auto-restart
npm run dev
```

---

## 🌐 Access the Application
- **Main URL**: http://localhost:3000
- **Server runs on**: Port 3000 (default)
- **Keep terminal open**: Server must stay running

---

## 🔧 Available Scripts
``` bash
npm start          # Start the server
npm run dev        # Start with nodemon (auto-restart)
npm run build-css  # Build Tailwind CSS
```

---

## ⚠️ Important Notes
- **Port 3000**: Ensure no other application is using this port
- **Server Persistence**: Keep the terminal window open while using the app
- **Data Storage**: Uses in-memory storage (resets when server restarts)
- **Browser Access**: Always use `http://localhost:3000` (not file:// protocol)

---

## 🆘 Troubleshooting
- **Server won't start**: Check if port 3000 is available
- **Dependencies issues**: Run `npm install` again
- **CSS not loading**: Run `npm run build-css`
- **Page not loading**: Ensure server is running and accessible
```
