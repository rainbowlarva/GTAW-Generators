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
    localStorage.setItem('fullName', document.getElementById('fullName').value);
    localStorage.setItem('rank', document.getElementById('rank').value);
    localStorage.setItem('badgeNumber', document.getElementById('badgeNumber').value);
    localStorage.setItem('callsign', document.getElementById('callsign').value);
    localStorage.setItem('timeDate', document.getElementById('timeDate').value);
    localStorage.setItem('street', document.getElementById('street').value);
    localStorage.setItem('area', document.getElementById('area').value);
    localStorage.setItem('casings', document.getElementById('casings').value);
    localStorage.setItem('narrative', document.getElementById('narrative').value);
    localStorage.setItem('evidence', document.getElementById('evidence').value);
}

// Load data from localStorage when the page loads
function loadData() {
    document.getElementById('fullName').value = localStorage.getItem('fullName') || '';
    document.getElementById('rank').value = localStorage.getItem('rank') || '';
    document.getElementById('badgeNumber').value = localStorage.getItem('badgeNumber') || '';
    document.getElementById('callsign').value = localStorage.getItem('callsign') || '';
    document.getElementById('timeDate').value = localStorage.getItem('timeDate') || '';
    document.getElementById('street').value = localStorage.getItem('street') || '';
    document.getElementById('area').value = localStorage.getItem('area') || '';
    document.getElementById('casings').value = localStorage.getItem('casings') || '';
    document.getElementById('narrative').value = localStorage.getItem('narrative') || '';
    document.getElementById('evidence').value = localStorage.getItem('evidence') || '';
}

// Clear data from localStorage and reset textareas/inputs
function clearData() {
    localStorage.removeItem('fullName');
    localStorage.removeItem('rank');
    localStorage.removeItem('badgeNumber');
    localStorage.removeItem('callsign');
    localStorage.removeItem('timeDate');
    localStorage.removeItem('street');
    localStorage.removeItem('area');
    localStorage.removeItem('casings');
    localStorage.removeItem('narrative');
    localStorage.removeItem('evidence');

    // Reset the input fields
    document.getElementById('fullName').value = '';
    document.getElementById('rank').value = '';
    document.getElementById('badgeNumber').value = '';
    document.getElementById('callsign').value = '';
    document.getElementById('timeDate').value = '';
    document.getElementById('street').value = '';
    document.getElementById('area').value = '';
    document.getElementById('casings').value = '';
    document.getElementById('narrative').value = '';
    document.getElementById('evidence').value = '';
    
    // Also clear the displayed BBCode text, if any
    const bbcodeText = document.getElementById('bbcodeText');
    if (bbcodeText) {
        bbcodeText.textContent = '';
    }
}

// Add event listeners to save data when user types in the fields
document.getElementById('fullName').addEventListener('input', saveData);
document.getElementById('rank').addEventListener('input', saveData);
document.getElementById('badgeNumber').addEventListener('input', saveData);
document.getElementById('callsign').addEventListener('input', saveData);
document.getElementById('timeDate').addEventListener('input', saveData);
document.getElementById('street').addEventListener('input', saveData);
document.getElementById('area').addEventListener('input', saveData);
document.getElementById('casings').addEventListener('input', saveData);
document.getElementById('narrative').addEventListener('input', saveData);
document.getElementById('evidence').addEventListener('input', saveData);

// Load the data when the page loads
window.onload = loadData;

document.addEventListener('DOMContentLoaded', function() {
    // Get the form, output elements, and the clear button
    const form = document.getElementById('ccrForm');
    const bbcodeText = document.getElementById('bbcodeText');
    const clearButton = document.getElementById('clearButton');

    // Add event listener for form submission (Generate BBCode)
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get the form input values
        const fullName = document.getElementById('fullName').value;
        const rank = document.getElementById('rank').value;
        const badgeNumber = document.getElementById('badgeNumber').value;
        const callsign = document.getElementById('callsign').value;
        const timeDate = document.getElementById('timeDate').value;
        const street = document.getElementById('street').value;
        const area = document.getElementById('area').value;
        const casings = document.getElementById('casings').value;
        const narrative = document.getElementById('narrative').value;
        const evidence = document.getElementById('evidence').value;

        // Define the BBCode template
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
[b]CRIME COMPLAINT REPORT #XXX[/b]

[b]PERSONNEL INFORMATION[/b]
Full name(s): ${fullName}
Departmental rank(s): ${rank}
Badge number(s): ${badgeNumber}
Duty callsign: ${callsign}

[hr][/hr]

[b]TIME AND LOCATION[/b]
Time and date: ${timeDate}
Street: ${street}
Area: ${area}
IF CASINGS COLLECTED ADD LABEL HERE: ${casings}

[hr][/hr]

[b]NARRATIVE[/b]
${narrative}

[hr][/hr]

[b]EVIDENCE[/b]
${evidence}
[/divbox2]
`;

        // Display the generated BBCode in the output area
        bbcodeText.textContent = bbcodeTemplate;

        // Select the generated BBCode for easy copying
        const range = document.createRange();
        range.selectNodeContents(bbcodeText);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    });

    // Attach the clear button event
    if (clearButton) {
        clearButton.addEventListener('click', clearData);
    }
});