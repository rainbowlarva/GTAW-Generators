// Function to auto-resize textareas as the user types
function autoResizeTextarea(event) {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

// Attach auto-resize listener to textareas
document.getElementById('narrative').addEventListener('input', autoResizeTextarea);
document.getElementById('evidence').addEventListener('input', autoResizeTextarea);

// Save data to localStorage
function saveData() {
    localStorage.setItem('reportingEmployee', document.getElementById('reportingEmployee').value);
    localStorage.setItem('incidentDateTime', document.getElementById('incidentDateTime').value);
    localStorage.setItem('incidentLocation', document.getElementById('incidentLocation').value);
    localStorage.setItem('uofType', document.getElementById('uofType').value);
    localStorage.setItem('firearmSubmission', document.getElementById('firearmSubmission').value);
    localStorage.setItem('narrative', document.getElementById('narrative').value);
    localStorage.setItem('subjectName', document.getElementById('subjectName').value);
    localStorage.setItem('mdcRecord', document.getElementById('mdcRecord').value);
    localStorage.setItem('subjectStatus', document.getElementById('subjectStatus').value);
    localStorage.setItem('subjectNotes', document.getElementById('subjectNotes').value);
    localStorage.setItem('supervisor', document.getElementById('supervisor').value);
    localStorage.setItem('evidence', document.getElementById('evidence').value);

    // Save involved employees as a JSON array
    const employees = Array.from(document.querySelectorAll('.employee-entry input')).map(input => input.value);
    localStorage.setItem('involvedEmployees', JSON.stringify(employees));
}

// Load data from localStorage
function loadData() {
    document.getElementById('reportingEmployee').value = localStorage.getItem('reportingEmployee') || '';
    document.getElementById('incidentDateTime').value = localStorage.getItem('incidentDateTime') || '';
    document.getElementById('incidentLocation').value = localStorage.getItem('incidentLocation') || '';
    document.getElementById('uofType').value = localStorage.getItem('uofType') || '';
    document.getElementById('firearmSubmission').value = localStorage.getItem('firearmSubmission') || '';
    document.getElementById('narrative').value = localStorage.getItem('narrative') || '';
    document.getElementById('subjectName').value = localStorage.getItem('subjectName') || '';
    document.getElementById('mdcRecord').value = localStorage.getItem('mdcRecord') || '';
    document.getElementById('subjectStatus').value = localStorage.getItem('subjectStatus') || '';
    document.getElementById('subjectNotes').value = localStorage.getItem('subjectNotes') || '';
    document.getElementById('supervisor').value = localStorage.getItem('supervisor') || '';
    document.getElementById('evidence').value = localStorage.getItem('evidence') || '';

    // Load involved employees
    const storedEmployees = JSON.parse(localStorage.getItem('involvedEmployees')) || [];
    const employeeList = document.getElementById('employeeList');
    employeeList.innerHTML = ''; // Clear previous entries
    storedEmployees.forEach(name => addEmployee(name));
}

// Add an involved employee input field
function addEmployee(name = '') {
    const employeeList = document.getElementById('employeeList');
    const div = document.createElement('div');
    div.classList.add('employee-entry');

    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'involvedEmployee';
    input.placeholder = 'Enter employee name';
    input.value = name;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.classList.add('removeEmployee');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
        div.remove();
        saveData();
    });

    div.appendChild(input);
    div.appendChild(removeBtn);
    employeeList.appendChild(div);

    input.addEventListener('input', saveData); // Save data when typing
}

// Clear all saved data
function clearData() {
    localStorage.clear();
    document.getElementById('uofForm').reset();
    document.getElementById('employeeList').innerHTML = '';
    addEmployee(); // Ensure at least one employee field exists
}

// Event listeners for saving data
document.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', saveData);
});

// Event listener to add employees dynamically
document.getElementById('addEmployee').addEventListener('click', () => {
    addEmployee();
    saveData();
});

// Load saved data when the page loads
window.onload = loadData;

// Form submission to generate BBCode
document.getElementById('uofForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const reportingEmployee = document.getElementById('reportingEmployee').value;
    const incidentDateTime = document.getElementById('incidentDateTime').value;
    const incidentLocation = document.getElementById('incidentLocation').value;
    const uofType = document.getElementById('uofType').value;
    const firearmSubmission = document.getElementById('firearmSubmission').value;
    const narrative = document.getElementById('narrative').value;
    const subjectName = document.getElementById('subjectName').value;
    const mdcRecord = document.getElementById('mdcRecord').value;
    const subjectStatus = document.getElementById('subjectStatus').value;
    const subjectNotes = document.getElementById('subjectNotes').value;
    const supervisor = document.getElementById('supervisor').value;
    const evidence = document.getElementById('evidence').value;

    // Get involved employees as a BBCode list
    const employeeList = Array.from(document.querySelectorAll('.employee-entry input'))
        .map(input => `[*] ${input.value}`)
        .join('\n');

    // BBCode Template
    const bbcodeTemplate = `
[divbox2=white][color=transparent]spacer[/color]

[aligntable=right,0,0,15,0,0,transparent]LOS SANTOS POLICE DEPT.
OFFICE OF OPERATIONS
MISSION ROW POLICE STATION
SINNER STREET 1
LOS SANTOS
[/aligntable][aligntable=left,0,15,0,0,0,transparent][bwlspdlogo=130][/bwlspdlogo][/aligntable]

[color=transparent]tt[/color]

[color=transparent]tt[/color]

[color=transparent]tt[/color]

[hr][/hr]
[b]USE OF FORCE REPORT #XXX[/b]

[b]REPORTING EMPLOYEE[/b]
Name: ${reportingEmployee}

[hr][/hr]

[b]INCIDENT DETAILS[/b]
Date & Time: ${incidentDateTime}
Location: ${incidentLocation}
Type of Force Used: ${uofType}
Firearm Submitted to Armory: ${firearmSubmission}

[hr][/hr]

[b]NARRATIVE[/b]
${narrative}

[hr][/hr]

[b]INVOLVED SUBJECT(S)[/b]
Name: ${subjectName}
MDC Record: ${mdcRecord}
Status: ${subjectStatus}
Notes: ${subjectNotes}

[hr][/hr]

[b]INVOLVED EMPLOYEE(S)[/b]
[list]
${employeeList}
[/list]

[hr][/hr]

[b]SUPERVISOR[/b]
${supervisor}

[hr][/hr]

[b]EVIDENCE[/b]
${evidence}

[/divbox2]
`;

    // Display generated BBCode
    document.getElementById('bbcodeText').textContent = bbcodeTemplate;

    // Select and copy BBCode
    const range = document.createRange();
    range.selectNodeContents(document.getElementById('bbcodeText'));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
});
