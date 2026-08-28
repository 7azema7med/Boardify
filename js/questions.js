/* ==========================================================================
   BOARDIFY HIGH-YIELD MEDICAL QUESTION BANK (USMLE / MRCP / PLAB / UKMLA)
   English Clinical Vignettes, Vital Signs Panels, Lab Panels, Exhibits & Detailed Breakdowns
   ========================================================================== */

const QUESTION_BANK = [
  {
    id: "Q-10482",
    exam: "USMLE Step 2 CK / PLAB 1",
    system: "Cardiovascular System",
    discipline: "Emergency Medicine / Cardiology",
    vitals: {
      bp: "184/102 mm Hg (Right) • 142/86 (Left)",
      hr: "108 bpm",
      rr: "22 /min",
      temp: "37.1 °C (98.8 °F)",
      spo2: "98% on room air"
    },
    stem: `A 62-year-old man is brought to the emergency department due to sudden-onset, tearing chest pain that radiates directly to his back between the scapulae. The pain began 45 minutes ago while he was gardening. He has a 20-year history of poorly controlled hypertension and smoked 1 pack of cigarettes daily for 30 years.

On physical examination, he appears distressed and diaphoretic. Blood pressure is 184/102 mm Hg in the right arm and 142/86 mm Hg in the left arm. Heart rate is 108/min, and respirations are 22/min. Cardiac auscultation reveals a 3/6 high-pitched, decrescendo diastolic murmur heard best at the right sternal border. Lungs are clear to auscultation bilaterally. Radial and dorsalis pedis pulses are diminished on the left compared to the right. 

Electrocardiogram shows sinus tachycardia and non-specific ST-segment changes without acute ischemic findings. Chest radiography demonstrates a widened superior mediastinum (>8 cm). Which of the following is the most appropriate next step in management?`,
    exhibit: {
      type: "image",
      title: "Chest Radiograph & Aortic Silhouette",
      caption: "Upright PA chest radiograph demonstrating marked mediastinal widening (>8 cm) and abnormal aortic contour.",
      svg: `
        <svg viewBox="0 0 400 240" fill="#0A0F1D" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" rx="8" fill="#0E1626"/>
          <path d="M70 40 C110 30, 130 90, 130 180 C130 210, 80 210, 60 190 C40 160, 40 80, 70 40 Z" fill="#1E293B" stroke="#475569" stroke-width="1.5"/>
          <path d="M330 40 C290 30, 270 90, 270 180 C270 210, 320 210, 340 190 C360 160, 360 80, 330 40 Z" fill="#1E293B" stroke="#475569" stroke-width="1.5"/>
          <path d="M160 30 C160 80, 135 120, 145 170 C155 210, 245 210, 255 170 C265 120, 240 80, 240 30 Z" fill="#64748B" fill-opacity="0.85"/>
          <ellipse cx="170" cy="75" rx="38" ry="28" fill="#94A3B8" stroke="#CBD5E1" stroke-width="2"/>
          <path d="M165 65 Q175 80 168 95" stroke="#F43F5E" stroke-width="2.5" stroke-dasharray="3,3"/>
          <text x="200" y="225" fill="#94A3B8" font-size="12" text-anchor="middle" font-family="sans-serif">Stanford Type A Aortic Dissection with Widened Mediastinum</text>
        </svg>
      `
    },
    options: [
      { id: "A", text: "Initiate intravenous thrombolytic therapy with alteplase", stats: 3, explanation: "Incorrect. Thrombolysis is strictly contraindicated in aortic dissection because it causes catastrophic exsanguination into the pericardium or pleural cavity." },
      { id: "B", text: "Administer intravenous esmolol and obtain CT angiography of the chest", stats: 78, isCorrect: true, explanation: "Correct. In suspected acute aortic dissection (Stanford Type A or B), immediate heart rate and blood pressure control with an IV beta-blocker (e.g., esmolol, labetalol) to achieve HR < 60/min and SBP 100–120 mm Hg is mandatory to reduce aortic wall shear stress (dP/dt), followed promptly by definitive imaging with CT Angiography." },
      { id: "C", text: "Administer sublingual nitroglycerin as first-line monotherapy", stats: 6, explanation: "Incorrect. Vasodilators such as nitroglycerin or sodium nitroprusside without prior beta-blockade induce reflex tachycardia, increasing aortic wall shear stress (dP/dt) and risk of fatal aortic rupture." },
      { id: "D", text: "Immediate emergency transthoracic pericardiocentesis", stats: 4, explanation: "Incorrect. Pericardiocentesis in hemodynamically stable dissection can precipitate fatal collapse by releasing tamponade that was temporarily sealing an intrapericardial aortic rupture." },
      { id: "E", text: "Urgent coronary angiography via right femoral artery", stats: 9, explanation: "Incorrect. Coronary angiography is not indicated before CTA and can extend the dissection flap directly into the coronary ostia." }
    ],
    educationalObjective: "Acute Stanford Type A aortic dissection classically presents with sudden severe tearing chest/back pain, blood pressure discrepancy between limbs (>20 mm Hg), and a new aortic regurgitation murmur. The immediate first-line management is intravenous beta-blockade (e.g., esmolol) to lower shear stress (target HR < 60 bpm and SBP 100–120 mm Hg), followed immediately by CT Angiography and urgent cardiothoracic surgery.",
    differentialTable: `
      <table class="high-yield-table">
        <thead>
          <tr>
            <th>Clinical Condition</th>
            <th>Key Auscultation / Exam</th>
            <th>Diagnostic Hallmark</th>
            <th>Primary Management</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Stanford Type A Dissection</strong></td>
            <td>Aortic Regurgitation (Decrescendo diastolic murmur)</td>
            <td>Mediastinal widening, CTA flap</td>
            <td>IV Beta-blocker (Esmolol) + Urgent Surgery</td>
          </tr>
          <tr>
            <td><strong>Acute Coronary Syndrome (STEMI)</strong></td>
            <td>S4 gallop, diaphoresis</td>
            <td>ST-elevation on 12-lead ECG, Troponin I</td>
            <td>Primary PCI or Thrombolysis</td>
          </tr>
          <tr>
            <td><strong>Tension Pneumothorax</strong></td>
            <td>Absent breath sounds, tracheal deviation</td>
            <td>Hyperresonance, hemodynamic compromise</td>
            <td>Needle decompression (2nd ICS MCL or 5th ICS AAL)</td>
          </tr>
          <tr>
            <td><strong>Pulmonary Embolism</strong></td>
            <td>Tachycardia, accentuated P2</td>
            <td>CT Pulmonary Angiogram, elevated D-dimer</td>
            <td>Low Molecular Weight Heparin (LMWH)</td>
          </tr>
        </tbody>
      </table>
    `,
    highYieldPearl: `
      <div style="padding: 14px; background: var(--surface2); border-radius: var(--radius-md); border-left: 3px solid var(--primary);">
        <strong style="color: var(--primary);">Clinical Rule: Beta-Blockers Before Vasodilators!</strong>
        <p style="margin-top: 6px; font-size: 0.92rem;">In aortic dissection, always administer IV beta-blockers (Esmolol or Labetalol) <em>before</em> initiating vasodilators (Nitroprusside). Vasodilation alone triggers reflex sympathetic tachycardia, dramatically worsening aortic shear stress (dP/dt) and precipitating complete aortic rupture.</p>
      </div>
    `
  },
  {
    id: "Q-10483",
    exam: "USMLE Step 1 / MRCP Part 1",
    system: "Respiratory & Immune System",
    discipline: "Pathology / Pulmonology",
    vitals: {
      bp: "122/78 mm Hg",
      hr: "76 bpm",
      rr: "16 /min",
      temp: "37.0 °C (98.6 °F)",
      spo2: "97% on room air"
    },
    stem: `A 34-year-old African American woman presents to the clinic with persistent dry cough, progressive shortness of breath on exertion, and tender, erythematous nodules on her anterior shins for the past 6 weeks. She has also noticed painful swelling in both ankles. She takes no medications and does not smoke.

Vital signs are within normal limits. Physical examination reveals tender, violaceous subcutaneous plaques over the bilateral pretibial regions consistent with erythema nodosum. Bilateral fine end-inspiratory crackles are audible at the lung bases.

Laboratory evaluation shows:
• Serum Calcium: 11.4 mg/dL (Normal: 8.5–10.5 mg/dL)
• Serum 1,25-dihydroxycholecalciferol: Elevated
• Serum Parathyroid Hormone (PTH): 6 pg/mL (Normal: 10–65 pg/mL)
• 24-hour Urine Calcium: 380 mg/day (Normal: 100–300 mg/day)

Chest radiography demonstrates bilateral hilar lymphadenopathy and diffuse interstitial reticular infiltrates. A transbronchial lung biopsy is performed. Which of the following histopathologic findings is most characteristic of this patient's underlying condition?`,
    options: [
      { id: "A", text: "Caseating granulomas with central coagulative necrosis and Langhans giant cells", stats: 14, explanation: "Incorrect. Caseating granulomas with central necrosis are characteristic of Mycobacterium tuberculosis and endemic fungi (e.g., Histoplasmosis, Coccidioidomycosis), not sarcoidosis." },
      { id: "B", text: "Non-caseating granulomas with tightly packed epithelioid histiocytes and Schaumann bodies", stats: 81, isCorrect: true, explanation: "Correct. Sarcoidosis is a systemic non-caseating granulomatous disease characterized by CD4+ helper T-cell mediated macrophage activation. Alveolar macrophages express 1α-hydroxylase independently of PTH, converting 25-hydroxyvitamin D to active 1,25-dihydroxyvitamin D, causing hypercalcemia and suppressed PTH." },
      { id: "C", text: "Necrotizing granulomatous vasculitis with prominent tissue eosinophilia", stats: 3, explanation: "Incorrect. This describes Eosinophilic Granulomatosis with Polyangiitis (Churg-Strauss), characterized by asthma, peripheral eosinophilia, and positive p-ANCA." },
      { id: "D", text: "Ferruginous asbestos bodies with Prussian blue positive coating", stats: 1, explanation: "Incorrect. Ferruginous bodies indicate asbestosis, associated with pleural plaques and lower lobe interstitial fibrosis in shipyard/insulation workers." },
      { id: "E", text: "Alveolar spaces filled with eosinophilic, PAS-positive amorphous lipoproteinaceous material", stats: 1, explanation: "Incorrect. This describes Pulmonary Alveolar Proteinosis (PAP), driven by anti-GM-CSF autoantibodies impairing macrophage clearance of surfactant." }
    ],
    educationalObjective: "Sarcoidosis is characterized histopathologically by non-caseating granulomas composed of epithelioid macrophages and multinucleated giant cells. Macrophages inside granulomas express 1-alpha-hydroxylase independently of PTH, producing excess 1,25-(OH)2-vitamin D and hypercalcemia with suppressed PTH.",
    highYieldPearl: `
      <div style="padding: 12px; background: var(--surface2); border-radius: var(--radius-md); border-left: 3px solid var(--primary);">
        <strong style="color: var(--primary);">Löfgren Syndrome Triad (95% Diagnostic Specificity):</strong>
        <ol style="margin-left: 20px; margin-top: 6px; font-size: 0.92rem;">
          <li>Bilateral Hilar Lymphadenopathy (BHL) on CXR</li>
          <li>Erythema Nodosum (painful violaceous pretibial nodules)</li>
          <li>Migratory Polyarthritis (predominantly ankles and knees)</li>
        </ol>
      </div>
    `
  },
  {
    id: "Q-10484",
    exam: "USMLE Step 1 / MRCP Part 1",
    system: "Renal & Urinary System",
    discipline: "Renal Pathology / Nephrology",
    vitals: {
      bp: "138/88 mm Hg",
      hr: "72 bpm",
      rr: "14 /min",
      temp: "36.8 °C (98.2 °F)",
      spo2: "99% on room air"
    },
    stem: `A 48-year-old man presents with worsening edema in his lower extremities, periorbital puffiness in the morning, and frothy urine over the past 2 months. He has no significant past medical history and takes no medications.

Urinalysis reveals:
• Protein: 4+ (24-hour urine protein collection: 5.8 g/day)
• Blood: Negative
• Microscopic examination: Oval fat bodies under polarized light exhibiting a 'Maltese cross' pattern; no cellular casts or red blood cells.

Serum albumin is 2.1 g/dL and total serum cholesterol is 340 mg/dL. Serologic testing is positive for autoantibodies against the M-type phospholipase A2 receptor (anti-PLA2R). A renal biopsy is obtained. Which of the following ultrastructural findings on electron microscopy is expected in this patient?`,
    options: [
      { id: "A", text: "Subepithelial immune complex deposits with 'spike and dome' appearance", stats: 84, isCorrect: true, explanation: "Correct. Primary membranous nephropathy is the most common cause of nephrotic syndrome in non-diabetic adults, driven by IgG4 autoantibodies against the podocyte PLA2R. Electron microscopy reveals dense subepithelial deposits with intervening basement membrane spikes ('spike and dome')." },
      { id: "B", text: "Diffuse effacement of visceral epithelial cell (podocyte) foot processes without immune deposits", stats: 9, explanation: "Incorrect. This describes Minimal Change Disease, the most frequent cause of nephrotic syndrome in pediatric populations." },
      { id: "C", text: "Large subendothelial immune complex deposits with 'wire loop' capillary wall thickening", stats: 4, explanation: "Incorrect. This is classic for Diffuse Proliferative Glomerulonephritis (Lupus nephritis Class IV)." },
      { id: "D", text: "Mesangial IgA and C3 deposition on immunofluorescence", stats: 2, explanation: "Incorrect. This characterizes IgA nephropathy (Berger disease), presenting as episodic gross hematuria following upper respiratory infections." },
      { id: "E", text: "Segmental sclerosis and hyalinosis of capillary tufts with focal podocyte foot process effacement", stats: 1, explanation: "Incorrect. This describes Focal Segmental Glomerulosclerosis (FSGS)." }
    ],
    educationalObjective: "Primary Membranous Nephropathy is caused by antibodies against PLA2R on podocytes, producing subepithelial immune complex deposits with intervening basement membrane spikes ('spike and dome' appearance on electron microscopy) and granular IgG/C3 on immunofluorescence.",
    highYieldPearl: `
      <table class="high-yield-table">
        <thead>
          <tr>
            <th>Nephrotic Entity</th>
            <th>Underlying Etiology</th>
            <th>Electron Microscopy (EM)</th>
            <th>Immunofluorescence (IF)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Membranous Nephropathy</strong></td>
            <td>Anti-PLA2R (85%), Malignancy, Hep B/C, NSAIDs</td>
            <td>Subepithelial deposits ('Spike & Dome')</td>
            <td>Granular IgG & C3 along GBM</td>
          </tr>
          <tr>
            <td><strong>Minimal Change Disease</strong></td>
            <td>Idiopathic, NSAIDs, Hodgkin lymphoma</td>
            <td>Diffuse podocyte foot process effacement</td>
            <td>Negative (No deposits)</td>
          </tr>
          <tr>
            <td><strong>FSGS</strong></td>
            <td>APOL1 mutation, HIV, Heroin, Sickle cell, Obesity</td>
            <td>Focal podocyte effacement + Sclerosis</td>
            <td>Negative / Non-specific IgM in scars</td>
          </tr>
        </tbody>
      </table>
    `
  }
];

