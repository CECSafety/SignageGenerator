/* ============================================================
   CEC SAFETY STUDIO — DATA
   41 sign templates (ANSI Z535.4), 5 infographic templates,
   17 policy-analyzer topics, and the photo library.
   ============================================================ */

const SIGNAL_LEVELS = ['DANGER', 'WARNING', 'CAUTION', 'NOTICE', 'ENERGIZED'];

const FIELD_DEFINITIONS = {
  name:       { label: 'Authorized Employee', type: 'text' },
  date:       { label: 'Date Applied',        type: 'date' },
  equipment:  { label: 'Equipment / Asset ID',type: 'text' },
  supervisor: { label: 'Supervisor Notified', type: 'text' },
  shift:      { label: 'Shift',               type: 'text' },
  reason:     { label: 'Reason for Lockout',  type: 'text' },
  duration:   { label: 'Estimated Duration',  type: 'text' },
  contact:    { label: 'Contact #',           type: 'text' },
  permit:     { label: 'Permit #',            type: 'text' },
  zone:       { label: 'Zone ID',             type: 'text' },
  marshal:    { label: 'Energy Marshal',      type: 'text' },
  marshal_ph: { label: 'Energy Marshal Ch.',  type: 'text' },
  voltage:    { label: 'Voltage Level',       type: 'text' },
  inc_energy: { label: 'Incident Energy (cal/cm²)', type: 'text' },
  working_d:  { label: 'Working Distance',    type: 'text' },
  afb:        { label: 'Arc Flash Boundary',  type: 'text' },
  ppe_cat:    { label: 'PPE Category',        type: 'text' },
  limited_a:  { label: 'Limited Approach',    type: 'text' },
  restrict_a: { label: 'Restricted Approach', type: 'text' },
  location:   { label: 'Location',            type: 'text' },
  notes:      { label: 'Notes',               type: 'text' },
  // Excavation
  competent_person: { label: 'Competent Person', type: 'text' },
  depth:           { label: 'Excavation Depth', type: 'text' },
  soil_class:      { label: 'Soil Class (A/B/C)', type: 'text' },
  protective_sys:  { label: 'Protective System', type: 'text' },
  // Confined space
  entry_supervisor: { label: 'Entry Supervisor', type: 'text' },
  attendant:        { label: 'Attendant',         type: 'text' },
  atm_test:         { label: 'Atm. Test (O₂/LEL/CO/H₂S)', type: 'text' },
  rescue_team:      { label: 'Rescue Team / ETA', type: 'text' },
  // Fall
  anchor_pt:   { label: 'Anchor Point ID',    type: 'text' },
  fall_height: { label: 'Fall Distance',      type: 'text' },
  // Hearing
  noise_level: { label: 'Measured dBA TWA',   type: 'text' },
  nrr:         { label: 'Required NRR',       type: 'text' },
  // Cranes / Rigging
  operator:        { label: 'Certified Operator',   type: 'text' },
  lift_director:   { label: 'Lift Director',         type: 'text' },
  rigger:          { label: 'Qualified Rigger',      type: 'text' },
  capacity:        { label: 'Capacity / Load Limit', type: 'text' },
  load_weight:     { label: 'Load Weight',           type: 'text' },
  // Scaffolding
  tag_color:       { label: 'Tag Color (G/Y/R)',     type: 'text' },
  inspected:       { label: 'Date Inspected',        type: 'date' },
  // Hot Work
  fire_watch:      { label: 'Fire Watch',            type: 'text' },
  authorized_by:   { label: 'Authorized By',         type: 'text' },
  // Silica / Respiratory
  exposure_plan:   { label: 'Exposure Control Plan', type: 'text' },
  respirator:      { label: 'Required Respirator',   type: 'text' },
  // Heat
  heat_index:      { label: 'Heat Index (°F)',       type: 'text' },
  water_station:   { label: 'Water Station',         type: 'text' },
  shade_location:  { label: 'Shade Location',        type: 'text' },
  // Forklift
  cert_expires:    { label: 'Certification Expires', type: 'date' },
  truck_id:        { label: 'Truck / Equipment ID',  type: 'text' },
  // Emergency
  station_id:      { label: 'Station / Asset ID',    type: 'text' },
  last_tested:     { label: 'Last Tested',           type: 'date' },
  last_inspected:  { label: 'Last Inspected',        type: 'date' },
  inspector:       { label: 'Inspector',             type: 'text' },
  class_rating:    { label: 'Class / Rating',        type: 'text' },
  responder:       { label: 'First Responder',       type: 'text' },
  // HazCom
  custodian:       { label: 'Custodian / Owner',     type: 'text' },
  sds_location:    { label: 'SDS Location',          type: 'text' },
  // Machine Guarding
  guard_status:    { label: 'Guard Status',          type: 'text' },
};

/* ICONS — minimal SVG pictograms for each sign family */
const PICTOGRAMS = {
  bolt: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><polygon points="55,5 20,55 45,55 35,95 80,40 55,40"/></svg>`,
  lock: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="45" width="60" height="48" rx="4"/><path d="M30 45 V30 a20 20 0 0 1 40 0 V45" fill="none" stroke="currentColor" stroke-width="8"/></svg>`,
  hand: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="8"/><line x1="22" y1="22" x2="78" y2="78" stroke="currentColor" stroke-width="10" stroke-linecap="round"/></svg>`,
  burst: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 58,40 90,30 65,55 95,75 60,72 70,98 50,75 30,98 40,72 5,75 35,55 10,30 42,40"/></svg>`,
  arc: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M50,8 L62,42 L92,38 L67,58 L77,90 L50,72 L23,90 L33,58 L8,38 L38,42 Z"/><circle cx="50" cy="55" r="6" fill="white"/></svg>`,
  triangle: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M50,8 L92,86 L8,86 Z" fill="none" stroke="currentColor" stroke-width="8"/><rect x="46" y="35" width="8" height="28"/><circle cx="50" cy="74" r="5"/></svg>`,
  valve: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="8"/><line x1="50" y1="20" x2="50" y2="40" stroke="currentColor" stroke-width="8"/><line x1="35" y1="20" x2="65" y2="20" stroke="currentColor" stroke-width="8"/><line x1="20" y1="50" x2="40" y2="50" stroke="currentColor" stroke-width="8"/><line x1="60" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="8"/></svg>`,
  info: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" stroke-width="8"/><circle cx="50" cy="28" r="6"/><rect x="44" y="42" width="12" height="36"/></svg>`,
  group: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="35" cy="35" r="14"/><circle cx="65" cy="35" r="14"/><path d="M15,80 a20 20 0 0 1 40 0"/><path d="M45,80 a20 20 0 0 1 40 0"/></svg>`,
  ear: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M30,55 a25 25 0 1 1 50 0 c0 12 -8 14 -14 22 c-3 4 -5 12 -12 12 c-8 0 -10 -8 -14 -8" fill="currentColor" fill-opacity="0.15"/><path d="M50,40 a10 10 0 0 1 14 14"/><line x1="14" y1="30" x2="22" y2="34"/><line x1="14" y1="50" x2="22" y2="50"/><line x1="14" y1="70" x2="22" y2="66"/></svg>`,
  fall: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="22" r="9"/><path d="M50,32 L50,56 L34,72 M50,56 L66,72 M40,46 L26,38 M60,46 L74,38" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><path d="M14,86 L86,86" stroke="currentColor" stroke-width="6"/></svg>`,
  trench: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="6" xmlns="http://www.w3.org/2000/svg"><path d="M5,30 L5,55 L35,80 L65,80 L95,55 L95,30" fill="currentColor" fill-opacity="0.15"/><path d="M5,30 L35,30 L35,55 L65,55 L65,30 L95,30"/><path d="M5,55 L35,80 M65,80 L95,55"/><line x1="42" y1="42" x2="58" y2="42" stroke-linecap="round"/></svg>`,
  crane: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><rect x="40" y="20" width="6" height="65"/><rect x="46" y="20" width="40" height="6"/><rect x="22" y="20" width="18" height="6"/><line x1="80" y1="26" x2="80" y2="55" stroke="currentColor" stroke-width="3"/><polygon points="74,55 80,64 86,55"/><rect x="30" y="82" width="26" height="8"/></svg>`,
  fire: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M50,12 C 46,28 36,36 38,52 C 40,68 50,80 50,80 C 50,80 60,68 62,54 C 63,42 56,38 54,28 C 53,22 51,18 50,12 Z M48,40 C 44,52 46,62 50,68 C 54,62 54,52 52,40 C 51,38 49,38 48,40 Z" fill-rule="evenodd"/></svg>`,
  cross: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><rect x="18" y="42" width="64" height="16"/><rect x="42" y="18" width="16" height="64"/></svg>`,
  exit: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="22" r="7"/><path d="M27,32 L40,32 L43,55 L36,80 L29,80 L33,58 L29,55 Z"/><path d="M40,55 L52,72 L48,82 L42,76 L37,68 Z"/><path d="M27,38 L18,52 L24,55 L31,42 Z"/><polygon points="58,46 78,46 78,40 92,52 78,64 78,58 58,58"/></svg>`,
  forklift: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="14" width="4" height="52"/><rect x="28" y="14" width="4" height="52"/><rect x="32" y="46" width="36" height="3"/><rect x="32" y="60" width="36" height="3"/><rect x="65" y="46" width="3" height="17"/><path d="M24,20 L48,20 L48,56 L24,56 Z M24,32 L48,32 M30,20 L30,32" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="30" cy="80" r="8"/><circle cx="62" cy="80" r="8"/><circle cx="30" cy="80" r="3" fill="white"/><circle cx="62" cy="80" r="3" fill="white"/></svg>`,
  pinch: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="58" r="16" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="68" cy="58" r="16" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="32" cy="58" r="3"/><circle cx="68" cy="58" r="3"/><polygon points="36,40 30,38 38,32"/><polygon points="64,40 70,38 62,32"/><path d="M48,8 L46,18 L42,28 L42,38 L48,40 L52,40 L58,38 L58,28 L54,18 L52,8 Z" fill="currentColor" stroke="currentColor" stroke-width="1"/></svg>`,
  dust: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="40" r="3"/><circle cx="50" cy="32" r="4"/><circle cx="68" cy="42" r="3"/><circle cx="42" cy="50" r="2.5"/><circle cx="60" cy="55" r="3"/><circle cx="35" cy="62" r="3.5"/><circle cx="55" cy="68" r="2"/><circle cx="72" cy="62" r="2.5"/><circle cx="22" cy="55" r="2"/><circle cx="78" cy="35" r="2"/><path d="M22,82 Q 30,72 42,72 Q 52,68 60,76 Q 70,72 78,82" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
  sun: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="20"/><g stroke="currentColor" stroke-width="5" stroke-linecap="round"><line x1="50" y1="12" x2="50" y2="22"/><line x1="50" y1="78" x2="50" y2="88"/><line x1="12" y1="50" x2="22" y2="50"/><line x1="78" y1="50" x2="88" y2="50"/><line x1="22" y1="22" x2="29" y2="29"/><line x1="71" y1="71" x2="78" y2="78"/><line x1="22" y1="78" x2="29" y2="71"/><line x1="71" y1="29" x2="78" y2="22"/></g></svg>`,
  extinguisher: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M40,28 L60,28 L62,82 L38,82 Z"/><rect x="44" y="18" width="12" height="10"/><path d="M56,22 L72,16 L78,22 L72,28 L56,30 Z" fill="none" stroke="currentColor" stroke-width="2.5"/><line x1="50" y1="38" x2="50" y2="76" stroke="white" stroke-width="2"/><text x="50" y="56" text-anchor="middle" font-family="Arial" font-size="11" font-weight="bold" fill="white">ABC</text></svg>`,
};

/* ============================================================
   GHS HAZARD PICTOGRAMS — OSHA HazCom 2012 / GHS Rev. 7
   Red diamond border on white field with black hazard symbol.
   Standardized under 29 CFR 1910.1200 Appendix C.
   ============================================================ */
