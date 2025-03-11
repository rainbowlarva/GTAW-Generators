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
[b]Ranks and names of other employees present during the incident:[/b]
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
 * Save data to localStorage whenever user types in any field.
 */
function saveData() {
  localStorage.setItem('reportNumber',      document.getElementById('reportNumber').value);
  localStorage.setItem('fullName',          document.getElementById('fullName').value);
  localStorage.setItem('departmentalRank',  document.getElementById('departmentalRank').value);
  localStorage.setItem('badgeNumber',       document.getElementById('badgeNumber').value);
  localStorage.setItem('timeDate',          document.getElementById('timeDate').value);
  localStorage.setItem('street',            document.getElementById('street').value);
  localStorage.setItem('area',              document.getElementById('area').value);
  localStorage.setItem('narrative',         document.getElementById('narrative').value);
  localStorage.setItem('extraDetails',      document.getElementById('extraDetails').value);

  // Save the dynamic employees
  const employees = [];
  document.querySelectorAll('.employee-input').forEach(input => employees.push(input.value));
  localStorage.setItem('involvedEmployees', JSON.stringify(employees));
}

/**
 * Load data from localStorage on page load.
 */
function loadData() {
  document.getElementById('reportNumber').value      = localStorage.getItem('reportNumber')      || '';
  document.getElementById('fullName').value          = localStorage.getItem('fullName')          || '';
  document.getElementById('departmentalRank').value  = localStorage.getItem('departmentalRank')  || '';
  document.getElementById('badgeNumber').value       = localStorage.getItem('badgeNumber')       || '';
  document.getElementById('timeDate').value          = localStorage.getItem('timeDate')          || '';
  document.getElementById('street').value            = localStorage.getItem('street')            || '';
  document.getElementById('area').value              = localStorage.getItem('area')              || '';
  document.getElementById('narrative').value         = localStorage.getItem('narrative')         || '';
  document.getElementById('extraDetails').value      = localStorage.getItem('extraDetails')      || '';

  // Load the dynamic employees
  const employees = JSON.parse(localStorage.getItem('involvedEmployees')) || [];
  const employeeList = document.getElementById('employeeList');
  employeeList.innerHTML = ''; // Clear existing
  employees.forEach(name => addEmployee(name));
}

/**
 * Clear the form and localStorage.
 */
function clearForm() {
  localStorage.removeItem('reportNumber');
  localStorage.removeItem('fullName');
  localStorage.removeItem('departmentalRank');
  localStorage.removeItem('badgeNumber');
  localStorage.removeItem('timeDate');
  localStorage.removeItem('street');
  localStorage.removeItem('area');
  localStorage.removeItem('narrative');
  localStorage.removeItem('extraDetails');
  localStorage.removeItem('involvedEmployees');

  // Reset all inputs
  document.getElementById('reportNumber').value      = '';
  document.getElementById('fullName').value          = '';
  document.getElementById('departmentalRank').value  = '';
  document.getElementById('badgeNumber').value       = '';
  document.getElementById('timeDate').value          = '';
  document.getElementById('street').value            = '';
  document.getElementById('area').value              = '';
  document.getElementById('narrative').value         = '';
  document.getElementById('extraDetails').value      = '';

  // Clear employee list
  const employeeList = document.getElementById('employeeList');
  employeeList.innerHTML = '';

  // Clear BBCode output
  const bbcodeOutput = document.getElementById('bbcodeOutput');
  if (bbcodeOutput) {
    bbcodeOutput.innerHTML = '';
  }
}

/**
 * Add a new employee input field.
 */
function addEmployee(name = '') {
  const employeeList = document.getElementById('employeeList');

  // Create a container
  const div = document.createElement('div');
  div.classList.add('employee-entry');

  // Create the input
  const input = document.createElement('input');
  input.type = 'text';
  input.classList.add('employee-input');
  input.placeholder = 'Employee rank, name';
  input.value = name;

  // Save to localStorage on input
  input.addEventListener('input', saveData);

  div.appendChild(input);
  employeeList.appendChild(div);
}

/**
 * Remove the last employee input field.
 */
function removeEmployee() {
  const employeeList = document.getElementById('employeeList');
  if (employeeList.lastChild) {
    employeeList.removeChild(employeeList.lastChild);
    saveData(); // Update localStorage after removing
  }
}

