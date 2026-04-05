/* ============================================
   FINSIGHT — App Logic & Interactivity
   ============================================ */

// ── Mock Data ──
const MOCK_DATA = {
  balance: 47250,
  monthlyIncome: 50000,
  spending: {
    food: 8500,
    transport: 3200,
    shopping: 5800,
    entertainment: 4200,
    bills: 9500,
    health: 2100,
    education: 1500,
    other: 2700
  },
  weeklySpending: [2800, 3100, 1900, 4200, 3500, 2100, 1850],
  monthlyTrend: [
    { month: 'Oct', amount: 32000 },
    { month: 'Nov', amount: 28500 },
    { month: 'Dec', amount: 41000 },
    { month: 'Jan', amount: 35200 },
    { month: 'Feb', amount: 29800 },
    { month: 'Mar', amount: 37500 }
  ],
  transactions: [
    { name: 'Swiggy Order', category: 'food', amount: -450, icon: '🍕', time: '2 hrs ago' },
    { name: 'Salary Credit', category: 'income', amount: 50000, icon: '💰', time: 'Yesterday' },
    { name: 'Uber Ride', category: 'transport', amount: -280, icon: '🚕', time: 'Yesterday' },
    { name: 'Netflix', category: 'entertainment', amount: -649, icon: '🎮', time: '2 days ago' },
    { name: 'Amazon', category: 'shopping', amount: -2499, icon: '🛍️', time: '3 days ago' },
    { name: 'Electricity Bill', category: 'bills', amount: -1850, icon: '📱', time: '4 days ago' },
    { name: 'Gym Membership', category: 'health', amount: -1200, icon: '💊', time: '5 days ago' },
    { name: 'Coursera', category: 'education', amount: -999, icon: '📚', time: '1 week ago' }
  ],
  goals: [
    { id: 1, name: 'Emergency Fund', icon: '🏥', target: 50000, saved: 35000, streak: 12, deadline: 'Jun 2026', badge: 'On Track' },
    { id: 2, name: 'Weekend Trip', icon: '✈️', target: 25000, saved: 18500, streak: 8, deadline: 'May 2026', badge: 'Almost!' },
    { id: 3, name: 'New Laptop', icon: '💻', target: 80000, saved: 22000, streak: 5, deadline: 'Dec 2026', badge: 'Building' }
  ],
  moodHistory: [
    { day: 'Mon', emoji: '😊', mood: 'proud' },
    { day: 'Tue', emoji: '😎', mood: 'confident' },
    { day: 'Wed', emoji: '😐', mood: 'neutral' },
    { day: 'Thu', emoji: '😰', mood: 'anxious' },
    { day: 'Fri', emoji: '😊', mood: 'proud' },
    { day: 'Sat', emoji: '😎', mood: 'confident' },
    { day: 'Sun', emoji: '', mood: null }
  ],
  insights: [
    { icon: '🔥', title: 'Dining spike detected', desc: 'You spent 23% more on food this week compared to your average. Consider meal prepping?', bg: 'bg-red' },
    { icon: '🎉', title: 'Great saving streak!', desc: "You've saved consistently for 12 weeks straight — that's in the top 10% of Finsight users.", bg: 'bg-green' },
    { icon: '💡', title: 'Bill optimization', desc: 'Your electricity bill is 15% higher than similar households. Check for energy-saving options.', bg: 'bg-amber' }
  ],
  merchants: [
    { name: 'Swiggy', amount: 4200, percent: 35 },
    { name: 'Amazon', amount: 3800, percent: 32 },
    { name: 'Uber', amount: 2100, percent: 18 },
    { name: 'Netflix', amount: 649, percent: 5 },
    { name: 'Others', amount: 1200, percent: 10 }
  ]
};

const CATEGORY_COLORS = {
  food: '#f87171',
  transport: '#60a5fa',
  shopping: '#f472b6',
  entertainment: '#a855f7',
  bills: '#fbbf24',
  health: '#34d399',
  education: '#818cf8',
  other: '#94a3b8'
};