const GHS_PICTOGRAMS = {
  ghs01_explosive: { label: 'Explosive', svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,3 97,50 50,97 3,50" fill="white" stroke="#C8102E" stroke-width="5"/><polygon points="50,22 54,40 70,32 60,46 78,48 60,55 76,68 58,62 68,80 52,68 50,84 48,68 32,80 42,62 24,68 40,55 22,48 40,46 30,32 46,40" fill="black"/></svg>` },

  ghs02_flammable: { label: 'Flammable', svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,3 97,50 50,97 3,50" fill="white" stroke="#C8102E" stroke-width="5"/><path d="M52,22 C 50,30 44,34 42,42 C 38,52 42,62 50,68 C 58,62 62,54 60,46 C 58,40 54,38 54,32 C 54,28 53,25 52,22 Z M48,46 C 46,52 47,58 50,62 C 53,58 53,52 51,46 C 50,44 49,44 48,46 Z" fill="black"/><rect x="32" y="74" width="36" height="3" fill="black"/></svg>` },

  ghs03_oxidizer: { label: 'Oxidizer', svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,3 97,50 50,97 3,50" fill="white" stroke="#C8102E" stroke-width="5"/><path d="M50,20 C 48,28 44,32 44,40 C 44,48 48,54 52,54 C 56,54 58,46 56,40 C 54,34 52,28 50,20 Z" fill="black"/><circle cx="50" cy="68" r="11" fill="none" stroke="black" stroke-width="3"/><rect x="34" y="80" width="32" height="3" fill="black"/></svg>` },

  ghs04_gas: { label: 'Compressed Gas', svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,3 97,50 50,97 3,50" fill="white" stroke="#C8102E" stroke-width="5"/><rect x="42" y="32" width="16" height="38" rx="2" fill="black"/><rect x="40" y="28" width="20" height="6" fill="black"/><rect x="46" y="22" width="8" height="6" fill="black"/><rect x="42" y="72" width="16" height="3" fill="black"/></svg>` },

  ghs05_corrosive: { label: 'Corrosive', svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,3 97,50 50,97 3,50" fill="white" stroke="#C8102E" stroke-width="5"/><rect x="22" y="22" width="6" height="14" fill="black"/><polygon points="20,36 30,36 28,42 22,42" fill="black"/><circle cx="25" cy="48" r="2" fill="black"/><circle cx="25" cy="54" r="2" fill="black"/><path d="M14,72 Q 18,62 26,62 Q 32,60 36,68 L36,76 L14,76 Z" fill="black"/><rect x="62" y="22" width="6" height="14" fill="black"/><polygon points="60,36 70,36 68,42 62,42" fill="black"/><circle cx="65" cy="48" r="2" fill="black"/><circle cx="65" cy="54" r="2" fill="black"/><path d="M50,68 L82,68 L82,76 L78,71 L74,76 L70,71 L66,76 L62,71 L58,76 L54,71 Z" fill="black"/></svg>` },

  ghs06_toxic: { label: 'Toxic', svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,3 97,50 50,97 3,50" fill="white" stroke="#C8102E" stroke-width="5"/><circle cx="50" cy="44" r="14" fill="black"/><rect x="42" y="56" width="16" height="6" fill="black"/><circle cx="44" cy="42" r="3" fill="white"/><circle cx="56" cy="42" r="3" fill="white"/><rect x="44" y="50" width="12" height="2" fill="white"/><g transform="translate(50,72) rotate(20)"><rect x="-26" y="-2" width="52" height="4" fill="black"/><circle cx="-26" cy="0" r="4" fill="black"/><circle cx="26" cy="0" r="4" fill="black"/></g><g transform="translate(50,72) rotate(-20)"><rect x="-26" y="-2" width="52" height="4" fill="black"/><circle cx="-26" cy="0" r="4" fill="black"/><circle cx="26" cy="0" r="4" fill="black"/></g></svg>` },

  ghs07_irritant: { label: 'Irritant / Harmful', svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,3 97,50 50,97 3,50" fill="white" stroke="#C8102E" stroke-width="5"/><path d="M44,28 L56,28 L54,62 L46,62 Z" fill="black"/><rect x="45" y="68" width="10" height="8" fill="black"/></svg>` },

  ghs08_health: { label: 'Health Hazard', svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,3 97,50 50,97 3,50" fill="white" stroke="#C8102E" stroke-width="5"/><circle cx="50" cy="30" r="7" fill="black"/><path d="M40,40 L60,40 L62,76 L38,76 Z" fill="black"/><polygon points="50,48 53,56 62,54 56,60 64,66 55,64 53,76 50,68 47,76 45,64 36,66 44,60 38,54 47,56" fill="white"/></svg>` },

  ghs09_environment: { label: 'Environmental Hazard', svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,3 97,50 50,97 3,50" fill="white" stroke="#C8102E" stroke-width="5"/><line x1="18" y1="74" x2="82" y2="74" stroke="black" stroke-width="3"/><rect x="22" y="48" width="4" height="26" fill="black"/><line x1="24" y1="50" x2="14" y2="40" stroke="black" stroke-width="3" stroke-linecap="round"/><line x1="24" y1="54" x2="32" y2="46" stroke="black" stroke-width="3" stroke-linecap="round"/><line x1="24" y1="60" x2="14" y2="54" stroke="black" stroke-width="3" stroke-linecap="round"/><ellipse cx="66" cy="62" rx="13" ry="5" fill="black"/><polygon points="53,62 47,56 47,68" fill="black"/><circle cx="71" cy="60" r="1.5" fill="white"/></svg>` },
};

/* ============================================================
   18 SIGN TEMPLATES
   ============================================================ */

const TEMPLATES = [
  {
    id: '01', cat: 'LOTO', level: 'DANGER',
    title: 'Do Not Operate (Air Gap)',
    desc: 'Post at primary disconnect when equipment is isolated via visible air gap.',
    primary: 'DO NOT OPERATE',
    secondary: 'EQUIPMENT DISCONNECTED',
    accent: 'AUTHORIZED LOCKOUT IN PROGRESS',
    pictogram: 'lock',
    hazard: 'Equipment de-energized via visible air gap and locked out for service.',
    consequence: 'Operating or attempting to energize will cause serious injury or death to personnel servicing the system.',
    avoidance: 'Lock may only be removed by the authorized employee who applied it.',
    donot: ['Operate this equipment', 'Energize the disconnect', 'Remove or tamper with locks or tags', 'Bypass safety isolation'],
    citations: [
      '29 CFR 1910.147(c)(5)(ii) — Lockout/Tagout device standards',
      '29 CFR 1910.147(d)(4)(i) — Application of devices',
      'NFPA 70E 120.5 — Process for establishing electrically safe work condition'
    ],
    fields: ['name', 'date', 'equipment', 'supervisor']
  },
  {
    id: '02', cat: 'LOTO', level: 'DANGER',
    title: 'Do Not Energize',
    desc: 'Post on electrical panels and breakers that have been de-energized and locked out.',
    primary: 'DO NOT ENERGIZE',
    secondary: 'BREAKER LOCKED OUT',
    accent: 'AUTHORIZED EMPLOYEE ONLY',
    pictogram: 'bolt',
    hazard: 'Circuit de-energized for servicing. Locks and tags applied at the disconnect.',
    consequence: 'Re-energizing will cause electrical shock, arc flash, or death to personnel working downstream.',
    avoidance: 'Verify zero energy state before any contact. Do not close, energize, or remove lockout devices.',
    donot: ['Close this breaker', 'Reset upstream protective devices', 'Remove locks or tags', 'Re-energize without authorization'],
    citations: [
      '29 CFR 1910.333(b)(2) — Lockout & tagging of circuits',
      '29 CFR 1910.147(c)(4) — Energy control procedure',
      'NFPA 70E 120.5(2) — Verification of de-energization'
    ],
    fields: ['name', 'date', 'equipment', 'voltage']
  },
  {
    id: '03', cat: 'LOTO', level: 'DANGER',
    title: 'Do Not Start',
    desc: 'Post at operator control station or start button of locked-out machinery.',
    primary: 'DO NOT START',
    secondary: 'SERVICING IN PROGRESS',
    accent: 'PERSONNEL EXPOSED TO HAZARDS',
    pictogram: 'hand',
    hazard: 'Operator station locked. Equipment under maintenance with personnel inside the line of fire.',
    consequence: 'Starting this machinery will cause crushing, amputation, or death.',
    avoidance: 'Confirm no personnel are servicing the equipment. Lock removal restricted to the authorized employee.',
    donot: ['Press start, run, or jog buttons', 'Bypass the disabled control', 'Reset the E-stop circuit', 'Energize from a remote station'],
    citations: [
      '29 CFR 1910.147(c)(1) — Energy control program',
      '29 CFR 1910.212 — Machine guarding',
      'ANSI B11.0 — Safety of machinery'
    ],
    fields: ['name', 'date', 'equipment', 'shift']
  },
  {
    id: '04', cat: 'LOTO', level: 'DANGER',
    title: 'Stored Energy — Do Not Release',
    desc: 'Post near springs, accumulators, capacitors, or elevated components with stored energy.',
    primary: 'STORED ENERGY',
    secondary: 'DO NOT RELEASE',
    accent: 'BLEED · BLOCK · GROUND BEFORE WORK',
    pictogram: 'burst',
    hazard: 'Pressurized accumulators, springs, capacitors, or elevated components remain energized after primary isolation.',
    consequence: 'Sudden release will cause projectile injury, crushing, electrical shock, or death.',
    avoidance: 'Bleed, block, ground, or otherwise dissipate all stored energy. Verify with calibrated test instruments.',
    donot: ['Remove blocks or chocks', 'Cut, drill, or grind suspect components', 'Discharge without verification', 'Assume primary lockout removes all energy'],
    citations: [
      '29 CFR 1910.147(d)(5) — Application of energy control',
      '29 CFR 1910.147(d)(5)(i) — Stored energy dissipation',
      'NFPA 70E 120.5(7) — Stored electrical energy'
    ],
    fields: ['name', 'date', 'equipment', 'reason']
  },
  {
    id: '05', cat: 'LOTO', level: 'DANGER',
    title: 'Do Not Open (Valve / Line)',
    desc: 'Post on locked-out valves isolating fluid, steam, gas, or chemical lines.',
    primary: 'DO NOT OPEN',
    secondary: 'LINE LOCKED & TAGGED',
    accent: 'PROCESS ISOLATION IN PLACE',
    pictogram: 'valve',
    hazard: 'Process line under pressure or chemical isolation. Valve locked closed.',
    consequence: 'Opening will release hazardous fluids, gases, or steam — burns, asphyxiation, or chemical exposure.',
    avoidance: 'Confirm zero pressure and chemical isolation. Wear required PPE for the contained medium.',
    donot: ['Open or crack the valve', 'Break the locked flange', 'Remove blank flanges or spectacle blinds', 'Bypass with a jumper line'],
    citations: [
      '29 CFR 1910.147(d)(3) — Equipment isolation',
      '29 CFR 1910.119 — Process safety management',
      'OSHA 3120 — Lockout / Tagout'
    ],
    fields: ['name', 'date', 'equipment', 'reason', 'supervisor']
  },
  {
    id: '06', cat: 'ELECTRICAL', level: 'DANGER',
    title: 'High Voltage — Keep Out',
    desc: 'Post at entrance to electrical rooms, vaults, or enclosures with exposed high voltage.',
    primary: 'HIGH VOLTAGE',
    secondary: 'KEEP OUT',
    accent: 'AUTHORIZED & QUALIFIED PERSONS ONLY',
    pictogram: 'bolt',
    hazard: 'Exposed energized conductors. Voltages capable of arc flash and ignition of clothing.',
    consequence: 'Contact will result in death, severe burns, or permanent injury from shock or arc blast.',
    avoidance: 'Maintain approach boundaries per NFPA 70E. Wear arc-rated PPE. Coordinate with the qualified person of record.',
    donot: ['Enter without arc-rated PPE', 'Cross the limited approach boundary', 'Operate equipment without a qualified person present', 'Remove guards or barricades'],
    citations: [
      '29 CFR 1910.303(h)(2) — Guarding of live parts ≥600V',
      '29 CFR 1910.335(b)(1) — Safeguards for personnel protection',
      'NFPA 70E 130.4 — Approach boundaries'
    ],
    fields: ['voltage', 'zone', 'contact', 'marshal']
  },
  {
    id: '07', cat: 'LOTO', level: 'WARNING',
    title: 'Equipment Being Serviced',
    desc: 'Post on equipment undergoing maintenance to warn against operation.',
    primary: 'EQUIPMENT BEING SERVICED',
    secondary: 'DO NOT OPERATE',
    accent: 'CHECK CLEARANCE BEFORE ENERGIZING',
    pictogram: 'triangle',
    hazard: 'Maintenance work in progress. Operator station may not display all lockout devices.',
    consequence: 'Operating during service could cause severe injury or death to personnel inside the equipment.',
    avoidance: 'Verify all servicing is complete and personnel are clear before re-energizing.',
    donot: ['Operate without clearance walk', 'Trust an unattended start signal', 'Override the LOTO procedure', 'Re-energize until permit is closed'],
    citations: [
      '29 CFR 1910.147(f)(1) — Lockout release',
      '29 CFR 1910.147(e) — Release from lockout'
    ],
    fields: ['name', 'date', 'equipment', 'duration']
  },
  {
    id: '08', cat: 'LOTO', level: 'WARNING',
    title: 'Pneumatic System Isolated',
    desc: 'Post at pneumatic isolation valve after pressure bled and system locked out.',
    primary: 'PNEUMATIC SYSTEM ISOLATED',
    secondary: 'PRESSURE BLED & LOCKED',
    accent: 'VERIFY ZERO PSI BEFORE WORK',
    pictogram: 'burst',
    hazard: 'Compressed air system de-energized for servicing. Stored pressure released; lockout applied at supply.',
    consequence: 'Re-pressurizing or removing isolation could cause sudden actuation, projectile injury, or hose whip.',
    avoidance: 'Verify zero pressure at gauge before work. Reactivate only after final clearance walk.',
    donot: ['Open the supply valve', 'Bypass the bleed line', 'Disconnect under residual pressure', 'Restore air without permit closure'],
    citations: [
      '29 CFR 1910.147(d)(5)(i) — Stored energy',
      '29 CFR 1910.219 — Mechanical power-transmission'
    ],
    fields: ['name', 'date', 'equipment']
  },
  {
    id: '09', cat: 'LOTO', level: 'WARNING',
    title: 'Hydraulic System Isolated',
    desc: 'Post at hydraulic pump or isolation valve after pressure relieved and locked out.',
    primary: 'HYDRAULIC SYSTEM ISOLATED',
    secondary: 'PRESSURE RELIEVED',
    accent: 'INJECTION HAZARD WHEN PRESSURIZED',
    pictogram: 'burst',
    hazard: 'Hydraulic system de-energized. Reservoirs and accumulators isolated.',
    consequence: 'Sudden re-pressurization could cause injection injury, sprayed-fluid burns, or unexpected actuation.',
    avoidance: 'Confirm zero pressure on all gauges. Wear face shield and gloves during reset.',
    donot: ['Loosen fittings under pressure', 'Trace leaks with bare hands', 'Defeat the pressure-relief lockout', 'Energize without bleed-down'],
    citations: [
      '29 CFR 1910.147(d)(5)(i) — Stored energy',
      '29 CFR 1910.213 — Woodworking machinery (hydraulic press)',
      'ANSI B11.2 — Hydraulic power presses'
    ],
    fields: ['name', 'date', 'equipment']
  },
  {
    id: '10', cat: 'LOTO', level: 'CAUTION',
    title: 'Do Not Remove This Lock / Tag',
    desc: 'Post alongside individual lockout devices — only the owner may remove.',
    primary: 'DO NOT REMOVE',
    secondary: 'THIS LOCK & TAG',
    accent: 'ONLY THE OWNER MAY REMOVE',
    pictogram: 'lock',
    hazard: 'This lock and tag identify the authorized employee servicing this energy source.',
    consequence: 'Unauthorized removal exposes that worker to deadly energy and is an OSHA violation.',
    avoidance: 'If the employee is unavailable, follow the documented LOTO removal procedure with supervisor approval.',
    donot: ['Cut, key, or pry the lock', 'Remove on the owner\'s behalf without procedure', 'Forge a release tag', 'Skip the verification phone call'],
    citations: [
      '29 CFR 1910.147(e)(3) — Lockout removal',
      '29 CFR 1910.147(f)(3) — Group lockout / tagout'
    ],
    fields: ['name', 'date', 'contact']
  },
  {
    id: '11', cat: 'LOTO', level: 'CAUTION',
    title: 'Multiple Lockout — Group Hasp',
    desc: 'Post at isolation points requiring a group lockout hasp.',
    primary: 'GROUP LOCKOUT REQUIRED',
    secondary: 'MULTI-PERSON HASP IN USE',
    accent: 'EVERY WORKER APPLIES THEIR OWN LOCK',
    pictogram: 'group',
    hazard: 'More than one authorized employee is servicing this energy source.',
    consequence: 'Single-lock removal may release energy with personnel still exposed.',
    avoidance: 'Each authorized employee must apply their personal lock to the group hasp before work and remove it only after their portion is complete.',
    donot: ['Remove another worker\'s lock', 'Share a single lock for the team', 'Skip the personal lock for "quick" work', 'Leave site with lock still applied'],
    citations: [
      '29 CFR 1910.147(f)(3)(ii) — Group lockout',
      '29 CFR 1910.147(c)(7)(iii) — Periodic inspection'
    ],
    fields: ['marshal', 'date', 'equipment', 'permit']
  },
  {
    id: '12', cat: 'LOTO', level: 'NOTICE',
    title: 'LOTO Station',
    desc: 'Post above a LOTO storage area — locks, tags, hasps, and procedures stored here.',
    primary: 'LOTO STATION',
    secondary: 'LOCKS · TAGS · HASPS',
    accent: 'INSPECT MONTHLY · PROGRAM COORDINATOR',
    pictogram: 'info',
    hazard: '',
    consequence: '',
    avoidance: 'Sign and return all devices through the program coordinator. Inspect monthly per OSHA periodic inspection requirements.',
    donot: ['Take devices without sign-out', 'Use uninspected or damaged devices', 'Remove the master procedure binder'],
    citations: [
      '29 CFR 1910.147(c)(6)(i) — Periodic inspection',
      '29 CFR 1910.147(c)(7) — Training and communication'
    ],
    fields: ['marshal', 'contact', 'location']
  },
  {
    id: '13', cat: 'ENERGIZED', level: 'ENERGIZED',
    title: 'Energized Work Zone',
    desc: 'Post at the barricade boundary of an active energized work zone.',
    primary: 'ENERGIZED WORK ZONE',
    secondary: 'AUTHORIZED ENTRY ONLY',
    accent: 'ENERGY MARSHAL CONTROLS ACCESS',
    pictogram: 'arc',
    hazard: 'Work performed on or near exposed energized conductors above 50V.',
    consequence: 'Unauthorized entry may cause shock, arc flash, or fatal interference with the qualified work team.',
    avoidance: 'Stop. Identify yourself to the Energy Marshal. Entry requires energized work permit and arc-rated PPE.',
    donot: ['Cross the barricade without authorization', 'Distract the qualified worker', 'Carry conductive tools through the zone', 'Photograph or document without clearance'],
    citations: [
      'NFPA 70E 110.3 — Energized work permit',
      '29 CFR 1910.333(c)(2) — Working on or near exposed energized parts',
      '29 CFR 1910.335(a) — Safeguards for personnel'
    ],
    fields: ['marshal', 'marshal_ph', 'permit', 'voltage', 'zone']
  },
  {
    id: '14', cat: 'ENERGIZED', level: 'ENERGIZED',
    title: 'Energized Space — Do Not Enter',
    desc: 'Post on doors and entrances to rooms containing exposed energized components.',
    primary: 'DO NOT ENTER',
    secondary: 'ENERGIZED SPACE',
    accent: 'QUALIFIED PERSONS ONLY',
    pictogram: 'arc',
    hazard: 'Room contains exposed energized equipment above 50V with arc flash potential.',
    consequence: 'Entry by unqualified persons may result in shock, arc flash, or death.',
    avoidance: 'Door must remain closed and locked when no qualified person is present.',
    donot: ['Prop the door open', 'Loan keys to unqualified persons', 'Conduct tours without escort', 'Store materials inside the room'],
    citations: [
      '29 CFR 1910.303(h)(2) — Guarding of live parts',
      'NFPA 70E 130.7(E) — Other safety-related work practices'
    ],
    fields: ['voltage', 'zone', 'contact']
  },
  {
    id: '15', cat: 'ARC_FLASH', level: 'ENERGIZED',
    title: 'Approach Limit Boundary',
    desc: 'Post at calculated approach boundary — unqualified persons must stop.',
    primary: 'APPROACH BOUNDARY',
    secondary: 'UNQUALIFIED PERSONS — STOP',
    accent: 'QUALIFIED PERSON ESCORT REQUIRED',
    pictogram: 'hand',
    hazard: 'Beyond this point, energized conductors present shock hazard at distances less than the limited approach boundary.',
    consequence: 'Crossing without qualification or PPE may cause shock or electrocution.',
    avoidance: 'Unqualified persons must remain outside this boundary unless escorted by a qualified person and wearing required PPE.',
    donot: ['Cross alone', 'Reach across the boundary', 'Pass tools through the boundary', 'Use ungrounded ladders within reach'],
    citations: [
      'NFPA 70E 130.4(D) — Limited approach boundary',
      'NFPA 70E 130.4(E) — Restricted approach boundary',
      '29 CFR 1910.333(c)(3) — Work on or near exposed energized parts'
    ],
    fields: ['voltage', 'limited_a', 'restrict_a', 'zone']
  },
  {
    id: '16', cat: 'ARC_FLASH', level: 'ENERGIZED',
    title: 'Arc Flash Hazard Boundary',
    desc: 'Post at arc flash boundary — arc-rated PPE mandatory beyond this point.',
    primary: 'ARC FLASH BOUNDARY',
    secondary: 'ARC-RATED PPE REQUIRED',
    accent: 'VERIFY PPE AGAINST EQUIPMENT LABEL',
    pictogram: 'arc',
    hazard: 'Beyond this point, an arc flash event may produce 1.2 cal/cm² or greater incident energy on exposed skin.',
    consequence: 'Without arc-rated PPE: second-degree burns, ignition of clothing, or death from thermal radiation.',
    avoidance: 'Wear PPE rated for the labeled incident energy or higher. Verify category against the equipment-specific label.',
    donot: ['Enter in synthetic clothing', 'Substitute non-rated face shields', 'Wear PPE below the labeled category', 'Remove hood once inside the boundary'],
    citations: [
      'NFPA 70E 130.5(H) — Arc flash equipment labeling',
      'NFPA 70E 130.7(C) — PPE selection',
      '29 CFR 1910.335(a)(1)(v) — PPE for electrical hazards'
    ],
    fields: ['voltage', 'inc_energy', 'working_d', 'afb', 'ppe_cat', 'limited_a', 'restrict_a']
  },
  {
    id: '17', cat: 'ENERGIZED', level: 'ENERGIZED',
    title: 'Energy Marshal Posted',
    desc: 'Post at energized work zone entrance — Energy Marshal must be contacted before entry.',
    primary: 'ENERGY MARSHAL ON STATION',
    secondary: 'REPORT BEFORE ENTRY',
    accent: 'STOP · IDENTIFY · WAIT FOR CLEARANCE',
    pictogram: 'triangle',
    hazard: 'Energized work in progress. Energy Marshal controls access and acts as standby observer.',
    consequence: 'Unannounced entry may distract the qualified worker and increase arc flash exposure for everyone in the zone.',
    avoidance: 'Stop at boundary. Wait for Energy Marshal acknowledgement. Provide name, purpose, and clearance.',
    donot: ['Enter while the Marshal is on radio', 'Cross during a switching operation', 'Call the worker directly', 'Bypass the sign-in log'],
    citations: [
      'NFPA 70E 110.3(D) — Job briefing and observer',
      'OSHA 1910.269(l)(1) — Standby person (where applicable)'
    ],
    fields: ['marshal', 'marshal_ph', 'permit', 'zone']
  },
  {
    id: '18', cat: 'PPE', level: 'NOTICE',
    title: 'PPE Required Beyond This Point',
    desc: 'Post at access points to areas requiring specific personal protective equipment.',
    primary: 'PPE REQUIRED',
    secondary: 'BEYOND THIS POINT',
    accent: 'NO ENTRY WITHOUT PROTECTION',
    pictogram: 'info',
    hazard: 'Work zone with multiple hazards requiring PPE: head, eye, hearing, foot, and hand protection.',
    consequence: 'Entry without required PPE risks impact, projectile, noise, electrical, and chemical injuries.',
    avoidance: 'Don all required PPE before crossing this point. Inspect PPE for damage and expiration.',
    donot: ['Enter without hard hat', 'Remove safety glasses inside the zone', 'Substitute uninspected PPE', 'Loan PPE between workers'],
    citations: [
      '29 CFR 1910.132 — General PPE requirements',
      '29 CFR 1910.133 — Eye and face protection',
      '29 CFR 1926.95 — Construction PPE'
    ],
    fields: ['zone', 'contact', 'supervisor']
  },
  {
    id: '19', cat: 'EXCAVATION', level: 'DANGER',
    title: 'Trench / Excavation Hazard',
    desc: 'Post at access points to active excavations and trenches — protective system required at 5 ft.',
    primary: 'TRENCH HAZARD',
    secondary: 'CAVE-IN RISK',
    accent: 'PROTECTIVE SYSTEM REQUIRED · 5 FT+',
    pictogram: 'trench',
    hazard: 'Active excavation. Soil walls may collapse without warning. One cubic yard of soil weighs over 3,000 lb — equivalent to a small car.',
    consequence: 'Cave-in or wall collapse will cause crushing or suffocation within seconds. Most trench fatalities occur in trenches under 10 ft deep.',
    avoidance: 'Enter only with approved protective system in place — sloping, benching, shoring, or trench shield. Verify daily competent-person inspection before each shift and after every rainstorm.',
    donot: [
      'Enter trench ≥5 ft without protective system',
      'Stand or work under suspended loads',
      'Place spoil within 2 ft of trench edge',
      'Skip the daily competent-person inspection'
    ],
    citations: [
      '29 CFR 1926.651(k)(1) — Daily competent-person inspection',
      '29 CFR 1926.652 — Requirements for protective systems',
      '29 CFR 1926.651(c)(2) — Means of egress (4 ft / 25 ft lateral)'
    ],
    fields: ['competent_person', 'date', 'depth', 'soil_class', 'protective_sys']
  },
  {
    id: '20', cat: 'CONFINED_SPACE', level: 'WARNING',
    title: 'Confined Space — Limited Entry',
    desc: 'Post at confined spaces (limited entry/exit, not designed for continuous occupancy).',
    primary: 'CONFINED SPACE',
    secondary: 'LIMITED ENTRY & EXIT',
    accent: 'TEST ATMOSPHERE BEFORE ENTRY',
    pictogram: 'info',
    hazard: 'Space large enough to enter, with restricted entry/exit, not designed for continuous occupancy. Atmospheric, configuration, or engulfment conditions may develop.',
    consequence: 'Entry without testing or attendant may result in asphyxiation from oxygen deficiency, exposure to toxic atmosphere, engulfment, or entrapment.',
    avoidance: 'Test atmosphere top, middle, and bottom before entry — O₂ 19.5–23.5%, LEL <10%, toxics below PEL. Maintain continuous communication with outside attendant. Reclassify as permit-required if any hazard develops.',
    donot: [
      'Enter without atmospheric testing',
      'Enter alone without an outside attendant',
      'Use the space to store hazardous materials',
      'Bring ignition sources without hot-work permit'
    ],
    citations: [
      '29 CFR 1910.146 — Permit-required confined spaces (general industry)',
      '29 CFR 1926 Subpart AA — Confined Spaces in Construction',
      '29 CFR 1926.1203 — Identification and posting requirements'
    ],
    fields: ['attendant', 'date', 'atm_test', 'zone', 'contact']
  },
  {
    id: '21', cat: 'CONFINED_SPACE', level: 'DANGER',
    title: 'Permit-Required Confined Space',
    desc: 'Post at all permit-required confined spaces — sign required by 29 CFR 1926.1203(b)(1).',
    primary: 'PERMIT-REQUIRED',
    secondary: 'CONFINED SPACE',
    accent: 'DO NOT ENTER WITHOUT PERMIT',
    pictogram: 'arc',
    hazard: 'Confined space with one or more of: hazardous atmosphere potential, engulfment risk, internal configuration that traps the entrant, or other recognized serious hazard.',
    consequence: 'Unpermitted entry may result in death from atmospheric hazards, engulfment, or entrapment. Roughly 60% of confined-space fatalities are would-be rescuers — never enter to rescue.',
    avoidance: 'Issue written entry permit before entry. Conduct continuous atmospheric monitoring. Post trained attendant outside the space. Stage rescue team within posted response time. Coordinate with controlling contractor.',
    donot: [
      'Enter without a signed entry permit',
      'Enter to attempt rescue without rescue training and equipment',
      'Disable continuous atmospheric monitoring',
      'Modify the entry team without entry-supervisor authorization'
    ],
    citations: [
      '29 CFR 1926.1203(b)(1) — Posting permit-required spaces',
      '29 CFR 1926.1204 — Permit-required confined space program',
      '29 CFR 1926.1211 — Rescue and emergency services'
    ],
    fields: ['entry_supervisor', 'permit', 'attendant', 'rescue_team', 'contact']
  },
  {
    id: '22', cat: 'FALL', level: 'DANGER',
    title: 'Fall Hazard — 100% Tie-Off Required',
    desc: 'Post at boundaries of fall hazard areas (≥6 ft construction / ≥4 ft general industry).',
    primary: 'FALL HAZARD',
    secondary: 'PERSONAL FALL ARREST REQUIRED',
    accent: '100% TIE-OFF · NO EXCEPTIONS',
    pictogram: 'fall',
    hazard: 'Unprotected edge or working surface above OSHA fall trigger height — 6 ft for construction, 4 ft for general industry walking-working surfaces.',
    consequence: 'A fall from this height can result in fractures, traumatic injury, or death. Falls are the #1 cause of construction fatalities and OSHA\'s most-cited violation 15 years running.',
    avoidance: 'Wear approved full-body harness with shock-absorbing lanyard or self-retracting lifeline. Tie off 100% to qualified anchor (5,000 lb capacity per worker). Inspect equipment before each use.',
    donot: [
      'Cross the boundary without 100% tie-off',
      'Use damaged or expired fall protection equipment',
      'Anchor to non-rated points (rebar, conduit, ductwork)',
      'Use a body belt as fall arrest (positioning only)'
    ],
    citations: [
      '29 CFR 1926.501 — Duty to have fall protection (construction, 6 ft)',
      '29 CFR 1926.502 — Fall protection systems criteria',
      '29 CFR 1910.28 — Walking-working surfaces (general industry, 4 ft)'
    ],
    fields: ['fall_height', 'anchor_pt', 'supervisor', 'location']
  },
  {
    id: '23', cat: 'PPE', level: 'NOTICE',
    title: 'Hearing Protection Required',
    desc: 'Post at access to areas with measured noise exposure ≥85 dBA TWA.',
    primary: 'HEARING PROTECTION REQUIRED',
    secondary: 'BEYOND THIS POINT',
    accent: 'NRR-RATED EARPLUGS OR EARMUFFS',
    pictogram: 'ear',
    hazard: 'Sustained noise exposure at or above the OSHA action level (85 dBA TWA, 8-hour) or PEL (90 dBA TWA).',
    consequence: 'Repeated unprotected exposure causes permanent noise-induced hearing loss — irreversible, cumulative, and underdiagnosed until late stages of damage.',
    avoidance: 'Wear approved hearing protection with adequate Noise Reduction Rating for the measured noise level. Participate in the hearing conservation program: annual audiogram, training, and fit verification.',
    donot: [
      'Remove hearing protection inside the zone',
      'Substitute earbuds or music headphones',
      'Skip the annual audiometric test',
      'Modify or alter approved earmuffs'
    ],
    citations: [
      '29 CFR 1910.95 — Occupational noise exposure (general industry)',
      '29 CFR 1910.95(c) — Hearing conservation program (≥85 dBA TWA)',
      '29 CFR 1926.52 — Occupational noise exposure (construction)'
    ],
    fields: ['noise_level', 'nrr', 'zone', 'supervisor']
  },
  {
    id: '24', cat: 'CRANE', level: 'WARNING',
    title: 'Crane Swing Radius — Stay Clear',
    desc: 'Post around mobile cranes, swing radius perimeter, and lift staging zones.',
    primary: 'CRANE OPERATING',
    secondary: 'STAY CLEAR OF SWING RADIUS',
    accent: 'BARRICADED ZONE — NO ENTRY',
    pictogram: 'crane',
    hazard: 'A rotating crane upper structure can strike personnel or equipment within the swing radius — including counterweights swinging blind to the operator.',
    consequence: 'Crush injuries, amputations, and fatalities. Counterweight contact often happens without warning to bystanders or to the crane operator.',
    avoidance: 'Stay outside the barricaded swing zone. Maintain visual contact with the operator before entering. All lifts coordinated by the qualified rigger and signal person of record.',
    donot: [
      'Enter the barricaded swing zone',
      'Position yourself between the load and a fixed object',
      'Stand or walk under suspended loads',
      'Cross the lift path without operator acknowledgment'
    ],
    citations: [
      '29 CFR 1926.1424 — Working under loads',
      '29 CFR 1926.1425 — Keeping clear of the load',
      'ASME B30.5 — Mobile and locomotive cranes'
    ],
    fields: ['operator', 'lift_director', 'capacity', 'date']
  },
  {
    id: '25', cat: 'CRANE', level: 'DANGER',
    title: 'Suspended Load — No Persons Below',
    desc: 'Post at lift staging areas and overhead lift zones for material handling operations.',
    primary: 'SUSPENDED LOAD',
    secondary: 'NO PERSONS BELOW',
    accent: 'KEEP CLEAR — LIFT IN PROGRESS',
    pictogram: 'triangle',
    hazard: 'Suspended materials, equipment, and rigging can fall due to rigging failure, sling slip, dynamic loading, or operator error.',
    consequence: 'Falling materials at any height result in fatal head and crush injuries — a single shifted strap can drop multi-ton loads in less than one second.',
    avoidance: 'Stay outside the marked lift zone. Wait for the rigger to call all-clear. Pre-hoist inspection of all rigging required by the qualified rigger of record.',
    donot: [
      'Walk under any suspended load',
      'Position yourself between the load and an immovable object',
      'Touch a swinging load with your body',
      'Operate a tagline without designated authority'
    ],
    citations: [
      '29 CFR 1926.1425(a) — No persons under suspended loads',
      '29 CFR 1926.1404 — Pre-lift inspection requirements',
      'ASME B30.9 — Slings'
    ],
    fields: ['rigger', 'lift_director', 'load_weight', 'date']
  },
  {
    id: '26', cat: 'SCAFFOLDING', level: 'NOTICE',
    title: 'Scaffold Inspection Status',
    desc: 'Affix to scaffold access — green tag (safe), yellow (restricted), red (do not use).',
    primary: 'SCAFFOLD STATUS',
    secondary: 'INSPECTED — SEE TAG COLOR',
    accent: 'GREEN: SAFE · YELLOW: RESTRICTED · RED: DO NOT USE',
    pictogram: 'info',
    hazard: 'Scaffolds without daily competent-person inspection may have failed components — missing planks, damaged ties, exceeded load capacity, or compromised guardrails.',
    consequence: 'Falls from height, scaffold collapse, and falling-object injury — leading cause of fatalities in construction at heights ≥10 feet.',
    avoidance: 'Verify the green tag is in place before use. Do not use yellow-tagged scaffolds without specific PPE noted on the tag. Red tag = no entry, no exception.',
    donot: [
      'Use a scaffold without an inspection tag',
      'Override or remove a yellow or red tag',
      'Exceed posted load capacity',
      'Climb cross-bracing instead of using ladder access'
    ],
    citations: [
      '29 CFR 1926.451(f)(3) — Daily competent-person inspection',
      '29 CFR 1926.451(g) — Fall protection on scaffolds',
      '29 CFR 1926.452 — Specific scaffold requirements'
    ],
    fields: ['competent_person', 'tag_color', 'capacity', 'inspected']
  },
  {
    id: '27', cat: 'FALL', level: 'CAUTION',
    title: 'Ladder Safety — Three-Point Contact',
    desc: 'Post at ladder access points and storage areas for portable ladders.',
    primary: 'THREE-POINT CONTACT',
    secondary: 'FACE THE LADDER · MAINTAIN 3 POINTS',
    accent: 'TWO HANDS + ONE FOOT, OR TWO FEET + ONE HAND',
    pictogram: 'fall',
    hazard: 'Loss of three-point contact while ascending, descending, or working from a portable ladder leads to falls — most ladder falls occur in the last few feet when the climber relaxes.',
    consequence: 'Falls from ladders cause serious injury and death — over 100 fatalities per year per BLS, with the majority of falls occurring under 10 feet.',
    avoidance: 'Always face the ladder. Maintain three points of contact at all times. Do not carry materials in your hands while climbing — use a tool belt, hoist line, or material lift.',
    donot: [
      'Carry materials in your hands while climbing',
      'Lean to the side or stretch beyond arm reach',
      'Stand on the top two rungs',
      'Use a damaged, defective, or unrated ladder'
    ],
    citations: [
      '29 CFR 1926.1053(b) — Use of ladders',
      '29 CFR 1910.23 — Ladders (general industry)',
      'ANSI A14.2 — Portable metal ladders'
    ],
    fields: ['inspected', 'capacity', 'date']
  },
  {
    id: '28', cat: 'HOT_WORK', level: 'DANGER',
    title: 'Hot Work Permit Required',
    desc: 'Post at welding, cutting, grinding, or open-flame work areas — fire watch required.',
    primary: 'HOT WORK PERMIT REQUIRED',
    secondary: 'FIRE WATCH POSTED',
    accent: 'NO IGNITION SOURCES BEYOND BARRICADE',
    pictogram: 'fire',
    hazard: 'Welding, cutting, grinding, and brazing produce sparks, slag, and arc that can ignite combustible materials within 35 feet of the work area.',
    consequence: 'Hot work is the leading cause of industrial fires — often igniting materials concealed behind walls or in floor cavities and unnoticed for hours after work has stopped.',
    avoidance: 'Hot work permit issued by authorized supervisor. Designated fire watch with extinguisher posted during work and 30 minutes after completion. All combustibles within 35 feet removed or shielded.',
    donot: [
      'Begin hot work without a signed permit',
      'Leave hot work unattended without fire watch',
      'Conduct hot work near flammable atmospheres',
      'Skip the 30-minute post-work fire watch'
    ],
    citations: [
      '29 CFR 1910.252 — General requirements (welding, cutting, brazing)',
      '29 CFR 1926.352 — Fire prevention (construction)',
      'NFPA 51B — Fire prevention during welding and cutting'
    ],
    fields: ['permit', 'fire_watch', 'authorized_by', 'date']
  },
  {
    id: '29', cat: 'HOT_WORK', level: 'WARNING',
    title: 'Hot Surface — Burn Hazard',
    desc: 'Post at hot piping, exhaust manifolds, recently welded equipment, and steam systems.',
    primary: 'HOT SURFACE',
    secondary: 'DO NOT TOUCH',
    accent: 'ALLOW TO COOL BEFORE SERVICE',
    pictogram: 'fire',
    hazard: 'Surfaces above 140°F can cause burns on contact. Recently welded steel, steam piping, and exhaust components remain dangerously hot for extended periods after work or operation.',
    consequence: 'Second and third-degree burns from brief contact. Many burn injuries occur after assumed cool-down — surface temperature is not reliably indicated by appearance.',
    avoidance: 'Verify surface temperature before contact using non-contact thermometer. Wear heat-resistant gloves rated for the application. Allow welded components to fully cool before handling.',
    donot: [
      'Touch surfaces without temperature verification',
      'Remove safety guards from hot equipment',
      'Apply water to severely hot metals (rapid cooling cracks materials)',
      'Assume "cool to the eye" means safe to handle'
    ],
    citations: [
      '29 CFR 1910.147 — Control of hazardous energy (thermal)',
      '29 CFR 1910.252 — Welding, cutting, brazing',
      'ASME B31.1 — Power piping'
    ],
    fields: ['equipment', 'supervisor', 'date']
  },
  {
    id: '30', cat: 'SILICA', level: 'WARNING',
    title: 'Respirable Silica Hazard',
    desc: 'Post at concrete cutting, masonry, drywall sanding, rock cutting, and abrasive blasting work areas.',
    primary: 'RESPIRABLE SILICA',
    secondary: 'PROTECTIVE EQUIPMENT REQUIRED',
    accent: 'PEL: 50 µg/m³ · ACTION LEVEL: 25 µg/m³',
    pictogram: 'dust',
    hazard: 'Cutting, grinding, drilling, or chipping silica-containing materials releases respirable crystalline silica dust — invisible particles small enough to penetrate deep into the lungs.',
    consequence: 'Silicosis (irreversible lung scarring), lung cancer, COPD, and kidney disease. Silica is a Class 1 carcinogen per IARC. Damage is cumulative and not reversible.',
    avoidance: 'Use the engineering controls listed in your written exposure control plan: water suppression, local exhaust ventilation, or HEPA-filtered tools. Wear assigned respiratory protection. Participate in medical surveillance.',
    donot: [
      'Cut, grind, or chip silica without water or vacuum control',
      'Use compressed air to clean silica dust',
      'Eat or drink in the silica work zone',
      'Skip the assigned respirator when controls are interrupted'
    ],
    citations: [
      '29 CFR 1926.1153 — Respirable crystalline silica (construction)',
      '29 CFR 1910.1053 — Respirable crystalline silica (general industry)',
      'IARC Monograph Vol. 100C — Silica (Group 1 carcinogen)'
    ],
    fields: ['exposure_plan', 'respirator', 'competent_person']
  },
  {
    id: '31', cat: 'HEAT', level: 'WARNING',
    title: 'Heat Illness Prevention Zone',
    desc: 'Post at active work areas during ambient heat ≥80°F with sun exposure or radiant heat sources.',
    primary: 'HEAT ILLNESS PREVENTION',
    secondary: 'WATER · REST · SHADE',
    accent: '8 OZ EVERY 15 MIN · COOL-DOWN BREAK EVERY HOUR',
    pictogram: 'sun',
    hazard: 'Sustained work in elevated ambient heat or radiant heat sources reduces the body\'s ability to thermoregulate, particularly during the first week of acclimatization.',
    consequence: 'Heat exhaustion and heat stroke — heat stroke is fatal in 30-80% of untreated cases. Acclimatization deficit accounts for the majority of heat fatalities (NIOSH).',
    avoidance: 'Drink 8 oz water every 15 minutes. Take cool-down breaks in shade every hour. New and returning workers acclimatize over 7-14 days. Buddy system mandatory above 90°F heat index.',
    donot: [
      'Skip water breaks because you\'re not thirsty',
      'Work alone in heat above 90°F heat index',
      'Substitute caffeine, energy drinks, or alcohol for water',
      'Ignore early symptoms — confusion, cramps, nausea, dizziness'
    ],
    citations: [
      'OSHA General Duty Clause — Section 5(a)(1)',
      'NIOSH Heat Stress Prevention (Pub. 2016-106)',
      'Cal/OSHA Title 8 § 3395 — Heat illness prevention'
    ],
    fields: ['heat_index', 'water_station', 'shade_location', 'supervisor']
  },
  {
    id: '32', cat: 'FORKLIFT', level: 'DANGER',
    title: 'Powered Industrial Truck Operating Area',
    desc: 'Post at forklift, reach truck, and order picker operating zones.',
    primary: 'FORKLIFT TRAFFIC',
    secondary: 'PEDESTRIAN AWARENESS REQUIRED',
    accent: 'CERTIFIED OPERATORS ONLY · YIELD TO PEDESTRIANS',
    pictogram: 'forklift',
    hazard: 'Powered industrial trucks have limited visibility, long stopping distances, and the ability to tip with shifted loads — a 5,000 lb forklift carrying a 2,000 lb load handles fundamentally differently than other vehicles.',
    consequence: 'Pedestrians struck by forklifts, operators crushed under tipped trucks, and load-strike injuries account for approximately 85 fatalities per year (BLS) — nearly all preventable.',
    avoidance: 'Stay alert for forklift traffic. Use designated pedestrian walkways. Make eye contact with operators before crossing aisles. Operators must be trained, certified, and re-evaluated every 3 years.',
    donot: [
      'Walk in marked forklift lanes without high-visibility apparel',
      'Pass under elevated forks at any time',
      'Operate without OSHA-compliant certification',
      'Ride on the forks or in the load area'
    ],
    citations: [
      '29 CFR 1910.178 — Powered industrial trucks',
      '29 CFR 1910.178(l) — Operator training and evaluation',
      'ANSI/ITSDF B56.1 — Safety standard for low- and high-lift trucks'
    ],
    fields: ['operator', 'cert_expires', 'truck_id', 'capacity']
  },
  {
    id: '33', cat: 'MACHINE', level: 'WARNING',
    title: 'Pinch Point — Caught-In Hazard',
    desc: 'Post at conveyors, gears, rotating shafts, and mechanical drive systems.',
    primary: 'PINCH POINT',
    secondary: 'KEEP HANDS CLEAR',
    accent: 'GUARDS REQUIRED — DO NOT REMOVE',
    pictogram: 'pinch',
    hazard: 'Rotating shafts, in-running rolls, and gear meshes create pinch points where hands, fingers, hair, jewelry, or loose clothing can be drawn into the moving parts.',
    consequence: 'Amputations, degloving injuries, fractures, and fatalities — caught-in/between events account for approximately 11% of construction fatalities (BLS).',
    avoidance: 'Keep hands and body clear of pinch points during operation. Verify all guards are in place before energizing. Lock out and verify zero-energy state before removing guards or clearing jams.',
    donot: [
      'Reach into machinery while energized',
      'Remove or bypass machine guards',
      'Wear loose clothing, jewelry, or unrestrained long hair near rotating parts',
      'Clear jams without lockout/tagout'
    ],
    citations: [
      '29 CFR 1910.212 — General requirements for machine guarding',
      '29 CFR 1910.219 — Mechanical power-transmission apparatus',
      'ANSI B11.19 — Performance criteria for safeguarding'
    ],
    fields: ['equipment', 'name', 'guard_status']
  },
  {
    id: '34', cat: 'EMERGENCY', level: 'NOTICE',
    title: 'Emergency Eyewash & Safety Shower',
    desc: 'Post at all eyewash and safety shower stations — 10-second access requirement.',
    primary: 'EMERGENCY EYEWASH',
    secondary: 'AND SAFETY SHOWER',
    accent: '15-MINUTE FLUSH · NO OBSTRUCTIONS',
    pictogram: 'cross',
    hazard: 'Chemical splash to eyes or skin requires immediate flushing with tepid water for a minimum of 15 minutes per ANSI Z358.1 — every minute of delay multiplies tissue damage.',
    consequence: 'Permanent vision loss, chemical burns, systemic toxicity from absorbed agents — irreversible damage occurs within seconds for strong acids, bases, and oxidizers.',
    avoidance: 'Flush eyes or skin immediately for 15 minutes. Hold eyelids open with fingers. Get medical evaluation regardless of perceived severity. Notify supervisor and document the SDS reference.',
    donot: [
      'Block access path to eyewash or shower',
      'Use a station that has not been weekly-flow-tested',
      'Self-discharge after less than 15 minutes',
      'Skip medical evaluation after a chemical exposure'
    ],
    citations: [
      '29 CFR 1910.151(c) — Medical and first aid',
      'ANSI Z358.1-2014 — Emergency eyewash and shower equipment',
      '29 CFR 1926.50 — Medical services and first aid (construction)'
    ],
    fields: ['station_id', 'last_tested', 'inspector']
  },
  {
    id: '35', cat: 'EMERGENCY', level: 'NOTICE',
    title: 'Fire Extinguisher Station',
    desc: 'Post at every portable fire extinguisher location.',
    primary: 'FIRE EXTINGUISHER',
    secondary: 'CHECK MONTHLY',
    accent: 'TYPE & RATING — SEE EXTINGUISHER LABEL',
    pictogram: 'extinguisher',
    hazard: 'Incipient-stage fires can be controlled by trained personnel with appropriate-class extinguishers — but only within the first 1-2 minutes. Beyond that, evacuation and fire department response are required.',
    consequence: 'Wrong extinguisher class (water on grease, ABC on Class K) can intensify the fire and cause injury. Missing the critical first response window enables structural fire spread.',
    avoidance: 'Pull, Aim, Squeeze, Sweep (PASS). Match extinguisher class to fire type. Trained employees only. Evacuate and call 911 if fire is larger than wastebasket size.',
    donot: [
      'Block access to the extinguisher (3-ft clearance)',
      'Use the extinguisher without training',
      'Discharge on a fire larger than wastebasket size',
      'Skip the monthly visual inspection'
    ],
    citations: [
      '29 CFR 1910.157 — Portable fire extinguishers',
      '29 CFR 1926.150 — Fire protection (construction)',
      'NFPA 10 — Standard for portable fire extinguishers'
    ],
    fields: ['station_id', 'last_inspected', 'class_rating']
  },
  {
    id: '36', cat: 'EMERGENCY', level: 'NOTICE',
    title: 'First Aid Station / AED',
    desc: 'Post at first aid kit and AED locations — accessible within 4-minute response.',
    primary: 'FIRST AID STATION',
    secondary: 'AED INSIDE',
    accent: '4-MINUTE RESPONSE WINDOW',
    pictogram: 'cross',
    hazard: 'Workplace medical emergencies — cardiac events, severe bleeding, and traumatic injury — have rapidly closing windows for survival without immediate intervention.',
    consequence: 'Sudden cardiac arrest survival drops 7-10% per minute without defibrillation. Hemorrhage can kill in 3-5 minutes. Without local response capability, professional EMS arrival is too late.',
    avoidance: 'Know your nearest first aid station and AED. Trained first responders posted on each shift. Call 911 first, then bring AED to victim. Document all incidents in the injury log.',
    donot: [
      'Block the access path',
      'Use expired or missing supplies — restock immediately',
      'Hesitate to call 911',
      'Move trauma victims unless immediately necessary for safety'
    ],
    citations: [
      '29 CFR 1910.151 — Medical services and first aid',
      '29 CFR 1926.50 — First aid (construction)',
      'ANSI/ISEA Z308.1 — Workplace first aid kits'
    ],
    fields: ['station_id', 'last_inspected', 'responder']
  },
  {
    id: '37', cat: 'EMERGENCY', level: 'NOTICE',
    title: 'Emergency Exit / Egress Path',
    desc: 'Post along egress paths and at exit doors per 1910.36-37.',
    primary: 'EMERGENCY EXIT',
    secondary: 'KEEP CLEAR · DO NOT BLOCK',
    accent: 'PRIMARY EGRESS — UNLOCK FROM INSIDE',
    pictogram: 'exit',
    hazard: 'Blocked, locked, or obscured emergency exits during fire, chemical release, or active threat events trap occupants and double mortality rates.',
    consequence: 'Fire fatalities increase 4× when egress paths are obstructed. NFPA reports show that locked exits during fire emergencies are the single most preventable factor in workplace fire deaths.',
    avoidance: 'Keep egress path 3 feet clear at all times. Verify exit doors unlock from inside without keys, tools, or special knowledge. Test emergency lighting monthly.',
    donot: [
      'Block, lock, or obscure the exit door',
      'Stack materials within 3 feet of egress path',
      'Disable emergency lighting or exit signs',
      'Use as routine entrance — exit-only doors stay closed'
    ],
    citations: [
      '29 CFR 1910.36 — Design and construction of exit routes',
      '29 CFR 1910.37 — Maintenance, safeguards, and operational features',
      'NFPA 101 — Life Safety Code'
    ],
    fields: ['station_id', 'last_inspected', 'capacity']
  },
  {
    id: '38', cat: 'HAZCOM', level: 'WARNING',
    title: 'Hazardous Chemicals Stored Here',
    desc: 'Post at chemical storage rooms, cabinets, and accumulation points.',
    primary: 'HAZARDOUS CHEMICALS',
    secondary: 'GHS LABELED · SDS AVAILABLE',
    accent: 'TRAINED PERSONNEL ONLY · PPE PER SDS',
    pictogram: 'ghs05_corrosive',
    hazard: 'Stored chemicals present hazards listed on GHS labels and Safety Data Sheets — flammability, corrosivity, toxicity, oxidization, and incompatibility-driven reactions.',
    consequence: 'Untrained access leads to chemical exposures, fires from incompatible mixing, and uncontrolled spills — most workplace chemical incidents trace to inadequate hazard communication.',
    avoidance: 'Read the GHS label and SDS before handling. Wear PPE specified in Section 8 of the SDS. Segregate incompatibles per Section 7. Report leaks immediately. Annual HazCom training required.',
    donot: [
      'Mix or transfer chemicals without authorization',
      'Remove or deface GHS labels',
      'Eat, drink, or smoke in the storage area',
      'Allow untrained personnel to enter'
    ],
    citations: [
      '29 CFR 1910.1200 — Hazard Communication Standard',
      '29 CFR 1910.1200 Appendix C — GHS pictogram requirements',
      '29 CFR 1926.59 — Hazard Communication (construction)'
    ],
    fields: ['custodian', 'last_inspected', 'sds_location']
  },
  {
    id: '39', cat: 'EXCAVATION', level: 'DANGER',
    title: 'Cave-In Hazard — Protective System Required',
    desc: 'Post at trenches ≥5 ft deep (or shallower if a competent person identifies cave-in potential).',
    primary: 'CAVE-IN HAZARD',
    secondary: 'PROTECTIVE SYSTEM REQUIRED',
    accent: 'SLOPING · SHORING · SHIELDING · BENCHING',
    pictogram: 'trench',
    hazard: 'Unprotected excavations can collapse without warning. One cubic yard of soil weighs approximately 3,000 pounds — the equivalent of a small car dropped on a worker.',
    consequence: 'Trench collapse fatalities are almost always instantaneous. Survivors of partial burial face crush syndrome, asphyxiation, and traumatic injuries. Cave-ins account for over 20 construction deaths per year (BLS).',
    avoidance: 'Install the protective system specified by the competent person before entry. Sloping, shoring, shielding, or benching per 1926.652. Daily inspection by competent person, and after every rainstorm.',
    donot: [
      'Enter an unprotected excavation ≥5 ft deep',
      'Assume the previous shift\'s system is still adequate',
      'Skip the daily competent-person inspection',
      'Store excavated material within 2 ft of the trench edge'
    ],
    citations: [
      '29 CFR 1926.652(a)(1) — Protective systems required',
      '29 CFR 1926.652 Appendix B — Sloping and benching',
      '29 CFR 1926.651(k) — Daily inspections'
    ],
    fields: ['competent_person', 'depth', 'soil_class', 'inspected']
  },
  {
    id: '40', cat: 'EXCAVATION', level: 'WARNING',
    title: 'Soil Classification Required',
    desc: 'Post at active excavations to communicate the competent-person soil classification and matching protective system.',
    primary: 'SOIL CLASSIFICATION',
    secondary: 'TYPE A · TYPE B · TYPE C',
    accent: 'CLASS DETERMINES ANGLE & SUPPORT',
    pictogram: 'trench',
    hazard: 'Soil type determines cave-in risk and dictates the maximum allowable slope and protective system. Type C soils (granular, submerged, or previously disturbed) fail at shallower depths than Type A or B.',
    consequence: 'Applying a Type A sloping angle to Type C soil produces collapse at loads that would be stable in cohesive clay. Misclassification is a leading OSHA-cited factor in trench fatalities.',
    avoidance: 'Competent person classifies soil per 1926 Subpart P Appendix A before excavation begins. Visual and manual tests documented. System designed to match the most unstable soil layer present.',
    donot: [
      'Use a Type A slope on Type B or C soil',
      'Enter without knowing the current classification',
      'Skip reclassification after rainfall or seismic activity',
      'Rely on prior-project soil data without verification'
    ],
    citations: [
      '29 CFR 1926 Subpart P Appendix A — Soil classification',
      '29 CFR 1926.652(b) — Sloping and benching systems',
      '29 CFR 1926.651(k)(1) — Competent person requirements'
    ],
    fields: ['competent_person', 'soil_class', 'inspected']
  },
  {
    id: '41', cat: 'EXCAVATION', level: 'CAUTION',
    title: 'Spoil Pile Setback · 2 Feet Minimum',
    desc: 'Post at trench and excavation edges to enforce material and equipment setback.',
    primary: 'SPOIL PILE SETBACK',
    secondary: '2 FT MINIMUM FROM EDGE',
    accent: 'MATERIALS · EQUIPMENT · VEHICLES',
    pictogram: 'trench',
    hazard: 'Materials, equipment, or vehicles positioned within 2 feet of an excavation edge add surcharge load that dramatically increases wall failure risk — and can roll or slide into the trench itself.',
    consequence: 'Surcharge-induced cave-ins are among the most severe: workers below are struck by falling material AND the collapsing wall simultaneously. Ladders, tools, and pipe piled at the edge become projectiles.',
    avoidance: 'Maintain 2-ft setback for all spoil piles, materials, tools, and equipment. Position ladders and access equipment inside the shielded zone. Route vehicle traffic outside a distance equal to the trench depth.',
    donot: [
      'Stack pipe or materials at the trench edge',
      'Park vehicles inside the trench-depth zone',
      'Set the ladder unsecured against the excavation wall',
      'Push spoil back toward the edge with heavy equipment'
    ],
    citations: [
      '29 CFR 1926.651(j)(2) — Excavated material setback',
      '29 CFR 1926.651(l) — Walkways and access',
      '29 CFR 1926.652(c) — Support system design'
    ],
    fields: ['competent_person', 'depth', 'supervisor']
  }
];

/* ============================================================
   POLICY ANALYZER — Topic definitions
   For each topic: keywords detect mention, valuePattern extracts
   the threshold, stringentDirection picks the strictest value.
   ============================================================ */

const SAFETY_TOPICS = [
  {
    id: 'fall',
    name: 'Fall Protection',
    keywords: ['fall protection', 'fall arrest', 'tie-off', 'tie off', 'harness', 'lanyard', 'guardrail', 'unprotected edge', 'PFAS', 'anchor point', 'leading edge'],
    valuePattern: /(\d+(?:\.\d+)?)\s*(?:ft|feet|foot|')/gi,
    unit: 'ft',
    stringentDirection: 'lower',
    stringentReason: 'A lower trigger height means fall protection kicks in earlier — more workers protected.',
    templates: ['22'],
    osha: '29 CFR 1926.501 / 1910.28',
  },
  {
    id: 'hearing',
    name: 'Hearing Protection',
    keywords: ['hearing protection', 'noise exposure', 'dba', 'decibel', 'audiometric', 'NRR', 'earplug', 'earmuff', 'hearing conservation'],
    valuePattern: /(\d+(?:\.\d+)?)\s*(?:dBA?|decibel)/gi,
    unit: 'dBA',
    stringentDirection: 'lower',
    stringentReason: 'A lower dBA trigger means hearing protection is required at quieter exposures.',
    templates: ['23'],
    osha: '29 CFR 1910.95 / 1926.52',
  },
  {
    id: 'excavation',
    name: 'Excavation / Trenching',
    keywords: ['excavation', 'trench', 'cave-in', 'shoring', 'sloping', 'benching', 'soil class', 'protective system', 'competent person'],
    valuePattern: /(\d+(?:\.\d+)?)\s*(?:ft|feet|foot|')/gi,
    unit: 'ft',
    stringentDirection: 'lower',
    stringentReason: 'A lower depth trigger means a protective system is required at shallower trenches.',
    templates: ['19'],
    osha: '29 CFR 1926.651 / 1926.652',
  },
  {
    id: 'confined',
    name: 'Confined Space',
    keywords: ['confined space', 'permit-required', 'permit required', 'attendant', 'rescue', 'atmospheric test', 'oxygen deficient', 'engulfment', 'entry permit'],
    permitPattern: /permit[-\s]?required|treat(?:ed)?\s+as\s+permit|permit\s+space|permit\s+entry/gi,
    stringentDirection: 'permit',
    stringentReason: 'Treating spaces as permit-required by default is the more stringent classification.',
    templates: ['20', '21'],
    osha: '29 CFR 1910.146 / 1926 Subpart AA',
  },
  {
    id: 'loto',
    name: 'Lockout / Tagout',
    keywords: ['lockout', 'tagout', 'LOTO', 'energy isolation', 'authorized employee', 'energy control', 'zero energy', 'group lockout'],
    stringentDirection: 'mention',
    stringentReason: 'A more detailed LOTO program covers more energy sources and procedures.',
    templates: ['01', '02', '03', '04', '05', '07', '10', '11'],
    osha: '29 CFR 1910.147 / NFPA 70E 120',
  },
  {
    id: 'arcflash',
    name: 'Arc Flash',
    keywords: ['arc flash', 'arc-rated', 'arc rated', 'incident energy', 'PPE category', 'cal/cm', 'arc flash boundary'],
    valuePattern: /(\d+(?:\.\d+)?)\s*cal\/?cm/gi,
    unit: 'cal/cm²',
    stringentDirection: 'lower',
    stringentReason: 'A lower incident energy threshold requires PPE at lower exposures.',
    templates: ['15', '16'],
    osha: 'NFPA 70E 130.5 / 29 CFR 1910.335',
  },
  {
    id: 'electrical',
    name: 'Energized Electrical Work',
    keywords: ['high voltage', 'energized', 'electrical hazard', 'qualified person', 'approach boundary', 'energized work permit', 'energy marshal', 'live work'],
    valuePattern: /(\d+(?:\.\d+)?)\s*(?:V|volt)\b/gi,
    unit: 'V',
    stringentDirection: 'lower',
    stringentReason: 'A lower voltage trigger requires permits and PPE at lower energy levels.',
    templates: ['06', '13', '14', '17'],
    osha: '29 CFR 1910.303 / NFPA 70E 130.4',
  },
  {
    id: 'ppe',
    name: 'Personal Protective Equipment',
    keywords: ['hard hat', 'safety glasses', 'gloves', 'face shield', 'steel-toe', 'steel toe', 'protective equipment', 'PPE', 'high-visibility', 'hi-vis', 'cut-resistant'],
    stringentDirection: 'mention',
    stringentReason: 'A policy specifying more PPE items by ANSI/ASTM standard is more stringent.',
    templates: ['18'],
    osha: '29 CFR 1910.132',
  },
  {
    id: 'crane',
    name: 'Cranes / Rigging',
    keywords: ['crane', 'rigging', 'rigger', 'hoist', 'suspended load', 'swing radius', 'lift director', 'qualified rigger', 'signal person', 'tagline'],
    stringentDirection: 'mention',
    stringentReason: 'A more detailed crane and rigging program covers more lift planning and qualification requirements.',
    templates: ['24', '25'],
    osha: '29 CFR 1926.1400 / ASME B30.5',
  },
  {
    id: 'scaffolding',
    name: 'Scaffolding',
    keywords: ['scaffold', 'scaffolding', 'tag color', 'green tag', 'yellow tag', 'red tag', 'guardrail', 'planking', 'cross-bracing', 'competent person scaffold'],
    stringentDirection: 'mention',
    stringentReason: 'A more detailed scaffolding program covers daily inspections and tag system requirements.',
    templates: ['26'],
    osha: '29 CFR 1926.451 / 1926.452',
  },
  {
    id: 'hot_work',
    name: 'Hot Work / Welding',
    keywords: ['hot work', 'welding', 'cutting', 'brazing', 'grinding', 'torch', 'fire watch', 'hot work permit', 'spark', 'slag'],
    stringentDirection: 'mention',
    stringentReason: 'A more detailed hot work program covers permits, fire watch duration, and combustible separation.',
    templates: ['28', '29'],
    osha: '29 CFR 1910.252 / NFPA 51B',
  },
  {
    id: 'silica',
    name: 'Respirable Silica',
    keywords: ['silica', 'crystalline silica', 'respirable dust', 'concrete cutting', 'masonry', 'quartz', 'silicosis'],
    valuePattern: /(\d+(?:\.\d+)?)\s*(?:µg|ug|micrograms?)\/m/gi,
    unit: 'µg/m³',
    stringentDirection: 'lower',
    stringentReason: 'A lower silica trigger requires controls at lower exposures.',
    templates: ['30'],
    osha: '29 CFR 1926.1153 / 1910.1053',
  },
  {
    id: 'heat',
    name: 'Heat Illness',
    keywords: ['heat illness', 'heat stress', 'heat exhaustion', 'heat stroke', 'heat index', 'acclimatization', 'shade', 'water break', 'cool-down'],
    valuePattern: /(\d+(?:\.\d+)?)\s*(?:°F|degrees? F|F\b)/gi,
    unit: '°F',
    stringentDirection: 'lower',
    stringentReason: 'A lower heat-index trigger requires water/rest/shade protocols at lower temperatures.',
    templates: ['31'],
    osha: 'OSHA 5(a)(1) / NIOSH Heat Stress',
  },
  {
    id: 'forklift',
    name: 'Forklift / Powered Industrial Trucks',
    keywords: ['forklift', 'powered industrial truck', 'reach truck', 'order picker', 'pallet jack', 'lift truck', 'PIT', 'certified operator', 'pedestrian walkway'],
    stringentDirection: 'mention',
    stringentReason: 'A more detailed forklift program covers operator certification, traffic separation, and re-evaluation cycles.',
    templates: ['32'],
    osha: '29 CFR 1910.178 / ANSI ITSDF B56.1',
  },
  {
    id: 'machine',
    name: 'Machine Guarding',
    keywords: ['machine guarding', 'pinch point', 'caught-in', 'caught in', 'rotating equipment', 'in-running', 'guard removal', 'mechanical hazard', 'rotating shaft'],
    stringentDirection: 'mention',
    stringentReason: 'A more detailed machine guarding program covers pinch points, guards, and inspection requirements.',
    templates: ['33'],
    osha: '29 CFR 1910.212 / 1910.219',
  },
  {
    id: 'emergency',
    name: 'Emergency Equipment',
    keywords: ['eyewash', 'safety shower', 'fire extinguisher', 'AED', 'first aid', 'emergency exit', 'egress', 'evacuation route', '911 response'],
    stringentDirection: 'mention',
    stringentReason: 'A more detailed emergency equipment program covers eyewash, fire extinguishers, AEDs, and egress requirements.',
    templates: ['34', '35', '36', '37'],
    osha: '29 CFR 1910.151 / 1910.157 / 1910.36',
  },
  {
    id: 'hazcom',
    name: 'Hazard Communication',
    keywords: ['hazcom', 'hazard communication', 'GHS', 'safety data sheet', 'SDS', 'chemical inventory', 'chemical storage', 'chemical labeling', 'pictogram'],
    stringentDirection: 'mention',
    stringentReason: 'A more detailed HazCom program covers GHS labeling, SDS access, and chemical training requirements.',
    templates: ['38'],
    osha: '29 CFR 1910.1200 / Appendix C',
  },
];

const SAMPLE_DOCS = {
  site: `SITE-SPECIFIC SAFETY PLAN — Project: New 138kV Substation, Mile Marker 47

Fall Protection: Personal fall arrest systems are required for all work at 6 feet or above. Anchor points must be inspected daily before each use.

Excavation: Trenches deeper than 5 feet require a protective system — sloping, shoring, or trench shield. Competent person to inspect before each shift and after rainstorms.

Hearing Protection: Required in zones exceeding 85 dBA. Earplugs and earmuffs are available at the site office.

Energized Electrical Work: Work above 50V on exposed conductors requires an energized work permit and a qualified person. Arc-rated PPE per NFPA 70E. Arc flash boundary of 4 feet established at the main switchgear.

Confined Space: Underground vaults and manholes to be classified case-by-case by the competent person.

PPE: Hard hat, safety glasses, gloves, and steel-toe boots required in all active work areas.

Lockout/Tagout: Standard LOTO procedure for de-energization of switchgear during maintenance.`,

  company: `CEC COMPANIES — STANDARD SAFETY POLICY (Rev. 2026)

CEC requires fall protection at any height above 4 feet — stricter than OSHA construction. 100% tie-off, no exceptions. ANSI Z359-rated full-body harness with shock-absorbing lanyard or self-retracting lifeline mandatory.

Excavation work requires a protective system at any depth where a competent person identifies cave-in potential, or at 4 feet, whichever is shallower. Daily inspections logged.

Hearing protection is required at 80 dBA — stricter than the OSHA action level. All exposed personnel enrolled in the hearing conservation program with annual audiograms.

All energized work above 50V requires Energy Marshal posted and arc flash boundary established. Arc-rated PPE matched to incident energy at 1.2 cal/cm² threshold. Limited approach boundary marked.

Confined spaces are treated as permit-required by default unless a competent person reclassifies per the written program. Entry permit, attendant, and rescue plan required.

PPE: hard hat (ANSI Z89.1), safety glasses (ANSI Z87.1), cut-resistant gloves, steel-toe boots (ASTM F2413), high-visibility vest, hearing protection in posted zones, plus task-specific PPE per JSA.

Lockout/Tagout: Comprehensive LOTO program covering electrical, mechanical, hydraulic, pneumatic, and stored energy. Group lockout procedure required for multi-employee servicing. Authorized employee training annually.`,
};

/* ============================================================
   INFOGRAPHIC PRESETS
   Modeled on the editorial-magazine layout (Amur Leopard reference)
   ============================================================ */

const INFOGRAPHICS = [
  {
    id: 'arc_flash',
    topic: 'Arc Flash · The Invisible Killer',
    title: 'ARC FLASH',
    subtitle: 'A 35,000°F Explosion in 1/30th of a Second',
    kicker: 'NFPA 70E · 29 CFR 1910.335',
    severity: 'CATEGORY 4 EVENT',
    bigStat: { number: '35K°F', label: 'Peak temperature', unit: 'four times the surface of the sun' },
    callouts: [
      { icon: '⚡', title: 'Energy Boundary', text: 'Calculated distance at which incident energy equals 1.2 cal/cm² — the threshold of second-degree burn.' },
      { icon: '🔥', title: 'Thermal Wave', text: 'Air superheats to 35,000°F. Copper expands 67,000×. Sound reaches 165 dB. Pressure exceeds 2,000 lb/ft².' },
      { icon: '🛡', title: 'PPE Categories', text: 'Cat 1: 4 cal/cm². Cat 2: 8 cal/cm². Cat 3: 25 cal/cm². Cat 4: 40 cal/cm². Match label, never exceed exposure.' },
      { icon: '⏱', title: 'Clearing Time', text: 'Most arc flash events last under 200 milliseconds — faster than the human blink reflex (300 ms).' },
    ],
    sections: [
      { kicker: 'WHAT TRIGGERS IT', title: 'Five Field Causes', text: 'Conductive tools dropped into bus. Loose connections. Insulation breakdown. Improper switching sequence. Animal or contamination intrusion.' },
      { kicker: 'WHAT PROTECTS YOU', title: 'The De-Energize Rule', text: 'Energized work requires written justification. Per NFPA 70E, no work above 50V without a permit, qualified person, and approved arc-rated PPE.' },
    ],
    pullquote: 'You don\'t survive an arc flash because you\'re fast. You survive because you weren\'t there.',
    ctaText: 'EVERY ENERGIZED TASK STARTS WITH A PERMIT.',
    ctaMeta: 'CEC SAFETY PROGRAM\nField Edition · 2026',
    heroPhoto: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=1200&q=80&auto=format&fit=crop',
    heroCredit: 'Photo · American Public Power Association on Unsplash',
    heroAlt: 'High-voltage substation at dusk',
    heroIllustration: 'arc_flash',
  },
  {
    id: 'loto',
    topic: 'Lockout / Tagout · Zero Energy',
    title: 'LOCKOUT',
    subtitle: 'The Six Steps That Bring Energy to Zero',
    kicker: '29 CFR 1910.147 · NFPA 70E 120',
    severity: 'PROGRAM REQUIREMENT',
    bigStat: { number: '120', label: 'Worker deaths annually', unit: 'from inadequate lockout (BLS)' },
    callouts: [
      { icon: '①', title: 'Prepare', text: 'Identify all energy sources — electrical, mechanical, hydraulic, pneumatic, thermal, chemical, gravitational.' },
      { icon: '②', title: 'Notify', text: 'Tell every affected employee that LOTO will commence and what equipment is being isolated.' },
      { icon: '③', title: 'Shut Down', text: 'Use normal stop procedures — orderly shutdown protects equipment and personnel from sudden energy release.' },
      { icon: '④', title: 'Isolate', text: 'Operate disconnects, valves, and isolation devices. Establish visible separation where possible.' },
      { icon: '⑤', title: 'Lock & Tag', text: 'Apply individual locks. Each authorized employee applies their own lock. Tags are not substitutes for locks.' },
      { icon: '⑥', title: 'Verify', text: 'Try to start. Test for absence of voltage with a known-working meter. Bleed stored energy.' },
    ],
    sections: [
      { kicker: 'THE TWO RULES THAT MATTER', title: 'One Worker. One Lock.', text: 'No worker may rely on another\'s lock. Group hasps allow each worker to apply their personal lock — no lock is removed until that worker clears.' },
      { kicker: 'WHAT NOT TO DO', title: 'Tags Are Not Locks.', text: 'A tag without a lock is a warning, not a control. Tags are only used when the energy isolation device cannot accept a lock — and only with documented procedure.' },
    ],
    pullquote: 'The lock isn\'t the safety. The procedure is. The lock is the proof.',
    ctaText: 'SIX STEPS. EVERY TIME. NO EXCEPTIONS.',
    ctaMeta: 'CEC SAFETY PROGRAM\nField Edition · 2026',
    heroPhoto: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format&fit=crop',
    heroCredit: 'Photo · ThisisEngineering on Unsplash',
    heroAlt: 'Industrial padlock and disconnect',
    heroIllustration: 'loto',
  },
  {
    id: 'approach',
    topic: 'Approach Boundaries · Stay Outside The Line',
    title: 'APPROACH',
    subtitle: 'Three Boundaries Around Every Energized Conductor',
    kicker: 'NFPA 70E 130.4',
    severity: 'SHOCK + ARC HAZARD',
    bigStat: { number: '50V', label: 'Threshold for approach boundaries', unit: 'AC or DC, exposed and energized' },
    callouts: [
      { icon: '🟦', title: 'Limited Approach', text: 'Outer boundary. Unqualified persons must stop here unless escorted by a qualified person with PPE.' },
      { icon: '🟧', title: 'Restricted Approach', text: 'Inner boundary. Only qualified persons. Requires shock-rated PPE and a written plan for the task.' },
      { icon: '🟥', title: 'Arc Flash Boundary', text: 'Calculated separately. Distance at which incident energy = 1.2 cal/cm². Independent of voltage; depends on fault current.' },
      { icon: '📏', title: 'Reading the Label', text: 'Equipment-specific labels list all three. Always confirm the boundaries on this equipment, not generic chart values.' },
    ],
    sections: [
      { kicker: 'WHO CAN CROSS', title: 'Qualified Means Trained.', text: '"Qualified person" per NFPA 70E means trained on the specific task, equipment, and hazards involved — not just an electrical license.' },
      { kicker: 'WHAT QUALIFIES AS PPE', title: 'Arc-Rated, Not Flame-Resistant.', text: 'FR clothing without an arc rating is not protection. Look for the AR rating in cal/cm² that matches or exceeds the equipment label.' },
    ],
    pullquote: 'Boundaries don\'t feel close until they\'re crossed. By then, it\'s already happened.',
    ctaText: 'KNOW THE LINE. STAY OUTSIDE IT.',
    ctaMeta: 'CEC SAFETY PROGRAM\nField Edition · 2026',
    heroPhoto: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&q=80&auto=format&fit=crop',
    heroCredit: 'Photo · Science in HD on Unsplash',
    heroAlt: 'Electrical worker in arc-rated PPE',
    heroIllustration: 'approach',
  },
  {
    id: 'confined',
    topic: 'Confined Space · The Invisible Atmosphere',
    title: 'CONFINED',
    subtitle: 'Most Confined-Space Deaths Are The Rescuer',
    kicker: '29 CFR 1910.146',
    severity: 'PERMIT REQUIRED',
    bigStat: { number: '60%', label: 'Of confined-space fatalities', unit: 'are would-be rescuers (NIOSH)' },
    callouts: [
      { icon: '🌫', title: 'Atmospheric Test', text: 'Test top, middle, bottom — gases stratify. Re-test continuously. Oxygen, flammables, toxics — in that order.' },
      { icon: '👥', title: 'Attendant', text: 'A trained attendant remains outside. Never enters. Communicates with entrant. Initiates rescue without entering.' },
      { icon: '🪢', title: 'Retrieval', text: 'Full-body harness with retrieval line attached at center of back. Mechanical retrieval device staged before entry.' },
      { icon: '🚨', title: 'Rescue', text: 'Trained rescue team available within posted response time. Entry by untrained personnel kills the rescuer.' },
    ],
    sections: [
      { kicker: 'WHAT MAKES IT PERMIT-REQUIRED', title: 'Four Triggers.', text: 'Hazardous atmosphere · Engulfment potential · Inwardly-converging walls or sloped floor · Any other recognized serious hazard. One trigger means permit-required.' },
      { kicker: 'BEFORE THE PERMIT', title: 'Try To Eliminate.', text: 'Can the work be done from outside? Can ventilation eliminate the atmosphere hazard? Permit entry is the last option, not the default.' },
    ],
    pullquote: 'Don\'t enter to rescue. Call rescue. Then call them again.',
    ctaText: 'EVERY ENTRY IS A PERMIT. NO EXCEPTIONS.',
    ctaMeta: 'CEC SAFETY PROGRAM\nField Edition · 2026',
    heroPhoto: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&q=80&auto=format&fit=crop',
    heroCredit: 'Photo · Rob Lambert on Unsplash',
    heroAlt: 'Industrial maintenance vault entry',
    heroIllustration: 'confined',
  },
  {
    id: 'excavation',
    topic: 'Trenching · The One Cubic Yard Problem',
    title: 'CAVE-IN',
    subtitle: 'One Cubic Yard Weighs Three Thousand Pounds',
    kicker: '29 CFR 1926 Subpart P',
    severity: 'FATALITY RATE 2×',
    bigStat: { number: '3,000', label: 'Pounds per cubic yard of soil', unit: 'the weight of a small car' },
    callouts: [
      { icon: '⛏', title: 'Classify', text: 'Competent person classifies soil (A/B/C) before excavation. Type C fails at loads Type A holds. Reclassify after rain, freeze, or vibration.' },
      { icon: '🪜', title: 'Access', text: 'Ladder, ramp, or stairway within 25 feet of every worker in trenches ≥4 ft deep. No jumping in, no climbing walls, no cross-bracing shortcuts.' },
      { icon: '🚧', title: 'Setback', text: 'Spoil piles, materials, tools, equipment — all 2 ft minimum from edge. Vehicles beyond a distance equal to trench depth.' },
      { icon: '🚨', title: 'Rescue', text: 'Trench rescue is not a general rescue skill. Untrained bystander entry doubles the fatality count. Call trained rescue only.' },
    ],
    sections: [
      { kicker: 'WHEN A PROTECTIVE SYSTEM IS REQUIRED', title: 'Five Feet — Or Less.', text: 'Any excavation 5 feet or deeper requires sloping, shoring, shielding, or benching. Shallower trenches require a system if the competent person identifies cave-in potential. CEC policy calls it at 4 feet.' },
      { kicker: 'THE FOUR SYSTEMS', title: 'Slope. Shore. Shield. Bench.', text: 'Sloping cuts the wall back to a stable angle. Shoring supports the wall in place. Shielding (trench box) protects workers even if the wall fails. Benching creates stepped horizontal levels. Choice depends on soil, depth, and adjacent loads.' },
    ],
    pullquote: 'By the time you feel the wall move, you have less than one second.',
    ctaText: 'NO ENTRY WITHOUT INSPECTION. NO EXCEPTIONS.',
    ctaMeta: 'CEC SAFETY PROGRAM\nField Edition · 2026',
    heroPhoto: 'https://images.unsplash.com/photo-1580983230786-4ac9c31add63?w=1200&q=80&auto=format&fit=crop',
    heroCredit: 'Photo · Ivan Bandura on Unsplash',
    heroAlt: 'Deep utility trench with shoring',
    heroIllustration: 'excavation',
  }
];

/* ============================================================
   HERO ILLUSTRATIONS — Editorial SVG fallbacks
   Always render even when the hero photo URL fails to load.
   Drawn in CEC palette (paper / navy / gold).
   ============================================================ */
const HERO_ILLUSTRATIONS = {
  arc_flash: `<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ig-bg-arc" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#3D2F18"/>
        <stop offset="100%" stop-color="#1A1208"/>
      </linearGradient>
      <radialGradient id="ig-flash" cx="50%" cy="55%" r="40%">
        <stop offset="0%" stop-color="#FFF5D8" stop-opacity="0.95"/>
        <stop offset="40%" stop-color="#E0BD63" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#C8102E" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="400" fill="url(#ig-bg-arc)"/>
    <!-- Substation silhouette: vertical poles, horizontal busbars, transformers -->
    <g stroke="#0F1B2A" stroke-width="3" fill="none" opacity="0.7">
      <line x1="120" y1="380" x2="120" y2="120"/>
      <line x1="220" y1="380" x2="220" y2="80"/>
      <line x1="320" y1="380" x2="320" y2="120"/>
      <line x1="420" y1="380" x2="420" y2="100"/>
      <line x1="520" y1="380" x2="520" y2="80"/>
      <line x1="100" y1="120" x2="540" y2="120"/>
      <line x1="100" y1="80" x2="540" y2="80"/>
      <line x1="100" y1="100" x2="540" y2="100"/>
      <!-- transformer boxes -->
      <rect x="780" y="260" width="80" height="120" fill="#0F1B2A"/>
      <rect x="900" y="240" width="80" height="140" fill="#0F1B2A"/>
      <rect x="1020" y="270" width="80" height="110" fill="#0F1B2A"/>
      <line x1="820" y1="260" x2="820" y2="100"/>
      <line x1="940" y1="240" x2="940" y2="80"/>
      <line x1="1060" y1="270" x2="1060" y2="120"/>
    </g>
    <!-- Arc flash burst centered -->
    <g transform="translate(600, 220)">
      <circle r="180" fill="url(#ig-flash)"/>
      <g fill="#FFF5D8">
        <polygon points="0,-90 18,-30 90,-15 38,15 60,90 0,55 -60,90 -38,15 -90,-15 -18,-30"/>
      </g>
      <circle r="14" fill="#FFFFFF"/>
    </g>
    <!-- Hairlines top and bottom -->
    <line x1="0" y1="0" x2="1200" y2="0" stroke="#C8A04A" stroke-width="4"/>
    <line x1="0" y1="400" x2="1200" y2="400" stroke="#C8A04A" stroke-width="4"/>
    <!-- Voltage marker -->
    <text x="40" y="60" font-family="Anton, Arial Narrow, sans-serif" font-size="26" fill="#E0BD63" letter-spacing="3">35,000°F · 1/30 SEC</text>
  </svg>`,

  loto: `<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ig-bg-loto" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stop-color="#2A1F0F"/>
        <stop offset="100%" stop-color="#3D2F18"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="400" fill="url(#ig-bg-loto)"/>
    <!-- Diagonal bars background pattern -->
    <g opacity="0.08" stroke="#F4EDDA" stroke-width="20">
      <line x1="-100" y1="400" x2="500" y2="-200"/>
      <line x1="0" y1="400" x2="600" y2="-200"/>
      <line x1="100" y1="400" x2="700" y2="-200"/>
      <line x1="200" y1="400" x2="800" y2="-200"/>
    </g>
    <!-- Disconnect handle in OFF position -->
    <g transform="translate(700, 200)">
      <rect x="-30" y="-100" width="60" height="200" fill="#0F1B2A" stroke="#C8A04A" stroke-width="3"/>
      <rect x="-50" y="-110" width="100" height="20" fill="#C8A04A"/>
      <rect x="-50" y="90" width="100" height="20" fill="#C8A04A"/>
      <text x="0" y="-50" text-anchor="middle" font-family="Anton" font-size="18" fill="#F4EDDA">OFF</text>
      <!-- handle arm -->
      <line x1="0" y1="0" x2="-110" y2="50" stroke="#F4EDDA" stroke-width="14" stroke-linecap="round"/>
      <circle cx="-110" cy="50" r="14" fill="#F4EDDA"/>
      <circle cx="0" cy="0" r="10" fill="#3D2F18" stroke="#F4EDDA" stroke-width="3"/>
    </g>
    <!-- Padlock hasp with multiple locks -->
    <g transform="translate(360, 200)">
      <!-- Hasp -->
      <rect x="-100" y="-15" width="200" height="30" rx="4" fill="#C8A04A" stroke="#8B6F2F" stroke-width="2"/>
      <!-- Hasp holes -->
      <circle cx="-60" cy="0" r="8" fill="#0F1B2A"/>
      <circle cx="-20" cy="0" r="8" fill="#0F1B2A"/>
      <circle cx="20" cy="0" r="8" fill="#0F1B2A"/>
      <circle cx="60" cy="0" r="8" fill="#0F1B2A"/>
      <!-- Padlocks -->
      <g transform="translate(-60, 50)">
        <rect x="-22" y="0" width="44" height="40" rx="4" fill="#C8102E"/>
        <path d="M-12,-10 V0 M12,-10 V0 M-12,-10 a 12 12 0 0 1 24 0" stroke="#C8102E" stroke-width="6" fill="none"/>
        <circle cx="0" cy="20" r="3" fill="#0F1B2A"/>
      </g>
      <g transform="translate(-20, 50)">
        <rect x="-22" y="0" width="44" height="40" rx="4" fill="#1F7A4D"/>
        <path d="M-12,-10 V0 M12,-10 V0 M-12,-10 a 12 12 0 0 1 24 0" stroke="#1F7A4D" stroke-width="6" fill="none"/>
        <circle cx="0" cy="20" r="3" fill="#F4EDDA"/>
      </g>
      <g transform="translate(20, 50)">
        <rect x="-22" y="0" width="44" height="40" rx="4" fill="#ED7C00"/>
        <path d="M-12,-10 V0 M12,-10 V0 M-12,-10 a 12 12 0 0 1 24 0" stroke="#ED7C00" stroke-width="6" fill="none"/>
        <circle cx="0" cy="20" r="3" fill="#0F1B2A"/>
      </g>
      <g transform="translate(60, 50)">
        <rect x="-22" y="0" width="44" height="40" rx="4" fill="#1B5DA8"/>
        <path d="M-12,-10 V0 M12,-10 V0 M-12,-10 a 12 12 0 0 1 24 0" stroke="#1B5DA8" stroke-width="6" fill="none"/>
        <circle cx="0" cy="20" r="3" fill="#F4EDDA"/>
      </g>
      <!-- Tag hanging -->
      <g transform="translate(-130, -20)">
        <polygon points="0,0 50,0 60,15 50,30 0,30" fill="#F4EDDA" stroke="#0F1B2A" stroke-width="2"/>
        <line x1="6" y1="8" x2="46" y2="8" stroke="#C8102E" stroke-width="2"/>
        <line x1="6" y1="14" x2="46" y2="14" stroke="#0F1B2A" stroke-width="1"/>
        <line x1="6" y1="20" x2="46" y2="20" stroke="#0F1B2A" stroke-width="1"/>
      </g>
    </g>
    <line x1="0" y1="0" x2="1200" y2="0" stroke="#C8A04A" stroke-width="4"/>
    <line x1="0" y1="400" x2="1200" y2="400" stroke="#C8A04A" stroke-width="4"/>
    <text x="1160" y="60" text-anchor="end" font-family="Anton" font-size="26" fill="#E0BD63" letter-spacing="3">ONE WORKER · ONE LOCK</text>
  </svg>`,

  approach: `<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ig-bg-app" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#3D2F18"/>
        <stop offset="100%" stop-color="#2A1F0F"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="400" fill="url(#ig-bg-app)"/>
    <!-- Concentric boundaries centered on energized equipment -->
    <g transform="translate(900, 200)">
      <!-- Arc flash boundary (red) -->
      <circle r="180" fill="none" stroke="#C8102E" stroke-width="3" stroke-dasharray="10 8" opacity="0.85"/>
      <!-- Limited approach (blue) -->
      <circle r="130" fill="none" stroke="#4A8AD0" stroke-width="3" stroke-dasharray="10 8" opacity="0.85"/>
      <!-- Restricted approach (orange) -->
      <circle r="80" fill="none" stroke="#ED7C00" stroke-width="3" stroke-dasharray="10 8" opacity="0.85"/>
      <!-- Energized equipment (silhouette) -->
      <rect x="-30" y="-50" width="60" height="100" fill="#0F1B2A" stroke="#C8A04A" stroke-width="2"/>
      <line x1="0" y1="-50" x2="0" y2="-90" stroke="#C8A04A" stroke-width="3"/>
      <polygon points="-8,-90 8,-90 0,-105" fill="#C8A04A"/>
      <!-- Boundary labels -->
      <text x="0" y="-198" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" fill="#C8102E" letter-spacing="2">ARC FLASH BOUNDARY</text>
      <text x="0" y="-148" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" fill="#4A8AD0" letter-spacing="2">LIMITED APPROACH</text>
      <text x="0" y="-98" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" fill="#ED7C00" letter-spacing="2">RESTRICTED</text>
    </g>
    <!-- Worker silhouette OUTSIDE the boundaries (left side) -->
    <g transform="translate(280, 250)" fill="#F4EDDA">
      <circle cx="0" cy="-50" r="18"/>
      <path d="M-25,-32 L25,-32 L30,40 L20,80 L-20,80 L-30,40 Z"/>
      <!-- Hard hat -->
      <path d="M-22,-58 a 22 22 0 0 1 44 0 L 26,-50 L -26,-50 Z" fill="#C8A04A"/>
      <!-- Arm pointing toward equipment -->
      <line x1="22" y1="-15" x2="80" y2="-25" stroke="#F4EDDA" stroke-width="10" stroke-linecap="round"/>
      <circle cx="80" cy="-25" r="6"/>
    </g>
    <!-- Distance indicator -->
    <g stroke="#C8A04A" stroke-width="2" fill="none">
      <line x1="370" y1="220" x2="710" y2="220" stroke-dasharray="6 4"/>
      <polygon points="370,220 380,215 380,225" fill="#C8A04A"/>
      <polygon points="710,220 700,215 700,225" fill="#C8A04A"/>
      <text x="540" y="212" text-anchor="middle" font-family="Fraunces, serif" font-style="italic" font-size="18" fill="#F4EDDA" stroke="none">stay outside the line</text>
    </g>
    <line x1="0" y1="0" x2="1200" y2="0" stroke="#C8A04A" stroke-width="4"/>
    <line x1="0" y1="400" x2="1200" y2="400" stroke="#C8A04A" stroke-width="4"/>
  </svg>`,

  confined: `<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ig-bg-conf" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#3D2F18"/>
        <stop offset="55%" stop-color="#2A1F0F"/>
        <stop offset="100%" stop-color="#1A1208"/>
      </linearGradient>
      <linearGradient id="ig-vault" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#3D4B62"/>
        <stop offset="100%" stop-color="#0F1B2A"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="400" fill="url(#ig-bg-conf)"/>
    <!-- Ground line -->
    <line x1="0" y1="200" x2="1200" y2="200" stroke="#C8A04A" stroke-width="2" opacity="0.6"/>
    <!-- Cross-section of vault, lower half is below ground -->
    <g transform="translate(700, 200)">
      <!-- Vault walls (open top, sides go down) -->
      <path d="M -180 0 L -180 180 L 180 180 L 180 0" fill="url(#ig-vault)" stroke="#C8A04A" stroke-width="3"/>
      <!-- Hatching for "below ground" -->
      <g opacity="0.18" stroke="#F4EDDA" stroke-width="1">
        <line x1="-180" y1="20" x2="-260" y2="100"/>
        <line x1="-180" y1="60" x2="-240" y2="120"/>
        <line x1="-180" y1="100" x2="-220" y2="140"/>
        <line x1="-180" y1="140" x2="-200" y2="160"/>
        <line x1="180" y1="20" x2="260" y2="100"/>
        <line x1="180" y1="60" x2="240" y2="120"/>
        <line x1="180" y1="100" x2="220" y2="140"/>
        <line x1="180" y1="140" x2="200" y2="160"/>
      </g>
      <!-- Atmospheric layers (gas stratification) -->
      <rect x="-170" y="20" width="340" height="40" fill="#C8102E" opacity="0.14"/>
      <rect x="-170" y="100" width="340" height="40" fill="#ED7C00" opacity="0.14"/>
      <rect x="-170" y="160" width="340" height="20" fill="#1F7A4D" opacity="0.14"/>
      <text x="-160" y="48" font-family="JetBrains Mono" font-size="9" fill="#E0626E" letter-spacing="2">FLAMMABLES</text>
      <text x="-160" y="128" font-family="JetBrains Mono" font-size="9" fill="#E0BD63" letter-spacing="2">CO · H₂S</text>
      <text x="-160" y="178" font-family="JetBrains Mono" font-size="9" fill="#A8D5BA" letter-spacing="2">O₂ DEFICIT</text>
      <!-- Worker entering on retrieval line -->
      <line x1="0" y1="-30" x2="0" y2="80" stroke="#C8A04A" stroke-width="2" stroke-dasharray="3 3"/>
      <g transform="translate(0, 80)" fill="#F4EDDA">
        <circle cx="0" cy="0" r="14"/>
        <path d="M-18,12 L18,12 L20,60 L14,90 L-14,90 L-20,60 Z"/>
        <path d="M-16,-7 a 16 16 0 0 1 32 0 L 18,2 L -18,2 Z" fill="#C8A04A"/>
      </g>
    </g>
    <!-- Attendant outside (above ground, left of opening) -->
    <g transform="translate(450, 160)" fill="#F4EDDA">
      <circle cx="0" cy="-25" r="14"/>
      <path d="M-18,-10 L18,-10 L22,40 L14,80 L-14,80 L-22,40 Z"/>
      <path d="M-16,-32 a 16 16 0 0 1 32 0 L 18,-23 L -18,-23 Z" fill="#1F7A4D"/>
      <!-- Walkie-talkie -->
      <rect x="22" y="0" width="14" height="22" rx="2" fill="#0F1B2A" stroke="#F4EDDA" stroke-width="1.5"/>
      <line x1="29" y1="-4" x2="29" y2="0" stroke="#F4EDDA" stroke-width="2"/>
    </g>
    <text x="450" y="100" text-anchor="middle" font-family="JetBrains Mono" font-size="10" fill="#C8A04A" letter-spacing="3">ATTENDANT</text>
    <text x="700" y="100" text-anchor="middle" font-family="JetBrains Mono" font-size="10" fill="#C8A04A" letter-spacing="3">ENTRANT</text>
    <line x1="0" y1="0" x2="1200" y2="0" stroke="#C8A04A" stroke-width="4"/>
    <line x1="0" y1="400" x2="1200" y2="400" stroke="#C8A04A" stroke-width="4"/>
  </svg>`,

  excavation: `<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ig-bg-exc" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#6B4E2F"/>
        <stop offset="30%" stop-color="#3D2F18"/>
        <stop offset="100%" stop-color="#1A1208"/>
      </linearGradient>
      <linearGradient id="ig-soil-top" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#8B6F2F"/>
        <stop offset="100%" stop-color="#524535"/>
      </linearGradient>
      <linearGradient id="ig-soil-mid" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#524535"/>
        <stop offset="100%" stop-color="#3D2F18"/>
      </linearGradient>
      <pattern id="ig-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="8" stroke="#C8A04A" stroke-width="1" opacity="0.4"/>
      </pattern>
    </defs>
    <!-- Sky -->
    <rect width="1200" height="120" fill="url(#ig-bg-exc)"/>
    <!-- Ground surface line (grade) -->
    <line x1="0" y1="120" x2="1200" y2="120" stroke="#C8A04A" stroke-width="3"/>
    <!-- Soil cross-section — Type A (top clay layer), Type B (mid), Type C (bottom granular) -->
    <rect x="0" y="120" width="1200" height="70" fill="url(#ig-soil-top)"/>
    <rect x="0" y="190" width="1200" height="90" fill="url(#ig-soil-mid)"/>
    <rect x="0" y="280" width="1200" height="120" fill="#2A1F0F"/>
    <!-- Trench cavity (cut out with white overlay, then re-fill with dark for interior) -->
    <path d="M 400 120 L 800 120 L 800 380 L 400 380 Z" fill="#0F0A05"/>
    <!-- Shoring boards — vertical planks lining both walls -->
    <g stroke="#C8A04A" stroke-width="2" fill="#3D2F18">
      <rect x="398" y="120" width="10" height="260"/>
      <rect x="415" y="140" width="10" height="240"/>
      <rect x="792" y="120" width="10" height="260"/>
      <rect x="775" y="140" width="10" height="240"/>
    </g>
    <!-- Horizontal cross-braces (trench shoring) -->
    <g stroke="#E0BD63" stroke-width="4">
      <line x1="425" y1="180" x2="775" y2="180"/>
      <line x1="425" y1="240" x2="775" y2="240"/>
      <line x1="425" y1="300" x2="775" y2="300"/>
    </g>
    <!-- Depth markers on the right wall -->
    <g font-family="JetBrains Mono" font-size="9" fill="#E0BD63" letter-spacing="1">
      <line x1="808" y1="120" x2="820" y2="120" stroke="#E0BD63" stroke-width="1"/>
      <text x="824" y="124">0'</text>
      <line x1="808" y1="188" x2="820" y2="188" stroke="#E0BD63" stroke-width="1"/>
      <text x="824" y="192">4'</text>
      <line x1="808" y1="256" x2="820" y2="256" stroke="#E0BD63" stroke-width="1"/>
      <text x="824" y="260">8'</text>
    </g>
    <!-- Spoil pile — sitting at 2ft setback from the LEFT trench edge -->
    <g fill="#8B6F2F" stroke="#524535" stroke-width="1">
      <path d="M 280 120 Q 300 92 340 90 Q 375 88 395 120 Z"/>
    </g>
    <!-- Setback distance annotation between spoil pile and trench edge -->
    <g stroke="#C8102E" stroke-width="1.5" fill="none">
      <line x1="395" y1="106" x2="395" y2="90" stroke-dasharray="3 3"/>
      <line x1="380" y1="98" x2="395" y2="98"/>
      <polygon points="395,98 388,94 388,102" fill="#C8102E"/>
      <text x="360" y="88" font-family="JetBrains Mono" font-size="10" fill="#C8102E" letter-spacing="1" text-anchor="end">2' MIN</text>
    </g>
    <!-- Worker inside the shielded zone -->
    <g transform="translate(600, 320)" fill="#F4EDDA">
      <circle cx="0" cy="-30" r="12"/>
      <path d="M-14,-16 L14,-16 L18,20 L12,50 L-12,50 L-18,20 Z"/>
      <!-- Hard hat -->
      <path d="M-14,-36 a 14 14 0 0 1 28 0 L 16,-28 L -16,-28 Z" fill="#C8A04A"/>
    </g>
    <!-- Access ladder inside trench -->
    <g stroke="#E0BD63" stroke-width="2" fill="none">
      <line x1="720" y1="120" x2="720" y2="378"/>
      <line x1="740" y1="120" x2="740" y2="378"/>
      <line x1="720" y1="150" x2="740" y2="150"/>
      <line x1="720" y1="185" x2="740" y2="185"/>
      <line x1="720" y1="220" x2="740" y2="220"/>
      <line x1="720" y1="255" x2="740" y2="255"/>
      <line x1="720" y1="290" x2="740" y2="290"/>
      <line x1="720" y1="325" x2="740" y2="325"/>
      <line x1="720" y1="360" x2="740" y2="360"/>
    </g>
    <!-- Soil-class labels on the left side -->
    <g font-family="JetBrains Mono" font-size="10" letter-spacing="2" fill="#E0BD63">
      <text x="40" y="160">TYPE A · COHESIVE</text>
      <text x="40" y="240">TYPE B · GRANULAR</text>
      <text x="40" y="330">TYPE C · SUBMERGED</text>
    </g>
    <!-- Gold hairlines top & bottom -->
    <line x1="0" y1="0" x2="1200" y2="0" stroke="#C8A04A" stroke-width="4"/>
    <line x1="0" y1="400" x2="1200" y2="400" stroke="#C8A04A" stroke-width="4"/>
    <!-- Header text: cave-in stat -->
    <text x="1160" y="50" text-anchor="end" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="900" font-size="26" fill="#C8102E" letter-spacing="1">1 CU YD = 3,000 LB</text>
  </svg>`,
};

/* ============================================================
   PHOTO LIBRARY — curated free-license stock photos per topic
   URLs target Unsplash CDN; all photos are free for commercial
   use under the Unsplash License. User can swap any URL via the
   picker if a specific photo doesn't load.
   ============================================================ */
const PHOTO_LIBRARY = {
  arc_flash: [
    { id: 'af1', url: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=1400&q=80&auto=format&fit=crop', credit: 'American Public Power Association · Unsplash', alt: 'Substation at dusk' },
    { id: 'af2', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1400&q=80&auto=format&fit=crop', credit: 'Rob Lambert · Unsplash', alt: 'Industrial electrical equipment' },
    { id: 'af3', url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1400&q=80&auto=format&fit=crop', credit: 'Matthew Henry · Unsplash', alt: 'Transmission tower' },
    { id: 'af4', url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1400&q=80&auto=format&fit=crop', credit: 'Fré Sonneveld · Unsplash', alt: 'Power lines against sky' },
    { id: 'af5', url: 'https://images.unsplash.com/photo-1591033594797-a89c4c3a52a4?w=1400&q=80&auto=format&fit=crop', credit: 'Kate Bezzubets · Unsplash', alt: 'Electrical control panel' },
    { id: 'af6', url: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?w=1400&q=80&auto=format&fit=crop', credit: 'Matthew Henry · Unsplash', alt: 'Electrical transformer' },
    { id: 'af7', url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1400&q=80&auto=format&fit=crop', credit: 'American Public Power Association · Unsplash', alt: 'Substation switchgear' },
    { id: 'af8', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1400&q=80&auto=format&fit=crop', credit: 'Markus Spiske · Unsplash', alt: 'Electrical cables and power' },
  ],
  loto: [
    { id: 'lt1', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80&auto=format&fit=crop', credit: 'ThisisEngineering · Unsplash', alt: 'Industrial equipment' },
    { id: 'lt2', url: 'https://images.unsplash.com/photo-1610208458024-e2af5fbf6906?w=1400&q=80&auto=format&fit=crop', credit: 'Markus Spiske · Unsplash', alt: 'Heavy padlock secured' },
    { id: 'lt3', url: 'https://images.unsplash.com/photo-1507477338202-487281e6c27e?w=1400&q=80&auto=format&fit=crop', credit: 'Jose Fontano · Unsplash', alt: 'Master padlock on chain' },
    { id: 'lt4', url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1400&q=80&auto=format&fit=crop', credit: 'Christopher Burns · Unsplash', alt: 'Industrial machinery' },
    { id: 'lt5', url: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1400&q=80&auto=format&fit=crop', credit: 'Ümit Yıldırım · Unsplash', alt: 'Maintenance worker' },
    { id: 'lt6', url: 'https://images.unsplash.com/photo-1581092446327-9b52bd1570c2?w=1400&q=80&auto=format&fit=crop', credit: 'Science in HD · Unsplash', alt: 'Disconnect controls' },
    { id: 'lt7', url: 'https://images.unsplash.com/photo-1580982327559-c1202864eb05?w=1400&q=80&auto=format&fit=crop', credit: 'Emmanuel Ikwuegbu · Unsplash', alt: 'Electrician at panel' },
    { id: 'lt8', url: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=1400&q=80&auto=format&fit=crop', credit: 'Patrick Tomasso · Unsplash', alt: 'Padlock on industrial gate' },
  ],
  approach: [
    { id: 'ap1', url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1400&q=80&auto=format&fit=crop', credit: 'Science in HD · Unsplash', alt: 'Engineer in PPE' },
    { id: 'ap2', url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1400&q=80&auto=format&fit=crop', credit: 'ThisisEngineering · Unsplash', alt: 'Engineer with safety gear' },
    { id: 'ap3', url: 'https://images.unsplash.com/photo-1570274108015-95dac72ef25b?w=1400&q=80&auto=format&fit=crop', credit: 'Anton Dmitriev · Unsplash', alt: 'Electrician working' },
    { id: 'ap4', url: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1400&q=80&auto=format&fit=crop', credit: 'Ümit Yıldırım · Unsplash', alt: 'Worker in industrial PPE' },
    { id: 'ap5', url: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1400&q=80&auto=format&fit=crop', credit: 'Brooke Lark · Unsplash', alt: 'Industrial worker hard hat' },
    { id: 'ap6', url: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1400&q=80&auto=format&fit=crop', credit: 'Robert Bye · Unsplash', alt: 'Construction worker safety' },
    { id: 'ap7', url: 'https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?w=1400&q=80&auto=format&fit=crop', credit: 'Pop & Zebra · Unsplash', alt: 'Worker with safety equipment' },
    { id: 'ap8', url: 'https://images.unsplash.com/photo-1542222024-c39e2281f121?w=1400&q=80&auto=format&fit=crop', credit: 'Daniel Söderberg · Unsplash', alt: 'Electrical worker' },
  ],
  confined: [
    { id: 'cf1', url: 'https://images.unsplash.com/photo-1581094488347-c7c47cb8d5b0?w=1400&q=80&auto=format&fit=crop', credit: 'Pop & Zebra · Unsplash', alt: 'Worker entering vault' },
    { id: 'cf2', url: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1400&q=80&auto=format&fit=crop', credit: 'Christopher Burns · Unsplash', alt: 'Industrial vessel and tank' },
    { id: 'cf3', url: 'https://images.unsplash.com/photo-1610450949062-ad8be568b3a0?w=1400&q=80&auto=format&fit=crop', credit: 'Anton Maksimov · Unsplash', alt: 'Industrial pipe access' },
    { id: 'cf4', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1400&q=80&auto=format&fit=crop', credit: 'Rob Lambert · Unsplash', alt: 'Maintenance access point' },
    { id: 'cf5', url: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1400&q=80&auto=format&fit=crop', credit: 'Ümit Yıldırım · Unsplash', alt: 'Underground utility access' },
    { id: 'cf6', url: 'https://images.unsplash.com/photo-1574359411659-15573a27cd06?w=1400&q=80&auto=format&fit=crop', credit: 'Anton Dmitriev · Unsplash', alt: 'Tank entry retrieval' },
    { id: 'cf7', url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400&q=80&auto=format&fit=crop', credit: 'Cassie Boca · Unsplash', alt: 'Worker in protective gear' },
    { id: 'cf8', url: 'https://images.unsplash.com/photo-1599028113912-acd6f7166cb1?w=1400&q=80&auto=format&fit=crop', credit: 'Pop & Zebra · Unsplash', alt: 'Manhole inspection' },
  ],
  excavation: [
    { id: 'ex1', url: 'https://images.unsplash.com/photo-1580983230786-4ac9c31add63?w=1400&q=80&auto=format&fit=crop', credit: 'Ivan Bandura · Unsplash', alt: 'Deep utility trench with shoring' },
    { id: 'ex2', url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=80&auto=format&fit=crop', credit: 'Jesse Orrico · Unsplash', alt: 'Excavator digging construction site' },
    { id: 'ex3', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&q=80&auto=format&fit=crop', credit: 'Josue Isai Ramos Figueroa · Unsplash', alt: 'Construction excavation site' },
    { id: 'ex4', url: 'https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?w=1400&q=80&auto=format&fit=crop', credit: 'Josh Olalde · Unsplash', alt: 'Heavy equipment digging trench' },
    { id: 'ex5', url: 'https://images.unsplash.com/photo-1596623220520-af1a1cdccec2?w=1400&q=80&auto=format&fit=crop', credit: 'Zac Wolff · Unsplash', alt: 'Underground pipe installation' },
    { id: 'ex6', url: 'https://images.unsplash.com/photo-1523575708161-ad0fc2a9b951?w=1400&q=80&auto=format&fit=crop', credit: 'Ricardo Gomez Angel · Unsplash', alt: 'Excavator on construction site' },
    { id: 'ex7', url: 'https://images.unsplash.com/photo-1517911478136-e2ffe2b04df2?w=1400&q=80&auto=format&fit=crop', credit: 'Anaya Katlego · Unsplash', alt: 'Trench digging heavy machinery' },
    { id: 'ex8', url: 'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?w=1400&q=80&auto=format&fit=crop', credit: 'Josh Olalde · Unsplash', alt: 'Deep excavation utility work' },
  ],
};

