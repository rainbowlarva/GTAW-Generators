// Function to auto-resize textarea as user types
function autoResizeTextarea(event) {
    const textarea = event.target;
    // Reset height to auto to shrink when content is deleted
    textarea.style.height = 'auto';
    // Set the height to the scrollHeight of the textarea to expand as needed
    textarea.style.height = textarea.scrollHeight + 'px';
}

// Attach the event listener to both the narrative and evidence textareas
document.getElementById('narrative').addEventListener('input', autoResizeTextarea);
document.getElementById('evidence').addEventListener('input', autoResizeTextarea);

// Save data to localStorage when user types in the fields
function saveData() {
    localStorage.setItem('reportingEmployee', document.getElementById('reportingEmployee').value);
    localStorage.setItem('incidentDateTime', document.getElementById('incidentDateTime').value);
    localStorage.setItem('incidentLocation', document.getElementById('incidentLocation').value);
    localStorage.setItem('typeOfUOF', document.getElementById('typeOfUOF').value);
    localStorage.setItem('firearmSubmitted', document.getElementById('firearmSubmitted').value);
    localStorage.setItem('narrative', document.getElementById('narrative').value);
    localStorage.setItem('evidence', document.getElementById('evidence').value);
}

// Load data from localStorage when the page loads
function loadData() {
    document.getElementById('reportingEmployee').value = localStorage.getItem('reportingEmployee') || '';
    document.getElementById('incidentDateTime').value = localStorage.getItem('incidentDateTime') || '';
    document.getElementById('incidentLocation').value = localStorage.getItem('incidentLocation') || '';
    document.getElementById('typeOfUOF').value = localStorage.getItem('typeOfUOF') || '';
    document.getElementById('firearmSubmitted').value = localStorage.getItem('firearmSubmitted') || '';
    document.getElementById('narrative').value = localStorage.getItem('narrative') || '';
    document.getElementById('evidence').value = localStorage.getItem('evidence') || '';
}

// Clear data from localStorage and reset textareas/inputs
function clearData() {
    localStorage.removeItem('reportingEmployee');
    localStorage.removeItem('incidentDateTime');
    localStorage.removeItem('incidentLocation');
    localStorage.removeItem('typeOfUOF');
    localStorage.removeItem('firearmSubmitted');
    localStorage.removeItem('narrative');
    localStorage.removeItem('evidence');

    // Reset the input fields
    document.getElementById('reportingEmployee').value = '';
    document.getElementById('incidentDateTime').value = '';
    document.getElementById('incidentLocation').value = '';
    document.getElementById('typeOfUOF').value = '';
    document.getElementById('firearmSubmitted').value = '';
    document.getElementById('narrative').value = '';
    document.getElementById('evidence').value = '';
}

// Add event listeners to save data when user types in the fields
document.getElementById('reportingEmployee').addEventListener('input', saveData);
document.getElementById('incidentDateTime').addEventListener('input', saveData);
document.getElementById('incidentLocation').addEventListener('input', saveData);
document.getElementById('typeOfUOF').addEventListener('input', saveData);
document.getElementById('firearmSubmitted').addEventListener('input', saveData);
document.getElementById('narrative').addEventListener('input', saveData);
document.getElementById('evidence').addEventListener('input', saveData);

// Load the data when the page loads
window.onload = loadData;

document.addEventListener('DOMContentLoaded', function() {
    // Get the form and output elements
    const form = document.getElementById('uofForm');
    const bbcodeText = document.getElementById('bbcodeText');

    // Add event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get the form input values
        const reportingEmployee = document.getElementById('reportingEmployee').value;
        const incidentDateTime = document.getElementById('incidentDateTime').value;
        const incidentLocation = document.getElementById('incidentLocation').value;
        const typeOfUOF = document.getElementById('typeOfUOF').value;
        const firearmSubmitted = document.getElementById('firearmSubmitted').value;
        const narrative = document.getElementById('narrative').value;
        const evidence = document.getElementById('evidence').value;

        // Get involved employees (if any)
        const involvedEmployees = Array.from(document.getElementsByClassName('employeeField'))
            .map(input => input.value)
            .filter(value => value.trim() !== ''); // Filter out empty inputs

        // Define the BBCode template
        let bbcodeTemplate = `
[divbox2=white][center][img]https://i.ibb.co/60wDx20/UOF.png[/img][/center][hr][/hr]
[divbox=#083a6b][b][color=#FFFFFF]1. REPORT INFORMATION[/color][/b][/divbox]
[divbox=white]
[b]REPORTING EMPLOYEE:[/b] ${reportingEmployee}
[b]DATE AND TIME OF INCIDENT:[/b] ${incidentDateTime}
[b]LOCATION OF INCIDENT:[/b] ${incidentLocation}
[b]TYPE OF UOF:[/b] ${typeOfUOF}
[b]SERVICE FIREARM SUBMITTED TO ARMORY:[/b] ${firearmSubmitted}
[/divbox][hr][/hr]
[divbox=white][b]NARRATIVE:[/b]
[LIST] ${narrative} [/LIST]
[/divbox]
[hr][/hr]
[divbox=#083a6b][b][color=#FFFFFF]2. INVOLVED SUBJECTS[/color][/b][/divbox]
[divbox=white][b]SUBJECT NAME:[/b] NAMEHERE
[b]MDC RECORD:[/b] [url= NAMEHERE]ACCESS[/url]
[b]STATUS:[/b] NAMEHERE
[b]NOTES:[/b] NAMEHERE
[hr][/hr]
[b]Involved Employee(s):[/b]
[LIST]`;

        // Loop through involved employees and add them to the BBCode
        involvedEmployees.forEach(employee => {
            bbcodeTemplate += `
[*] ${employee}
`;
        });

        bbcodeTemplate += `
[/LIST]
[b]Supervisor:[/b]
[LIST] NAMEHERE [/LIST]
[/divbox]
[hr][/hr]
[divbox=#083a6b][b][color=#FFFFFF]3. EVIDENCE (if applicable)[/color][/b] NAMEHERE [/divbox]
[spoiler][/spoiler]
[/divbox2]`;

        // Display the generated BBCode in the output area
        bbcodeText.textContent = bbcodeTemplate;

        // Select the generated BBCode for easy copying
        const range = document.createRange();
        range.selectNodeContents(bbcodeText);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    });
});