const CATEGORY_ICONS = {
  food: '🍕',
  transport: '🚕',
  shopping: '🛍️',
  entertainment: '🎮',
  bills: '📱',
  health: '💊',
  education: '📚',
  other: '📦',
  income: '💰'
};

// ── State ──
let currentScreen = 'onboarding';
let onboardingStep = 1;
let checkinStep = 1;
let selectedMood = null;
let selectedCategory = 'food';
let selectedGoalIcon = '✈️';

// ── Navigation ──
function navigateTo(screen) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active', 'slide-in');
  });

  // Show target screen
  const target = document.getElementById(`screen-${screen}`);
  if (target) {
    target.classList.add('active', 'slide-in');
    currentScreen = screen;
  }

  // Update nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.screen === screen);
  });

  // Show/hide FAB
  const fab = document.getElementById('fab');
  if (fab) {
    fab.classList.toggle('hidden', screen !== 'dashboard');
  }

  // Re-trigger animations for the screen
  if (screen === 'dashboard') renderDashboard();
  if (screen === 'insights') renderInsights();
  if (screen === 'goals') renderGoals();
  if (screen === 'mood') renderMoodScreen();
}

// ── Onboarding ──
function nextOnboardingStep() {
  onboardingStep++;
  if (onboardingStep > 3) {
    completeOnboarding();
    return;
  }
  
  document.querySelectorAll('.onboarding-step').forEach(step => {
    step.classList.remove('active');
  });
  document.querySelector(`.onboarding-step[data-step="${onboardingStep}"]`).classList.add('active');

  document.querySelectorAll('.step-dot').forEach(dot => {
    dot.classList.remove('active');
  });
  document.querySelector(`.step-dot[data-dot="${onboardingStep}"]`).classList.add('active');
}

function skipOnboarding() {
  completeOnboarding();
}

function completeOnboarding() {
  // Show nav and FAB
  document.getElementById('bottom-nav').classList.remove('hidden');
  document.getElementById('fab').classList.remove('hidden');
  navigateTo('dashboard');
}

function togglePriority(el) {
  el.classList.toggle('selected');
}

// ── Dashboard Rendering ──
function renderDashboard() {
  // Animated balance counter
  animateCounter('balance-display', MOCK_DATA.balance, '₹');

  // Total spent
  const totalSpent = Object.values(MOCK_DATA.spending).reduce((a, b) => a + b, 0);
  animateCounter('total-spent', totalSpent, '₹');

  // Spending donut chart
  renderDonut();

  // Goal progress ring
  const topGoal = MOCK_DATA.goals[0];
  const goalPercent = topGoal.saved / topGoal.target;
  const circumference = 2 * Math.PI * 22;
  const offset = circumference * (1 - goalPercent);
  setTimeout(() => {
    const ring = document.getElementById('goal-ring');
    if (ring) ring.style.strokeDashoffset = offset;
  }, 300);
  const goalText = document.getElementById('goal-progress-text');
  if (goalText) goalText.textContent = `₹${formatNum(topGoal.saved)} / ₹${formatNum(topGoal.target)}`;

  // Sparkline
  renderSparkline();

  // Transactions
  renderTransactions();
}

function animateCounter(elementId, target, prefix = '', suffix = '') {
  const el = document.getElementById(elementId);
  if (!el) return;
  
  let current = 0;
  const duration = 1200;
  const steps = 40;
  const increment = target / steps;
  const interval = duration / steps;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = `${prefix}${formatNum(Math.round(current))}${suffix}`;
  }, interval);
}

function formatNum(num) {
  return num.toLocaleString('en-IN');
}

