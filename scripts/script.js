// Budget Buddy Application JavaScript

class BudgetBuddy {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.totalXP = 0;
        this.budgetData = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadUserData();
        this.setupTooltips();
    }

    setupEventListeners() {
        // Welcome section
        document.getElementById('startBtn').addEventListener('click', () => this.startSetup());
        
        // Form navigation
        document.getElementById('nextToSavings').addEventListener('click', () => this.nextStep(2));
        document.getElementById('backToIncome').addEventListener('click', () => this.prevStep(1));
        document.getElementById('nextToExpenses').addEventListener('click', () => this.nextStep(3));
        document.getElementById('backToSavings').addEventListener('click', () => this.prevStep(2));
        document.getElementById('nextToReview').addEventListener('click', () => this.nextStep(4));
        document.getElementById('backToExpenses').addEventListener('click', () => this.prevStep(3));
        
        // Form submission
        document.getElementById('budgetForm').addEventListener('submit', (e) => this.submitBudget(e));
        
        // XP conversion
        document.getElementById('convertXP').addEventListener('click', () => this.convertXP());
        
        // Modal
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        
        // Real-time form updates
        document.getElementById('income').addEventListener('input', () => this.updateReview());
        document.getElementById('savingsGoal').addEventListener('change', () => this.updateReview());
        document.getElementById('essentialExpenses').addEventListener('input', () => this.updateReview());
        document.getElementById('entertainmentExpenses').addEventListener('input', () => this.updateReview());
        document.getElementById('miscellaneousExpenses').addEventListener('input', () => this.updateReview());
    }

    setupTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => this.showTooltip(e));
            element.addEventListener('mouseleave', () => this.hideTooltip());
        });
    }

    showTooltip(event) {
        const tooltipId = event.target.getAttribute('data-tooltip');
        const tooltip = document.getElementById(tooltipId);
        if (tooltip) {
            const rect = event.target.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.bottom + 5) + 'px';
            tooltip.classList.add('show');
        }
    }

    hideTooltip() {
        const tooltips = document.querySelectorAll('.tooltip');
        tooltips.forEach(tooltip => tooltip.classList.remove('show'));
    }

    startSetup() {
        document.getElementById('welcome-section').classList.add('hidden');
        document.getElementById('progress-section').classList.remove('hidden');
        document.getElementById('budget-form-section').classList.remove('hidden');
        this.updateProgress();
    }

    nextStep(step) {
        if (this.validateCurrentStep()) {
            this.currentStep = step;
            this.updateProgress();
            this.updateFormSteps();
        }
    }

    prevStep(step) {
        this.currentStep = step;
        this.updateProgress();
        this.updateFormSteps();
    }

    validateCurrentStep() {
        switch (this.currentStep) {
            case 1:
                const income = document.getElementById('income').value;
                if (!income || parseFloat(income) <= 0) {
                    this.showError('Please enter a valid monthly income amount.');
                    return false;
                }
                break;
            case 2:
                const savingsGoal = document.getElementById('savingsGoal').value;
                if (!savingsGoal) {
                    this.showError('Please select a savings goal duration.');
                    return false;
                }
                break;
            case 3:
                const essential = document.getElementById('essentialExpenses').value;
                const entertainment = document.getElementById('entertainmentExpenses').value;
                const misc = document.getElementById('miscellaneousExpenses').value;
                
                if (!essential || !entertainment || !misc) {
                    this.showError('Please fill in all expense categories.');
                    return false;
                }
                
                if (parseFloat(essential) < 0 || parseFloat(entertainment) < 0 || parseFloat(misc) < 0) {
                    this.showError('Expense amounts cannot be negative.');
                    return false;
                }
                break;
        }
        return true;
    }

    updateProgress() {
        const indicators = document.querySelectorAll('.step-indicator');
        indicators.forEach((indicator, index) => {
            const stepNumber = index + 1;
            indicator.classList.remove('active', 'completed', 'pending');
            
            if (stepNumber < this.currentStep) {
                indicator.classList.add('completed');
            } else if (stepNumber === this.currentStep) {
                indicator.classList.add('active');
            } else {
                indicator.classList.add('pending');
            }
        });
    }

    updateFormSteps() {
        const steps = document.querySelectorAll('.form-step');
        steps.forEach((step, index) => {
            if (index + 1 === this.currentStep) {
                step.classList.remove('hidden');
            } else {
                step.classList.add('hidden');
            }
        });
    }

    updateReview() {
        const income = parseFloat(document.getElementById('income').value) || 0;
        const essential = parseFloat(document.getElementById('essentialExpenses').value) || 0;
        const entertainment = parseFloat(document.getElementById('entertainmentExpenses').value) || 0;
        const misc = parseFloat(document.getElementById('miscellaneousExpenses').value) || 0;
        const savingsGoal = document.getElementById('savingsGoal').value || '0';
        
        const totalExpenses = essential + entertainment + misc;
        const savings = income - totalExpenses;
        const savingsRate = income > 0 ? (savings / income) * 100 : 0;
        
        // Update review display
        document.getElementById('review-income').textContent = `$${income.toLocaleString()}`;
        document.getElementById('review-essential').textContent = `$${essential.toLocaleString()}`;
        document.getElementById('review-entertainment').textContent = `$${entertainment.toLocaleString()}`;
        document.getElementById('review-misc').textContent = `$${misc.toLocaleString()}`;
        document.getElementById('review-total-expenses').textContent = `$${totalExpenses.toLocaleString()}`;
        document.getElementById('review-savings').textContent = `$${savings.toLocaleString()}`;
        document.getElementById('review-goal').textContent = `${savingsGoal} months`;
        document.getElementById('review-rate').textContent = `${savingsRate.toFixed(1)}%`;
        
        // Color coding for savings
        const savingsElement = document.getElementById('review-savings');
        if (savings < 0) {
            savingsElement.className = 'font-semibold text-red-600';
        } else if (savings > 0) {
            savingsElement.className = 'font-semibold text-green-600';
        } else {
            savingsElement.className = 'font-semibold text-gray-600';
        }
    }

    async submitBudget(event) {
        event.preventDefault();
        
        if (!this.validateCurrentStep()) {
            return;
        }
        
        const formData = new FormData(event.target);
        this.budgetData = {
            income: parseFloat(formData.get('income')),
            savingsGoal: formData.get('savingsGoal'),
            essentialExpenses: parseFloat(formData.get('essentialExpenses')),
            entertainmentExpenses: parseFloat(formData.get('entertainmentExpenses')),
            miscellaneousExpenses: parseFloat(formData.get('miscellaneousExpenses'))
        };
        
        try {
            const response = await fetch('/api/budget', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.budgetData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.totalXP = result.totalXP;
                this.updateXPDisplay();
                this.showSuccessModal(result.xpEarned);
                this.showAdditionalSections();
                this.loadMonthlyReflection();
            } else {
                this.showError('Failed to save budget. Please try again.');
            }
        } catch (error) {
            console.error('Error saving budget:', error);
            this.showError('Network error. Please check your connection and try again.');
        }
    }

    showSuccessModal(xpEarned) {
        document.getElementById('earnedXP').textContent = xpEarned;
        document.getElementById('successModal').classList.remove('hidden');
        document.getElementById('successModal').classList.add('flex');
    }

    closeModal() {
        document.getElementById('successModal').classList.add('hidden');
        document.getElementById('successModal').classList.remove('flex');
    }

    showAdditionalSections() {
        document.getElementById('xp-section').classList.remove('hidden');
        document.getElementById('reflection-section').classList.remove('hidden');
        document.getElementById('rewards-section').classList.remove('hidden');
    }

    updateXPDisplay() {
        document.getElementById('totalXP').textContent = this.totalXP;
        document.getElementById('currentXP').textContent = `${this.totalXP} / 100`;
        
        const progressPercentage = Math.min((this.totalXP / 100) * 100, 100);
        document.getElementById('xpProgressBar').style.width = `${progressPercentage}%`;
    }

    async loadUserData() {
        try {
            const response = await fetch('/api/budget');
            const data = await response.json();
            
            if (data.budgets && data.budgets.length > 0) {
                this.totalXP = data.totalXP;
                this.updateXPDisplay();
                this.showAdditionalSections();
                this.loadMonthlyReflection();
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }

    async loadMonthlyReflection() {
        try {
            const response = await fetch('/api/reflection');
            const reflection = await response.json();
            
            if (reflection.month) {
                this.displayReflection(reflection);
            }
        } catch (error) {
            console.error('Error loading reflection:', error);
        }
    }

    displayReflection(reflection) {
        const content = document.getElementById('reflection-content');
        content.innerHTML = `
            <div class="mb-6">
                <h4 class="text-lg font-semibold text-gray-800 mb-4">${reflection.month} Reflection</h4>
                <div class="grid md:grid-cols-2 gap-4 mb-6">
                    <div class="bg-white rounded-lg p-4">
                        <h5 class="font-semibold text-gray-700 mb-2">Financial Summary</h5>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Total Income:</span>
                                <span class="font-semibold">$${reflection.totalIncome.toLocaleString()}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Total Expenses:</span>
                                <span class="font-semibold">$${reflection.totalExpenses.toLocaleString()}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Monthly Savings:</span>
                                <span class="font-semibold text-green-600">$${reflection.savings.toLocaleString()}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Savings Rate:</span>
                                <span class="font-semibold text-primary-600">${reflection.savingsRate}%</span>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg p-4">
                        <h5 class="font-semibold text-gray-700 mb-2">XP Earned</h5>
                        <div class="text-center">
                            <div class="text-3xl font-bold text-primary-600">+${reflection.xpEarned}</div>
                            <div class="text-sm text-gray-600">XP Points</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mb-6">
                <h5 class="font-semibold text-gray-700 mb-3">Insights</h5>
                <div class="space-y-2">
                    ${reflection.insights.map(insight => `
                        <div class="flex items-start space-x-2">
                            <span class="text-green-500 mt-1">✓</span>
                            <span class="text-gray-700">${insight}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            ${reflection.recommendations.length > 0 ? `
                <div>
                    <h5 class="font-semibold text-gray-700 mb-3">Recommendations</h5>
                    <div class="space-y-2">
                        ${reflection.recommendations.map(rec => `
                            <div class="flex items-start space-x-2">
                                <span class="text-blue-500 mt-1">💡</span>
                                <span class="text-gray-700">${rec}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        `;
    }

    async convertXP() {
        const xpAmount = parseInt(document.getElementById('xpToConvert').value);
        
        if (!xpAmount || xpAmount < 20) {
            this.showError('Please enter at least 20 XP to convert.');
            return;
        }
        
        if (xpAmount % 20 !== 0) {
            this.showError('XP amount must be a multiple of 20.');
            return;
        }
        
        try {
            const response = await fetch('/api/xp/convert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ xpAmount })
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.totalXP = result.remainingXP;
                this.updateXPDisplay();
                
                const resultDiv = document.getElementById('conversion-result');
                resultDiv.innerHTML = `
                    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                        Success! You earned ${result.vouchersEarned} voucher(s)! 🎁
                    </div>
                `;
                
                document.getElementById('xpToConvert').value = '';
            } else {
                this.showError(result.message || 'Failed to convert XP. Please try again.');
            }
        } catch (error) {
            console.error('Error converting XP:', error);
            this.showError('Network error. Please try again.');
        }
    }

    showError(message) {
        // Create a temporary error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        
        // Remove after 5 seconds
        setTimeout(() => {
            document.body.removeChild(errorDiv);
        }, 5000);
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BudgetBuddy();
});

// Add some fun animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-2px)';
            card.style.transition = 'transform 0.2s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Add click animations to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});