// Lab Values Normal Reference Database (Standard USMLE & UKMLA Normal Ranges)
const LAB_VALUES = [
  {
    category: "Serum Chemistry & Electrolytes",
    items: [
      { name: "Sodium (Na+)", normal: "136 – 145 mEq/L (mmol/L)" },
      { name: "Potassium (K+)", normal: "3.5 – 5.0 mEq/L (mmol/L)" },
      { name: "Chloride (Cl-)", normal: "95 – 105 mEq/L (mmol/L)" },
      { name: "Bicarbonate (HCO3-)", normal: "22 – 28 mEq/L (mmol/L)" },
      { name: "Blood Urea Nitrogen (BUN)", normal: "7 – 20 mg/dL (2.5 – 7.1 mmol/L)" },
      { name: "Serum Creatinine", normal: "0.6 – 1.2 mg/dL (53 – 106 µmol/L)" },
      { name: "Glucose (Fasting)", normal: "70 – 99 mg/dL (3.9 – 5.5 mmol/L)" },
      { name: "Calcium (Total)", normal: "8.5 – 10.5 mg/dL (2.1 – 2.6 mmol/L)" },
      { name: "Magnesium (Mg2+)", normal: "1.5 – 2.4 mg/dL (0.7 – 1.0 mmol/L)" },
      { name: "Phosphate (PO4)", normal: "2.5 – 4.5 mg/dL (0.8 – 1.5 mmol/L)" }
    ]
  },
  {
    category: "Complete Blood Count (Hematology)",
    items: [
      { name: "Hemoglobin (Male)", normal: "13.5 – 17.5 g/dL (135 – 175 g/L)" },
      { name: "Hemoglobin (Female)", normal: "12.0 – 16.0 g/dL (120 – 160 g/L)" },
      { name: "Hematocrit (Male)", normal: "41% – 53%" },
      { name: "Hematocrit (Female)", normal: "36% – 46%" },
      { name: "White Blood Cells (WBC)", normal: "4,500 – 11,000 /µL (4.5 – 11.0 × 10^9/L)" },
      { name: "Platelet Count", normal: "150,000 – 450,000 /µL" },
      { name: "Mean Corpuscular Volume (MCV)", normal: "80 – 100 fL" },
      { name: "Prothrombin Time (PT)", normal: "11.0 – 13.5 sec" },
      { name: "INR (Normal / Therapeutic)", normal: "0.8 – 1.1 / 2.0 – 3.0" },
      { name: "aPTT", normal: "25 – 35 sec" }
    ]
  },
  {
    category: "Hepatic & Pancreatic Panel",
    items: [
      { name: "ALT (Alanine Aminotransferase)", normal: "10 – 40 U/L" },
      { name: "AST (Aspartate Aminotransferase)", normal: "10 – 35 U/L" },
      { name: "Alkaline Phosphatase (ALP)", normal: "30 – 120 U/L" },
      { name: "Total Bilirubin", normal: "0.2 – 1.2 mg/dL (3.4 – 20.5 µmol/L)" },
      { name: "Direct Bilirubin", normal: "0.0 – 0.3 mg/dL" },
      { name: "Serum Albumin", normal: "3.5 – 5.5 g/dL (35 – 55 g/L)" },
      { name: "Lipase", normal: "0 – 160 U/L" }
    ]
  },
  {
    category: "Arterial Blood Gas (ABG - Room Air)",
    items: [
      { name: "pH", normal: "7.35 – 7.45" },
      { name: "PaCO2", normal: "35 – 45 mm Hg (4.7 – 6.0 kPa)" },
      { name: "PaO2", normal: "80 – 100 mm Hg (10.6 – 13.3 kPa)" },
      { name: "HCO3- (Calculated)", normal: "22 – 26 mEq/L" },
      { name: "Base Excess", normal: "-2 to +2 mEq/L" },
      { name: "Oxygen Saturation (SaO2)", normal: "95% – 99%" }
    ]
  }
];
