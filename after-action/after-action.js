const afterActionTemplate = `[divbox=white][color=transparent]spacer[/color]

[aligntable=right,0,0,15,0,0,transparent]LOS SANTOS POLICE DEPT.
OFFICE OF OPERATIONS
MISSION ROW POLICE STATION
SINNER STREET 1
LOS SANTOS



[/aligntable][aligntable=left,0,15,0,0,0,transparent][lspdlogo=130][/lspdlogo][/aligntable]

[color=transparent]tt[/color]

[color=transparent]tt[/color]


[color=transparent]tt[/color]

[hr][/hr]
[center][b]AFTER ACTION REPORT #XXX[/b][/center]

[indent=10][b]PERSONNEL DETAILS[/b]
[b]Full name:[/b] NAMEHERE
[b]Departmental rank:[/b] NAMEHERE
[b]Badge number:[/b] NAMEHERE
[b]Ranks and names of other officers present during the incident:[/b]
[list][*] NAMEHERE
[/list][/indent]


[hr][/hr]
[color=transparent]spacer[/color]
[b]TIME AND LOCATION[/b]
[b]Time and date:[/b] NAMEHERE
[b]Street:[/b] NAMEHERE
[b]Area:[/b] NAMEHERE
[color=transparent]spacer[/color]
[hr][/hr]

[indent=10][b]NARRATIVE[/b]

 NAMEHERE

[hr][/hr]

[b]EXTRA DETAILS / FURTHER RECOMMENDATIONS[/b]

 NAMEHERE[/indent]
[color=transparent]spacer[/color][/divbox]`;

/**
 * Auto-resize textarea as user types.
 */
