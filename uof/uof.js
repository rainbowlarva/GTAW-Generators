document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('uofForm');
    const bbcodeText = document.getElementById('bbcodeText');
    const addEmployeeButton = document.getElementById('addEmployee');
    const employeeInputs = document.getElementById('employeeInputs');

    // Function to add a new employee input field
    addEmployeeButton.addEventListener('click', function() {
        const newEmployeeInput = document.createElement('div');
        newEmployeeInput.classList.add('employeeInput');
        newEmployeeInput.innerHTML = `
            <input type="text" class="employeeField" name="involvedEmployee[]" placeholder="Involved Employee">
        `;
        employeeInputs.appendChild(newEmployeeInput);
    });

    // Function to generate BBCode
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

        // Display the generated BBCode
        bbcodeText.value = bbcodeTemplate;
    });
});