// BOARDIFY - Medical Examination Platform & Simulator Controller
(function () {
  'use strict';

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

    // Use items from QUESTION_BANK if available, or build standard items
    const bank = (typeof QUESTION_BANK !== 'undefined' && QUESTION_BANK.length > 0) ? QUESTION_BANK : [
      {
        id: 'Q-10482',
        exam: 'USMLE Step 2 CK',
        system: 'Cardiovascular',
        stem: 'A 62-year-old male presents with acute tearing chest pain radiating to his interscapular region. Blood pressure is 185/105 mmHg in the right arm and 138/82 mmHg in the left arm. A grade 2/6 early diastolic murmur is heard along the right sternal border.',
        question: 'Which initial diagnostic test is most appropriate for this stable patient?',
        options: [
          { id: 'A', text: 'Transthoracic echocardiogram', isCorrect: false, explanation: 'TTE has lower sensitivity (60-80%) compared to CTA and TEE for identifying dissection flaps in the descending aorta.' },
          { id: 'B', text: 'Contrast-enhanced computed tomography angiography of chest', isCorrect: true, explanation: 'CTA of chest is the gold standard for confirmation in stable patients.' },
          { id: 'C', text: 'Intravenous thrombolysis with alteplase', isCorrect: false, explanation: 'Thrombolysis is strictly contraindicated in aortic dissection.' },
          { id: 'D', text: 'Emergent coronary catheterization', isCorrect: false, explanation: 'Can extend dissection flap into coronary ostia.' }
        ],
        educationalObjective: 'CT angiography of the chest is the initial test of choice in stable suspected acute aortic dissection.'
      }
    ];

    // Build block items
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
    showToast(`Started ${questionCount}-question practice block.`);
  }

  function startTimer() {
    clearInterval(state.timerInterval);
    state.timerInterval = setInterval(() => {
      if (state.timeRemaining > 0) {
        state.timeRemaining--;
        const mins = Math.floor(state.timeRemaining / 60);
        const secs = state.timeRemaining % 60;
        if (simTimer) {
          simTimer.textContent = `Time remaining: ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }
      } else {
        clearInterval(state.timerInterval);
        showToast('Block time expired.');
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

    if (simItemCounter) simItemCounter.textContent = `Item ${index + 1} of ${state.activeBlockQuestions.length}`;
    if (simVignetteExam) simVignetteExam.textContent = q.exam || state.activeExam;
    if (simVignetteSystem) simVignetteSystem.textContent = q.system || 'Internal Medicine';
    if (simVignetteStem) simVignetteStem.textContent = q.stem;
    if (simVignetteQuestion) simVignetteQuestion.textContent = q.question || 'Which of the following is the most appropriate next step in management?';

    // Options
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
          showToast('Select an answer before submitting.');
        } else {
          if (state.currentQuestionIndex < state.activeBlockQuestions.length - 1) {
            loadQuestion(state.currentQuestionIndex + 1);
          } else {
            showToast('Block completed. Review explanations.');
          }
        }
      });
    }

    if (simBtnLab) {
      simBtnLab.addEventListener('click', () => {
        showToast('Standard laboratory reference: Sodium 136-145, Potassium 3.5-5.0, Creatinine 0.7-1.3 mg/dL.');
      });
    }

    // Custom Modal Controls
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
