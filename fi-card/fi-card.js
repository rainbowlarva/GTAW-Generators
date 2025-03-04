document.addEventListener('DOMContentLoaded', function () {
    function autoResizeTextarea(event) {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }
    document.getElementById('additionalInfo').addEventListener('input', autoResizeTextarea);

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

    document.querySelectorAll('input, textarea').forEach(field => field.addEventListener('input', saveData));
    window.onload = loadData;

    document.getElementById('addSubject').addEventListener('click', function () {
        const container = document.getElementById('subjectContainer');
        const subjectDiv = document.createElement('div');
        subjectDiv.innerHTML = `
            <input type="text" placeholder="Name" class="subjectName">
            <input type="text" placeholder="D.O.B" class="subjectDOB">
            <input type="text" placeholder="Sex (M/F/O)" class="subjectSex">
            <input type="text" placeholder="Gang / Moniker" class="subjectGang">
            <button type="button" class="removeSubject">Remove</button>
        `;
        container.appendChild(subjectDiv);

        subjectDiv.querySelector('.removeSubject').addEventListener('click', function () {
            container.removeChild(subjectDiv);
        });
    });

    document.getElementById('fiCardForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const values = {};
        document.querySelectorAll('input, textarea').forEach(field => {
            values[field.id] = field.value || 'NAMEHERE';
        });

        const checkedBoxes = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
            .map(cb => cb.outerHTML.replace('[cb]', '[cbc]'))
            .join('');

        const subjects = Array.from(document.querySelectorAll('#subjectContainer div')).map(subject => {
            return `[table2=1,black,transparent,Arial]
[tr]
[tdwidth=1,black,transparent,top,left,30,5]
[size=87]NAME (FIRST, MIDDLE, LAST)[/size]
${subject.querySelector('.subjectName').value || 'NAMEHERE'}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,13,5]
[size=87]D.O.B[/size]
${subject.querySelector('.subjectDOB').value || 'NAMEHERE'}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,8,5]
[size=87]SEX (M/F/O)[/size]
${subject.querySelector('.subjectSex').value || 'NAMEHERE'}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,15,5]
[size=87]GANG / MONIKER[/size]
${subject.querySelector('.subjectGang').value || 'NAMEHERE'}
[/tdwidth]
[/tr]
[/table2]`;
        }).join('');

        const bbcodeOutput = `[font=Arial][center]LOS SANTOS POLICE DEPARTMENT
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
[/tdwidth]
[/tr]
[/table2]

[table2=1,black,transparent,Arial]
[tr]
[tdwidth=1,black,transparent,top,left,35,5]
[size=87]RESIDENCE[/size]
${values.residence}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,8,5]
[size=87]BIRTHDATE[/size]
${values.birthdate}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,8,5]
[size=87]DESCENT[/size]
${values.descent}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,8,5]
[size=87]HEIGHT[/size]
${values.height}
[/tdwidth]
[/tr]
[/table2]

${checkedBoxes}

[table2=1,black,transparent,Arial]
[tr]
[tdwidth=1,black,transparent,top,left,30,5]
[size=87]ADDITIONAL INFO / NARRATIVE / INFORMATION[/size]
${values.additionalInfo}
[/tdwidth]
[/tr]
[/table2]

${subjects}

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

[table2=1,black,transparent,Arial]
[tr]
[tdwidth=1,black,transparent,top,left,8,5]
[size=87][b]CALLSIGN[/b][/size]
${values.callsign}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,16,5]
[size=87][b]INCIDENT NO.[/b][/size]
${values.incidentNo}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,8,5]
[size=87]DIVISION[/size]
${values.division}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,8,5]
[size=87]DETAIL[/size]
${values.detail}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,8,5]
[size=87]SUPV. INIT.[/size]
${values.supervisor}
[/tdwidth]
[/tr]
[/table2]

[/font]`;

        document.getElementById('bbcodeText').textContent = bbcodeOutput;
    });
});
