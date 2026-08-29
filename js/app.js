// BOARDIFY - Medical Examination Platform & Simulator Controller
(function () {
  'use strict';

  // Translations dictionary
  const I18N = {
    en: {
      brand: 'BOARD<span class="brand-accent">IFY</span>',
      navQuestions: 'Question bank',
      navCurriculum: 'Curriculum',
      navSimulator: 'Exam simulator',
      appearanceLight: 'Appearance: Light',
      appearanceDark: 'Appearance: Dark',
      fontSans: 'Font: UI Sans',
      fontMono: 'Font: Monospace',
      fontArabic: 'Font: Arabic Sans',
      startPractice: 'Start practice block',
      heroTitle: 'Clinical question bank for medical board examinations',
      heroDesc: 'Boardify contains 3,420 peer-reviewed clinical vignettes mapped to the USMLE Step 1, Step 2 CK, and MRCP Part 1 content outlines. Practice in standard, timed, and tutor modes with differential diagnosis breakdowns.',
      heroStartBtn: 'Start 10-question block',
      heroCustomBtn: 'Configure custom test',
      statVignettes: 'Clinical vignettes',
      statPass: 'First-attempt pass rate',
      statScore: 'Median user score',
      curriculumTitle: 'Examination curriculum coverage',
      curriculumDesc: 'Every question includes verified laboratory values, diagnostic images, and referenced rationales.',
      featuresTitle: 'Examination interface features',
      featuresDesc: 'Designed to replicate standard computer-based testing environments.',
      exitBlock: 'Exit block',
      labValues: 'Lab values',
      submitAnswer: 'Submit answer',
      timeRemainingPrefix: 'Time remaining: '
    },
    ar: {
      brand: 'بورد<span class="brand-accent">فاي</span>',
      navQuestions: 'بنك الأسئلة',
      navCurriculum: 'المناهج الطبية',
      navSimulator: 'محاكي الاختبار',
      appearanceLight: 'المظهر: فاتح',
      appearanceDark: 'المظهر: داكن',
      fontSans: 'الخط: قياسي',
      fontMono: 'الخط: أحادي المسافة',
      fontArabic: 'الخط: عربي حديث',
      startPractice: 'بدء جلسة تدريب',
      heroTitle: 'بنك أسئلة سريرية شامل لاختبارات المعادلات الطبية',
      heroDesc: 'يحتوي بوردفاي على 3,420 حالة سريرية محكمة ومطابقة لمناهج USMLE و MRCP و PLAB. تدرب بالنمط الزمني أو نمط المراجعة الفورية مع شروحات تشخيصية دقيقة.',
      heroStartBtn: 'بدء جلسة 10 أسئلة',
      heroCustomBtn: 'تخصيص اختبار محدد',
      statVignettes: 'حالة سريرية معتمدة',
      statPass: 'نسبة النجاح من أول محاولة',
      statScore: 'متوسط درجات المتدربين',
      curriculumTitle: 'تغطية شاملة للمناهج الطبية العالمية',
      curriculumDesc: 'تتضمن كل حالة فحوصات مخبرية معيارية، صوراً شعاعية، وتفسيرات سريرية موثقة.',
      featuresTitle: 'مميزات واجهة محاكاة الاختبارات',
      featuresDesc: 'مصممة لمحاكاة بيئة اختبارات الحاسوب المعتمدة بدقة متناهية.',
      exitBlock: 'إنهاء الجلسة',
      labValues: 'القيم المخبرية',
      submitAnswer: 'تأكيد الإجابة',
      timeRemainingPrefix: 'الوقت المتبقي: '
    }
  };

  // Application State
  const state = {
    mode: localStorage.getItem('boardify_mode') || 'light',
    font: localStorage.getItem('boardify_font') || 'sans',
    lang: localStorage.getItem('boardify_lang') || 'en',
    currentView: 'landing',
    activeExam: 'USMLE Step 1',
    activeBlockQuestions: [],
    currentQuestionIndex: 0,
    userAnswers: {},
    timeRemaining: 3600,
    timerInterval: null
  };

  // DOM Elements
  const htmlEl = document.documentElement;
  const appearanceSelect = document.getElementById('appearance-select');
  const fontSelect = document.getElementById('font-select');
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  const langLabel = document.getElementById('lang-label');

  const viewLanding = document.getElementById('view-landing');
  const viewSimulator = document.getElementById('view-simulator');
  const navBrand = document.getElementById('nav-brand');
  const navOpenSimulator = document.getElementById('nav-open-simulator');
  const btnStartSimulator = document.getElementById('btn-start-simulator');
  const heroBtnStart = document.getElementById('hero-btn-start');
  const heroBtnCustom = document.getElementById('hero-btn-custom');

  // Simulator Elements
  const simBtnExit = document.getElementById('sim-btn-exit');
  const simItemCounter = document.getElementById('sim-item-counter');
  const simTimer = document.getElementById('sim-timer');
  const simVignetteExam = document.getElementById('sim-vignette-exam');
  const simVignetteSystem = document.getElementById('sim-vignette-system');
  const simVignetteStem = document.getElementById('sim-vignette-stem');
  const simVignetteQuestion = document.getElementById('sim-vignette-question');
  const simOptionsList = document.getElementById('sim-options-list');
  const simRationaleBox = document.getElementById('sim-rationale-box');
  const simMatrixGrid = document.getElementById('sim-matrix-grid');
  const simScoreText = document.getElementById('sim-score-text');
  const simBtnSubmit = document.getElementById('sim-btn-submit');
  const simBtnLab = document.getElementById('sim-btn-lab');

  // Modal Elements
  const configModal = document.getElementById('config-modal');
  const configModalClose = document.getElementById('config-modal-close');
  const configModalCancel = document.getElementById('config-modal-cancel');
  const configForm = document.getElementById('config-form');
  const toastStack = document.getElementById('toast-stack');

  // Toast System
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.textContent = message;
    toastStack.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 160);
    }, 2400);
  }

  // Appearance & Theme Engine
  function applyMode(mode) {
    state.mode = mode;
    htmlEl.setAttribute('data-mode', mode);
    localStorage.setItem('boardify_mode', mode);
    if (appearanceSelect) appearanceSelect.value = mode;
  }

  // Font Engine
  function applyFont(font) {
    state.font = font;
    htmlEl.setAttribute('data-font', font);
    localStorage.setItem('boardify_font', font);
    if (fontSelect) fontSelect.value = font;
  }

  // Language Engine
  function applyLang(lang) {
    state.lang = lang;
    htmlEl.setAttribute('lang', lang);
    htmlEl.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('boardify_lang', lang);
    if (langLabel) langLabel.textContent = lang === 'ar' ? 'EN' : 'AR';

    const t = I18N[lang] || I18N.en;

    // Update select options text
    if (appearanceSelect) {
      appearanceSelect.options[0].textContent = t.appearanceLight;
      appearanceSelect.options[1].textContent = t.appearanceDark;
    }

    if (fontSelect) {
      fontSelect.options[0].textContent = t.fontSans;
      fontSelect.options[1].textContent = t.fontMono;
      fontSelect.options[2].textContent = t.fontArabic;
    }

    if (btnStartSimulator) btnStartSimulator.querySelector('span').textContent = t.startPractice;
    
    // Landing text
    const heroTitle = document.querySelector('.hero-title');
    const heroDesc = document.querySelector('.hero-description');
    if (heroTitle) heroTitle.textContent = t.heroTitle;
    if (heroDesc) heroDesc.textContent = t.heroDesc;

    if (heroBtnStart) heroBtnStart.querySelector('span').textContent = t.heroStartBtn;
    if (heroBtnCustom) heroBtnCustom.querySelector('span').textContent = t.heroCustomBtn;

    // Simulator action text
    if (simBtnExit) simBtnExit.querySelector('span').textContent = t.exitBlock;
    if (simBtnLab) simBtnLab.querySelector('span').textContent = t.labValues;
    if (simBtnSubmit) simBtnSubmit.querySelector('span').textContent = t.submitAnswer;
  }

  // Navigation Controller
  function showView(viewName) {
    state.currentView = viewName;
    if (viewName === 'simulator') {
      if (viewLanding) viewLanding.style.display = 'none';
      if (viewSimulator) viewSimulator.style.display = 'flex';
      window.scrollTo(0, 0);
    } else {
      if (viewLanding) viewLanding.style.display = 'block';
      if (viewSimulator) viewSimulator.style.display = 'none';
      clearInterval(state.timerInterval);
    }
  }

  // Hero Preview Widget Setup
  function initHeroPreview() {
    const options = document.querySelectorAll('#preview-options .option-row');
    const rationale = document.getElementById('preview-rationale');

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        const isCorrect = opt.getAttribute('data-correct') === 'true';
        options.forEach(o => {
          o.style.pointerEvents = 'none';
          if (o.getAttribute('data-correct') === 'true') {
            o.classList.add('correct');
          }
        });

        if (!isCorrect) {
          opt.classList.add('incorrect');
        }

        if (rationale) rationale.classList.add('visible');
      });
    });
  }

  // Exam Simulator Engine
  function startExamBlock(examType, questionCount, mode) {
    state.activeExam = examType || 'USMLE Step 1';
    state.userAnswers = {};
    state.currentQuestionIndex = 0;

    const bank = (typeof QUESTION_BANK !== 'undefined' && QUESTION_BANK.length > 0) ? QUESTION_BANK : [
      {
        id: 'Q-10482',
        exam: 'USMLE Step 2 CK',
        system: 'Cardiovascular',
        stem: 'A 62-year-old male presents with acute tearing chest pain radiating to his interscapular region. Blood pressure is 185/105 mmHg in the right arm and 138/82 mmHg in the left arm. A grade 2/6 early diastolic murmur is heard along the right sternal border.',
        question: 'Which initial diagnostic test is most appropriate for this stable patient?',
        options: [
          { id: 'A', text: 'Transthoracic echocardiogram', isCorrect: false, explanation: 'TTE has lower sensitivity compared to CTA and TEE for identifying dissection flaps in the descending aorta.' },
          { id: 'B', text: 'Contrast-enhanced computed tomography angiography of chest', isCorrect: true, explanation: 'CTA of chest is the gold standard for confirmation in stable patients.' },
          { id: 'C', text: 'Intravenous thrombolysis with alteplase', isCorrect: false, explanation: 'Thrombolysis is strictly contraindicated in aortic dissection.' },
          { id: 'D', text: 'Emergent coronary catheterization', isCorrect: false, explanation: 'Can extend dissection flap into coronary ostia.' }
        ],
        educationalObjective: 'CT angiography of the chest is the initial test of choice in stable suspected acute aortic dissection.'
      }
    ];

    state.activeBlockQuestions = [];
    for (let i = 0; i < questionCount; i++) {
      const base = bank[i % bank.length];
      state.activeBlockQuestions.push({
        ...base,
        itemNumber: i + 1
      });
    }

    state.timeRemaining = questionCount * 60;
    startTimer();
    renderMatrixGrid();
    loadQuestion(0);
    showView('simulator');
    showToast(state.lang === 'ar' ? `بدأت جلسة اختبار تحتوي على ${questionCount} أسئلة.` : `Started ${questionCount}-question practice block.`);
  }

  function startTimer() {
    clearInterval(state.timerInterval);
    state.timerInterval = setInterval(() => {
      if (state.timeRemaining > 0) {
        state.timeRemaining--;
        const mins = Math.floor(state.timeRemaining / 60);
        const secs = state.timeRemaining % 60;
        const prefix = state.lang === 'ar' ? 'الوقت المتبقي: ' : 'Time remaining: ';
        if (simTimer) {
          simTimer.textContent = `${prefix}${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }
      } else {
        clearInterval(state.timerInterval);
        showToast(state.lang === 'ar' ? 'انتهى وقت الجلسة.' : 'Block time expired.');
      }
    }, 1000);
  }

  function renderMatrixGrid() {
    if (!simMatrixGrid) return;
    simMatrixGrid.innerHTML = '';

    state.activeBlockQuestions.forEach((q, idx) => {
      const btn = document.createElement('button');
      btn.className = `matrix-btn ${idx === state.currentQuestionIndex ? 'active' : ''} ${state.userAnswers[idx] !== undefined ? 'answered' : ''}`;
      btn.textContent = String(idx + 1);
      btn.addEventListener('click', () => loadQuestion(idx));
      simMatrixGrid.appendChild(btn);
    });
  }

  function loadQuestion(index) {
    state.currentQuestionIndex = index;
    const q = state.activeBlockQuestions[index];
    if (!q) return;

    if (simItemCounter) {
      simItemCounter.textContent = state.lang === 'ar' ? `السؤال ${index + 1} من ${state.activeBlockQuestions.length}` : `Item ${index + 1} of ${state.activeBlockQuestions.length}`;
    }
    if (simVignetteExam) simVignetteExam.textContent = q.exam || state.activeExam;
    if (simVignetteSystem) simVignetteSystem.textContent = q.system || 'Internal Medicine';
    if (simVignetteStem) simVignetteStem.textContent = q.stem;
    if (simVignetteQuestion) simVignetteQuestion.textContent = q.question || 'Which of the following is the most appropriate next step in management?';

    simOptionsList.innerHTML = '';
    simRationaleBox.className = 'rationale-block';
    simRationaleBox.innerHTML = '';

    const answeredOptionId = state.userAnswers[index];

    (q.options || []).forEach(opt => {
      const row = document.createElement('button');
      row.className = 'option-row';
      row.innerHTML = `<span class="option-letter">${opt.id}</span> <span>${opt.text}</span>`;

      if (answeredOptionId !== undefined) {
        row.style.pointerEvents = 'none';
        if (opt.isCorrect) row.classList.add('correct');
        if (answeredOptionId === opt.id && !opt.isCorrect) row.classList.add('incorrect');
      }

      row.addEventListener('click', () => {
        state.userAnswers[index] = opt.id;
        renderMatrixGrid();
        loadQuestion(index);
        updateScore();
      });

      simOptionsList.appendChild(row);
    });

    if (answeredOptionId !== undefined) {
      simRationaleBox.classList.add('visible');
      const correctOpt = q.options.find(o => o.isCorrect);
      simRationaleBox.innerHTML = `
        <strong>Educational objective:</strong> ${q.educationalObjective || 'Diagnosis confirmed.'}<br><br>
        <strong>Correct choice (${correctOpt ? correctOpt.id : 'B'}):</strong> ${correctOpt ? (correctOpt.explanation || correctOpt.text) : ''}
      `;
    }

    renderMatrixGrid();
  }

  function updateScore() {
    let correctCount = 0;
    let answeredCount = 0;

    state.activeBlockQuestions.forEach((q, idx) => {
      const ans = state.userAnswers[idx];
      if (ans !== undefined) {
        answeredCount++;
        const opt = q.options.find(o => o.id === ans);
        if (opt && opt.isCorrect) correctCount++;
      }
    });

    const percent = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
    if (simScoreText) simScoreText.textContent = `${correctCount} / ${answeredCount} (${percent}%)`;
  }

  // Event Listeners
  function initEvents() {
    if (appearanceSelect) {
      appearanceSelect.addEventListener('change', (e) => applyMode(e.target.value));
    }

    if (fontSelect) {
      fontSelect.addEventListener('change', (e) => applyFont(e.target.value));
    }

    if (langToggleBtn) {
      langToggleBtn.addEventListener('click', () => applyLang(state.lang === 'en' ? 'ar' : 'en'));
    }

    if (navBrand) {
      navBrand.addEventListener('click', (e) => {
        e.preventDefault();
        showView('landing');
      });
    }

    if (navOpenSimulator) {
      navOpenSimulator.addEventListener('click', (e) => {
        e.preventDefault();
        startExamBlock('USMLE Step 1', 10, 'tutor');
      });
    }

    if (btnStartSimulator) {
      btnStartSimulator.addEventListener('click', () => startExamBlock('USMLE Step 1', 10, 'tutor'));
    }

    if (heroBtnStart) {
      heroBtnStart.addEventListener('click', () => startExamBlock('USMLE Step 1', 10, 'tutor'));
    }

    if (heroBtnCustom) {
      heroBtnCustom.addEventListener('click', () => {
        if (configModal) configModal.classList.add('active');
      });
    }

    if (simBtnExit) {
      simBtnExit.addEventListener('click', () => showView('landing'));
    }

    if (simBtnSubmit) {
      simBtnSubmit.addEventListener('click', () => {
        const currentAnswer = state.userAnswers[state.currentQuestionIndex];
        if (currentAnswer === undefined) {
          showToast(state.lang === 'ar' ? 'يرجى اختيار إجابة أولاً.' : 'Select an answer before submitting.');
        } else {
          if (state.currentQuestionIndex < state.activeBlockQuestions.length - 1) {
            loadQuestion(state.currentQuestionIndex + 1);
          } else {
            showToast(state.lang === 'ar' ? 'تم الانتهاء من جميع الأسئلة.' : 'Block completed. Review explanations.');
          }
        }
      });
    }

    if (simBtnLab) {
      simBtnLab.addEventListener('click', () => {
        showToast(state.lang === 'ar' ? 'القيم المخبرية: الصوديوم 136-145، البوتاسيوم 3.5-5.0، الكرياتينين 0.7-1.3 mg/dL.' : 'Standard laboratory reference: Sodium 136-145, Potassium 3.5-5.0, Creatinine 0.7-1.3 mg/dL.');
      });
    }

    if (configModalClose) configModalClose.addEventListener('click', () => configModal.classList.remove('active'));
    if (configModalCancel) configModalCancel.addEventListener('click', () => configModal.classList.remove('active'));
    if (configForm) {
      configForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const exam = document.getElementById('config-exam-select').value;
        const count = parseInt(document.getElementById('config-count-select').value, 10) || 10;
        const mode = document.getElementById('config-mode-select').value;
        configModal.classList.remove('active');
        startExamBlock(exam, count, mode);
      });
    }
  }

  function init() {
    applyMode(state.mode);
    applyFont(state.font);
    applyLang(state.lang);
    initHeroPreview();
    initEvents();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
