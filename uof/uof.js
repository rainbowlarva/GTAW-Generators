// Function to auto-resize textarea as user types
function autoResizeTextarea(event) {
    const textarea = event.target;
    // Reset height to auto to shrink when content is deleted
    textarea.style.height = 'auto';
    // Set the height to the scrollHeight of the textarea to expand as needed
    textarea.style.height = textarea.scrollHeight + 'px';
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('uofForm');
    const bbcodeText = document.getElementById('bbcodeText');
    const addEmployeeButton = document.getElementById('addEmployee');
    const removeEmployeeButton = document.getElementById('removeEmployee');
    const employeeInputs = document.getElementById('employeeInputs');

    // Save data to localStorage when user types in the fields
    function saveData() {
        localStorage.setItem('reportingEmployee', document.getElementById('reportingEmployee').value);
        localStorage.setItem('incidentDateTime', document.getElementById('incidentDateTime').value);
        localStorage.setItem('incidentLocation', document.getElementById('incidentLocation').value);
        localStorage.setItem('typeOfUOF', document.getElementById('typeOfUOF').value);
        localStorage.setItem('firearmSubmitted', document.getElementById('firearmSubmitted').value);
        localStorage.setItem('narrative', document.getElementById('narrative').value);
        localStorage.setItem('evidence', document.getElementById('evidence').value);
        localStorage.setItem('supervisor', document.getElementById('supervisor').value); // Save supervisor

        // Save involved employees to localStorage
        const involvedEmployees = Array.from(document.getElementsByClassName('employeeField'))
            .map(input => input.value)
            .filter(value => value.trim() !== ''); // Filter out empty inputs
        localStorage.setItem('involvedEmployees', JSON.stringify(involvedEmployees));
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
        document.getElementById('supervisor').value = localStorage.getItem('supervisor') || ''; // Load supervisor

        // Load involved employees from localStorage
        const savedEmployees = JSON.parse(localStorage.getItem('involvedEmployees')) || [];
        savedEmployees.forEach(employee => {
            const newEmployeeInput = document.createElement('div');
            newEmployeeInput.classList.add('employeeInput');
            newEmployeeInput.innerHTML = `
                <input type="text" class="employeeField" name="involvedEmployee[]" value="${employee}" placeholder="Involved Employee">
            `;
            employeeInputs.appendChild(newEmployeeInput);
        });
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
        localStorage.removeItem('supervisor');
        localStorage.removeItem('involvedEmployees');

        // Reset the input fields
        document.getElementById('reportingEmployee').value = '';
        document.getElementById('incidentDateTime').value = '';
        document.getElementById('incidentLocation').value = '';
        document.getElementById('typeOfUOF').value = '';
        document.getElementById('firearmSubmitted').value = '';
        document.getElementById('narrative').value = '';
        document.getElementById('evidence').value = '';
        document.getElementById('supervisor').value = ''; // Reset supervisor field
    }

    // Add event listeners to save data when user types in the fields
    document.getElementById('reportingEmployee').addEventListener('input', saveData);
    document.getElementById('incidentDateTime').addEventListener('input', saveData);
    document.getElementById('incidentLocation').addEventListener('input', saveData);
    document.getElementById('typeOfUOF').addEventListener('input', saveData);
    document.getElementById('firearmSubmitted').addEventListener('input', saveData);
    document.getElementById('narrative').addEventListener('input', saveData);
    document.getElementById('evidence').addEventListener('input', saveData);
    document.getElementById('supervisor').addEventListener('input', saveData); // Add event listener for supervisor

    // Add event listener to add new employee input field
    addEmployeeButton.addEventListener('click', function() {
        const newEmployeeInput = document.createElement('div');
        newEmployeeInput.classList.add('employeeInput');
        newEmployeeInput.innerHTML = `
            <input type="text" class="employeeField" name="involvedEmployee[]" placeholder="Involved Employee">
        `;
        employeeInputs.appendChild(newEmployeeInput);
    });

    // Add event listener to remove the last employee input field
    removeEmployeeButton.addEventListener('click', function() {
        const lastEmployeeInput = employeeInputs.lastElementChild;
        if (lastEmployeeInput) {
            employeeInputs.removeChild(lastEmployeeInput);
        }
    });

    // Generate BBCode when the form is submitted
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form input values
        const reportingEmployee = document.getElementById('reportingEmployee').value;
        const incidentDateTime = document.getElementById('incidentDateTime').value;
        const incidentLocation = document.getElementById('incidentLocation').value;
        const typeOfUOF = document.getElementById('typeOfUOF').value;
        const firearmSubmitted = document.getElementById('firearmSubmitted').value;
        const narrative = document.getElementById('narrative').value;
        const evidence = document.getElementById('evidence').value;
        const supervisor = document.getElementById('supervisor').value; // Get supervisor value

        // Get involved employees
        const involvedEmployees = Array.from(document.getElementsByClassName('employeeField'))
            .map(input => input.value)
            .filter(value => value.trim() !== ''); // Filter out empty inputs

        // Create the BBCode template
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

        involvedEmployees.forEach(employee => {
            bbcodeTemplate += `[*] ${employee}\n`;
        });

        bbcodeTemplate += `
[/LIST]
[b]Supervisor:[/b]
[LIST] ${supervisor} [/LIST]
[/divbox]
[hr][/hr]
[divbox=#083a6b][b][color=#FFFFFF]3. EVIDENCE (if applicable)[/color][/b] NAMEHERE [/divbox]
[spoiler][/spoiler]
[/divbox2]`;

        // Display the generated BBCode in a larger textarea
        bbcodeText.value = bbcodeTemplate;

        // Automatically highlight the text for easy copying
        bbcodeText.select();
        document.execCommand('copy');

        // Save the form data after generating BBCode
        saveData();
    });

    // Load saved data when the page loads
    window.onload = loadData;
});
