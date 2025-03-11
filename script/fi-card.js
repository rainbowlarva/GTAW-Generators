// Wait for DOM to load before attaching event listeners
document.addEventListener('DOMContentLoaded', function () {
  // Select the Clear button
  const clearButton = document.getElementById('clearButton');

  // Function to clear all form fields and LocalStorage
  function clearData() {
      localStorage.clear(); // Clears all saved data
      document.querySelectorAll('input, textarea').forEach(input => input.value = ''); // Clears all text fields
  }

  // Attach the clearData function to the button
  if (clearButton) {
      clearButton.addEventListener('click', clearData);
  }
});

// Wait for DOM to load before attaching event listeners and restoring saved data
document.addEventListener("DOMContentLoaded", function() {
    const totalFields = 39;
    const totalCheckboxes = 31;
  
    // Restore saved field values and attach input listeners for auto-saving
    for (let i = 1; i <= totalFields; i++) {
      const field = document.getElementById("field" + i);
      if (field) {
        const saved = localStorage.getItem("field" + i);
        if (saved !== null) {
          field.value = saved;
        }
        field.addEventListener("input", function() {
          localStorage.setItem("field" + i, field.value);
        });
      }
    }
    
    // Restore saved checkbox states and attach change listeners
    for (let i = 1; i <= totalCheckboxes; i++) {
      const cb = document.getElementById("cb" + i);
      if (cb) {
        const saved = localStorage.getItem("cb" + i);
        if (saved !== null) {
          cb.checked = saved === "true";
        }
        cb.addEventListener("change", function() {
          localStorage.setItem("cb" + i, cb.checked);
        });
      }
    }
    
    // Auto-expand textareas based on content
    document.querySelectorAll("textarea").forEach(function(textarea) {
      const autoResize = function() {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
      };
      textarea.addEventListener("input", autoResize);
      autoResize.call(textarea);
    });
  });
  
  // Generate the BBCode based on the exact provided template
  function generateBBCode() {
    // The template is an exact copy of fi-card.txt with no changes.
    let template = `[font=Arial][center]LOS SANTOS POLICE DEPARTMENT
  [size=120][color=black][b]FIELD INTERVIEW CARD (FRONT)[/b][/font][/color][/size][/center]
  
  [table2=1,black,transparent,Arial]
  [tr]
  [tdwidth=1,black,transparent,top,left,30,5]
  [size=87]NAME (FIRST, MIDDLE, LAST)[/size]
  NAMEHERE
  [/tdwidth]
  [tdwidth=1,black,transparent,top,left,13,5]
  [size=87]PHONE[/size]
  NAMEHERE
  [/tdwidth]
  
  [tdwidth=1,black,transparent,top,left,8,5]
  [size=87]SEX (M/F/O)[/size]
  NAMEHERE
  [/tdwidth]
  
  [tdwidth=1,black,transparent,top,left,8,5]
  [size=87]HAIR[/size]
  NAMEHERE
  [/tdwidth]
  [tdwidth=1,black,transparent,top,left,8,5]
  [size=87]EYES[/size]
  NAMEHERE
  [/tdwidth][/tr]
  [/table2]
  [table2=1,black,transparent,Arial]
  [tr]
  [tdwidth=1,black,transparent,top,left,35,5]
  [size=87]RESIDENCE[/size]
  NAMEHERE
  [/tdwidth]
  
  [tdwidth=1,black,transparent,top,left,8,5]
  [size=87]BIRTHDATE[/size]
  NAMEHERE
  [/tdwidth]
  
  [tdwidth=1,black,transparent,top,left,8,5]
  [size=87]DESCENT[/size]
  NAMEHERE
  [/tdwidth]
  
  [tdwidth=1,black,transparent,top,left,8,5]
  [size=87]HEIGHT[/size]
  NAMEHERE
  [/tdwidth][/tr]
  
  
  [/table2]
  [table2=1,black,transparent,Arial]
  [tr]
  [tdwidth=1,black,transparent,top,left,30,5]
  [size=87]CLOTHING[/size]
  NAMEHERE
  [/tdwidth]
  [tdwidth=1,black,transparent,top,left,30,5]
  [size=87]PERSONAL ODDITIES[/size]
  NAMEHERE
  [/tdwidth]
  [/tr]
  
  
  [/table2]
  [table2=1,black,transparent,Arial]
  [tr]
  [tdwidth=1,black,transparent,top,left,30,5]
  [size=87]MONIKER / ALIAS[/size]
  NAMEHERE
  [/tdwidth]
  [tdwidth=1,black,transparent,top,left,30,5]
  [size=87]GANG / CLUB[/size]
  NAMEHERE
  [/tdwidth]
  [/tr]
  
  
  [/table2]
  [table2=1,black,transparent,Arial]
  [tr]
  [tdwidth=0,black,transparent,top,left,2,5]
  [size=87][b]SUBJ
  INFO[/b][/size]
  
  [/tdwidth]
  [tdwidth=1,transparent,transparent,top,left,5,5]
  [size=87][cb]LOITERER
  [cb]PROWLER[/size]
  
  [/tdwidth]
  [tdwidth=1,transparent,transparent,top,left,6,5]
  [size=87][cb]HOMELESS
  [cb]WITNESS[/size]
  
  [/tdwidth]
  [tdwidth=1,transparent,transparent,top,left,7,5]
  [size=87][cb]GANG ACTIVITY
  [cb]HAS RECORD[/size]
  
  [/tdwidth]
  [tdwidth=1,transparent,transparent,top,left,8,5]
  [size=87][cb]ON PAROLE
  [cb]ON PROBATION[/size]
  
  [/tdwidth]
  [tdwidth=0,black,transparent,top,left,8,5]
  [size=87][cb]DRIVER
  [cb]PASSENGER
  [/size]
  [/tr]
  
  
  [/table2]
  [table2=1,black,transparent,Arial]
  [tr]
  [tdwidth=1,black,transparent,top,left,8,5]
  [size=87]VEH. MAKE[/size]
  NAMEHERE
  [/tdwidth]
  [tdwidth=1,black,transparent,top,left,8,5]
  [size=87]VEH. MODEL[/size]
  NAMEHERE
  [/tdwidth]
  [tdwidth=1,black,transparent,top,left,8,5]
  [size=87]TYPE[/size]
  NAMEHERE
  [/tdwidth]
  [tdwidth=1,black,transparent,top,left,8,5]
  [size=87]COLOR[/size]
  NAMEHERE
  [/tdwidth]
  [tdwidth=1,black,transparent,top,left,8,5]
  [size=87]VEH. LIC. NO.[/size]
  NAMEHERE
  [/tdwidth]
  [/tr]
  
  
  [/table2]
  [table2=1,black,transparent,Arial]
  [tr]
  [tdwidth=0,black,transparent,top,left,2,5]
  [size=87][b]VEH
  INFO[/b][/size]
  
  [/tdwidth]
  [tdwidth=1,transparent,transparent,top,left,8,5]
  [size=87][cb]BUCKET SEAT
  [cb]DAMAGED INSIDE[/size]
  
  [/tdwidth]
  [tdwidth=1,transparent,transparent,top,left,8,5]
  [size=87][cb]CUSTOM WHEELS
  [cb]PAINTED MURAL[/size]
  
  [/tdwidth]
  [tdwidth=1,transparent,transparent,top,left,8,5]
  [size=87][cb]LEVEL ALTER
  [cb]RUST / PRIMER[/size]
  
  [/tdwidth]
  [tdwidth=1,black,transparent,top,left,8,5]
  [size=87][cb]CUSTOM PAINT
  [cb]VINYL TOP[/size]
  
  [/tdwidth]
  [/tr]
  
  
  [/table2]
  [table2=1,black,transparent,Arial]
  [tr]
  [tdwidth=0,black,transparent,top,left,2,5]
  [size=87][b]BODY[/b][/size]
  
  [/tdwidth]
  [tdwidth=1,transparent,transparent,top,left,4,5]
  [size=87][cb]DAMAGE
  [cb]MODIFIED[/size]
  [/tdwidth]
  [tdwidth=1,transparent,transparent,top,left,3,5]
  [size=87][cb]STICKER
  [/size]
  [/tdwidth]
  [tdwidth=1,transparent,transparent,top,left,3,5]
  [size=87][cb]LEFT
  [cb]RIGHT[/size]
  [/tdwidth]
  [tdwidth=1,black,transparent,top,left,3,5]
  [size=87][cb]FRONT
  [cb]REAR[/size]
  [/tdwidth]
  [tdwidth=0,black,transparent,top,left,2,5]
  [size=87][b]WINDOW[/b][/size]
  [/tdwidth]
  [tdwidth=1,transparent,transparent,top,left,4,5]
  [size=87][cb]DAMAGE
  [cb]TINT[/size]
  [/tdwidth]
  [tdwidth=1,transparent,transparent,top,left,3,5]
  [size=87][cb]LEFT
  [cb]RIGHT[/size]
  [/tdwidth]
  [tdwidth=1,black,transparent,top,left,3,5]
  [size=87][cb]FRONT
  [cb]REAR[/size]
  [/tdwidth]
  [/tr]
  [/table2]
  
  
  [font=Arial][center]LOS SANTOS POLICE DEPARTMENT
  [size=120][color=black][b]FIELD INTERVIEW CARD (BACK)[/b][/font][/color][/size][/center]
  [table2=1,black,transparent,Arial]
  [tr]
  [tdwidth=1,black,transparent,top,left,30,5]
  [size=87][b]PERSONS WITH SUBJECT[/b][/size]
  [/tdwidth]
  [/tr]
  [/table2]
  [table2=1,black,transparent,Arial]
  [tr]
  [tdwidth=1,black,transparent,top,left,30,5]
  [size=87]NAME (FIRST, MIDDLE, LAST)[/size]
  NAMEHERE
  [/tdwidth]
  [tdwidth=1,black,transparent,top,left,13,5]
  [size=87]D.O.B[/size]
  NAMEHERE
  [/tdwidth]
  
  [tdwidth=1,black,transparent,top,left,8,5]
  [size=87]SEX (M/F/O)[/size]
  NAMEHERE
  [/tdwidth]
  
  [tdwidth=1,black,transparent,top,left,15,5]
  [size=87]GANG / MONIKER[/size]
  NAMEHERE
  [/tdwidth]
  [/tr]
  [/table2]
  [table2=1,black,transparent,Arial]
  [tr]
  [tdwidth=1,black,transparent,top,left,30,5]
  [size=87]NAME (FIRST, MIDDLE, LAST)[/size]
  NAMEHERE
  [/tdwidth]
  [tdwidth=1,black,transparent,top,left,13,5]
  [size=87]D.O.B[/size]
  NAMEHERE
  [/tdwidth]
  
  [tdwidth=1,black,transparent,top,left,8,5]
  [size=87]SEX (M/F/O)[/size]
  NAMEHERE
  [/tdwidth]
  
  [tdwidth=1,black,transparent,top,left,15,5]
  [size=87]GANG / MONIKER[/size]
  NAMEHERE
  [/tdwidth]
  [/tr]
  [/table2]
  [table2=1,black,transparent,Arial]
  [tr]
  [tdwidth=1,black,transparent,top,left,30,5]
  [size=87]ADDITIONAL INFO / NARRATIVE / INFORMATION[/size]
  NAMEHERE
  [/tdwidth]
  [/tr]
  [/table2]
  [table2=1,black,transparent,Arial]
  [tr]
  [tdwidth=1,black,transparent,top,left,8,5]
  [size=87]DATE[/size]
  NAMEHERE
  [/tdwidth]
  
  [tdwidth=1,black,transparent,top,left,8,5]
  [size=87]TIME[/size]
  NAMEHERE
  [/tdwidth]
  
  [tdwidth=1,black,transparent,top,left,16,5]
  [size=87]LOCATION[/size]
  NAMEHERE
  [/tdwidth]
  [/tr]
  [/table2]
  [table2=1,black,transparent,Arial]
  [tr]
  [tdwidth=1,black,transparent,top,left,16,5]
  [size=87]OFFICER[/size]
  NAMEHERE
  [/tdwidth]
  
  [tdwidth=1,black,transparent,top,left,8,5]
  [size=87]SERIAL NO.[/size]
  NAMEHERE
  [/tdwidth]
  [tdwidth=1,black,transparent,top,left,16,5]
  [size=87]OFFICER[/size]
  NAMEHERE
  [/tdwidth]
  
  [tdwidth=1,black,transparent,top,left,8,5]
  [size=87]SERIAL NO.[/size]
  NAMEHERE
  [/tdwidth]
  [/tr]
  [/table2]
  [table2=1,black,transparent,Arial]
  [tr]
  [tdwidth=1,black,transparent,top,left,8,5]
  [size=87][b]CALLSIGN[/b][/size]
  NAMEHERE
  [/tdwidth]
  
  [tdwidth=1,black,transparent,top,left,16,5]
  [size=87][b]INCIDENT NO.[/b][/size]
  NAMEHERE
  [/tdwidth]
  [tdwidth=1,black,transparent,top,left,8,5]
  [size=87]DIVISION[/size]
  NAMEHERE
  [/tdwidth]
  
  [tdwidth=1,black,transparent,top,left,8,5]
  [size=87]DETAIL[/size]
  NAMEHERE
  [/tdwidth]
  
  [tdwidth=1,black,transparent,top,left,8,5]
  [size=87]SUPV. INIT..[/size]
  NAMEHERE
  [/tdwidth]
  [/tr]
  [/table2]`;
  
    let output = template;
  
    // Replace each occurrence of "NAMEHERE" sequentially with field values from field1 to field39
    for (let i = 1; i <= 39; i++) {
      const field = document.getElementById("field" + i);
      let value = field ? field.value : "";
      output = output.replace("NAMEHERE", value);
    }
  
    // Replace each occurrence of "[cb]" using a regex with a counter that checks the corresponding checkbox
    let cbCounter = 1;
    output = output.replace(/\[cb\]/g, function(match) {
      const checkbox = document.getElementById("cb" + cbCounter);
      const replacement = (checkbox && checkbox.checked) ? "[cbc]" : "[cb]";
      cbCounter++;
      return replacement;
    });
  
    // Set the generated BBCode into the output element.
    const outputElement = document.getElementById("bbcodeOutput");
    outputElement.textContent = output;
  
    // Automatically highlight (select) the generated content.
    if (window.getSelection) {
      const range = document.createRange();
      range.selectNodeContents(outputElement);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }  