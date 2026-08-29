// BOARDIFY - Clinical Operating System & Exam Platform
(function () {
  'use strict';

  // Application State
  const state = {
    theme: localStorage.getItem('boardify_theme') || 'task-os-amber',
    mode: localStorage.getItem('boardify_mode') || 'light',
    font: localStorage.getItem('boardify_font') || 'taskos-mono',
    lang: localStorage.getItem('boardify_lang') || 'en',
    balance: 0.00,
    currency: 'EGP',
    activeNav: 'dashboard',
    tasks: [
      {
        id: 1,
        name: 'qwdwqd',
        title: '62yo M with acute tearing chest pain radiating to back',
        vignette: 'A 62-year-old male with a history of poorly controlled hypertension presents to the emergency department with sudden-onset, severe, tearing chest pain that radiates between his shoulder blades. Blood pressure is 185/105 mmHg in the right arm and 135/80 mmHg in the left arm. A diastolic murmur is heard along the right sternal border.',
        question: 'What is the most definitive immediate diagnostic step in this hemodynamically stable patient?',
        options: [
          { letter: 'A', text: 'Transthoracic echocardiography (TTE)', correct: false },
          { letter: 'B', text: 'Contrast-enhanced CT angiography (CTA) of chest and abdomen', correct: true },
          { letter: 'C', text: 'Immediate intravenous thrombolysis with Alteplase', correct: false },
          { letter: 'D', text: 'Coronary angiography with primary percutaneous intervention', correct: false }
        ],
        rationale: 'Stanford Type A Aortic Dissection: CT Angiography (CTA) is the gold standard for confirmation in stable patients. Surgical consultation is mandatory. Thrombolysis is strictly contraindicated.',
        priority: 'P1',
        completed: false,
        workspace: 'USMLE Step 2',
        reward: 50.00
      },
      {
        id: 2,
        name: 'لنر',
        title: '58yo M with crushing substernal chest pressure & diaphoresis',
        vignette: 'مريض يبلغ من العمر 58 عاماً يعاني من ألم صدري ضاغط خلف عظم القص يمتد إلى الذراع اليسرى مصحوباً بتعرق شديد. أظهر تخطيط القلب ارتفاعاً في قطعة ST في الاتجاهات V1-V4.',
        question: 'ما هو التدبير الأنسب والأكثر أولوية في هذه الحالة؟',
        options: [
          { letter: 'A', text: 'قسطرة قلبية تداخلية عاجلة (Primary PCI) خلال 90 دقيقة', correct: true },
          { letter: 'B', text: 'إعطاء مسكنات أفيونية ومراقبة الإنزيمات القلبية', correct: false },
          { letter: 'C', text: 'إجراء اختبار الجهد القلبي', correct: false },
          { letter: 'D', text: 'إعطاء مضادات الحموضة الوريدية', correct: false }
        ],
        rationale: 'متلازمة الشريان التاجي الحادة (STEMI): تتطلب إعادة التروية العاجلة عبر القسطرة التداخلية (Primary PCI) في غضون 90 دقيقة من الوصول للمستشفى.',
        priority: 'P3',
        completed: false,
        workspace: 'MRCP Part 1',
        reward: 35.00
      },
      {
        id: 3,
        name: 'ويسوسيو',
        title: 'Arterial Blood Gas Analysis in acute exacerbation of COPD',
        vignette: 'نتائج فحص غازات الدم الشرياني (ABG) لمريض يبلغ من العمر 68 عاماً يعاني من تفاقم حاد لمرض الانسداد الرئوي المزمن: pH 7.28, PaCO2 58 mmHg, HCO3 26 mEq/L, PaO2 55 mmHg.',
        question: 'ما هو التفسير الدقيق لهذا الاضطراب الحمضي القاعدي؟',
        options: [
          { letter: 'A', text: 'حماض تنفسي حاد غير معاوض (Acute Respiratory Acidosis)', correct: true },
          { letter: 'B', text: 'قلاء استقلابي معاوض جزئياً', correct: false },
          { letter: 'C', text: 'حماض استقلابي مع فجوة صاعدة', correct: false },
          { letter: 'D', text: 'قلاء تنفسي ناتج عن فرط التهوية', correct: false }
        ],
        rationale: 'الحماض التنفسي الحاد ناتج عن احتباس ثاني أكسيد الكربون (CO2 retention) مع عدم اكتمال المعاوضة الكلوية للبيكربونات.',
        priority: 'P3',
        completed: false,
        workspace: 'Internal Medicine',
        reward: 35.00
      },
      {
        id: 4,
        name: 'sdfsdf',
        title: '45yo F with fluctuating bilateral ptosis and diplopia worsening at night',
        vignette: 'A 45-year-old female presents with progressive double vision and drooping of both eyelids that is mild in the morning and significantly worsens by evening. Repetitive nerve stimulation shows a decremental compound muscle action potential.',
        question: 'Which autoantibodies are most specific for this diagnosis?',
        options: [
          { letter: 'A', text: 'Anti-acetylcholine receptor (AChR) antibodies', correct: true },
          { letter: 'B', text: 'Anti-voltage gated calcium channel antibodies', correct: false },
          { letter: 'C', text: 'Anti-Jo-1 antibodies', correct: false },
          { letter: 'D', text: 'Anti-aquaporin-4 antibodies', correct: false }
        ],
        rationale: 'Myasthenia Gravis: Postsynaptic nicotinic AChR antibodies cause fatiguable weakness. Tensilon/Edrophonium test or Ice pack test is positive.',
        priority: 'P3',
        completed: false,
        workspace: 'PLAB / UKMLA',
        reward: 25.00
      },
      {
        id: 5,
        name: 'sdf',
        title: '28yo with periumbilical pain migrating to McBurney point',
        vignette: 'A 28-year-old male presents with 18 hours of abdominal pain that began around the umbilicus and has now localized to the right lower quadrant. Temperature is 38.3°C, WBC count is 14,500/mm³ with left shift.',
        question: 'What is the most appropriate management?',
        options: [
          { letter: 'A', text: 'Immediate laparoscopic appendectomy and IV antibiotics', correct: true },
          { letter: 'B', text: 'Discharge with oral analgesics and follow-up in 1 week', correct: false },
          { letter: 'C', text: 'Colonoscopy to evaluate for IBD', correct: false },
          { letter: 'D', text: 'Barium swallow study', correct: false }
        ],
        rationale: 'Acute Appendicitis: Classic migratory visceral to somatic pain. Alvarado score > 7 warrants urgent appendectomy to prevent perforation.',
        priority: 'P3',
        completed: false,
        workspace: 'General Surgery',
        reward: 25.00
      },
      {
        id: 6,
        name: 'ddfsdf',
        title: '55yo Diabetic with microalbuminuria and BP 142/88 mmHg',
        vignette: 'A 55-year-old male with type 2 diabetes mellitus has urine albumin-to-creatinine ratio of 280 mg/g (normal < 30) on two consecutive visits. Serum creatinine is 1.0 mg/dL.',
        question: 'Which initial antihypertensive class offers proven renoprotection in this patient?',
        options: [
          { letter: 'A', text: 'ACE inhibitor (e.g., Lisinopril) or ARB', correct: true },
          { letter: 'B', text: 'Dihydropyridine Calcium Channel Blocker (e.g., Amlodipine)', correct: false },
          { letter: 'C', text: 'Loop Diuretic (e.g., Furosemide)', correct: false },
          { letter: 'D', text: 'Beta-blocker (e.g., Atenolol)', correct: false }
        ],
        rationale: 'Diabetic Nephropathy: ACE inhibitors/ARBs dilate the efferent arteriole, reducing intraglomerular hydrostatic pressure and slowing progression.',
        priority: 'P3',
        completed: false,
        workspace: 'USMLE Step 1',
        reward: 25.00
      },
      {
        id: 7,
        name: 'gggf',
        title: '19yo basketball athlete with exertional dyspnea & systolic murmur',
        vignette: 'A 19-year-old collegiate athlete has an episode of near-syncope during high-intensity training. Cardiac auscultation reveals a harsh crescendo-decrescendo systolic murmur that INCREASES in intensity with Valsalva maneuver.',
        question: 'What is the underlying pathophysiology of this murmur change?',
        options: [
          { letter: 'A', text: 'Decreased left ventricular preload worsening dynamic LVOT obstruction', correct: true },
          { letter: 'B', text: 'Increased systemic vascular resistance reducing aortic valve gradient', correct: false },
          { letter: 'C', text: 'Rupture of chordae tendineae in mitral valve', correct: false },
          { letter: 'D', text: 'Pulmonary valve stenosis with right ventricular hypertrophy', correct: false }
        ],
        rationale: 'Hypertrophic Cardiomyopathy (HOCM): Decreased preload (Valsalva / standing) brings the anterior mitral leaflet closer to the septum, worsening LVOT obstruction and increasing the murmur.',
        priority: 'P3',
        completed: false,
        workspace: 'Cardiology Q-Bank',
        reward: 25.00
      }
    ]
  };

  // UI Element Selectors
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  const themeQuickSelect = document.getElementById('theme-quick-select');
  const fontQuickSelect = document.getElementById('font-quick-select');
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

  // Clinical Vignette Modal Elements
  const vignetteModal = document.getElementById('vignette-modal');
  const vignetteCloseBtn = document.getElementById('vignette-close-btn');
  const vignetteTitle = document.getElementById('vignette-title');
  const vignetteStem = document.getElementById('vignette-stem');
  const vignetteQuestion = document.getElementById('vignette-question');
  const vignetteOptions = document.getElementById('vignette-options');
  const vignetteRationale = document.getElementById('vignette-rationale');
  const vignetteActionBtn = document.getElementById('vignette-action-btn');

  // Stat Elements
  const statTodayTasks = document.getElementById('stat-today-tasks');
  const statTotalActive = document.getElementById('stat-total-active');
  const statPendingReview = document.getElementById('stat-pending-review');
  const statWalletBalance = document.getElementById('stat-wallet-balance');
  const statTopBalance = document.getElementById('stat-top-balance');
  const statCompletedWeek = document.getElementById('stat-completed-week');

  // Translations Map
  const translations = {
    en: {
      search: '>_ SEARCH',
      currBalance: 'CURRENT BALANCE',
      greeting: 'Good morning,',
      dashboard: 'Dashboard',
      newTask: '+ New Clinical Task',
      overview: 'OVERVIEW',
      inbox: 'Q-Bank Inbox',
      todayAll: 'TODAY / ALL TASKS',
      today: 'Today',
      tomorrow: 'Tomorrow',
      thisWeek: 'This Week',
      overdue: 'Incorrects / Overdue',
      allTasks: 'All Vignettes',
      workspaces: 'WORKSPACES',
      production: 'USMLE Step 1 / 2',
      content: 'MRCP Part 1 / 2',
      management: 'PLAB / UKMLA',
      personal: 'Cardio & Internal Med',
      cmdPalette: 'COMMAND PALETTE',
      todayTasksTitle: "TODAY'S TASKS",
      pendingReviewTitle: 'PENDING REVIEW',
      walletBalanceTitle: 'WALLET BALANCE',
      completedWeekTitle: 'COMPLETED THIS WEEK',
      totalActiveSub: 'total active',
      awaitingApproval: 'Awaiting your approval',
      tasksPaidWeek: '0 tasks paid this week',
      tasksCompletedSub: 'tasks completed',
      mostImportantTasks: 'MOST IMPORTANT TASKS',
      approachingDeadlines: 'APPROACHING DEADLINES',
      noDeadlines: 'No deadlines approaching',
      taskAddedSuccess: 'Clinical task created successfully',
      caseSolved: 'Case solved! Credits added to balance 🏆',
      caseReopened: 'Case moved back to active'
    },
    ar: {
      search: '>_ بحث',
      currBalance: 'الرصيد الحالي',
      greeting: 'صباح الخير،',
      dashboard: 'لوحة التحكم',
      newTask: '+ مهمة سريرية جديدة',
      overview: 'نظرة عامة',
      inbox: 'صندوق بنك الأسئلة',
      todayAll: 'اليوم / كل المهام',
      today: 'اليوم',
      tomorrow: 'غداً',
      thisWeek: 'هذا الأسبوع',
      overdue: 'الأسئلة الخاطئة / المراجعة',
      allTasks: 'كل الحالات السريرية',
      workspaces: 'مساحات العمل',
      production: 'USMLE Step 1 / 2',
      content: 'MRCP Part 1 / 2',
      management: 'PLAB / UKMLA',
      personal: 'الباطنة والقلبية',
      cmdPalette: 'لوحة الأوامر',
      todayTasksTitle: 'مهام اليوم',
      pendingReviewTitle: 'قيد المراجعة',
      walletBalanceTitle: 'رصيد المحفظة',
      completedWeekTitle: 'المكتمل هذا الأسبوع',
      totalActiveSub: 'إجمالي الحالات النشطة',
      awaitingApproval: 'بانتظار موافقتك',
      tasksPaidWeek: '0 مهام مدفوعة هذا الأسبوع',
      tasksCompletedSub: 'حالات مكتملة',
      mostImportantTasks: 'أهم المهام',
      approachingDeadlines: 'المواعيد النهائية القادمة',
      noDeadlines: 'لا توجد مواعيد نهائية قريبة',
      taskAddedSuccess: 'تمت إضافة الحالة السريرية بنجاح',
      caseSolved: 'إجابة صحيحة! تم شحن الرصيد 🏆',
      caseReopened: 'تمت إعادة الحالة للنشطة'
    }
  };

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // Theme & Mode Handler
  function applyTheme(themeId, mode) {
    state.theme = themeId;
    state.mode = mode || state.mode;
    htmlEl.setAttribute('data-theme', themeId);
    htmlEl.setAttribute('data-mode', state.mode);
    localStorage.setItem('boardify_theme', themeId);
    localStorage.setItem('boardify_mode', state.mode);

    if (themeQuickSelect) themeQuickSelect.value = themeId;

    if (themeToggleBtn) {
      if (state.mode === 'dark') {
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
        themeToggleBtn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </svg>`;
      }
    }
  }

  // Font Handler
  function applyFont(fontId) {
    state.font = fontId;
    htmlEl.setAttribute('data-font', fontId);
    localStorage.setItem('boardify_font', fontId);
    if (fontQuickSelect) fontQuickSelect.value = fontId;
  }

  // Language Handler
  function applyLang(lang) {
    state.lang = lang;
    htmlEl.setAttribute('lang', lang);
    htmlEl.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('boardify_lang', lang);

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

    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) el.textContent = t[key];
    });

    renderStats();
  }

  function renderStats() {
    const active = state.tasks.filter(t => !t.completed);
    const completed = state.tasks.filter(t => t.completed);

    if (statTodayTasks) statTodayTasks.textContent = '0';
    if (statTotalActive) statTotalActive.textContent = `${active.length} ${translations[state.lang].totalActiveSub}`;
    if (statPendingReview) statPendingReview.textContent = '0';
    if (statWalletBalance) statWalletBalance.textContent = `${state.currency} ${state.balance.toFixed(2)}`;
    if (statTopBalance) statTopBalance.textContent = `${state.currency} ${state.balance.toFixed(2)}`;
    if (statCompletedWeek) statCompletedWeek.textContent = `${completed.length}`;
  }

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
          <span class="task-name" style="${task.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">
            ${task.name}
          </span>
        </div>
        <span class="priority-badge">${task.priority}</span>
      `;

      row.addEventListener('click', () => {
        openVignetteModal(task);
      });

      taskListEl.appendChild(row);
    });
  }

  // Open Interactive Clinical Case Modal
  let currentActiveTask = null;
  function openVignetteModal(task) {
    currentActiveTask = task;
    if (!vignetteModal) return;

    vignetteTitle.textContent = `${task.priority} Clinical Vignette • ${task.workspace || 'General Medicine'}`;
    vignetteStem.textContent = task.vignette || task.title;
    vignetteQuestion.textContent = task.question || 'What is the most appropriate management?';
    vignetteRationale.className = 'rationale-container';
    vignetteRationale.innerHTML = `<strong>Clinical Rationale:</strong><br>${task.rationale || 'High-yield diagnosis confirmed.'}`;

    vignetteOptions.innerHTML = '';
    (task.options || [
      { letter: 'A', text: 'Option A (Correct)', correct: true },
      { letter: 'B', text: 'Option B', correct: false },
      { letter: 'C', text: 'Option C', correct: false },
      { letter: 'D', text: 'Option D', correct: false }
    ]).forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `<span class="option-letter">${opt.letter}</span> <span>${opt.text}</span>`;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.option-btn').forEach(b => b.style.pointerEvents = 'none');
        if (opt.correct) {
          btn.classList.add('correct');
          if (!task.completed) {
            task.completed = true;
            state.balance += (task.reward || 25.00);
            renderStats();
            renderTasks();
            showToast(translations[state.lang].caseSolved);
          }
        } else {
          btn.classList.add('wrong');
          document.querySelectorAll('.option-btn').forEach(b => {
            if (b.innerText.includes('true') || opt.correct) b.classList.add('correct');
          });
        }
        vignetteRationale.classList.add('show');
      });
      vignetteOptions.appendChild(btn);
    });

    vignetteActionBtn.textContent = task.completed ? 'Mark Active' : 'Mark Completed';
    vignetteActionBtn.onclick = () => {
      task.completed = !task.completed;
      renderTasks();
      renderStats();
      closeVignetteModal();
      showToast(task.completed ? translations[state.lang].caseSolved : translations[state.lang].caseReopened);
    };

    vignetteModal.classList.add('active');
  }

  function closeVignetteModal() {
    if (vignetteModal) vignetteModal.classList.remove('active');
  }

  function initEvents() {
    // Mode Switch
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        applyTheme(state.theme, state.mode === 'light' ? 'dark' : 'light');
      });
    }

    // Language Switch
    if (langToggleBtn) {
      langToggleBtn.addEventListener('click', () => {
        applyLang(state.lang === 'en' ? 'ar' : 'en');
      });
    }

    // Theme Dropdown Switch
    if (themeQuickSelect) {
      themeQuickSelect.addEventListener('change', (e) => {
        applyTheme(e.target.value, state.mode);
      });
    }

    // Font Dropdown Switch
    if (fontQuickSelect) {
      fontQuickSelect.addEventListener('change', (e) => {
        applyFont(e.target.value);
      });
    }

    // New Task Modal
    if (newTaskBtn) {
      newTaskBtn.addEventListener('click', () => {
        newTaskModal.classList.add('active');
        document.getElementById('task-title-input').focus();
      });
    }

    function closeTaskModal() {
      if (newTaskModal) newTaskModal.classList.remove('active');
      if (taskForm) taskForm.reset();
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeTaskModal);
    if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeTaskModal);
    if (newTaskModal) {
      newTaskModal.addEventListener('click', (e) => {
        if (e.target === newTaskModal) closeTaskModal();
      });
    }

    if (vignetteCloseBtn) vignetteCloseBtn.addEventListener('click', closeVignetteModal);
    if (vignetteModal) {
      vignetteModal.addEventListener('click', (e) => {
        if (e.target === vignetteModal) closeVignetteModal();
      });
    }

    // Form Submit
    if (taskForm) {
      taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('task-title-input').value.trim();
        const priority = document.getElementById('task-priority-select').value;
        const workspace = document.getElementById('task-workspace-select').value;

        if (title) {
          const newTask = {
            id: Date.now(),
            name: title.length > 12 ? title.substring(0, 10) + '..' : title,
            title: title,
            vignette: title,
            question: 'What is the gold standard clinical management for this presentation?',
            options: [
              { letter: 'A', text: 'First-line recommended intervention', correct: true },
              { letter: 'B', text: 'Second-line observation', correct: false },
              { letter: 'C', text: 'Conservative supportive therapy', correct: false },
              { letter: 'D', text: 'Contraindicated therapy', correct: false }
            ],
            rationale: 'Accurate clinical management based on latest Boardify / USMLE clinical practice guidelines.',
            priority: priority,
            completed: false,
            workspace: workspace,
            reward: 30.00
          };
          state.tasks.unshift(newTask);
          renderTasks();
          renderStats();
          closeTaskModal();
          showToast(translations[state.lang].taskAddedSuccess);
        }
      });
    }

    // Command Palette
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

    // Keybindings
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
        closeTaskModal();
        closeVignetteModal();
        closeCommandPalette();
      }
    });

    if (cmdInput) {
      cmdInput.addEventListener('input', (e) => {
        renderCmdList(e.target.value.toLowerCase());
      });
    }

    function renderCmdList(query) {
      if (!cmdList) return;
      const commands = [
        { label: '➕ Create New Clinical Task', action: () => { closeCommandPalette(); newTaskBtn.click(); } },
        { label: '🎨 Palette: Task OS Amber & Cyber Gold', action: () => { applyTheme('task-os-amber', state.mode); closeCommandPalette(); } },
        { label: '🎨 Palette: Academic Navy & Royal', action: () => { applyTheme('academic-navy', state.mode); closeCommandPalette(); } },
        { label: '🎨 Palette: Clinical Deep Teal', action: () => { applyTheme('clinical-teal', state.mode); closeCommandPalette(); } },
        { label: '🎨 Palette: Digital Slate & Cyan', action: () => { applyTheme('digital-slate', state.mode); closeCommandPalette(); } },
        { label: '🔤 Font: Task OS Monospace (Fira Code)', action: () => { applyFont('taskos-mono'); closeCommandPalette(); } },
        { label: '🔤 Font: Modern Standard (Jakarta)', action: () => { applyFont('jakarta-serif'); closeCommandPalette(); } },
        { label: '🌓 Toggle Dark/Light Mode', action: () => { themeToggleBtn.click(); closeCommandPalette(); } },
        { label: '🌐 Switch Language (AR / EN)', action: () => { langToggleBtn.click(); closeCommandPalette(); } },
        ...state.tasks.map(t => ({
          label: `Case [${t.priority}]: ${t.title || t.name}`,
          action: () => {
            closeCommandPalette();
            openVignetteModal(t);
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

    // Nav Item Click
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }

  function init() {
    applyTheme(state.theme, state.mode);
    applyFont(state.font);
    applyLang(state.lang);
    renderStats();
    renderTasks();
    initEvents();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
