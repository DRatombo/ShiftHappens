const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session middleware
app.use(session({
    secret: 'budget-buddy-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// In-memory storage for demo purposes
let users = [];
let userBudgets = [];
let userXP = {};

// Authentication middleware
const requireAuth = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({ error: 'Authentication required' });
    }
};

// Page Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/income', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'income.html'));
});

app.get('/savings-goals', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'savings-goals.html'));
});

app.get('/expenses', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'expenses.html'));
});

app.get('/dashboard', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// API Routes
// User Authentication
app.post('/api/auth/signup', (req, res) => {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name,
        email,
        password, // In production, hash this password
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    userXP[newUser.id] = 0;
    
    // Set session
    req.session.userId = newUser.id;
    req.session.userName = newUser.name;
    
    res.json({ 
        success: true, 
        user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    req.session.userId = user.id;
    req.session.userName = user.name;
    
    res.json({ 
        success: true, 
        user: { id: user.id, name: user.name, email: user.email }
    });
});

app.post('/api/auth/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

app.get('/api/auth/me', requireAuth, (req, res) => {
    const user = users.find(u => u.id === req.session.userId);
    res.json({ 
        user: { id: user.id, name: user.name, email: user.email }
    });
});

// Budget Management
app.post('/api/budget', requireAuth, (req, res) => {
    const budget = req.body;
    budget.id = Date.now();
    budget.userId = req.session.userId;
    budget.createdAt = new Date().toISOString();
    userBudgets.push(budget);
    
    // Calculate initial XP based on savings goal
    const xpEarned = calculateXP(budget);
    userXP[req.session.userId] = (userXP[req.session.userId] || 0) + xpEarned;
    
    res.json({ 
        success: true, 
        budget: budget,
        xpEarned: xpEarned,
        totalXP: userXP[req.session.userId]
    });
});

app.get('/api/budget', requireAuth, (req, res) => {
    const userBudgetsList = userBudgets.filter(b => b.userId === req.session.userId);
    res.json({ 
        budgets: userBudgetsList, 
        totalXP: userXP[req.session.userId] || 0 
    });
});

app.post('/api/xp/convert', requireAuth, (req, res) => {
    const { xpAmount } = req.body;
    const currentXP = userXP[req.session.userId] || 0;
    
    if (currentXP >= xpAmount && xpAmount >= 20) {
        userXP[req.session.userId] = currentXP - xpAmount;
        const vouchers = Math.floor(xpAmount / 20);
        
        res.json({ 
            success: true, 
            vouchersEarned: vouchers,
            remainingXP: userXP[req.session.userId]
        });
    } else {
        res.json({ 
            success: false, 
            message: 'Insufficient XP or minimum 20 XP required' 
        });
    }
});

app.get('/api/reflection', requireAuth, (req, res) => {
    const userBudgetsList = userBudgets.filter(b => b.userId === req.session.userId);
    const latestBudget = userBudgetsList[userBudgetsList.length - 1];
    
    if (!latestBudget) {
        return res.json({ message: 'No budget data available' });
    }
    
    const reflection = generateMonthlyReflection(latestBudget);
    res.json(reflection);
});

// Helper functions
function calculateXP(budget) {
    let xp = 10; // Base XP for creating a budget
    
    // Bonus XP for longer savings goals
    const savingsGoalMonths = parseInt(budget.savingsGoal);
    xp += savingsGoalMonths * 2;
    
    // Bonus XP for having a balanced budget
    const totalExpenses = parseFloat(budget.essentialExpenses) + 
                         parseFloat(budget.entertainmentExpenses) + 
                         parseFloat(budget.miscellaneousExpenses);
    const income = parseFloat(budget.income);
    const savingsRate = (income - totalExpenses) / income;
    
    if (savingsRate > 0.2) xp += 15; // 20%+ savings rate
    else if (savingsRate > 0.1) xp += 10; // 10%+ savings rate
    else if (savingsRate > 0) xp += 5; // Any savings
    
    return xp;
}

function generateMonthlyReflection(budget) {
    const totalExpenses = parseFloat(budget.essentialExpenses) + 
                         parseFloat(budget.entertainmentExpenses) + 
                         parseFloat(budget.miscellaneousExpenses);
    const income = parseFloat(budget.income);
    const savings = income - totalExpenses;
    const savingsRate = (savings / income) * 100;
    
    let insights = [];
    let recommendations = [];
    
    // Generate insights
    if (savingsRate > 20) {
        insights.push("Excellent savings rate! You're on track for financial success.");
    } else if (savingsRate > 10) {
        insights.push("Good savings rate. Consider increasing it for better financial security.");
    } else if (savingsRate > 0) {
        insights.push("You're saving something, which is great! Try to increase your savings rate.");
    } else {
        insights.push("You're spending more than you earn. Let's work on reducing expenses.");
    }
    
    // Generate recommendations
    const entertainmentRatio = (parseFloat(budget.entertainmentExpenses) / income) * 100;
    if (entertainmentRatio > 20) {
        recommendations.push("Consider reducing entertainment expenses to increase savings.");
    }
    
    const essentialRatio = (parseFloat(budget.essentialExpenses) / income) * 100;
    if (essentialRatio > 60) {
        recommendations.push("Your essential expenses are quite high. Look for ways to reduce fixed costs.");
    }
    
    return {
        month: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        totalIncome: income,
        totalExpenses: totalExpenses,
        savings: savings,
        savingsRate: savingsRate.toFixed(1),
        insights: insights,
        recommendations: recommendations,
        xpEarned: calculateXP(budget)
    };
}

app.listen(PORT, () => {
    console.log(`Budget Buddy server running on http://localhost:${PORT}`);
});
