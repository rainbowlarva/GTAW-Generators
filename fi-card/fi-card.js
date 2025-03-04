document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('ficardForm');
    const bbcodeText = document.getElementById('bbcodeText');

    // Auto-resize textareas
    function autoResizeTextarea(event) {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.addEventListener('input', autoResizeTextarea);
    });

    // Save data to localStorage
    function saveData() {
        document.querySelectorAll('input, textarea').forEach(input => {
            localStorage.setItem(input.id, input.value);
        });

        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            localStorage.setItem(checkbox.id, checkbox.checked);
        });
    }

    // Load saved data
    function loadData() {
        document.querySelectorAll('input, textarea').forEach(input => {
            input.value = localStorage.getItem(input.id) || '';
        });

        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = localStorage.getItem(checkbox.id) === 'true';
        });
    }

    // Clear all saved data
    function clearData() {
        localStorage.clear();
        document.querySelectorAll('input, textarea').forEach(input => input.value = '');
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    }

    // Add event listeners for saving data
    document.querySelectorAll('input, textarea').forEach(input => input.addEventListener('input', saveData));
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.addEventListener('change', saveData));

    // Load saved data when page loads
    window.onload = loadData;

    // Form submission - Generate BBCode
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const fullName = document.getElementById('fullName').value;
        const phone = document.getElementById('phone').value;
        const sex = document.getElementById('sex').value;
        const hair = document.getElementById('hair').value;
        const eyes = document.getElementById('eyes').value;
        const residence = document.getElementById('residence').value;
        const birthdate = document.getElementById('birthdate').value;
        const descent = document.getElementById('descent').value;
        const height = document.getElementById('height').value;
        const additionalInfo = document.getElementById('additionalInfo').value;

        // Collect all checked checkboxes
        let checkedBoxes = [];
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            if (cb.checked) {
                checkedBoxes.push(`[cb] ${cb.parentNode.textContent.trim()}`);
            }
        });

        // Generate BBCode
        const bbcodeTemplate = `
[font=Arial][center]LOS SANTOS POLICE DEPARTMENT
[size=120][color=black][b]FIELD INTERVIEW CARD (FRONT)[/b][/font][/color][/size][/center]

[table2=1,black,transparent,Arial]
[tr]
[tdwidth=1,black,transparent,top,left,30,5]
[size=87]NAME (FIRST, MIDDLE, LAST)[/size]
${fullName}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,13,5]
[size=87]PHONE[/size]
${phone}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,8,5]
[size=87]SEX (M/F/O)[/size]
${sex}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,8,5]
[size=87]HAIR[/size]
${hair}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,8,5]
[size=87]EYES[/size]
${eyes}
[/tdwidth]
[/tr]
[/table2]

[table2=1,black,transparent,Arial]
[tr]
[tdwidth=1,black,transparent,top,left,35,5]
[size=87]RESIDENCE[/size]
${residence}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,8,5]
[size=87]BIRTHDATE[/size]
${birthdate}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,8,5]
[size=87]DESCENT[/size]
${descent}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,8,5]
[size=87]HEIGHT[/size]
${height}
[/tdwidth]
[/tr]
[/table2]

[table2=1,black,transparent,Arial]
[tr]
[tdwidth=1,black,transparent,top,left,30,5]
[size=87]Additional Information / Narrative[/size]
${additionalInfo}
[/tdwidth]
[/tr]
[/table2]

[table2=1,black,transparent,Arial]
[tr]
[tdwidth=1,black,transparent,top,left,30,5]
[size=87]SUBJECT INFO[/size]
[/tdwidth]
[tdwidth=1,black,transparent,top,left,30,5]
${checkedBoxes.join('\n')}
[/tdwidth]
[/tr]
[/table2]
`;

        // Display the generated BBCode in the output area
        bbcodeText.textContent = bbcodeTemplate;

        // Automatically highlight text for copying
        const range = document.createRange();
        range.selectNodeContents(bbcodeText);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    });
});