function renderDonut() {
  const canvas = document.getElementById('spending-donut');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const centerX = 100;
  const centerY = 100;
  const radius = 72;
  const lineWidth = 20;
  
  const categories = Object.entries(MOCK_DATA.spending);
  const total = categories.reduce((sum, [, val]) => sum + val, 0);
  
  ctx.clearRect(0, 0, 200, 200);
  
  let startAngle = -Math.PI / 2;
  
  // Animate donut segments
  let progress = 0;
  const animDuration = 1500;
  const startTime = performance.now();
  
  function drawFrame(timestamp) {
    progress = Math.min((timestamp - startTime) / animDuration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    
    ctx.clearRect(0, 0, 200, 200);
    startAngle = -Math.PI / 2;
    
    categories.forEach(([cat, amount]) => {
      const sliceAngle = (amount / total) * 2 * Math.PI * eased;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.strokeStyle = CATEGORY_COLORS[cat] || '#64748b';
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.stroke();
      
      startAngle += sliceAngle + 0.03;
    });
    
    if (progress < 1) requestAnimationFrame(drawFrame);
  }
  
  requestAnimationFrame(drawFrame);
  
  // Legend
  const legendEl = document.getElementById('donut-legend');
  if (legendEl) {
    const topCats = categories.sort((a, b) => b[1] - a[1]).slice(0, 4);
    legendEl.innerHTML = topCats.map(([cat, amount]) => `
      <div class="legend-item">
        <span class="legend-dot" style="background: ${CATEGORY_COLORS[cat]}"></span>
        <span>${cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
        <span class="legend-value">₹${formatNum(amount)}</span>
      </div>
    `).join('');
  }
}

function renderSparkline() {
  const container = document.getElementById('dashboard-sparkline');
  if (!container) return;
  
  const maxVal = Math.max(...MOCK_DATA.weeklySpending);
  container.innerHTML = MOCK_DATA.weeklySpending.map((val, i) => {
    const height = (val / maxVal) * 100;
    return `<div class="sparkline-bar" style="height: 0%" data-height="${height}"></div>`;
  }).join('');
  
  // Animate bars
  setTimeout(() => {
    container.querySelectorAll('.sparkline-bar').forEach((bar, i) => {
      setTimeout(() => {
        bar.style.height = bar.dataset.height + '%';
      }, i * 80);
    });
  }, 400);
}

function renderTransactions() {
  const list = document.getElementById('transaction-list');
  if (!list) return;
  
  list.innerHTML = MOCK_DATA.transactions.slice(0, 5).map((t, i) => {
    const isIncome = t.amount > 0;
    const amountStr = isIncome ? `+₹${formatNum(t.amount)}` : `-₹${formatNum(Math.abs(t.amount))}`;
    const colorClass = isIncome ? 'income' : 'expense';
    const bgClass = isIncome ? 'bg-green' : getCategoryBg(t.category);
    
    return `
      <div class="transaction-item animate-in" style="animation-delay: ${i * 0.08}s">
        <div class="transaction-icon ${bgClass}">${t.icon}</div>
        <div class="transaction-info">
          <div class="transaction-name">${t.name}</div>
          <div class="transaction-category">${t.time}</div>
        </div>
        <div class="transaction-amount ${colorClass}">${amountStr}</div>
      </div>
    `;
  }).join('');
}

function getCategoryBg(cat) {
  const map = {
    food: 'bg-red', transport: 'bg-blue', shopping: 'bg-pink',
    entertainment: 'bg-purple', bills: 'bg-amber', health: 'bg-green',
    education: 'bg-indigo', other: 'bg-teal', income: 'bg-green'
  };
  return map[cat] || 'bg-teal';
}

// ── Insights Rendering ──
function renderInsights() {
  renderSpendingBars();
  renderCategoryBreakdown();
  renderInsightCards();
  renderTopMerchants();
}

function renderSpendingBars() {
  const container = document.getElementById('spending-bars');
  if (!container) return;
  
  const maxAmount = Math.max(...MOCK_DATA.monthlyTrend.map(m => m.amount));
  
  container.innerHTML = MOCK_DATA.monthlyTrend.map((m, i) => {
    const heightPercent = (m.amount / maxAmount) * 100;
    const isLast = i === MOCK_DATA.monthlyTrend.length - 1;
    
    return `
      <div class="bar-col">
        <div class="bar-value">₹${(m.amount / 1000).toFixed(0)}k</div>
        <div class="bar ${isLast ? '' : 'muted'}" style="height: 0%" data-height="${heightPercent}%" title="₹${formatNum(m.amount)}"></div>
        <div class="bar-label">${m.month}</div>
      </div>
    `;
  }).join('');
  
  // Animate
  setTimeout(() => {
    container.querySelectorAll('.bar').forEach((bar, i) => {
      setTimeout(() => {
        bar.style.height = bar.dataset.height;
      }, i * 100);
    });
  }, 300);
}

function renderCategoryBreakdown() {
  const container = document.getElementById('category-breakdown');
  if (!container) return;
  
  const categories = Object.entries(MOCK_DATA.spending).sort((a, b) => b[1] - a[1]);
  const total = categories.reduce((sum, [, val]) => sum + val, 0);
  
  container.innerHTML = categories.map(([cat, amount]) => {
    const percent = (amount / total) * 100;
    
    return `
      <div class="category-bar-item">
        <div class="category-bar-header">
          <div class="category-bar-label">
            <span>${CATEGORY_ICONS[cat] || '📦'}</span>
            <span>${cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
          </div>
          <span class="category-bar-amount">₹${formatNum(amount)}</span>
        </div>
        <div class="category-bar-track">
          <div class="category-bar-fill" style="width: 0%; background: ${CATEGORY_COLORS[cat]}" data-width="${percent}%"></div>
        </div>
      </div>
    `;
  }).join('');
  
  // Animate fills
  setTimeout(() => {
    container.querySelectorAll('.category-bar-fill').forEach((fill, i) => {
      setTimeout(() => {
        fill.style.width = fill.dataset.width;
      }, i * 80);
    });
  }, 400);
}

function renderInsightCards() {
  const container = document.getElementById('insight-cards');
  if (!container) return;
  
  container.innerHTML = MOCK_DATA.insights.map(insight => `
    <div class="insight-card">
      <div class="insight-icon ${insight.bg}">${insight.icon}</div>
      <div class="insight-text">
        <div class="insight-title">${insight.title}</div>
        <div class="insight-desc">${insight.desc}</div>
      </div>
    </div>
  `).join('');
}

function renderTopMerchants() {
  const container = document.getElementById('top-merchants');
  if (!container) return;
  
  container.innerHTML = MOCK_DATA.merchants.map((m, i) => `
    <div class="transaction-item" style="margin-bottom: 8px;">
      <div class="transaction-icon bg-indigo" style="font-size: 0.875rem; font-weight: 700;">${i + 1}</div>
      <div class="transaction-info">
        <div class="transaction-name">${m.name}</div>
        <div class="transaction-category">${m.percent}% of spending</div>
      </div>
      <div class="transaction-amount expense">₹${formatNum(m.amount)}</div>
    </div>
  `).join('');
}

// Period selector
document.querySelectorAll('.period-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

// ── Goals Rendering ──
function renderGoals() {
  const grid = document.getElementById('goals-grid');
  if (!grid) return;
  
  grid.innerHTML = MOCK_DATA.goals.map((goal, i) => {
    const percent = Math.round((goal.saved / goal.target) * 100);
    const isWarning = percent < 30;
    
    return `
      <div class="glass-card goal-card animate-in" style="animation-delay: ${i * 0.1}s">
        <div class="goal-top">
          <span class="goal-emoji">${goal.icon}</span>
          <span class="goal-badge ${isWarning ? 'warning' : ''}">${goal.badge}</span>
        </div>
        <div class="goal-name">${goal.name}</div>
        <div class="goal-progress-text">₹${formatNum(goal.saved)} of ₹${formatNum(goal.target)} · ${percent}%</div>
        <div class="goal-progress-bar">
          <div class="goal-progress-fill ${isWarning ? 'warning' : ''}" style="width: 0%" data-width="${percent}%"></div>
        </div>
        <div class="goal-footer">
          <div class="goal-streak">🔥 ${goal.streak} week streak</div>
          <div class="goal-deadline">${goal.deadline}</div>
        </div>
      </div>
    `;
  }).join('');
  
  // Animate progress bars
  setTimeout(() => {
    grid.querySelectorAll('.goal-progress-fill').forEach((fill, i) => {
      setTimeout(() => {
        fill.style.width = fill.dataset.width;
      }, i * 150 + 300);
    });
  }, 100);
  
  // Update summary
  const totalSaved = MOCK_DATA.goals.reduce((sum, g) => sum + g.saved, 0);
  const avgProgress = Math.round(MOCK_DATA.goals.reduce((sum, g) => sum + (g.saved / g.target) * 100, 0) / MOCK_DATA.goals.length);
  
  const countEl = document.getElementById('active-goals-count');
  const savedEl = document.getElementById('total-saved-display');
  const avgEl = document.getElementById('avg-progress-display');
  
  if (countEl) countEl.textContent = MOCK_DATA.goals.length;
  if (savedEl) savedEl.textContent = `₹${formatNum(totalSaved)}`;
  if (avgEl) avgEl.textContent = `${avgProgress}%`;
}

// ── Money Mood ──
function renderMoodScreen() {
  const weekDisplay = document.getElementById('mood-week-display');
  if (!weekDisplay) return;
  
  weekDisplay.innerHTML = MOCK_DATA.moodHistory.map(m => {
    const isToday = m.day === 'Sun';
    const isEmpty = !m.emoji;
    return `
      <div class="mood-day">
        <span class="day-label">${m.day}</span>
        <span class="day-emoji ${isToday ? 'today' : ''} ${isEmpty ? 'empty' : ''}">${m.emoji || '·'}</span>
      </div>
    `;
  }).join('');
}

function selectMood(el, mood) {
  document.querySelectorAll('.mood-option').forEach(opt => opt.classList.remove('selected'));
  el.classList.add('selected');
  selectedMood = mood;
  document.getElementById('mood-next-btn').disabled = false;
}

function nextCheckinStep() {
  checkinStep++;
  document.querySelectorAll('.checkin-step').forEach(step => step.classList.remove('active'));
  
  const target = document.querySelector(`.checkin-step[data-checkin="${checkinStep}"]`);
  if (target) target.classList.add('active');
  
  if (checkinStep === 3) {
    // Record the mood
    const moodEmojis = { confident: '😎', proud: '🥳', neutral: '😐', anxious: '😰', guilty: '😔' };
    const todayMood = MOCK_DATA.moodHistory.find(m => m.day === 'Sun');
    if (todayMood && selectedMood) {
      todayMood.emoji = moodEmojis[selectedMood];
      todayMood.mood = selectedMood;
    }
    renderMoodScreen();
    
    // Update dashboard mini mood
    if (selectedMood) {
      const miniEmoji = document.getElementById('mood-emoji-mini');
      if (miniEmoji) miniEmoji.textContent = moodEmojis[selectedMood];
    }
  }
}

function resetCheckin() {
  checkinStep = 1;
  selectedMood = null;
  document.querySelectorAll('.checkin-step').forEach(step => step.classList.remove('active'));
  document.querySelector('.checkin-step[data-checkin="1"]').classList.add('active');
  document.querySelectorAll('.mood-option').forEach(opt => opt.classList.remove('selected'));
  document.getElementById('mood-next-btn').disabled = true;
  document.getElementById('mood-journal').value = '';
}

// ── Add Expense ──
function openAddExpense() {
  openModal('expense-modal');
}

function selectCategory(el) {
  document.querySelectorAll('#expense-category .category-option').forEach(opt => opt.classList.remove('selected'));
  el.classList.add('selected');
  selectedCategory = el.dataset.cat;
}

function addExpense() {
  const amountInput = document.getElementById('expense-amount');
  const noteInput = document.getElementById('expense-note');
  const amount = parseInt(amountInput.value.replace(/[^0-9]/g, ''));
  
  if (!amount || amount <= 0) {
    amountInput.style.borderColor = 'var(--color-danger)';
    setTimeout(() => amountInput.style.borderColor = '', 1500);
    return;
  }
  
  // Add to transactions
  MOCK_DATA.transactions.unshift({
    name: noteInput.value || `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} expense`,
    category: selectedCategory,
    amount: -amount,
    icon: CATEGORY_ICONS[selectedCategory],
    time: 'Just now'
  });
  
  // Update spending
  MOCK_DATA.spending[selectedCategory] = (MOCK_DATA.spending[selectedCategory] || 0) + amount;
  MOCK_DATA.balance -= amount;
  
  closeModal('expense-modal');
  showSuccess('Expense Added!');
  
  // Clear form
  amountInput.value = '';
  noteInput.value = '';
  
  // Re-render dashboard
  setTimeout(() => renderDashboard(), 600);
}

// ── Add Goal ──
function openAddGoal() {
  openModal('goal-modal');
}

function selectGoalIcon(el) {
  document.querySelectorAll('#goal-icon-picker .category-option').forEach(opt => opt.classList.remove('selected'));
  el.classList.add('selected');
  selectedGoalIcon = el.dataset.icon;
}

function addGoal() {
  const nameInput = document.getElementById('goal-name-input');
  const amountInput = document.getElementById('goal-amount-input');
  const name = nameInput.value.trim();
  const target = parseInt(amountInput.value.replace(/[^0-9]/g, ''));
  
  if (!name || !target) {
    if (!name) nameInput.style.borderColor = 'var(--color-danger)';
    if (!target) amountInput.style.borderColor = 'var(--color-danger)';
    setTimeout(() => {
      nameInput.style.borderColor = '';
      amountInput.style.borderColor = '';
    }, 1500);
    return;
  }
  
  MOCK_DATA.goals.push({
    id: Date.now(),
    name: name,
    icon: selectedGoalIcon,
    target: target,
    saved: 0,
    streak: 0,
    deadline: 'TBD',
    badge: 'New'
  });
  
  closeModal('goal-modal');
  showSuccess('Goal Created! 🎯');
  
  // Clear
  nameInput.value = '';
  amountInput.value = '';
  
  setTimeout(() => renderGoals(), 600);
}

// ── Modal Management ──
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    // Delay to trigger transition
    requestAnimationFrame(() => {
      modal.querySelector('.modal-content').style.transform = 'translateY(0)';
    });
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.querySelector('.modal-content').style.transform = 'translateY(100%)';
    setTimeout(() => modal.classList.remove('active'), 300);
  }
}

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function(e) {
    if (e.target === this) {
      this.querySelector('.modal-content').style.transform = 'translateY(100%)';
      setTimeout(() => this.classList.remove('active'), 300);
    }
  });
});

