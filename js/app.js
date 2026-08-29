// TASK OS - Core Application Engine
(function () {
  'use strict';

  // Initial State matching the user's screenshots exactly
  const state = {
    theme: localStorage.getItem('task_os_theme') || 'light', // light or dark
    lang: localStorage.getItem('task_os_lang') || 'en',      // en or ar
    balance: 0.00,
    currency: 'EGP',
    activeNav: 'dashboard',
    tasks: [
      { id: 1, name: 'qwdwqd', priority: 'P1', completed: false, workspace: 'Production', date: 'today' },
      { id: 2, name: 'لنر', priority: 'P3', completed: false, workspace: 'Content', date: 'today' },
      { id: 3, name: 'ويسوسيو', priority: 'P3', completed: false, workspace: 'Content', date: 'today' },
      { id: 4, name: 'sdfsdf', priority: 'P3', completed: false, workspace: 'Production', date: 'today' },
      { id: 5, name: 'sdf', priority: 'P3', completed: false, workspace: 'Management', date: 'today' },
      { id: 6, name: 'ddfsdf', priority: 'P3', completed: false, workspace: 'Personal', date: 'today' },
      { id: 7, name: 'gggf', priority: 'P3', completed: false, workspace: 'Production', date: 'today' }
    ]
  };

  // UI Element References
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  const taskListEl = document.getElementById('task-list');
  const newTaskBtn = document.getElementById('new-task-btn');
  const newTaskModal = document.getElementById('new-task-modal');
  const closeModalBtn = document.getElementById('modal-close-btn');
  const cancelModalBtn = document.getElementById('modal-cancel-btn');
  const taskForm = document.getElementById('task-form');
  const searchTrigger = document.getElementById('search-trigger');
  const cmdPaletteBtn = document.getElementById('cmd-palette-btn');
  const cmdModal = document.getElementById('cmd-modal');
  const closeCmdModalBtn = document.getElementById('cmd-modal-close');
  const cmdInput = document.getElementById('cmd-input');
  const cmdList = document.getElementById('cmd-list');
  const toastContainer = document.getElementById('toast-container');

  // Stat elements
  const statTodayTasks = document.getElementById('stat-today-tasks');
  const statTotalActive = document.getElementById('stat-total-active');
  const statPendingReview = document.getElementById('stat-pending-review');
  const statWalletBalance = document.getElementById('stat-wallet-balance');
  const statTopBalance = document.getElementById('stat-top-balance');
  const statCompletedWeek = document.getElementById('stat-completed-week');

  // Translations Dictionary
  const translations = {
    en: {
      search: '>_ SEARCH',
      currBalance: 'CURRENT BALANCE',
      greeting: 'Good morning,',
      dashboard: 'Dashboard',
      newTask: '+ New Task',
      overview: 'OVERVIEW',
      inbox: 'Inbox',
      todayAll: 'TODAY / ALL TASKS',
      today: 'Today',
      tomorrow: 'Tomorrow',
      thisWeek: 'This Week',
      overdue: 'Overdue',
      allTasks: 'All Tasks',
      workspaces: 'WORKSPACES',
      production: 'Production',
      content: 'Content',
      management: 'Management',
      personal: 'Personal',
      cmdPalette: 'COMMAND PALETTE',
      todayTasksTitle: "TODAY'S TASKS",
      pendingReviewTitle: 'PENDING REVIEW',
      walletBalanceTitle: 'WALLET BALANCE',
      completedWeekTitle: 'COMPLETED THIS WEEK',
      totalActiveSub: 'total active',
      awaitingApproval: 'Awaiting your approval',
      tasksPaidWeek: 'tasks paid this week',
      tasksCompletedSub: 'tasks completed',
      mostImportantTasks: 'MOST IMPORTANT TASKS',
      approachingDeadlines: 'APPROACHING DEADLINES',
      noDeadlines: 'No deadlines approaching',
      taskAddedSuccess: 'Task created successfully',
      taskCompleted: 'Task marked as completed',
      taskUncompleted: 'Task moved back to active'
    },
    ar: {
      search: '>_ بحث',
      currBalance: 'الرصيد الحالي',
      greeting: 'صباح الخير،',
      dashboard: 'لوحة التحكم',
      newTask: '+ مهمة جديدة',
      overview: 'نظرة عامة',
      inbox: 'الوارد',
      todayAll: 'اليوم / كل المهام',
      today: 'اليوم',
      tomorrow: 'غداً',
      thisWeek: 'هذا الأسبوع',
      overdue: 'متأخرة',
      allTasks: 'كل المهام',
      workspaces: 'مساحات العمل',
      production: 'الإنتاج',
      content: 'المحتوى',
      management: 'الإدارة',
      personal: 'شخصي',
      cmdPalette: 'لوحة الأوامر',
      todayTasksTitle: 'مهام اليوم',
      pendingReviewTitle: 'قيد المراجعة',
      walletBalanceTitle: 'رصيد المحفظة',
      completedWeekTitle: 'المكتمل هذا الأسبوع',
      totalActiveSub: 'إجمالي النشط',
      awaitingApproval: 'بانتظار موافقتك',
      tasksPaidWeek: 'مهام مدفوعة هذا الأسبوع',
      tasksCompletedSub: 'مهام مكتملة',
      mostImportantTasks: 'أهم المهام',
      approachingDeadlines: 'المواعيد النهائية القادمة',
      noDeadlines: 'لا توجد مواعيد نهائية قريبة',
      taskAddedSuccess: 'تمت إضافة المهمة بنجاح',
      taskCompleted: 'تم إكمال المهمة',
      taskUncompleted: 'تمت إعادة المهمة للنشطة'
    }
  };

  // Toast System
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // Theme Engine
  function applyTheme(theme) {
    state.theme = theme;
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('task_os_theme', theme);

    if (themeToggleBtn) {
      if (theme === 'dark') {
        // Sun Icon for Dark Mode
        themeToggleBtn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
          </svg>`;
      } else {
        // Moon Icon for Light Mode
        themeToggleBtn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </svg>`;
      }
    }
  }

  // Language Engine
  function applyLang(lang) {
    state.lang = lang;
    htmlEl.setAttribute('lang', lang);
    htmlEl.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('task_os_lang', lang);

    if (langToggleBtn) {
      langToggleBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
          <path d="M2 12h20"></path>
        </svg>
        <span>${lang === 'ar' ? 'EN' : 'AR'}</span>
      `;
    }

    // Apply translations
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.textContent = t[key];
      }
    });

    renderStats();
  }

  // Render Stats Counters
  function renderStats() {
    const activeTasks = state.tasks.filter(t => !t.completed);
    const completedTasks = state.tasks.filter(t => t.completed);

    if (statTodayTasks) statTodayTasks.textContent = '0';
    if (statTotalActive) statTotalActive.textContent = `${activeTasks.length} ${translations[state.lang].totalActiveSub}`;
    if (statPendingReview) statPendingReview.textContent = '0';
    if (statWalletBalance) statWalletBalance.textContent = `${state.currency} ${state.balance.toFixed(2)}`;
    if (statTopBalance) statTopBalance.textContent = `${state.currency} ${state.balance.toFixed(2)}`;
    if (statCompletedWeek) statCompletedWeek.textContent = `${completedTasks.length}`;
  }

  // Render Tasks List
  function renderTasks() {
    if (!taskListEl) return;
    taskListEl.innerHTML = '';

    state.tasks.forEach(task => {
      const row = document.createElement('div');
      row.className = 'task-item-row';
      row.setAttribute('data-task-id', task.id);

      const priorityClass = (task.priority || 'p3').toLowerCase();

      row.innerHTML = `
        <div class="task-item-left">
          <span class="priority-dot ${priorityClass}"></span>
          <span class="task-name" style="${task.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${task.name}</span>
        </div>
        <span class="priority-badge">${task.priority}</span>
      `;

      row.addEventListener('click', () => {
        task.completed = !task.completed;
        renderTasks();
        renderStats();
        showToast(task.completed ? translations[state.lang].taskCompleted : translations[state.lang].taskUncompleted);
      });

      taskListEl.appendChild(row);
    });
  }

  // Setup Event Listeners
  function initEvents() {
    // Theme Toggle
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        applyTheme(state.theme === 'light' ? 'dark' : 'light');
      });
    }

    // Language Toggle
    if (langToggleBtn) {
      langToggleBtn.addEventListener('click', () => {
        applyLang(state.lang === 'en' ? 'ar' : 'en');
      });
    }

    // Modal Opening & Closing
    if (newTaskBtn) {
      newTaskBtn.addEventListener('click', () => {
        newTaskModal.classList.add('active');
        document.getElementById('task-title-input').focus();
      });
    }

    function closeModal() {
      if (newTaskModal) newTaskModal.classList.remove('active');
      if (taskForm) taskForm.reset();
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeModal);
    if (newTaskModal) {
      newTaskModal.addEventListener('click', (e) => {
        if (e.target === newTaskModal) closeModal();
      });
    }

    // Form Submission
    if (taskForm) {
      taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('task-title-input').value.trim();
        const priority = document.getElementById('task-priority-select').value;
        const workspace = document.getElementById('task-workspace-select').value;

        if (title) {
          const newTask = {
            id: Date.now(),
            name: title,
            priority: priority,
            completed: false,
            workspace: workspace,
            date: 'today'
          };
          state.tasks.unshift(newTask);
          renderTasks();
          renderStats();
          closeModal();
          showToast(translations[state.lang].taskAddedSuccess);
        }
      });
    }

    // Command Palette Trigger
    function openCommandPalette() {
      if (cmdModal) {
        cmdModal.classList.add('active');
        if (cmdInput) {
          cmdInput.value = '';
          cmdInput.focus();
        }
        renderCmdList('');
      }
    }

    function closeCommandPalette() {
      if (cmdModal) cmdModal.classList.remove('active');
    }

    if (searchTrigger) searchTrigger.addEventListener('click', openCommandPalette);
    if (cmdPaletteBtn) cmdPaletteBtn.addEventListener('click', openCommandPalette);
    if (closeCmdModalBtn) closeCmdModalBtn.addEventListener('click', closeCommandPalette);
    if (cmdModal) {
      cmdModal.addEventListener('click', (e) => {
        if (e.target === cmdModal) closeCommandPalette();
      });
    }

    // Global Keybindings (Ctrl+K or Cmd+K)
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (cmdModal && cmdModal.classList.contains('active')) {
          closeCommandPalette();
        } else {
          openCommandPalette();
        }
      }
      if (e.key === 'Escape') {
        closeModal();
        closeCommandPalette();
      }
    });

    // Command Palette Filter & Actions
    if (cmdInput) {
      cmdInput.addEventListener('input', (e) => {
        renderCmdList(e.target.value.toLowerCase());
      });
    }

    function renderCmdList(query) {
      if (!cmdList) return;
      const commands = [
        { label: '➕ Create New Task', action: () => { closeCommandPalette(); newTaskBtn.click(); } },
        { label: '🌓 Toggle Dark/Light Theme', action: () => { themeToggleBtn.click(); closeCommandPalette(); } },
        { label: '🌐 Switch Language (AR / EN)', action: () => { langToggleBtn.click(); closeCommandPalette(); } },
        ...state.tasks.map(t => ({
          label: `Task: ${t.name} (${t.priority})`,
          action: () => {
            t.completed = !t.completed;
            renderTasks();
            renderStats();
            closeCommandPalette();
            showToast(`Toggled: ${t.name}`);
          }
        }))
      ];

      const filtered = commands.filter(c => c.label.toLowerCase().includes(query));
      cmdList.innerHTML = '';
      if (filtered.length === 0) {
        cmdList.innerHTML = '<div style="padding:12px;color:var(--text-muted);font-size:13px;">No commands found</div>';
        return;
      }
      filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = 'task-item-row';
        div.style.borderRadius = '6px';
        div.style.padding = '10px 14px';
        div.innerHTML = `<span style="font-size:13px;font-weight:500;">${item.label}</span>`;
        div.addEventListener('click', item.action);
        cmdList.appendChild(div);
      });
    }

    // Sidebar navigation active state toggle
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }

  // Initialize App
  function init() {
    applyTheme(state.theme);
    applyLang(state.lang);
    renderStats();
    renderTasks();
    initEvents();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
