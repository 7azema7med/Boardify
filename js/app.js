// BOARDIFY - Landing Page, SaaS QBank Command Center & Simulator Controller
(function () {
  'use strict';

  // Internationalization Dictionary (Landing Page + App Shell)
  const I18N = {
    en: {
      brand: 'BOARD<span class="brand-accent">IFY</span>',
      navFeatures: 'Features',
      navCurriculum: 'Curriculum',
      navCompare: 'Comparison',
      navColors: 'Color System',
      navPricing: 'Pricing',
      launchApp: 'Launch QBank App',
      heroBadge: '2026 Examination Curriculum Released',
      heroHeading: 'The high-yield medical question bank engineered for board mastery.',
      heroSubtext: '3,420 peer-reviewed clinical vignettes, real-time differential diagnosis algorithms, and authentic NBME-style exam blocks for USMLE Step 1, Step 2 CK, and MRCP Part 1.',
      heroStartBtn: 'Launch Exam Simulator',
      heroExploreBtn: 'Explore Curriculum',
      metricQ: 'Clinical Vignettes',
      metricPass: 'First-Attempt Pass',
      metricScore: 'Median Step 2 Score',
      metricLat: 'UI Latency',
      tagFeatures: 'Developer-Grade QBank Platform',
      titleFeatures: 'Engineered for maximum cognitive throughput',
      subFeatures: 'Every interface interaction is optimized for high-density review without cognitive friction.',
      tagCurriculum: 'Medical Curriculum Coverage',
      titleCurriculum: 'Full alignment with international board examinations',
      subCurriculum: 'Peer-reviewed clinical vignettes verified by certified medical boards and academic clinicians.',
      tagCompare: 'Benchmarked Performance',
      titleCompare: 'Why medical students choose Boardify',
      subCompare: 'Built with modern developer infrastructure for zero lag, zero clutter, and higher recall.',
      tagPricing: 'Transparent Pricing',
      titlePricing: 'Simple, predictable examination access',
      subPricing: 'Unlimited practice blocks, performance analytics, and curriculum updates included.',
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
      brand: 'بورد<span class="brand-accent">فاي</span>',
      navFeatures: 'المميزات',
      navCurriculum: 'المناهج الطبية',
      navCompare: 'المقارنة',
      navColors: 'منظومة الألوان',
      navPricing: 'الأسعار',
      launchApp: 'دخول المنصة',
      heroBadge: 'إطلاق منهج الاختبارات المحدث لعام 2026',
      heroHeading: 'بنك الأسئلة السريرية عالي الكفاءة لاجتياز الاختبارات الطبية العالمية.',
      heroSubtext: '3,420 حالة سريرية محكمة، خوارزميات التشخيص المقارن الفوري، وجلسات اختبار واقعية مطابقة لمعايير NBME لاختبارات USMLE و MRCP و PLAB.',
      heroStartBtn: 'تشغيل محاكي الاختبارات',
      heroExploreBtn: 'استعراض المناهج',
      metricQ: 'حالة سريرية معتمدة',
      metricPass: 'نسبة النجاح من أول مرة',
      metricScore: 'متوسط درجات Step 2',
      metricLat: 'زمن الاستجابة',
      tagFeatures: 'منصة سريرية متقدمة',
      titleFeatures: 'مصممة لتحقيق أقصى درجات التركيز وسرعة الاستيعاب',
      subFeatures: 'تمت هندسة كل تفاعل في الواجهة لتقديم مراجعة مكثفة وخالية من التشتيت.',
      tagCurriculum: 'تغطية المناهج الطبية',
      titleCurriculum: 'توافق كامل مع معايير البوردات والزمالات الدولية',
      subCurriculum: 'حالات سريرية مراجعة وموثقة من لجان طبية معتمدة وأطباء استشاريين.',
      tagCompare: 'مقارنة الأداء والسرعة',
      titleCompare: 'لماذا يفضل الأطباء منصة Boardify',
      subCompare: 'مبنية بأحدث تقنيات الويب السحابية لانعدام التأخير وسرعة الاسترجاع الذهني.',
      tagPricing: 'أسعار واضحة ومباشرة',
      titlePricing: 'اشتراكات سنوية وفصلية بدون رسوم خفية',
      subPricing: 'تشمل جميع بنوك الأسئلة، جلسات المحاكاة اللامحدودة، ومؤشرات الأداء.',
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
    currentStage: 'landing', // 'landing' | 'app'
    currentAppView: 'dashboard', // 'dashboard' | 'simulator'
    activeExam: 'USMLE Step 2 CK',
    activeQuestions: [],
    currentIndex: 0,
    userAnswers: {},
    timeRemaining: 3600,
    timerInterval: null
  };

  // DOM Elements
  const htmlEl = document.documentElement;
  const viewLanding = document.getElementById('view-landing');
  const viewAppShell = document.getElementById('view-app-shell');
  const appLayout = document.querySelector('.app-layout');

  // Landing Elements
  const landingLangToggle = document.getElementById('landing-lang-toggle');
  const landingLangText = document.getElementById('landing-lang-text');
  const landingThemeToggle = document.getElementById('landing-theme-toggle');
  const landingBtnLaunchApp = document.getElementById('landing-btn-launch-app');
  const heroBtnStartSimulator = document.getElementById('hero-btn-start-simulator');
  const heroBtnExploreCurriculum = document.getElementById('hero-btn-explore-curriculum');

  // App Shell Elements
  const btnThemeToggle = document.getElementById('btn-theme-toggle');
  const btnLangToggle = document.getElementById('btn-lang-toggle');
  const langBtnText = document.getElementById('lang-btn-text');
  const brandLink = document.getElementById('brand-link');
  const navBtnDashboard = document.getElementById('nav-btn-dashboard');
  const navBtnLandingReturn = document.getElementById('nav-btn-landing-return');
  const navBtnStep2 = document.getElementById('nav-btn-step2');
  const navBtnStep1 = document.getElementById('nav-btn-step1');
  const navBtnMrcp = document.getElementById('nav-btn-mrcp');
  const navBtnFlagged = document.getElementById('nav-btn-flagged');
  const navBtnSimTimed = document.getElementById('nav-btn-sim-timed');
  const navBtnSimTutor = document.getElementById('nav-btn-sim-tutor');
  const btnQuickStartBlock = document.getElementById('btn-quick-start-block');
  const btnCustomTestModal = document.getElementById('btn-custom-test-modal');

  // Views inside App Shell
  const viewDashboard = document.getElementById('view-dashboard');
  const viewSimulator = document.getElementById('view-simulator');

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

  // Vitals
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
  const footerCmdBtn = document.getElementById('footer-cmd-btn');
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

  // Theme Engine (1:1 Light / Dark Mode Parity)
  function applyTheme(theme) {
    state.theme = theme;
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('boardify_theme', theme);
  }

  // Language Engine (EN / AR)
  function applyLang(lang) {
    state.lang = lang;
    htmlEl.setAttribute('lang', lang);
    htmlEl.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('boardify_lang', lang);
    
    if (langBtnText) langBtnText.textContent = lang === 'ar' ? 'EN' : 'AR';
    if (landingLangText) landingLangText.textContent = lang === 'ar' ? 'EN' : 'AR';

    const t = I18N[lang] || I18N.en;

    // Landing Page i18n
    const elMap = {
      'lnk-landing-features': t.navFeatures,
      'lnk-landing-curriculum': t.navCurriculum,
      'lnk-landing-compare': t.navCompare,
      'lnk-landing-colors': t.navColors,
      'lnk-landing-pricing': t.navPricing,
      'hero-badge': t.heroBadge,
      'hero-heading': t.heroHeading,
      'hero-subtext': t.heroSubtext,
      'lbl-metric-q': t.metricQ,
      'lbl-metric-pass': t.metricPass,
      'lbl-metric-score': t.metricScore,
      'lbl-metric-lat': t.metricLat,
      'tag-features': t.tagFeatures,
      'title-features': t.titleFeatures,
      'sub-features': t.subFeatures,
      'tag-curriculum': t.tagCurriculum,
      'title-curriculum': t.titleCurriculum,
      'sub-curriculum': t.subCurriculum,
      'tag-compare': t.tagCompare,
      'title-compare': t.titleCompare,
      'sub-compare': t.subCompare,
      'tag-pricing': t.tagPricing,
      'title-pricing': t.titlePricing,
      'sub-pricing': t.subPricing,
      'txt-nav-dashboard': t.dashboard,
      'txt-nav-flagged': t.flagged,
      'txt-nav-timed': t.timedBlock,
      'txt-nav-tutor': t.tutorMode,
      'lbl-stat-solved': t.questionsSolved,
      'lbl-stat-accuracy': t.averageAccuracy,
      'lbl-stat-countdown': t.examCountdown,
      'lbl-stat-flagged': t.flagged,
      'lbl-modules-title': t.activeModules,
      'lbl-performance-title': t.performance
    };

    for (const [id, text] of Object.entries(elMap)) {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    }

    if (landingBtnLaunchApp) landingBtnLaunchApp.querySelector('span').textContent = t.launchApp;
    if (heroBtnStartSimulator) heroBtnStartSimulator.querySelector('span').textContent = t.heroStartBtn;
    if (heroBtnExploreCurriculum) heroBtnExploreCurriculum.querySelector('span').textContent = t.heroExploreBtn;

    const globalSearchInput = document.getElementById('global-search-input');
    if (globalSearchInput) globalSearchInput.placeholder = t.searchPlaceholder;

    if (btnQuickStartBlock) btnQuickStartBlock.querySelector('span').textContent = t.startBlock;
    if (simBtnExit) simBtnExit.querySelector('span').textContent = t.exitBlock;
    if (simBtnLabs) simBtnLabs.querySelector('span').textContent = t.labValues;
    if (simBtnCalc) simBtnCalc.querySelector('span').textContent = t.calculator;
    if (simBtnPrev) simBtnPrev.querySelector('span').textContent = t.prevQuestion;
    if (simBtnNext) simBtnNext.querySelector('span').textContent = t.nextQuestion;
  }

  // Stage Switcher: Landing vs App Shell
  function showStage(stageName, appView) {
    state.currentStage = stageName;
    if (stageName === 'landing') {
      if (viewLanding) viewLanding.style.display = 'block';
      if (viewAppShell) viewAppShell.style.display = 'none';
      clearInterval(state.timerInterval);
      window.scrollTo(0, 0);
    } else {
      if (viewLanding) viewLanding.style.display = 'none';
      if (viewAppShell) viewAppShell.style.display = 'block';
      switchAppView(appView || 'dashboard');
    }
  }

  // App View Switcher: Dashboard vs Simulator
  function switchAppView(viewName) {
    state.currentAppView = viewName;
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

  // Hero Interactive Question Preview Widget
  function initHeroPreviewWidget() {
    const opts = document.querySelectorAll('#hero-options .hero-opt-btn');
    const rationale = document.getElementById('hero-rationale');

    opts.forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.getAttribute('data-correct') === 'true';
        opts.forEach(b => {
          b.style.pointerEvents = 'none';
          if (b.getAttribute('data-correct') === 'true') {
            b.classList.add('correct');
          }
        });

        if (!isCorrect) {
          btn.classList.add('incorrect');
        }

        if (rationale) rationale.classList.add('visible');
      });
    });
  }

  // Exam Simulator Engine
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
    showStage('app', 'simulator');
    showToast(state.lang === 'ar' ? `بدأت جلسة محاكاة اختبار: ${state.activeExam}` : `Started exam block: ${state.activeExam}`);
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

    // Options
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
        if (opt.isCorrect) row.classList.add('correct');
        if (answeredId === opt.id && !opt.isCorrect) row.classList.add('incorrect');
        if (answeredId === opt.id) row.classList.add('selected');
      }

      row.addEventListener('click', () => {
        state.userAnswers[index] = opt.id;
        renderMatrix();
        loadQuestion(index);
        updateScore();
      });

      simOptionsContainer.appendChild(row);
    });

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
    // Theme Toggles
    const toggleThemeFn = () => {
      applyTheme(state.theme === 'light' ? 'dark' : 'light');
      showToast(state.theme === 'dark' ? 'Dark Mode' : 'Light Mode');
    };
    if (landingThemeToggle) landingThemeToggle.addEventListener('click', toggleThemeFn);
    if (btnThemeToggle) btnThemeToggle.addEventListener('click', toggleThemeFn);

    // Lang Toggles
    const toggleLangFn = () => {
      applyLang(state.lang === 'en' ? 'ar' : 'en');
    };
    if (landingLangToggle) landingLangToggle.addEventListener('click', toggleLangFn);
    if (btnLangToggle) btnLangToggle.addEventListener('click', toggleLangFn);

    // Stage Transitions
    if (landingBtnLaunchApp) landingBtnLaunchApp.addEventListener('click', () => showStage('app', 'dashboard'));
    if (heroBtnStartSimulator) heroBtnStartSimulator.addEventListener('click', () => startBlock('USMLE Step 2 CK', 10));
    if (heroBtnExploreCurriculum) {
      heroBtnExploreCurriculum.addEventListener('click', (e) => {
        const curr = document.getElementById('curriculum');
        if (curr) curr.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Curriculum direct block launchers
    document.querySelectorAll('[data-exam-launch]').forEach(btn => {
      btn.addEventListener('click', () => {
        const exam = btn.getAttribute('data-exam-launch');
        startBlock(exam, 10);
      });
    });

    // Pricing Buttons
    const btnPricingFree = document.getElementById('btn-pricing-free');
    const btnPricingQuarterly = document.getElementById('btn-pricing-quarterly');
    const btnPricingAnnual = document.getElementById('btn-pricing-annual');

    if (btnPricingFree) btnPricingFree.addEventListener('click', () => startBlock('USMLE Step 2 CK', 5));
    if (btnPricingQuarterly) btnPricingQuarterly.addEventListener('click', () => startBlock('USMLE Step 2 CK', 10));
    if (btnPricingAnnual) btnPricingAnnual.addEventListener('click', () => startBlock('USMLE Step 2 CK', 20));

    // App Sidebar Navigation
    if (brandLink) brandLink.addEventListener('click', (e) => { e.preventDefault(); showStage('landing'); });
    if (navBtnDashboard) navBtnDashboard.addEventListener('click', () => switchAppView('dashboard'));
    if (navBtnLandingReturn) navBtnLandingReturn.addEventListener('click', () => showStage('landing'));

    if (navBtnStep2) navBtnStep2.addEventListener('click', () => startBlock('USMLE Step 2 CK', 10));
    if (navBtnStep1) navBtnStep1.addEventListener('click', () => startBlock('USMLE Step 1', 10));
    if (navBtnMrcp) navBtnMrcp.addEventListener('click', () => startBlock('MRCP Part 1', 10));
    if (navBtnFlagged) navBtnFlagged.addEventListener('click', () => startBlock('Flagged Review', 5));
    if (navBtnSimTimed) navBtnSimTimed.addEventListener('click', () => startBlock('USMLE Step 2 CK', 10));
    if (navBtnSimTutor) navBtnSimTutor.addEventListener('click', () => startBlock('USMLE Step 2 CK', 10));

    if (btnQuickStartBlock) btnQuickStartBlock.addEventListener('click', () => startBlock('USMLE Step 2 CK', 10));
    if (btnCustomTestModal) btnCustomTestModal.addEventListener('click', () => startBlock('USMLE Step 2 CK', 10));

    // Simulator Buttons
    if (simBtnExit) simBtnExit.addEventListener('click', () => switchAppView('dashboard'));
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
    if (footerCmdBtn) footerCmdBtn.addEventListener('click', openCommandPalette);

    if (cmdPaletteModal) {
      cmdPaletteModal.addEventListener('click', (e) => {
        if (e.target === cmdPaletteModal) closeCommandPalette();
      });
    }

    if (cmdResults) {
      cmdResults.querySelectorAll('.cmd-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const action = item.getAttribute('data-action');
          closeCommandPalette();
          if (action === 'start-block') startBlock('USMLE Step 2 CK', 10);
          else if (action === 'toggle-theme') toggleThemeFn();
          else if (action === 'toggle-lang') toggleLangFn();
          else if (action === 'filter-step2') startBlock('USMLE Step 2 CK', 10);
          else if (action === 'filter-mrcp') startBlock('MRCP Part 1', 10);
          else if (action === 'view-dashboard') showStage('app', 'dashboard');
          else if (action === 'view-landing') showStage('landing');
        });
      });
    }

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
    initHeroPreviewWidget();
    initEvents();
  }

  document.addEventListener('DOMContentLoaded', init);

  // Global Color System Helpers
  window.copyColorCode = function(code) {
    navigator.clipboard.writeText(code).then(() => {
      showToast(`Copied ${code} to clipboard!`);
    }).catch(() => {
      showToast(`Copied: ${code}`);
    });
  };

  window.copyCssTokens = function() {
    const tokensEl = document.getElementById('code-tokens-display');
    if (tokensEl) {
      navigator.clipboard.writeText(tokensEl.innerText).then(() => {
        showToast('✓ CSS Color Tokens Copied!');
      });
    }
  };

  window.themeToggleFromSection = function() {
    applyTheme(state.theme === 'light' ? 'dark' : 'light');
    showToast(state.theme === 'dark' ? 'Switched to Dark Mode (#070D14)' : 'Switched to Light Mode (#004976)');
  };
})();
