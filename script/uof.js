// Wait for DOM to load before attaching event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Select the Clear button
    const clearButton = document.getElementById('clearButton');

    // Function to clear all form fields and LocalStorage
    function clearData() {
        localStorage.clear(); // Clears all saved data
        document.querySelectorAll('input, textarea').forEach(input => input.value = ''); // Clears all text fields
        document.getElementById('employeeList').innerHTML = ''; // Clears the employee list
    }

    // Attach the clearData function to the button
    if (clearButton) {
        clearButton.addEventListener('click', clearData);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Function to auto-resize textareas
    function autoResizeTextarea(event) {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    document.getElementById('narrative').addEventListener('input', autoResizeTextarea);
    document.getElementById('evidence').addEventListener('input', autoResizeTextarea);

    // Function to save data to localStorage
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
        localStorage.setItem('evidence', document.getElementById('evidence').value);

        // Save involved employees list
        let employees = [];
        document.querySelectorAll('.employee-input').forEach(input => employees.push(input.value));
        localStorage.setItem('involvedEmployees', JSON.stringify(employees));

        // Save supervisor field
        localStorage.setItem('supervisor', document.getElementById('supervisor').value);
    }

    // Function to load data from localStorage
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
        document.getElementById('evidence').value = localStorage.getItem('evidence') || '';
        document.getElementById('supervisor').value = localStorage.getItem('supervisor') || '';

        // Load involved employees list
        const employees = JSON.parse(localStorage.getItem('involvedEmployees')) || [];
        const employeeList = document.getElementById('employeeList');
        employeeList.innerHTML = ''; // Clear existing list
        employees.forEach(name => addEmployee(name));
    }

    // Add event listeners to save data
    document.querySelectorAll('input, textarea').forEach(input => input.addEventListener('input', saveData));

    // Load data on page load
    window.onload = loadData;

    // Employee list management
    const employeeList = document.getElementById('employeeList');
    const addEmployeeBtn = document.getElementById('addEmployee');
    const removeEmployeeBtn = document.getElementById('removeEmployee');

    function addEmployee(name = '') {
        const div = document.createElement('div');
        div.classList.add('employee-entry');
        const input = document.createElement('input');
        input.type = 'text';
        input.classList.add('employee-input');
        input.placeholder = 'Enter employee name';
        input.value = name;
        input.addEventListener('input', saveData);
        div.appendChild(input);
        employeeList.appendChild(div);
    }

    function removeEmployee() {
        if (employeeList.lastChild) {
            employeeList.removeChild(employeeList.lastChild);
            saveData();
        }
    }

    addEmployeeBtn.addEventListener('click', () => addEmployee());
    removeEmployeeBtn.addEventListener('click', removeEmployee);

    // Form submission - Generate BBCode
    document.getElementById('uofForm').addEventListener('submit', function (event) {
        event.preventDefault();

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
        const evidence = document.getElementById('evidence').value;
        const supervisor = document.getElementById('supervisor').value;

        // Gather employee names
        let employees = [];
        document.querySelectorAll('.employee-input').forEach(input => employees.push(`[LIST] ${input.value} [/LIST]`));
        let employeeBBCode = employees.length ? employees.join('\n') : '[LIST] N/A [/LIST]';

        const bbcodeTemplate = `
[divbox2=white][center][img]https://i.ibb.co/60wDx20/UOF.png[/img][/center][hr][/hr]
[divbox=#083a6b][b][color=#FFFFFF]1. REPORT INFORMATION[/color][/b][/divbox]
[divbox=white]
[b]REPORTING EMPLOYEE:[/b] ${reportingEmployee}
[b]DATE AND TIME OF INCIDENT:[/b] ${incidentDateTime}
[b]LOCATION OF INCIDENT:[/b] ${incidentLocation}
[b]TYPE OF UOF:[/b] ${uofType}
[b]SERVICE FIREARM SUBMITTED TO ARMORY:[/b] ${firearmSubmission}
[/divbox][hr][/hr]
[divbox=white][b]NARRATIVE:[/b]
[LIST] ${narrative} [/LIST][/divbox]
[hr][/hr]
[divbox=#083a6b][b][color=#FFFFFF]2. INVOLVED SUBJECTS[/color][/b][/divbox]
[divbox=white][b]SUBJECT NAME:[/b] ${subjectName}
[b]MDC RECORD:[/b] [url=${mdcRecord}]ACCESS[/url]
[b]STATUS:[/b] ${subjectStatus}
[b]NOTES:[/b] ${subjectNotes}
[hr][/hr]
[b]Involved Employee(s):[/b]
${employeeBBCode}
[b]Supervisor:[/b]
[LIST] ${supervisor} [/LIST]
[/divbox][hr][/hr]
[divbox=#083a6b][b][color=#FFFFFF]3. EVIDENCE (if applicable)[/color][/b] ${evidence} [/divbox]
[spoiler][/spoiler]
[/divbox2]`;

        document.getElementById('bbcodeText').textContent = bbcodeTemplate;
    });
});