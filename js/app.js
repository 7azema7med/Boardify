// BOARDIFY - High-Density SaaS Command Center & QBank Controller
(function () {
  'use strict';

  // Internationalization Dictionary
  const I18N = {
    en: {
      dashboard: 'Dashboard',
      performance: 'Performance',
      overview: 'Overview',
      qbank: 'Question Bank',
      sessions: 'Exam Sessions',
      flagged: 'Flagged Items',
      timedBlock: 'Timed Exam Block',
      tutorMode: 'Tutor Mode',
      searchPlaceholder: 'Search clinical vignettes, diseases...',
      questionsSolved: 'Questions Solved',
      averageAccuracy: 'Average Accuracy',
      examCountdown: 'Exam Countdown',
      activeModules: 'Active Subject Modules',
      startBlock: 'Start Practice Block',
      exitBlock: 'Exit Block',
      labValues: 'Lab Values',
      calculator: 'Calculator',
      prevQuestion: 'Previous Question',
      nextQuestion: 'Next Question',
      itemPrefix: 'Item ',
      of: ' of '
    },
    ar: {
      dashboard: 'لوحة التحكم',
      performance: 'مؤشرات الأداء',
      overview: 'نظرة عامة',
      qbank: 'بنك الأسئلة',
      sessions: 'جلسات الاختبار',
      flagged: 'الأسئلة المعلمة',
      timedBlock: 'جلسة اختبار زمني',
      tutorMode: 'نمط المراجعة الفورية',
      searchPlaceholder: 'بحث في الحالات السريرية، الأمراض...',
      questionsSolved: 'الأسئلة المحلولة',
      averageAccuracy: 'معدل الدقة',
      examCountdown: 'العد التنازلي للاختبار',
      activeModules: 'المناهج الطبية المتاحة',
      startBlock: 'بدء كتلة أسئلة',
      exitBlock: 'إنهاء الجلسة',
      labValues: 'القيم المخبرية',
      calculator: 'الحاسبة الطبية',
      prevQuestion: 'السؤال السابق',
      nextQuestion: 'السؤال التالي',
      itemPrefix: 'السؤال ',
      of: ' من '
    }
  };

  // State Management
  const state = {
    theme: localStorage.getItem('boardify_theme') || 'light',
    lang: localStorage.getItem('boardify_lang') || 'en',
    currentView: 'dashboard',
    activeExam: 'USMLE Step 2 CK',
    activeQuestions: [],
    currentIndex: 0,
    userAnswers: {},
    timeRemaining: 3600,
    timerInterval: null
  };

  // DOM Elements
  const htmlEl = document.documentElement;
  const appLayout = document.querySelector('.app-layout');
  const btnThemeToggle = document.getElementById('btn-theme-toggle');
  const btnLangToggle = document.getElementById('btn-lang-toggle');
  const langBtnText = document.getElementById('lang-btn-text');

  // Views
  const viewDashboard = document.getElementById('view-dashboard');
  const viewSimulator = document.getElementById('view-simulator');
  const brandLink = document.getElementById('brand-link');
  const navBtnDashboard = document.getElementById('nav-btn-dashboard');
  const navBtnAnalytics = document.getElementById('nav-btn-analytics');
  const navBtnStep2 = document.getElementById('nav-btn-step2');
  const navBtnStep1 = document.getElementById('nav-btn-step1');
  const navBtnMrcp = document.getElementById('nav-btn-mrcp');
  const navBtnFlagged = document.getElementById('nav-btn-flagged');
  const navBtnSimTimed = document.getElementById('nav-btn-sim-timed');
  const navBtnSimTutor = document.getElementById('nav-btn-sim-tutor');
  const btnQuickStartBlock = document.getElementById('btn-quick-start-block');
  const btnCustomTestModal = document.getElementById('btn-custom-test-modal');

  // Simulator Elements
  const simBtnExit = document.getElementById('sim-btn-exit');
  const simItemCounter = document.getElementById('sim-item-counter');
  const simExamBadge = document.getElementById('sim-exam-badge');
  const simTimerDisplay = document.getElementById('sim-timer-display');
  const simBtnLabs = document.getElementById('sim-btn-labs');
  const simBtnCalc = document.getElementById('sim-btn-calc');
  const simBtnFlag = document.getElementById('sim-btn-flag');
  const simQSystem = document.getElementById('sim-q-system');
  const simQId = document.getElementById('sim-q-id');
  const simStemText = document.getElementById('sim-stem-text');
  const simLeadPrompt = document.getElementById('sim-lead-prompt');
  const simOptionsContainer = document.getElementById('sim-options-container');
  const simExplanationPanel = document.getElementById('sim-explanation-panel');
  const simExplanationBody = document.getElementById('sim-explanation-body');
  const simDiffTableContainer = document.getElementById('sim-differential-table-container');
  const simMatrixContainer = document.getElementById('sim-matrix-container');
  const simLiveScore = document.getElementById('sim-live-score');
  const simBtnPrev = document.getElementById('sim-btn-prev');
  const simBtnNext = document.getElementById('sim-btn-next');

  // Vitals elements
  const vitBp = document.getElementById('vit-bp');
  const vitHr = document.getElementById('vit-hr');
  const vitRr = document.getElementById('vit-rr');
  const vitSpo2 = document.getElementById('vit-spo2');

  // Command Palette
  const cmdPaletteModal = document.getElementById('cmd-palette-modal');
  const cmdInput = document.getElementById('cmd-input');
  const cmdResults = document.getElementById('cmd-results');
  const topbarSearchBox = document.getElementById('topbar-search-box');
  const sidebarCmdTrigger = document.getElementById('sidebar-cmd-trigger');
  const toastContainer = document.getElementById('toast-container');

  // Toast System
  function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 150);
    }, 2400);
  }

  // Theme Switcher (1:1 Dual-Theme Parity)
  function applyTheme(theme) {
    state.theme = theme;
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('boardify_theme', theme);
  }

  // Language Switcher (EN / AR)
  function applyLang(lang) {
    state.lang = lang;
    htmlEl.setAttribute('lang', lang);
    htmlEl.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('boardify_lang', lang);
    if (langBtnText) langBtnText.textContent = lang === 'ar' ? 'EN' : 'AR';

    const t = I18N[lang] || I18N.en;
    
    // Update text labels
    const txtDashboard = document.getElementById('txt-nav-dashboard');
    const txtAnalytics = document.getElementById('txt-nav-analytics');
    const txtFlagged = document.getElementById('txt-nav-flagged');
    const txtTimed = document.getElementById('txt-nav-timed');
    const txtTutor = document.getElementById('txt-nav-tutor');
    const globalSearchInput = document.getElementById('global-search-input');

    if (txtDashboard) txtDashboard.textContent = t.dashboard;
    if (txtAnalytics) txtAnalytics.textContent = t.performance;
    if (txtFlagged) txtFlagged.textContent = t.flagged;
    if (txtTimed) txtTimed.textContent = t.timedBlock;
    if (txtTutor) txtTutor.textContent = t.tutorMode;
    if (globalSearchInput) globalSearchInput.placeholder = t.searchPlaceholder;

    const lblStatSolved = document.getElementById('lbl-stat-solved');
    const lblStatAccuracy = document.getElementById('lbl-stat-accuracy');
    const lblStatCountdown = document.getElementById('lbl-stat-countdown');
    const lblStatFlagged = document.getElementById('lbl-stat-flagged');
    const lblModulesTitle = document.getElementById('lbl-modules-title');
    const lblPerformanceTitle = document.getElementById('lbl-performance-title');

    if (lblStatSolved) lblStatSolved.textContent = t.questionsSolved;
    if (lblStatAccuracy) lblStatAccuracy.textContent = t.averageAccuracy;
    if (lblStatCountdown) lblStatCountdown.textContent = t.examCountdown;
    if (lblStatFlagged) lblStatFlagged.textContent = t.flagged;
    if (lblModulesTitle) lblModulesTitle.textContent = t.activeModules;
    if (lblPerformanceTitle) lblPerformanceTitle.textContent = t.performance;

    if (btnQuickStartBlock) btnQuickStartBlock.querySelector('span').textContent = t.startBlock;
    if (simBtnExit) simBtnExit.querySelector('span').textContent = t.exitBlock;
    if (simBtnLabs) simBtnLabs.querySelector('span').textContent = t.labValues;
    if (simBtnCalc) simBtnCalc.querySelector('span').textContent = t.calculator;
    if (simBtnPrev) simBtnPrev.querySelector('span').textContent = t.prevQuestion;
    if (simBtnNext) simBtnNext.querySelector('span').textContent = t.nextQuestion;
  }

  // View Switcher
  function switchView(viewName) {
    state.currentView = viewName;
    if (viewName === 'simulator') {
      if (appLayout) appLayout.classList.add('exam-mode');
      if (viewDashboard) viewDashboard.style.display = 'none';
      if (viewSimulator) viewSimulator.style.display = 'flex';
      window.scrollTo(0, 0);
    } else {
      if (appLayout) appLayout.classList.remove('exam-mode');
      if (viewDashboard) viewDashboard.style.display = 'block';
      if (viewSimulator) viewSimulator.style.display = 'none';
      clearInterval(state.timerInterval);
    }
  }

  // Exam Simulator Controller
  function startBlock(examName, count) {
    state.activeExam = examName || 'USMLE Step 2 CK';
    state.userAnswers = {};
    state.currentIndex = 0;

    const bank = (typeof QUESTION_BANK !== 'undefined' && QUESTION_BANK.length > 0) ? QUESTION_BANK : [
      {
        id: 'Q-10482',
        exam: 'USMLE Step 2 CK',
        system: 'Cardiovascular System',
        vitals: { bp: '184/102 mm Hg', hr: '108 bpm', rr: '22 /min', spo2: '98% Room Air' },
        stem: 'A 62-year-old male is brought to the emergency department due to sudden-onset, severe tearing chest pain radiating directly to his back between the scapulae. Blood pressure is 184/102 mm Hg in the right arm and 142/86 mm Hg in the left arm. A grade 2/6 early diastolic decrescendo murmur is heard along the right sternal border.',
        question: 'Which of the following is the most appropriate next step in management for this patient?',
        options: [
          { id: 'A', text: 'Initiate intravenous thrombolytic therapy with alteplase', isCorrect: false, explanation: 'Thrombolysis is strictly contraindicated in aortic dissection.' },
          { id: 'B', text: 'Administer intravenous esmolol and obtain CT angiography of the chest', isCorrect: true, explanation: 'In acute Stanford Type A dissection, immediate heart rate and blood pressure control with an IV beta-blocker to achieve HR < 60/min and SBP 100–120 mm Hg reduces aortic wall shear stress, followed by definitive CT Angiography.' },
          { id: 'C', text: 'Administer sublingual nitroglycerin as first-line monotherapy', isCorrect: false, explanation: 'Vasodilators without prior beta-blockade induce reflex tachycardia, increasing aortic shear stress.' },
          { id: 'D', text: 'Immediate emergency transthoracic pericardiocentesis', isCorrect: false, explanation: 'Pericardiocentesis in stable dissection can release tamponade and precipitate fatal rupture.' }
        ],
        educationalObjective: 'Acute Stanford Type A aortic dissection classically presents with sudden tearing chest/back pain and blood pressure discrepancy. First-line management is IV beta-blockade (e.g. esmolol) followed by CT Angiography and urgent cardiothoracic surgery.'
      }
    ];

    state.activeQuestions = [];
    const questionCount = count || 10;
    for (let i = 0; i < questionCount; i++) {
      const q = bank[i % bank.length];
      state.activeQuestions.push({
        ...q,
        itemNumber: i + 1
      });
    }

    state.timeRemaining = questionCount * 60;
    startTimer();
    renderMatrix();
    loadQuestion(0);
    switchView('simulator');
    showToast(state.lang === 'ar' ? `بدأت كتلة اختبارية من ${questionCount} أسئلة.` : `Started ${questionCount}-question practice block.`);
  }

  function startTimer() {
    clearInterval(state.timerInterval);
    state.timerInterval = setInterval(() => {
      if (state.timeRemaining > 0) {
        state.timeRemaining--;
        const mins = Math.floor(state.timeRemaining / 60);
        const secs = state.timeRemaining % 60;
        if (simTimerDisplay) {
          simTimerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }
      } else {
        clearInterval(state.timerInterval);
        showToast('Block time expired.');
      }
    }, 1000);
  }

  function renderMatrix() {
    if (!simMatrixContainer) return;
    simMatrixContainer.innerHTML = '';

    state.activeQuestions.forEach((q, idx) => {
      const btn = document.createElement('button');
      btn.className = `matrix-item ${idx === state.currentIndex ? 'active' : ''} ${state.userAnswers[idx] !== undefined ? 'answered' : ''}`;
      btn.textContent = String(idx + 1);
      btn.addEventListener('click', () => loadQuestion(idx));
      simMatrixContainer.appendChild(btn);
    });
  }

  function loadQuestion(index) {
    state.currentIndex = index;
    const q = state.activeQuestions[index];
    if (!q) return;

    const t = I18N[state.lang] || I18N.en;
    if (simItemCounter) simItemCounter.textContent = `${t.itemPrefix}${index + 1}${t.of}${state.activeQuestions.length}`;
    if (simExamBadge) simExamBadge.textContent = q.exam || state.activeExam;
    if (simQSystem) simQSystem.textContent = q.system || 'Cardiovascular System';
    if (simQId) simQId.textContent = q.id || `Item Q-${10480 + index}`;
    if (simStemText) simStemText.textContent = q.stem;
    if (simLeadPrompt) simLeadPrompt.textContent = q.question || 'Which of the following is the most appropriate next step in management for this patient?';

    // Vitals
    if (q.vitals) {
      if (vitBp) vitBp.textContent = q.vitals.bp || '184/102 mm Hg';
      if (vitHr) vitHr.textContent = q.vitals.hr || '108 bpm';
      if (vitRr) vitRr.textContent = q.vitals.rr || '22 /min';
      if (vitSpo2) vitSpo2.textContent = q.vitals.spo2 || '98% Room Air';
    }

    // MCQ Options
    simOptionsContainer.innerHTML = '';
    simExplanationPanel.className = 'explanation-panel';
    simExplanationBody.innerHTML = '';
    if (simDiffTableContainer) simDiffTableContainer.innerHTML = '';

    const answeredId = state.userAnswers[index];

    (q.options || []).forEach(opt => {
      const row = document.createElement('button');
      row.className = 'mcq-option-row';
      row.innerHTML = `<span class="key-badge">${opt.id}</span> <span>${opt.text}</span>`;

      if (answeredId !== undefined) {
        row.style.pointerEvents = 'none';
        if (opt.isCorrect) {
          row.classList.add('correct');
        }
        if (answeredId === opt.id && !opt.isCorrect) {
          row.classList.add('incorrect');
        }
        if (answeredId === opt.id) {
          row.classList.add('selected');
        }
      }

      row.addEventListener('click', () => {
        state.userAnswers[index] = opt.id;
        renderMatrix();
        loadQuestion(index);
        updateScore();
      });

      simOptionsContainer.appendChild(row);
    });

    // Explanation
    if (answeredId !== undefined) {
      simExplanationPanel.classList.add('visible');
      const correctOpt = q.options.find(o => o.isCorrect);
      simExplanationBody.innerHTML = `
        <div style="margin-bottom:10px;">
          <strong style="color:var(--text-primary);">Educational Objective:</strong> ${q.educationalObjective || 'Diagnostic management confirmed.'}
        </div>
        <div>
          <strong style="color:var(--status-success);">Correct Choice (${correctOpt ? correctOpt.id : 'B'}):</strong> ${correctOpt ? (correctOpt.explanation || correctOpt.text) : ''}
        </div>
      `;

      if (q.differentialTable && simDiffTableContainer) {
        simDiffTableContainer.innerHTML = q.differentialTable;
      }
    }

    renderMatrix();
  }

  function updateScore() {
    let correct = 0;
    let answered = 0;

    state.activeQuestions.forEach((q, idx) => {
      const ans = state.userAnswers[idx];
      if (ans !== undefined) {
        answered++;
        const opt = q.options.find(o => o.id === ans);
        if (opt && opt.isCorrect) correct++;
      }
    });

    const percent = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    if (simLiveScore) simLiveScore.textContent = `${correct} / ${answered} (${percent}%)`;
  }

  // Command Palette Handler
  function openCommandPalette() {
    if (cmdPaletteModal) {
      cmdPaletteModal.classList.add('active');
      if (cmdInput) {
        cmdInput.value = '';
        cmdInput.focus();
      }
    }
  }

  function closeCommandPalette() {
    if (cmdPaletteModal) cmdPaletteModal.classList.remove('active');
  }

  // Event Listeners
  function initEvents() {
    // Theme Toggle
    if (btnThemeToggle) {
      btnThemeToggle.addEventListener('click', () => {
        applyTheme(state.theme === 'light' ? 'dark' : 'light');
        showToast(state.theme === 'dark' ? 'Dark Mode Enabled' : 'Light Mode Enabled');
      });
    }

    // Language Toggle
    if (btnLangToggle) {
      btnLangToggle.addEventListener('click', () => {
        applyLang(state.lang === 'en' ? 'ar' : 'en');
      });
    }

    // Nav Brand & Dashboard
    if (brandLink) {
      brandLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchView('dashboard');
      });
    }

    if (navBtnDashboard) {
      navBtnDashboard.addEventListener('click', () => {
        document.querySelectorAll('.nav-item-btn').forEach(b => b.classList.remove('active'));
        navBtnDashboard.classList.add('active');
        switchView('dashboard');
      });
    }

    if (navBtnAnalytics) {
      navBtnAnalytics.addEventListener('click', () => {
        document.querySelectorAll('.nav-item-btn').forEach(b => b.classList.remove('active'));
        navBtnAnalytics.classList.add('active');
        switchView('dashboard');
        showToast('Analytics synchronized.');
      });
    }

    // Module Launchers
    if (navBtnStep2) {
      navBtnStep2.addEventListener('click', () => {
        document.querySelectorAll('.nav-item-btn').forEach(b => b.classList.remove('active'));
        navBtnStep2.classList.add('active');
        startBlock('USMLE Step 2 CK', 10);
      });
    }
    if (navBtnStep1) {
      navBtnStep1.addEventListener('click', () => {
        document.querySelectorAll('.nav-item-btn').forEach(b => b.classList.remove('active'));
        navBtnStep1.classList.add('active');
        startBlock('USMLE Step 1', 10);
      });
    }
    if (navBtnMrcp) {
      navBtnMrcp.addEventListener('click', () => {
        document.querySelectorAll('.nav-item-btn').forEach(b => b.classList.remove('active'));
        navBtnMrcp.classList.add('active');
        startBlock('MRCP Part 1', 10);
      });
    }
    if (navBtnFlagged) {
      navBtnFlagged.addEventListener('click', () => {
        document.querySelectorAll('.nav-item-btn').forEach(b => b.classList.remove('active'));
        navBtnFlagged.classList.add('active');
        startBlock('Flagged Review', 5);
      });
    }
    if (navBtnSimTimed) navBtnSimTimed.addEventListener('click', () => startBlock('USMLE Step 2 CK', 10));
    if (navBtnSimTutor) navBtnSimTutor.addEventListener('click', () => startBlock('USMLE Step 2 CK', 10));

    if (btnQuickStartBlock) btnQuickStartBlock.addEventListener('click', () => startBlock('USMLE Step 2 CK', 10));
    if (btnCustomTestModal) btnCustomTestModal.addEventListener('click', () => startBlock('USMLE Step 2 CK', 10));

    // Simulator Buttons
    if (simBtnExit) simBtnExit.addEventListener('click', () => switchView('dashboard'));
    if (simBtnPrev) {
      simBtnPrev.addEventListener('click', () => {
        if (state.currentIndex > 0) loadQuestion(state.currentIndex - 1);
      });
    }
    if (simBtnNext) {
      simBtnNext.addEventListener('click', () => {
        if (state.currentIndex < state.activeQuestions.length - 1) {
          loadQuestion(state.currentIndex + 1);
        } else {
          showToast('Completed block. Review explanations.');
        }
      });
    }

    if (simBtnLabs) {
      simBtnLabs.addEventListener('click', () => {
        showToast('Standard Labs: Na 136-145, K 3.5-5.0, Cl 98-106, HCO3 22-28, Cr 0.7-1.3 mg/dL.');
      });
    }

    if (simBtnCalc) {
      simBtnCalc.addEventListener('click', () => {
        showToast('Medical Calculator: Wells Score = 6.0 (High Probability PE).');
      });
    }

    if (simBtnFlag) {
      simBtnFlag.addEventListener('click', () => {
        showToast('Question flagged for review.');
      });
    }

    // Command Palette Triggers
    if (topbarSearchBox) topbarSearchBox.addEventListener('click', openCommandPalette);
    if (sidebarCmdTrigger) sidebarCmdTrigger.addEventListener('click', openCommandPalette);

    if (cmdPaletteModal) {
      cmdPaletteModal.addEventListener('click', (e) => {
        if (e.target === cmdPaletteModal) closeCommandPalette();
      });
    }

    // Command palette item actions
    if (cmdResults) {
      cmdResults.querySelectorAll('.cmd-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const action = item.getAttribute('data-action');
          closeCommandPalette();
          if (action === 'start-block') startBlock('USMLE Step 2 CK', 10);
          else if (action === 'toggle-theme') {
            applyTheme(state.theme === 'light' ? 'dark' : 'light');
          }
          else if (action === 'toggle-lang') {
            applyLang(state.lang === 'en' ? 'ar' : 'en');
          }
          else if (action === 'filter-step2') startBlock('USMLE Step 2 CK', 10);
          else if (action === 'filter-mrcp') startBlock('MRCP Part 1', 10);
          else if (action === 'view-dashboard') switchView('dashboard');
        });
      });
    }

    // Global Keyboard Shortcuts (Ctrl + K / Cmd + K, Esc)
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openCommandPalette();
      } else if (e.key === 'Escape') {
        closeCommandPalette();
      }
    });
  }

  // Initialize
  function init() {
    applyTheme(state.theme);
    applyLang(state.lang);
    initEvents();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