/**
 * Generate BBCode, place it into #bbcodeOutput, and highlight it.
 */
function generateBBCode() {
  // Gather data
  const reportNumber     = (document.getElementById('reportNumber').value || 'XXX').trim();
  const fullName         = (document.getElementById('fullName').value || 'NAMEHERE').trim();
  const departmentalRank = (document.getElementById('departmentalRank').value || 'NAMEHERE').trim();
  const badgeNumber      = (document.getElementById('badgeNumber').value || 'NAMEHERE').trim();
  const timeDate         = (document.getElementById('timeDate').value || 'NAMEHERE').trim();
  const street           = (document.getElementById('street').value || 'NAMEHERE').trim();
  const area             = (document.getElementById('area').value || 'NAMEHERE').trim();
  const narrative        = (document.getElementById('narrative').value || 'NAMEHERE').trim();
  const extraDetails     = (document.getElementById('extraDetails').value || 'NAMEHERE').trim();

  // Gather employees from dynamic inputs
  const employees = [];
  document.querySelectorAll('.employee-input').forEach(input => {
    const val = input.value.trim();
    if (val) employees.push(val);
  });

  // Copy the template
  let finalText = afterActionTemplate;

  // Replace placeholders
  finalText = finalText.replace('AFTER ACTION REPORT #XXX', `AFTER ACTION REPORT #${reportNumber}`);
  finalText = finalText.replace('[b]Full name:[/b] NAMEHERE', `[b]Full name:[/b] ${fullName}`);
  finalText = finalText.replace('[b]Departmental rank:[/b] NAMEHERE', `[b]Departmental rank:[/b] ${departmentalRank}`);
  finalText = finalText.replace('[b]Badge number:[/b] NAMEHERE', `[b]Badge number:[/b] ${badgeNumber}`);

  // If employees exist, build a bullet list. Otherwise keep NAMEHERE.
  if (employees.length > 0) {
    const employeeBBCode = employees.map(emp => `[*] ${emp}`).join('\n');
    finalText = finalText.replace('[list][*] NAMEHERE', `[list]\n${employeeBBCode}\n[/list]`);
  } else {
    // No employees => keep the default placeholder
    finalText = finalText.replace('[list][*] NAMEHERE', `[list][*] NAMEHERE[/list]`);
  }

  finalText = finalText.replace('[b]Time and date:[/b] NAMEHERE', `[b]Time and date:[/b] ${timeDate}`);
  finalText = finalText.replace('[b]Street:[/b] NAMEHERE', `[b]Street:[/b] ${street}`);
  finalText = finalText.replace('[b]Area:[/b] NAMEHERE', `[b]Area:[/b] ${area}`);
  finalText = finalText.replace('\n NAMEHERE\n\n[hr][/hr]', `\n ${narrative}\n\n[hr][/hr]`);
  finalText = finalText.replace('\n NAMEHERE[/indent]', `\n ${extraDetails}[/indent]`);

  // Output
  const bbcodeOutput = document.getElementById('bbcodeOutput');
  if (bbcodeOutput) {
    bbcodeOutput.innerHTML = `<pre>${finalText}</pre>`;
  }

  // Highlight for easy copy
  highlightBBCode();
}

/**
 * Select/highlight the BBCode text so user can Ctrl+C.
 */
function highlightBBCode() {
  const codeElement = document.querySelector('#bbcodeOutput pre');
  if (!codeElement) return;
  const range = document.createRange();
  range.selectNodeContents(codeElement);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

// On DOMContentLoaded, load data and set up event listeners
document.addEventListener('DOMContentLoaded', () => {
  loadData();

  // Auto-resize certain textareas
  const textareasToAutoResize = ['narrative', 'extraDetails'];
  textareasToAutoResize.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
      el.addEventListener('input', autoResizeTextarea);
    }
  });

  // Save data on input for all relevant fields
  [
    'reportNumber','fullName','departmentalRank','badgeNumber',
    'timeDate','street','area','narrative','extraDetails'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', saveData);
  });

  // Handle Add/Remove Employee
  const addEmployeeBtn = document.getElementById('addEmployee');
  const removeEmployeeBtn = document.getElementById('removeEmployee');
  if (addEmployeeBtn) addEmployeeBtn.addEventListener('click', () => addEmployee());
  if (removeEmployeeBtn) removeEmployeeBtn.addEventListener('click', removeEmployee);
});