// ── Success Animation ──
function showSuccess(text) {
  const overlay = document.getElementById('success-overlay');
  const textEl = document.getElementById('success-text');
  if (overlay && textEl) {
    textEl.textContent = text;
    overlay.classList.add('active');
    setTimeout(() => overlay.classList.remove('active'), 1500);
  }
}

// ── Greeting based on time ──
function updateGreeting() {
  const hour = new Date().getHours();
  let greeting;
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 17) greeting = 'Good afternoon';
  else greeting = 'Good evening';
  
  const el = document.querySelector('.user-greeting h2');
  if (el) el.innerHTML = `${greeting}, <span class="text-gradient">Alex</span>`;
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  updateGreeting();
  
  // Check if already onboarded (localStorage)
  if (localStorage.getItem('finsight_onboarded')) {
    completeOnboarding();
  }
});

// Save onboarding state
const originalComplete = completeOnboarding;
completeOnboarding = function() {
  localStorage.setItem('finsight_onboarded', 'true');
  document.getElementById('bottom-nav').classList.remove('hidden');
  document.getElementById('fab').classList.remove('hidden');
  navigateTo('dashboard');
};

// Keyboard support for amount inputs
document.querySelectorAll('#expense-amount, #goal-amount-input, #income-input').forEach(input => {
  input.addEventListener('input', function() {
    let val = this.value.replace(/[^0-9]/g, '');
    if (val) {
      this.value = '₹ ' + parseInt(val).toLocaleString('en-IN');
    } else {
      this.value = '';
    }
  });
});
