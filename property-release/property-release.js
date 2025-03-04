// Wait for DOM to load before attaching event listeners and restoring saved data
document.addEventListener("DOMContentLoaded", function() {
    const totalFields = 18;
    
    // Restore saved field values and attach listeners for auto-saving
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
    
    // Auto-expand any textareas if present (for multiline input)
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
    // The BBCode template is an exact copy of property-release.txt.
    let template = `[font=Arial][center]LOS SANTOS POLICE DEPARTMENT
  [size=120][color=black][b]PROPERTY TRANSFER RECEIPT
  [/b][/font][/color][/size]
  [/center]
  
  [table2=1,black,transparent,Arial]
  [tr]
  [tdwidth=1,black,transparent,top,left,100,5]
  [size=87][b]RELEASE AUTHORIZATION BY[/b][/size]
  NAMEHERE
  [/tdwidth]
  [/tr][/table2]
  [table2=1,black,transparent,Arial]
  [tr]
  [tdwidth=1,black,transparent,top,left,25,5]
  [size=87][b]SERIAL NO[/b][/size]
  NAMEHERE
  [/tdwidth]
  
  [tdwidth=1,black,transparent,top,left,35,5]
  [size=87][b]DIVISION / ASSIGNMENT[/b][/size]
  NAMEHERE
  [/tdwidth]
  [/tr]
  [/table2]
  [table2=1,black,transparent,Arial]
  [tr]
  [tdwidth=1,black,transparent,top,left,30,5]
  [b][size=87]PERSON RECEIVING PROPERTY[/size][/b]
  NAMEHERE
  [/tdwidth]
  [/tr]
  [/table2]
  [table2=1,black,transparent,Arial]
  [tr]
  [tdwidth=1,black,transparent,top,left,30,5]
  [size=87][b]AGENCY (IF APPLICABLE)[/size][/b]
  NAMEHERE
  [/tdwidth]
  [tdwidth=1,black,transparent,top,left,30,5]
  [size=87][b]SERIAL NO.[/size][/b]
  NAMEHERE
  [/tdwidth][/tr]
  [/table2]
  [table2=1,black,transparent,Arial]
  [tr]
  [tdwidth=1,black,transparent,top,left,20,5]
  [b][size=87]DATE RELEASED[/size][/b]
  NAMEHERE
  [/tdwidth]
  
  [tdwidth=1,black,transparent,top,left,20,5]
  [b][size=87]REASON FOR TRANSFER[/size][/b]
  [size=60](EVIDENCE EXCHANGE / DESTRUCTION / HISTORIC INDEXING ETC.)[/size]
  [/tdwidth][/tr]
  [/table2]
  [table2=1,black,transparent,Arial]
  [tr][tdwidth=1,black,transparent,top,left,100,5]
  [center][b][size=90]IF COURT REQUIRES PROPERTY FROM EVIDENCE, PROVIDE THE FOLLOWING[/size][/b][/center]
  [/tdwidth][/tr][/table2]
  [table2=1,black,transparent,Arial]
  [tr]
  [tdwidth=1,black,transparent,top,left,37,5]
  [b][size=87]CASE OF PEOPLE VS.[/size][/b]
  NAMEHERE
  [/tdwidth]
  [tdwidth=1,black,transparent,top,left,30,5]
  [b][size=87]RECEIVED BY (COURT CLERK)[/size][/b]
  NAMEHERE
  [/tdwidth]
  [/tr]
  [/table2]
  [table2=1,black,transparent,Arial]
  [tr][tdwidth=1,black,transparent,top,left,100,5]
  [center][b][size=90]ITEMS TO TRANSFER[/size][/b][/center]
  [/tdwidth][/tr][/table2]
  [table2=1,black,transparent,Arial]
  [tr]
  [tdwidth=1,black,transparent,top,left,37,5]
  [b][size=87]EL NO.[/size][/b]
  NAMEHERE
  [/tdwidth]
  [tdwidth=1,black,transparent,top,left,30,5]
  [b][size=87]Description of Article[/size][/b]
  NAMEHERE
  [/tdwidth]
  [tdwidth=1,black,transparent,top,left,25,5]
  [b][size=87]Quantity[/size][/b]
  NAMEHERE
  [/tdwidth]
  [/tr]
  [/table2]
  [table2=1,black,transparent,Arial]
  [tr]
  [tdwidth=1,black,transparent,top,left,37,5]
  [b][size=87]EL NO.[/size][/b]
  NAMEHERE
  [/tdwidth]
  [tdwidth=1,black,transparent,top,left,30,5]
  [b][size=87]Description of Article[/size][/b]
  NAMEHERE
  [/tdwidth]
  [tdwidth=1,black,transparent,top,left,25,5]
  [b][size=87]Quantity[/size][/b]
  NAMEHERE
  [/tdwidth]
  [/tr]
  [/table2]
  [table2=1,black,transparent,Arial]
  [tr]
  [tdwidth=1,black,transparent,top,left,37,5]
  [b][size=87]EL NO.[/size][/b]
  NAMEHERE
  [/tdwidth]
  [tdwidth=1,black,transparent,top,left,30,5]
  [b][size=87]Description of Article[/size][/b]
  NAMEHERE
  [/tdwidth]
  [tdwidth=1,black,transparent,top,left,25,5]
  [b][size=87]Quantity[/size][/b]
  NAMEHERE
  [/tdwidth]
  [/tr]
  [/table2]`;
  
    let output = template;
    
    // Replace each "NAMEHERE" token sequentially with the values from field1 to field18
    for (let i = 1; i <= 18; i++) {
      const field = document.getElementById("field" + i);
      let value = field ? field.value : "";
      output = output.replace("NAMEHERE", value);
    }
    
    // Display the generated BBCode and automatically highlight it for copying
    const outputElement = document.getElementById("bbcodeOutput");
    outputElement.textContent = output;
    
    if (window.getSelection) {
      const range = document.createRange();
      range.selectNodeContents(outputElement);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }  