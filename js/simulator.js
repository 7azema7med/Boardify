/* ==========================================================================
   BOARDIFY EXAM SIMULATOR & MEDICAL Q-BANK ENGINE (v2.5)
   Interactive VignetteCard, ChoiceList, HighYieldRationale, Labs, Highlighter & Tools (English)
   ========================================================================== */

class ExamSimulator {
  constructor() {
    this.questions = [...QUESTION_BANK];
    this.currentIndex = 0;
    this.userAnswers = {}; // { qId: optionId }
    this.strikes = {};     // { qId: [optionId, ...] }
    this.flags = new Set();
    this.isTutorMode = true;
    this.isTimed = false;
    this.timeSeconds = 0;
    this.timerInterval = null;
    this.isPaused = false;
    this.submittedQuestions = new Set();
    this.highlightColor = 'var(--highlight-yellow)';
    this.setupKeyboardShortcuts();
    this.setupTextHighlighter();
  }

  startTest(customQuestions = null, isTutor = true, isTimed = false) {
    this.questions = customQuestions && customQuestions.length > 0 ? customQuestions : [...QUESTION_BANK];
    this.currentIndex = 0;
    this.userAnswers = {};
    this.strikes = {};
    this.flags.clear();
    this.submittedQuestions.clear();
    this.isTutorMode = isTutor;
    this.isTimed = isTimed;
    this.timeSeconds = this.isTimed ? this.questions.length * 90 : 0; // 90s standard per question
    this.isPaused = false;

    this.startTimer();
    this.renderCurrentQuestion();
    this.updateFooterNav();
    this.renderQuestionGrid();
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    const timerDisplay = document.getElementById('exam-timer-text');

    this.timerInterval = setInterval(() => {
      if (this.isPaused) return;

      if (this.isTimed) {
        if (this.timeSeconds > 0) {
          this.timeSeconds--;
        } else {
          clearInterval(this.timerInterval);
          alert('Time expired for this question block!');
        }
      } else {
        this.timeSeconds++;
      }

      if (timerDisplay) {
        const mins = Math.floor(this.timeSeconds / 60);
        const secs = this.timeSeconds % 60;
        timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      }
    }, 1000);
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    const pauseBtn = document.getElementById('btn-exam-pause');
    if (pauseBtn) {
      pauseBtn.innerHTML = this.isPaused
        ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Resume`
        : `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pause`;
    }
  }

  renderCurrentQuestion() {
    const q = this.questions[this.currentIndex];
    if (!q) return;

    // Header updates
    const qNumEl = document.getElementById('exam-current-qnum');
    const totalQEl = document.getElementById('exam-total-qnum');
    if (qNumEl) qNumEl.textContent = `Q ${this.currentIndex + 1}`;
    if (totalQEl) totalQEl.textContent = `of ${this.questions.length}`;

    // Flag button update
    const flagBtn = document.getElementById('btn-exam-flag');
    if (flagBtn) {
      if (this.flags.has(q.id)) {
        flagBtn.classList.add('btn-flagged');
        flagBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg> Flagged`;
      } else {
        flagBtn.classList.remove('btn-flagged');
        flagBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg> Flag`;
      }
    }

    // Stem rendering with vital signs chip bar
    const stemEl = document.getElementById('exam-vignette-stem');
    if (stemEl) {
      let vitalsHtml = '';
      if (q.vitals) {
        vitalsHtml = `
          <div class="vignette-vitals-strip" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; padding: 8px 12px; background: var(--surface2); border-radius: var(--radius-sm); font-size: 0.8rem; font-family: var(--font-mono); border-left: 3px solid var(--primary);">
            <span title="Blood Pressure">🫀 <strong>BP:</strong> ${q.vitals.bp}</span>
            <span title="Heart Rate">💓 <strong>HR:</strong> ${q.vitals.hr}</span>
            <span title="Respiratory Rate">🫁 <strong>RR:</strong> ${q.vitals.rr}</span>
            <span title="Temperature">🌡️ <strong>Temp:</strong> ${q.vitals.temp}</span>
            <span title="Oxygen Saturation">💨 <strong>SpO2:</strong> ${q.vitals.spo2}</span>
          </div>
        `;
      }
      stemEl.innerHTML = vitalsHtml + q.stem.replace(/\n\n/g, '<br><br>');
    }

    // Exhibit rendering
    const exhibitBox = document.getElementById('exam-exhibit-container');
    if (exhibitBox) {
      if (q.exhibit) {
        exhibitBox.style.display = 'block';
        exhibitBox.innerHTML = `
          <div class="exhibit-badge-btn" onclick="document.getElementById('exhibit-modal-content').scrollIntoView({behavior: 'smooth'})">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            Clinical Exhibit Available: ${q.exhibit.title}
          </div>
          <div class="exhibit-preview-box" id="exhibit-modal-content">
            ${q.exhibit.svg}
            <div class="exhibit-caption">${q.exhibit.caption}</div>
          </div>
        `;
      } else {
        exhibitBox.style.display = 'none';
        exhibitBox.innerHTML = '';
      }
    }

    // Options rendering
    const optionsEl = document.getElementById('exam-options-list');
    const isSubmitted = this.submittedQuestions.has(q.id);
    const userSelected = this.userAnswers[q.id];
    const qStrikes = this.strikes[q.id] || [];

    if (optionsEl) {
      optionsEl.innerHTML = q.options.map(opt => {
        const isOptSelected = userSelected === opt.id;
        const isStruck = qStrikes.includes(opt.id);
        let outcomeClass = '';

        if (isSubmitted) {
          if (opt.isCorrect) outcomeClass = 'outcome-correct';
          else if (isOptSelected && !opt.isCorrect) outcomeClass = 'outcome-incorrect';
        }

        return `
          <div class="option-row ${isOptSelected ? 'selected' : ''} ${isStruck ? 'strikethrough' : ''} ${outcomeClass} ${isSubmitted ? 'locked' : ''}" 
               data-option-id="${opt.id}" 
               onclick="window.examSim.selectOption('${q.id}', '${opt.id}')"
               oncontextmenu="window.examSim.toggleStrike(event, '${q.id}', '${opt.id}')">
            <div class="option-left-content">
              <div class="option-letter-badge">${opt.id}</div>
              <div class="option-text">${opt.text}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              ${isSubmitted ? `<div class="option-percent-tag">${opt.stats}% chosen</div>` : ''}
              ${!isSubmitted ? `
                <button class="option-strike-btn" title="Strike out option (or right-click)" onclick="event.stopPropagation(); window.examSim.toggleStrike(event, '${q.id}', '${opt.id}')">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="4" x2="20" y2="20"/></svg>
                </button>
              ` : ''}
            </div>
          </div>
        `;
      }).join('');
    }

    // Explanation & High Yield Rationale panel
    const explanationEl = document.getElementById('exam-explanation-panel');
    if (explanationEl) {
      if (isSubmitted && this.isTutorMode) {
        explanationEl.classList.add('active');
        explanationEl.innerHTML = `
          <div class="educational-objective-box">
            <div class="edu-title">Educational Objective</div>
            <div class="edu-text">${q.educationalObjective}</div>
          </div>

          <div class="explanation-card">
            <div class="explanation-section-title">Diagnostic & Clinical Rationale</div>
            <div class="explanation-body">
              ${q.options.map(opt => `
                <div style="margin-bottom: 14px; padding-left: 10px; border-left: 2px solid ${opt.isCorrect ? 'var(--success)' : 'var(--border)'};">
                  <strong>Option (${opt.id}) ${opt.isCorrect ? '<span style="color: var(--success); font-weight:700;">✓ Correct</span>' : '<span style="color: var(--error); font-weight:700;">✗ Incorrect</span>'}</strong>: 
                  <span>${opt.explanation}</span>
                </div>
              `).join('')}
            </div>

            ${q.differentialTable ? `
              <div style="margin-top: 14px;">
                <div style="font-size: 0.95rem; font-weight: 800; color: var(--text); margin-bottom: 8px;">Differential Diagnosis Breakdown</div>
                ${q.differentialTable}
              </div>
            ` : ''}

            ${q.highYieldPearl ? `<div style="margin-top: 10px;">${q.highYieldPearl}</div>` : ''}
          </div>
        `;
      } else {
        explanationEl.classList.remove('active');
        explanationEl.innerHTML = '';
      }
    }

    this.updateFooterNav();
    this.renderQuestionGrid();
  }

  selectOption(qId, optionId) {
    if (this.submittedQuestions.has(qId)) return;
    this.userAnswers[qId] = optionId;
    this.renderCurrentQuestion();
  }

  toggleStrike(event, qId, optionId) {
    if (event) event.preventDefault();
    if (this.submittedQuestions.has(qId)) return;

    if (!this.strikes[qId]) this.strikes[qId] = [];
    const idx = this.strikes[qId].indexOf(optionId);
    if (idx > -1) {
      this.strikes[qId].splice(idx, 1);
    } else {
      this.strikes[qId].push(optionId);
    }
    this.renderCurrentQuestion();
  }

  toggleFlag() {
    const q = this.questions[this.currentIndex];
    if (!q) return;

    if (this.flags.has(q.id)) {
      this.flags.delete(q.id);
    } else {
      this.flags.add(q.id);
    }
    this.renderCurrentQuestion();
  }

  submitAnswer() {
    const q = this.questions[this.currentIndex];
    if (!q) return;

    this.submittedQuestions.add(q.id);
    this.renderCurrentQuestion();
  }

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.renderCurrentQuestion();
    }
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.renderCurrentQuestion();
    }
  }

  jumpToQuestion(index) {
    if (index >= 0 && index < this.questions.length) {
      this.currentIndex = index;
      this.renderCurrentQuestion();
      this.closeModal('qgrid-modal');
    }
  }

  updateFooterNav() {
    const prevBtn = document.getElementById('btn-exam-prev');
    const nextBtn = document.getElementById('btn-exam-next');
    const submitBtn = document.getElementById('btn-exam-submit');
    const q = this.questions[this.currentIndex];

    if (prevBtn) prevBtn.disabled = this.currentIndex === 0;
    if (nextBtn) nextBtn.disabled = this.currentIndex === this.questions.length - 1;

    if (submitBtn) {
      const isSubmitted = q ? this.submittedQuestions.has(q.id) : false;
      const isAnswered = q ? !!this.userAnswers[q.id] : false;

      if (isSubmitted) {
        submitBtn.textContent = "Answer Submitted";
        submitBtn.disabled = true;
        submitBtn.classList.remove('btn-primary');
        submitBtn.classList.add('btn-secondary');
      } else {
        submitBtn.textContent = "Submit Answer";
        submitBtn.disabled = !isAnswered;
        submitBtn.classList.add('btn-primary');
        submitBtn.classList.remove('btn-secondary');
      }
    }
  }

  renderQuestionGrid() {
    const gridContainer = document.getElementById('qgrid-node-list');
    if (!gridContainer) return;

    gridContainer.innerHTML = this.questions.map((q, idx) => {
      const isCurrent = idx === this.currentIndex;
      const isFlagged = this.flags.has(q.id);
      const isAnswered = !!this.userAnswers[q.id];
      const isSubmitted = this.submittedQuestions.has(q.id);
      
      let stateClass = '';
      if (isSubmitted) {
        const selected = this.userAnswers[q.id];
        const correct = q.options.find(o => o.isCorrect)?.id;
        stateClass = selected === correct ? 'correct' : 'incorrect';
      } else if (isAnswered) {
        stateClass = 'answered';
      }

      return `
        <div class="qgrid-node ${isCurrent ? 'active' : ''} ${isFlagged ? 'flagged' : ''} ${stateClass}" 
             onclick="window.examSim.jumpToQuestion(${idx})">
          ${idx + 1}
        </div>
      `;
    }).join('');
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      const key = e.key.toUpperCase();
      const q = this.questions[this.currentIndex];
      if (!q) return;

      if (['A', 'B', 'C', 'D', 'E'].includes(key)) {
        const targetOption = q.options.find(o => o.id === key);
        if (targetOption && !this.submittedQuestions.has(q.id)) {
          this.selectOption(q.id, key);
        }
      }

      if (e.key === 'Enter') {
        const submitBtn = document.getElementById('btn-exam-submit');
        if (submitBtn && !submitBtn.disabled) {
          this.submitAnswer();
        }
      }

      if (e.key === 'ArrowRight') {
        this.nextQuestion();
      }

      if (e.key === 'ArrowLeft') {
        this.prevQuestion();
      }
    });
  }

  setupTextHighlighter() {
    document.addEventListener('mouseup', () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) return;

      const stemEl = document.getElementById('exam-vignette-stem');
      if (!stemEl || !stemEl.contains(selection.anchorNode)) return;

      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style.backgroundColor = 'var(--highlight-yellow)';
      span.style.borderRadius = '2px';
      span.style.padding = '0 2px';

      try {
        range.surroundContents(span);
        selection.removeAllRanges();
      } catch (err) {
        // Complex DOM range boundary
      }
    });
  }

  openModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.add('active');
  }

  closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.remove('active');
  }
}

// Lab Values Manager
class LabValuesManager {
  constructor() {
    this.data = LAB_VALUES;
    this.render();
    this.setupSearch();
  }

  render(filter = '') {
    const container = document.getElementById('lab-values-content');
    if (!container) return;

    const lowerFilter = filter.toLowerCase().trim();

    container.innerHTML = this.data.map(cat => {
      const filteredItems = cat.items.filter(item => 
        !lowerFilter || item.name.toLowerCase().includes(lowerFilter) || item.normal.toLowerCase().includes(lowerFilter)
      );

      if (filteredItems.length === 0) return '';

      return `
        <div class="lab-category-section">
          <div class="lab-category-header">${cat.category}</div>
          <table class="high-yield-table">
            <thead>
              <tr>
                <th style="width: 55%;">Test / Parameter</th>
                <th>Reference Range (Adult Standard)</th>
              </tr>
            </thead>
            <tbody>
              ${filteredItems.map(item => `
                <tr>
                  <td><strong>${item.name}</strong></td>
                  <td style="font-family: var(--font-mono); font-size: 0.85rem;">${item.normal}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }).join('');
  }

  setupSearch() {
    const input = document.getElementById('lab-search-input');
    if (input) {
      input.addEventListener('input', (e) => this.render(e.target.value));
    }
  }
}

// Biostats Calculator
class BiostatsCalc {
  constructor() {
    this.expression = '';
    this.displayEl = document.getElementById('calc-display-text');
  }

  input(char) {
    this.expression += char;
    this.update();
  }

  clear() {
    this.expression = '';
    this.update('0');
  }

  backspace() {
    this.expression = this.expression.slice(0, -1);
    this.update(this.expression || '0');
  }

  evaluate() {
    try {
      const sanitized = this.expression.replace(/×/g, '*').replace(/÷/g, '/');
      const result = Function(`'use strict'; return (${sanitized})`)();
      this.expression = String(result);
      this.update();
    } catch {
      this.update('Error');
      this.expression = '';
    }
  }

  update(text = null) {
    if (!this.displayEl) this.displayEl = document.getElementById('calc-display-text');
    if (this.displayEl) {
      this.displayEl.textContent = text !== null ? text : (this.expression || '0');
    }
  }
}

window.examSim = new ExamSimulator();
window.labValuesManager = new LabValuesManager();
window.biostatsCalc = new BiostatsCalc();
