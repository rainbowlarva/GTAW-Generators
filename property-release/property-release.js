// Unique prefix for property release page fields
const prefix = "propertyRelease-";

document.addEventListener("DOMContentLoaded", function() {
  // We'll store data for the top fields (1..10) in localStorage
  const totalFixedFields = 10; 
  for (let i = 1; i <= totalFixedFields; i++) {
    const field = document.getElementById("field" + i);
    if (field) {
      const saved = localStorage.getItem(prefix + "field" + i);
      if (saved !== null) {
        field.value = saved;
      }
      field.addEventListener("input", function() {
        localStorage.setItem(prefix + "field" + i, field.value);
      });
    }
  }

  // Evidence items are dynamic. We'll store them in localStorage as an array of objects.
  const evidenceList = document.getElementById("evidenceList");
  const addEvidenceBtn = document.getElementById("addEvidence");
  const removeEvidenceBtn = document.getElementById("removeEvidence");

  // Load existing evidence from localStorage
  let evidenceArray = JSON.parse(localStorage.getItem(prefix + "evidenceArray")) || [];

  // Function to create a single evidence row with 3 inputs
  function createEvidenceRow(index, elNo = "", description = "", quantity = "") {
    // Create a container div
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("evidence-entry");

    // EL NO input
    const elInput = document.createElement("input");
    elInput.type = "text";
    elInput.placeholder = "EL NO.";
    elInput.value = elNo;
    elInput.addEventListener("input", saveData);
    rowDiv.appendChild(elInput);

    // Description input
    const descInput = document.createElement("input");
    descInput.type = "text";
    descInput.placeholder = "Description of Article";
    descInput.value = description;
    descInput.addEventListener("input", saveData);
    rowDiv.appendChild(descInput);

    // Quantity input
    const qtyInput = document.createElement("input");
    qtyInput.type = "text";
    qtyInput.placeholder = "Quantity";
    qtyInput.value = quantity;
    qtyInput.addEventListener("input", saveData);
    rowDiv.appendChild(qtyInput);

    return rowDiv;
  }

  // Render all evidence items from the evidenceArray
  function renderEvidence() {
    evidenceList.innerHTML = "";
    evidenceArray.forEach((item, idx) => {
      const row = createEvidenceRow(idx, item.elNo, item.desc, item.qty);
      evidenceList.appendChild(row);
    });
  }

  // Add a new blank evidence item
  function addEvidence() {
    evidenceArray.push({ elNo: "", desc: "", qty: "" });
    renderEvidence();
    saveData();
  }

  // Remove the last evidence item
  function removeEvidence() {
    if (evidenceArray.length > 0) {
      evidenceArray.pop();
      renderEvidence();
      saveData();
    }
  }

  // Save all data (fixed fields + dynamic evidence)
  function saveData() {
    // Save the top fixed fields
    for (let i = 1; i <= totalFixedFields; i++) {
      const field = document.getElementById("field" + i);
      if (field) {
        localStorage.setItem(prefix + "field" + i, field.value);
      }
    }
    // Save evidence items
    // We read from DOM -> evidenceArray
    const rows = document.querySelectorAll(".evidence-entry");
    evidenceArray = [];
    rows.forEach(row => {
      const inputs = row.querySelectorAll("input");
      evidenceArray.push({
        elNo: inputs[0].value,
        desc: inputs[1].value,
        qty:  inputs[2].value
      });
    });
    localStorage.setItem(prefix + "evidenceArray", JSON.stringify(evidenceArray));
  }

  // Attach button listeners
  addEvidenceBtn.addEventListener("click", addEvidence);
  removeEvidenceBtn.addEventListener("click", removeEvidence);

  // Initial render
  renderEvidence();

});

// Generate the BBCode
function generateBBCode() {
  /* We'll break the property-release.txt template into two parts:
     1) Everything up to the "ITEMS TO TRANSFER" heading
     2) The repeated [table2=1, black, transparent,Arial] block for each evidence item
     3) We omit the last repeated placeholders in the text file, since we handle indefinite items
  */

  // Part 1: everything up to "ITEMS TO TRANSFER"
  let templateTop = `[font=Arial][center]LOS SANTOS POLICE DEPARTMENT
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
NAMEHERE
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
[/tdwidth][/tr][/table2]`;

  // Part 2: the repeated block for each evidence item
  // We'll build it dynamically for each item
  // The text is basically:
  // [table2=1,black,transparent,Arial]
  // [tr]
  // [tdwidth=1,black,transparent,top,left,37,5]
  // [b][size=87]EL NO.[/size][/b]
  // elNo
  // [/tdwidth]
  // [tdwidth=1,black,transparent,top,left,30,5]
  // [b][size=87]Description of Article[/size][/b]
  // desc
  // [/tdwidth]
  // [tdwidth=1,black,transparent,top,left,25,5]
  // [b][size=87]Quantity[/size][/b]
  // qty
  // [/tdwidth]
  // [/tr]
  // [/table2]

  // We'll retrieve the top 10 fixed fields from the DOM
  let output = templateTop;
  for (let i = 1; i <= 8; i++) {
    const field = document.getElementById("field" + i);
    const value = field ? field.value : "";
    output = output.replace("NAMEHERE", value);
  }
  // fields 9 => case of people vs
  // field10 => court clerk
  for (let i = 9; i <= 10; i++) {
    const field = document.getElementById("field" + i);
    const value = field ? field.value : "";
    output = output.replace("NAMEHERE", value);
  }

  // Retrieve the evidence array from localStorage
  let evidenceArray = JSON.parse(localStorage.getItem(prefix + "evidenceArray")) || [];

  // For each evidence item, add a [table2=1, black,...] block
  evidenceArray.forEach(item => {
    output += `
[table2=1,black,transparent,Arial]
[tr]
[tdwidth=1,black,transparent,top,left,37,5]
[b][size=87]EL NO.[/size][/b]
${item.elNo}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,30,5]
[b][size=87]Description of Article[/size][/b]
${item.desc}
[/tdwidth]
[tdwidth=1,black,transparent,top,left,25,5]
[b][size=87]Quantity[/size][/b]
${item.qty}
[/tdwidth]
[/tr]
[/table2]`;
  });

  // We'll now display the final BBCode
  const outputElement = document.getElementById("bbcodeOutput");
  outputElement.textContent = output;

  // Auto-select the text
  if (window.getSelection) {
    const range = document.createRange();
    range.selectNodeContents(outputElement);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}
