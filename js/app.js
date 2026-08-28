/* ==========================================================================
   BOARDFY MAIN APPLICATION CONTROLLER
   View Navigation, Sidebar Management, Test Creation & Interactive Hero
   ========================================================================== */

class AppController {
  constructor() {
    this.currentView = 'landing';
    this.sidebarCollapsed = false;
    this.selectedExam = 'USMLE Step 1';
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupSidebar();
    this.setupHeroWidget();
    this.setupTestCreator();
    this.setupAnalytics();
  }

  navigateTo(viewId) {
    this.currentView = viewId;

    // Handle full landing page vs simulator views
    const landingView = document.getElementById('view-landing');
    const uworldAppView = document.getElementById('view-uworld-app');

    if (viewId === 'landing') {
      if (landingView) landingView.style.display = 'flex';
      if (uworldAppView) uworldAppView.style.display = 'none';
      window.scrollTo(0, 0);
      return;
    }

    if (landingView) landingView.style.display = 'none';
    if (uworldAppView) uworldAppView.style.display = 'flex';

    // Toggle sub-stages inside the UWorld shell
    document.querySelectorAll('.stage-view-section').forEach(section => {
      section.style.display = 'none';
    });

    const targetStage = document.getElementById(`stage-${viewId}`);
    if (targetStage) {
      targetStage.style.display = 'block';
    }

    // Update active nav item
    document.querySelectorAll('.sidebar-nav-item').forEach(item => {
      if (item.getAttribute('data-view') === viewId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // If entering test simulator, make sure a test is running
    if (viewId === 'simulator') {
      if (!window.examSim.questions || window.examSim.questions.length === 0) {
        window.examSim.startTest();
      }
    }
  }

  setupNavigation() {
    // Top nav & CTA buttons
    document.querySelectorAll('[data-action="start-demo"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.examSim.startTest(QUESTION_BANK, true, false);
        this.navigateTo('simulator');
      });
    });

    document.querySelectorAll('[data-action="open-creator"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigateTo('create-test');
      });
    });

    document.querySelectorAll('[data-action="go-landing"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigateTo('landing');
      });
    });

    // Sidebar navigation clicks
    document.querySelectorAll('.sidebar-nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const view = item.getAttribute('data-view');
        if (view) this.navigateTo(view);
      });
    });

    // Exam Chip selector on landing page
    document.querySelectorAll('.exam-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.exam-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.selectedExam = chip.textContent.trim();
        const badge = document.getElementById('selected-exam-badge');
        if (badge) badge.textContent = this.selectedExam;
      });
    });
  }

  setupSidebar() {
    const toggleBtn = document.getElementById('sidebar-toggle-btn');
    const sidebar = document.getElementById('uworld-sidebar');

    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => {
        this.sidebarCollapsed = !this.sidebarCollapsed;
        if (this.sidebarCollapsed) {
          sidebar.classList.add('collapsed');
        } else {
          sidebar.classList.remove('collapsed');
        }
      });
    }
  }

  setupHeroWidget() {
    const heroQuestion = QUESTION_BANK[0];
    const heroWidget = document.getElementById('hero-interactive-widget');
    if (!heroWidget || !heroQuestion) return;

    const optionsContainer = document.getElementById('hero-widget-options');
    const explanationBox = document.getElementById('hero-widget-explanation');

    if (optionsContainer) {
      optionsContainer.innerHTML = heroQuestion.options.slice(0, 4).map(opt => `
        <button class="widget-option-btn" data-opt-id="${opt.id}" data-correct="${opt.isCorrect || false}">
          <span class="widget-option-letter">${opt.id}</span>
          <span>${opt.text}</span>
        </button>
      `).join('');

      optionsContainer.querySelectorAll('.widget-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const isCorrect = btn.getAttribute('data-correct') === 'true';
          const optId = btn.getAttribute('data-opt-id');

          // Highlight selection
          optionsContainer.querySelectorAll('.widget-option-btn').forEach(b => {
            b.disabled = true;
            if (b.getAttribute('data-correct') === 'true') {
              b.classList.add('selected-correct');
            } else if (b === btn) {
              b.classList.add('selected-incorrect');
            }
          });

          // Show explanation preview
          if (explanationBox) {
            explanationBox.style.display = 'block';
            explanationBox.innerHTML = `
              <strong>${isCorrect ? '✓ High-Yield Mastered!' : 'Diagnostic Note:'}</strong> 
              ${heroQuestion.options.find(o => o.id === optId)?.explanation || heroQuestion.educationalObjective}
              <div style="margin-top: 10px;">
                <button class="btn btn-sm btn-primary" onclick="window.app.navigateTo('simulator')">
                  Practice Full Test Block →
                </button>
              </div>
            `;
          }
        });
      });
    }
  }

  setupTestCreator() {
    // Mode toggles (Tutor vs Timed)
    let isTutor = true;
    let isTimed = false;

    const tutorChips = document.querySelectorAll('[data-creator-mode]');
    tutorChips.forEach(chip => {
      chip.addEventListener('click', () => {
        tutorChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const mode = chip.getAttribute('data-creator-mode');
        isTutor = mode === 'tutor';
        isTimed = mode === 'timed';
      });
    });

    const startCustomBtn = document.getElementById('btn-start-custom-block');
    if (startCustomBtn) {
      startCustomBtn.addEventListener('click', () => {
        // Collect selected systems
        const checkedSystems = [];
        document.querySelectorAll('.system-checkbox:checked').forEach(cb => {
          checkedSystems.push(cb.value);
        });

        // Filter question bank or fallback to all
        let filtered = QUESTION_BANK.filter(q => {
          if (checkedSystems.length === 0) return true;
          return checkedSystems.some(sys => q.system.includes(sys));
        });

        if (filtered.length === 0) filtered = [...QUESTION_BANK];

        window.examSim.startTest(filtered, isTutor, isTimed);
        this.navigateTo('simulator');
      });
    }
  }

  setupAnalytics() {
    // Dynamic analytics preview calculation
    const totalQEl = document.getElementById('analytics-total-q');
    if (totalQEl) totalQEl.textContent = '10,480+';
  }
}

// Global App controller
window.app = new AppController();
