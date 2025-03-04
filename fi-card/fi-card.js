document.addEventListener('DOMContentLoaded', function() {
    // Auto-resize textareas
    function autoResizeTextarea(event) {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }
    document.getElementById('additionalInfo').addEventListener('input', autoResizeTextarea);

    // Save and Load Data using LocalStorage
    function saveData() {
        const fields = document.querySelectorAll('input, textarea');
        fields.forEach(field => {
            localStorage.setItem(field.id, field.value);
        });
    }
    
    function loadData() {
        const fields = document.querySelectorAll('input, textarea');
        fields.forEach(field => {
            field.value = localStorage.getItem(field.id) || '';
        });
    }

    function clearData() {
        localStorage.clear();
        document.querySelectorAll('input, textarea').forEach(field => field.value = '');
    }

    document.querySelectorAll('input, textarea').forEach(field => field.addEventListener('input', saveData));
    window.onload = loadData;

    // Dynamic Subject Addition
    document.getElementById('addSubject').addEventListener('click', function() {
        const container = document.getElementById('subjectContainer');
        const subjectDiv = document.createElement('div');
        subjectDiv.innerHTML = `
            <input type="text" placeholder="Subject Name" class="subjectName">
            <input type="text" placeholder="D.O.B" class="subjectDOB">
            <input type="text" placeholder="Sex (M/F/O)" class="subjectSex">
            <input type="text" placeholder="Gang / Moniker" class="subjectGang">
            <button type="button" class="removeSubject">Remove</button>
        `;
        container.appendChild(subjectDiv);

        subjectDiv.querySelector('.removeSubject').addEventListener('click', function() {
            container.removeChild(subjectDiv);
        });
    });

    // BBCode Generation
    document.getElementById('fiCardForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const values = {};
        document.querySelectorAll('input, textarea').forEach(field => {
            values[field.id] = field.value || 'NAMEHERE';
        });
        
        // Collect checked checkboxes and convert [cb] to [cbc] when checked
        const checkedBoxes = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
            .map(cb => cb.value.replace('[cb]', '[cbc]'))
            .join('\n');
        
        // Collect dynamically added subjects
        const subjects = Array.from(document.querySelectorAll('#subjectContainer div')).map(subject => {
            return `${subject.querySelector('.subjectName').value || 'NAMEHERE'}, ${subject.querySelector('.subjectDOB').value || 'NAMEHERE'}, ${subject.querySelector('.subjectSex').value || 'NAMEHERE'}, ${subject.querySelector('.subjectGang').value || 'NAMEHERE'}`;
        }).join('\n');

        // BBCode Output based on provided format
        const bbcodeTemplate = `
[font=Arial][center]LOS SANTOS POLICE DEPARTMENT
[size=120][color=black][b]FIELD INTERVIEW CARD (FRONT)[/b][/font][/color][/size][/center]

[table2=1,black,transparent,Arial]
[tr]
[tdwidth=1,black,transparent,top,left,30,5]
[size=87]NAME (FIRST, MIDDLE, LAST)[/size]
${values.name}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,13,5]
[size=87]PHONE[/size]
${values.phone}
[/tdwidth]

[tdwidth=1,black,transparent,top,left,8,5]
[size=87]SEX (M/F/O)[/size]
${values.sex}
[/tdwidth]

[tdwidth=1,black,transparent,top,left,8,5]
[size=87]HAIR[/size]
${values.hair}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,8,5]
[size=87]EYES[/size]
${values.eyes}
[/tdwidth][/tr]
[/table2]

[b]SUBJECT INFO:[/b]
${checkedBoxes}

[table2=1,black,transparent,Arial]
[tr]
[tdwidth=1,black,transparent,top,left,8,5]
[size=87]VEH. MAKE[/size]
${values.vehMake}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,8,5]
[size=87]VEH. MODEL[/size]
${values.vehModel}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,8,5]
[size=87]TYPE[/size]
${values.vehType}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,8,5]
[size=87]COLOR[/size]
${values.vehColor}
[/tdwidth]
[/tr]
[/table2]

[b]SUBJECTS WITH INDIVIDUAL:[/b]
${subjects}

[table2=1,black,transparent,Arial]
[tr]
[tdwidth=1,black,transparent,top,left,30,5]
[size=87]ADDITIONAL INFO / NARRATIVE / INFORMATION[/size]
${values.additionalInfo}
[/tdwidth]
[/tr]
[/table2]

[table2=1,black,transparent,Arial]
[tr]
[tdwidth=1,black,transparent,top,left,16,5]
[size=87]OFFICER[/size]
${values.officer}
[/tdwidth]

[tdwidth=1,black,transparent,top,left,8,5]
[size=87]SERIAL NO.[/size]
${values.serialNo}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,16,5]
[size=87]CALLSIGN[/size]
${values.callsign}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,8,5]
[size=87]INCIDENT NO.[/size]
${values.incidentNo}
[/tdwidth]
[/tr]
[/table2]

[/font]`;
        
        document.getElementById('bbcodeText').textContent = bbcodeTemplate;
    });
});