function autoResizeTextarea(event) {
  const textarea = event.target;
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

/**
 * Save data to localStorage when user types in the fields.
 */
function saveData() {
  localStorage.setItem('reportNumber', document.getElementById('reportNumber').value);
  localStorage.setItem('fullName', document.getElementById('fullName').value);
  localStorage.setItem('departmentalRank', document.getElementById('departmentalRank').value);
  localStorage.setItem('badgeNumber', document.getElementById('badgeNumber').value);
  localStorage.setItem('otherOfficers', document.getElementById('otherOfficers').value);
  localStorage.setItem('timeDate', document.getElementById('timeDate').value);
  localStorage.setItem('street', document.getElementById('street').value);
  localStorage.setItem('area', document.getElementById('area').value);
  localStorage.setItem('narrative', document.getElementById('narrative').value);
  localStorage.setItem('extraDetails', document.getElementById('extraDetails').value);
}

/**
 * Load data from localStorage when the page loads.
 */
function loadData() {
  document.getElementById('reportNumber').value      = localStorage.getItem('reportNumber')      || '';
  document.getElementById('fullName').value          = localStorage.getItem('fullName')          || '';
  document.getElementById('departmentalRank').value  = localStorage.getItem('departmentalRank')  || '';
  document.getElementById('badgeNumber').value       = localStorage.getItem('badgeNumber')       || '';
  document.getElementById('otherOfficers').value     = localStorage.getItem('otherOfficers')     || '';
  document.getElementById('timeDate').value          = localStorage.getItem('timeDate')          || '';
  document.getElementById('street').value            = localStorage.getItem('street')            || '';
  document.getElementById('area').value              = localStorage.getItem('area')              || '';
  document.getElementById('narrative').value         = localStorage.getItem('narrative')         || '';
  document.getElementById('extraDetails').value      = localStorage.getItem('extraDetails')      || '';
}

/**
 * Clears data from localStorage and resets form fields + output.
 */
function clearData() {
  // Remove items from localStorage
  localStorage.removeItem('reportNumber');
  localStorage.removeItem('fullName');
  localStorage.removeItem('departmentalRank');
  localStorage.removeItem('badgeNumber');
  localStorage.removeItem('otherOfficers');
  localStorage.removeItem('timeDate');
  localStorage.removeItem('street');
  localStorage.removeItem('area');
  localStorage.removeItem('narrative');
  localStorage.removeItem('extraDetails');

  // Reset the form fields
  document.getElementById('reportNumber').value      = '';
  document.getElementById('fullName').value          = '';
  document.getElementById('departmentalRank').value  = '';
  document.getElementById('badgeNumber').value       = '';
  document.getElementById('otherOfficers').value     = '';
  document.getElementById('timeDate').value          = '';
  document.getElementById('street').value            = '';
  document.getElementById('area').value              = '';
  document.getElementById('narrative').value         = '';
  document.getElementById('extraDetails').value      = '';

  // Clear output
  const bbcodeOutput = document.getElementById('bbcodeOutput');
  if (bbcodeOutput) {
    bbcodeOutput.innerHTML = '';
  }
}

/**
 * Generates BBCode from user input, displays it, and automatically highlights it.
 */
function generateBBCode(event) {
  // Prevent default form submission
  event.preventDefault();

  // Grab all inputs
  const reportNumber     = document.getElementById('reportNumber').value || 'XXX';
  const fullName         = document.getElementById('fullName').value || 'NAMEHERE';
  const departmentalRank = document.getElementById('departmentalRank').value || 'NAMEHERE';
  const badgeNumber      = document.getElementById('badgeNumber').value || 'NAMEHERE';
  const otherOfficers    = document.getElementById('otherOfficers').value || 'NAMEHERE';
  const timeDate         = document.getElementById('timeDate').value || 'NAMEHERE';
  const street           = document.getElementById('street').value || 'NAMEHERE';
  const area             = document.getElementById('area').value || 'NAMEHERE';
  const narrative        = document.getElementById('narrative').value || 'NAMEHERE';
  const extraDetails     = document.getElementById('extraDetails').value || 'NAMEHERE';

  // Make a copy of the template
  let finalText = afterActionTemplate;

  // Replace placeholders
  finalText = finalText.replace('AFTER ACTION REPORT #XXX', `AFTER ACTION REPORT #${reportNumber}`);
  finalText = finalText.replace('[b]Full name:[/b] NAMEHERE', `[b]Full name:[/b] ${fullName}`);
  finalText = finalText.replace('[b]Departmental rank:[/b] NAMEHERE', `[b]Departmental rank:[/b] ${departmentalRank}`);
  finalText = finalText.replace('[b]Badge number:[/b] NAMEHERE', `[b]Badge number:[/b] ${badgeNumber}`);
  finalText = finalText.replace('[list][*] NAMEHERE', `[list][*] ${otherOfficers}`);
  finalText = finalText.replace('[b]Time and date:[/b] NAMEHERE', `[b]Time and date:[/b] ${timeDate}`);
  finalText = finalText.replace('[b]Street:[/b] NAMEHERE', `[b]Street:[/b] ${street}`);
  finalText = finalText.replace('[b]Area:[/b] NAMEHERE', `[b]Area:[/b] ${area}`);

  // Narrative & Extra Details
  finalText = finalText.replace('\n NAMEHERE\n\n[hr][/hr]', `\n ${narrative}\n\n[hr][/hr]`);
  finalText = finalText.replace('\n NAMEHERE[/indent]', `\n ${extraDetails}[/indent]`);

  // Display the final BBCode in a <pre> block
  const bbcodeOutput = document.getElementById('bbcodeOutput');
  if (bbcodeOutput) {
    bbcodeOutput.innerHTML = `<pre>${finalText}</pre>`;
  }

  // Automatically highlight the BBCode so user can press Ctrl+C
  highlightBBCode();
}

/**
 * Selects (highlights) the generated BBCode, so user can manually copy.
 */
function highlightBBCode() {
  const codeElement = document.querySelector('#bbcodeOutput pre');
  if (!codeElement) return;

  const range = document.createRange();
  range.selectNodeContents(codeElement);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  // Now the text is highlighted; user can press Ctrl + C (or Cmd + C).
}

/**
 * Initialize everything on DOMContentLoaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1) Load data from localStorage
  loadData();

  // 2) Auto-resize textareas
  const textareasToAutoResize = ['otherOfficers', 'narrative', 'extraDetails'];
  textareasToAutoResize.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      // Resize on load
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
      // Listen for input changes
      el.addEventListener('input', autoResizeTextarea);
    }
  });

  // 3) Save data on input
  const fieldsToSave = [
    'reportNumber', 'fullName', 'departmentalRank', 'badgeNumber',
    'otherOfficers', 'timeDate', 'street', 'area', 'narrative', 'extraDetails'
  ];
  fieldsToSave.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', saveData);
    }
  });

  // 4) Handle form submission -> generate BBCode
  const form = document.getElementById('afterActionForm');
  if (form) {
    form.addEventListener('submit', generateBBCode);
  }

  // 5) Handle "Clear" button
  const clearButton = document.getElementById('clearButton');
  if (clearButton) {
    clearButton.addEventListener('click', clearData);
  }
});
