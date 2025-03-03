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
  

document.addEventListener('DOMContentLoaded', function() {
    // Get the form and output elements
    const form = document.getElementById('ccrForm');
    const bbcodeText = document.getElementById('bbcodeText');

    // Add event listener for form submission
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
    });
});
